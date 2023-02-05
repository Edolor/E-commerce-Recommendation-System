import React, { createContext, useContext, useEffect, useState } from 'react'

const CartContext = createContext();
const STORAGE_NAME = "cart_data";

function useCart() {
    return useContext(CartContext);
}

function CartProvider({children}) {
    const [cartProducts, setCartProducts] = useState({});
    const [cartCounter, setCartCounter] = useState(0);

    // Effect to fetch products from cart in local storage
    useEffect(() => {
        // FETCH ITEM FROM CART
        const cartPs = JSON.parse(localStorage.getItem(STORAGE_NAME));
        if (cartPs) {
            setCartProducts(cartPs);
        }
    }, []);

    // Effect to update cart in local storage
    useEffect(() => {
        // FETCH ITEM FROM CART
        localStorage.setItem(STORAGE_NAME, JSON.stringify(cartProducts));
       
    }, [cartProducts]);

    function cartReducer(cartItems, action) {
        /** Respomsible for handling all state logic for the cart component */
    
        switch (action.type) {
            case "add": {
                if (action.product) {
                     /** Adds a product to cart and sets the counter(Number of products) to 1 */
                    const id = product.id;
                    
                    // Strutring the object to be placed into the state variable
                    const bundledProduct = {};
                    bundledProduct[id] = {counter: 1, ...action.product}

                    return {...bundledProduct, ...cartProducts}
                }
    
                return cartProducts;
            }
            
            case "remove": {
                /** Removes a product from cart */
                const copyProducts = {...cartProducts}; // Creating a copy

                if (copyProducts[action.id]) {
                    delete copyProducts[action.id]; // Removing product from object
                }
                
                return copyProducts;
            }

            case "reduce": {
                /** Reduces the quantity of a particular product in the cart */
                const copyProducts = {...cartProducts}; // Make a copy
                
                if (copyProducts[action.id]) {
                    // If product is 2 or more items decrease by 1
                    if (copyProducts[action.id]["counter"] > 1) {
                        copyProducts[action.id]["counter"] -= 1; // Decrement product counter
                    } else { // If item count is 1 (remove)
                        delete copyProducts[action.id]; // Removing product from object
                    }
                }

                return copyProducts;
            }

            case "increase": {
                /** Reduces the quantity of a particular product in the cart */
                const copyProducts = {...cartProducts}; // Make a copy
                
                if (copyProducts[action.id]) {
                    copyProducts[action.id]["counter"] += 1; // Increment  product counter
                }

                return copyProducts;
            }

            default: {
                throw Error(`Unknown action: ${action.type}`);
            }
        }
    }

    function getCartProducts() {
        /** Get all cart products to be displayed in the cart page */
        return cartProducts;
    }

    // External API for usage
    const value = {
        cartProducts,
        setCartProducts,

        cartCounter,
        setCartCounter,

        cartReducer,
        getCartProducts,
    };
    
    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
}

export { useCart };
export default CartProvider;