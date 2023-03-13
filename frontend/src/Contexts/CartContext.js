import React, { useState, createContext, useEffect, useCallback } from "react";

const CART = 'ls_cart';
const STORAGE = localStorage;

const CartContext = createContext();
const useCart = () => React.useContext(CartContext);

const CartProvider = ({ children }) => {
	const [cart, setCart] = useState(JSON.parse(STORAGE.getItem(CART)));

	// very important check here
	const getCartItemCount = useCallback(() => {
		if (cart === null) return 0;
		else return Object.keys(cart).length;
	}, [cart]);

	const [cartProductCount, setCartProductCount] = useState(getCartItemCount());

	const getCartTotalPrice = useCallback(() => {
		var total = 0;
		for (let id in cart) {
			let product = cart[id];
			total += product.quantity * product.product.currentPrice;
		}
		return total;
	}, [cart]);

	const [cartTotalPrice, setCartTotalPrice] = useState(getCartTotalPrice());
	// update local storage cart whenever the cart is updated
	useEffect(() => {
		let items = JSON.stringify(cart);
		STORAGE.setItem(CART, items);
		setCartProductCount(getCartItemCount());
		setCartTotalPrice(getCartTotalPrice());
	}, [cart, getCartTotalPrice, getCartItemCount]);

	/**
	 * Checks if a product exists in cart
	 * @param {String} productId 
	 * @returns 
	 */
	function inCart(productId) {
		return Boolean(cart[productId]);
	}

	function getCartCount() {
		return cartProductCount;
	}

	/**
	 * Get quantity of a product in cart
	 * @param {String} productId 
	 * @returns 
	 */
	function getProductQuantityInCart(productId) {
		return cart[productId] ? cart[productId]['quantity'] : 0;
	}

	function addProductToCart(product) {
		// product is not already in cart
		if (!cart[product.id]) {
			let thisProduct = {};
			thisProduct[product.id] = { product: product, quantity: 1 };
			setCart({ ...thisProduct, ...cart });
		}
	}

	function updateProductQuantity(product, quantity) {
		let thisProduct = { ...cart };
		thisProduct[product.id].quantity += quantity;
		setCart({ ...thisProduct });
		return cart[product.id]['quantity'];
	}

	function increaseProductInCart(product) {
		// if product isn't in cart, ignore
		if (!inCart(product.id)) return;

		// cannot increase quantity if quantity exceeds store quantity
		if (cart[product.id]['quantity'] === product.quantity) return product.quantity;

		return updateProductQuantity(product, 1);
	}

	function reduceProductInCart(product) {
		// if product isn't in cart, ignore
		if (!inCart(product.id)) return product.quantity;

		// if quantity is already 1, just remove product from cart
		if (cart[product.id]['quantity'] === 1) {
			return removeProductFromCart(product);
		} else return updateProductQuantity(product, -1);
	}

	function removeProductFromCart(product) {
		// if product doesn't exist in cart, ignore
		if (!inCart(product.id)) return;

		let productsInCart = { ...cart };
		delete productsInCart[product.id];

		setCart({ ...productsInCart });
		return 0;
	}

	function getCartProducts() {
		return cart;
	}

	function getProductFromCart(id) {
		return cart[id];
	}

	return (
		<CartContext.Provider value={{ getCartProducts, addProductToCart, increaseProductInCart, reduceProductInCart, removeProductFromCart, inCart, getProductQuantityInCart, getCartCount, getProductFromCart, cartTotalPrice }}>{children}</CartContext.Provider>
	)
}

export { CartProvider, useCart };