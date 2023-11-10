import React, { FC, HTMLProps, PropsWithChildren } from "react";
import { Box, Text } from "zmp-ui";
import { BodyTextProps } from "zmp-ui/text";

export const TextSkeleton: FC<PropsWithChildren<BodyTextProps>> = ({ className, ...props }) => {
	return <Text {...props} className={`bg-skeleton text-transparent w-fit h-fit animate-pulse ${className ?? ""}`} />;
};

export const ImageSkeleton: FC<HTMLProps<HTMLImageElement>> = ({ className, ...props }) => {
	return <div {...props} className={`bg-skeleton animate-pulse ${className ?? ""}`} />;
};

export const RadioSkeleton: FC<PropsWithChildren<BodyTextProps>> = ({ className, ...props }) => {
	return (
		<div
			{...props}
			className={`radio-skeleton bg-skeleton rounded-full w-6 h-6 animate-pulse ${className ?? ""}`}
		/>
	);
};

export const ProductItemSkeleton: FC = () => {
	return (
		<div className="space-y-2">
			<ImageSkeleton className="w-full aspect-square rounded-lg" />
			<TextSkeleton>1234567890</TextSkeleton>
			<TextSkeleton size="xxSmall">20,000đ</TextSkeleton>
		</div>
	);
};

export const BannerItemSkeleton: FC = () => {
	return (
		<div className="space-y-2">
			<ImageSkeleton className="w-full rounded-lg aspect-[2/1] bg-cover bg-center bg-skeleton" />
		</div>
	);
};

export const NotifyItemSkeleton: FC = () => {
	return (
		<div className="space-y-2">
			<ImageSkeleton className="w-full rounded-lg aspect-[2/1] bg-cover bg-center bg-skeleton" />
		</div>
	);
};

export const ProductSlideSkeleton: FC = () => {
	return (
		<div className="space-y-3">
			<ImageSkeleton className="w-full aspect-video rounded-lg" />
			<Box className="space-y-1">
				<TextSkeleton size="small">1234567890</TextSkeleton>
				<TextSkeleton size="xxSmall">25,000đ</TextSkeleton>
				<TextSkeleton size="large">20,000đ</TextSkeleton>
			</Box>
		</div>
	);
};

export const ProductSearchResultSkeleton: FC = () => {
	return (
		<div className="flex items-center space-x-4">
			<ImageSkeleton className="w-[88px] h-[88px] rounded-lg" />
			<Box className="space-y-2">
				<TextSkeleton>1234567890</TextSkeleton>
				<TextSkeleton size="xSmall">25,000đ</TextSkeleton>
			</Box>
		</div>
	);
};

export const CategoryItemSkeleton: FC<{ numImages: number }> = ({ numImages }) => {
	return (
		<>
			{Array.from({ length: numImages }).map((_, i) => (
				<div className="w-full" key={i}>
					<div className="flex flex-col space-x-2 items-center rounded-full">
						<ImageSkeleton className="w-12 h-12 rounded-full" />
						<TextSkeleton size="xxSmall" className="text-gray mt-1 mb-1">
							Cà Phê
						</TextSkeleton>
					</div>
				</div>
			))}
		</>
	);
};

export const PaymentMethodSkeleton: FC<{ numberMethod: number }> = ({ numberMethod }) => {
	return (
		<>
			{Array.from({ length: numberMethod }).map((_, i) => (
				<Box className="space-y-2" key={i}>
					<Box className="flex flex-row items-center justify-between">
						<Box className="flex flex-row items-center space-x-2">
							<ImageSkeleton className="w-8 h-8 p-1" />
							<TextSkeleton size="large">Thanh toán qua zalo pay</TextSkeleton>
						</Box>
						<RadioSkeleton size="large" />
					</Box>
				</Box>
			))}
		</>
	);
};
