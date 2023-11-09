import CartPage from "pages/cart";
import CategoryPage from "pages/category";
import HomePage from "pages/index";
import NotificationPage from "pages/notification";
import ProfilePage from "pages/profile";
import SearchPage from "pages/search";
import SuccessPage from "pages/success";
import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const RoutesWithTransition: React.FC = () => {
	const location = useLocation();

	return (
		<>
			<TransitionGroup>
				<CSSTransition key={location.pathname} classNames="router" timeout={{ enter: 400, exit: 200 }}>
					<Routes>
						<Route path="/" element={<HomePage />} />
						<Route path="/category" element={<CategoryPage />} />
						<Route path="/notification" element={<NotificationPage />} />
						<Route path="/cart" element={<CartPage />} />
						<Route path="/profile" element={<ProfilePage />} />
						<Route path="/success" element={<SuccessPage />} />
					</Routes>
				</CSSTransition>
			</TransitionGroup>
			<Routes>
				<Route path="/search" element={<SearchPage />} />
			</Routes>
		</>
	);
};

export default RoutesWithTransition;
