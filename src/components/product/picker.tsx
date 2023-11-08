import { FinalPrice } from "components/display/final-price";
import { Sheet } from "components/fullscreen-sheet";
import useSelectorCart from "hooks/useSelectorCart";
import React, { FC, ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useDispatch } from "react-redux";
import { getCartSuccessAction } from "redux/cart/Actions";
import { SelectedOptions } from "types/cart";
import { ProductField, ProductItems } from "types/product";
import { isIdentical } from "utils/product";
import { Box, Button, Text } from "zmp-ui";

import { MultipleOptionPicker } from "./multiple-option-picker";
import { QuantityPicker } from "./quantity-picker";
import { SingleOptionPicker } from "./single-option-picker";

export interface ProductPickerProps {
	product?: ProductItems;
	selected?: {
		options: SelectedOptions;
		quantity: number;
	};
	children: (methods: { open: () => void; close: () => void }) => ReactNode;
}

function getDefaultOptions(product?: ProductField) {
	const parseProduct = product?.variants;
	if (product && parseProduct) {
		return parseProduct?.reduce(
			(options, variant) =>
				Object.assign(options, {
					[variant.key]: variant.default
				}),
			{}
		);
	}
	return {};
}

export const ProductPicker: FC<ProductPickerProps> = ({ children, product, selected }) => {
	const [isVisible, setVisible] = useState(false);
	const [options, setOptions] = useState<SelectedOptions>(
		selected ? selected.options : getDefaultOptions(product?.fields)
	);
	const [quantity, setQuantity] = useState(1);
	const dispatch = useDispatch();
	const cart = useSelectorCart();
	const cartData = cart.cart;

	useEffect(() => {
		if (selected) {
			setOptions(selected.options);
			setQuantity(selected.quantity);
		}
	}, [selected]);

	const addToCart = () => {
		if (product) {
			let res = [...cartData];
			if (selected) {
				// updating an existing cart item, including quantity and size, or remove it if new quantity is 0
				const editing = cartData.find(
					(item) => item.product.id === product.id && isIdentical(item.options, selected.options)
				)!;
				if (quantity === 0) {
					res.splice(cartData.indexOf(editing), 1);
				} else {
					const existed = cartData.find(
						(item, i) =>
							i !== cartData.indexOf(editing) &&
							item.product.id === product.id &&
							isIdentical(item.options, options)
					)!;
					res.splice(cartData.indexOf(editing), 1, {
						...editing,
						options,
						quantity: existed ? existed.quantity + quantity : quantity
					});
					if (existed) {
						res.splice(cartData.indexOf(existed), 1);
					}
				}
			} else {
				// adding new item to cart, or merging if it already existed before
				const existed = cartData.find(
					(item) => item.product.id === product.id && isIdentical(item.options, options)
				);
				if (existed) {
					res.splice(cartData.indexOf(existed), 1, {
						...existed,
						quantity: existed.quantity + quantity
					});
				} else {
					res = res.concat({
						product,
						options,
						quantity
					});
				}
			}

			dispatch(getCartSuccessAction(res));
		}
		setVisible(false);
	};
	return (
		<>
			{children({
				open: () => setVisible(true),
				close: () => setVisible(false)
			})}
			{createPortal(
				<Sheet visible={isVisible} onClose={() => setVisible(false)} autoHeight>
					{product && (
						<Box className="space-y-6 mt-2" p={4}>
							<Box className="space-y-2">
								<Text.Title>{product.fields?.name}</Text.Title>
								<Text>
									<FinalPrice options={options}>{product.fields}</FinalPrice>
								</Text>
								<Text>
									<div
										dangerouslySetInnerHTML={{
											__html: product.fields?.description ?? ""
										}}
									></div>
								</Text>
							</Box>
							<Box className="space-y-5">
								{product.fields?.variants &&
									product.fields?.variants?.map((variant) =>
										variant.type === "single" ? (
											<SingleOptionPicker
												key={variant.key}
												variant={variant}
												value={options[variant.key] as string}
												onChange={(selectedOption) =>
													setOptions((prevOptions) => ({
														...prevOptions,
														[variant.key]: selectedOption
													}))
												}
											/>
										) : (
											<MultipleOptionPicker
												key={variant.key}
												product={product.fields}
												variant={variant}
												value={options[variant.key] as string[]}
												onChange={(selectedOption) =>
													setOptions((prevOptions) => ({
														...prevOptions,
														[variant.key]: selectedOption
													}))
												}
											/>
										)
									)}
								<QuantityPicker value={quantity} onChange={setQuantity} />
								{selected ? (
									<Button
										variant={quantity > 0 ? "primary" : "secondary"}
										type={quantity > 0 ? "highlight" : "danger"}
										fullWidth
										onClick={addToCart}
									>
										{quantity > 0 ? (selected ? "Cập nhật giỏ hàng" : "Thêm vào giỏ hàng") : "Xoá"}
									</Button>
								) : (
									<Button
										disabled={!quantity}
										variant="primary"
										type="highlight"
										fullWidth
										onClick={addToCart}
									>
										Thêm vào giỏ hàng
									</Button>
								)}
							</Box>
						</Box>
					)}
				</Sheet>,
				document.body
			)}
		</>
	);
};
