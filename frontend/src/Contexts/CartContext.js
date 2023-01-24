import React, { createContext, useContext, useEffect, useState } from 'react'

const CartContext = createContext();

function useCart() {
    return useContext(CartContext);
}

function CartProvider({children}) {
    const cartProducts = {};
    const [cartCounter, setCartCounter] = useState(0);

    function addToCart(product) {
        /** Adds a product to cart */
        return;
    }

    function removeFromCart(product) {
        /** Removes a product from cart */
        return;
    }


    function getCartProducts() {
        /** Get all cart products to be displayed in the cart page */
        return;
    }

    function increaseQuantity(product) {
        /** Increases the quantity of a particular product in the cart */
        return;
    }

    function decreaseQuantity(product) {
        /** Reduces the quantity of a particular product in the cart */
        return;
    }


    // External API for usage
    const value = {
        cartProducts,
        cartCounter,
        setCartCounter,

        addToCart,
        removeFromCart,
        getCartProducts,
        increaseQuantity,
        decreaseQuantity
    };
    
    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
}

export { useCart };
export default CartProvider;