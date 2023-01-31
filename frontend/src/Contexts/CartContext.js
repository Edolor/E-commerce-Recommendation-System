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

    function addToCart(product) {
        /** Adds a product to cart and sets the counter(Number of products) to 1 */
        const id = product.id;
        
        // Strutring the object to be placed into the state variable
        const bundledProduct = {id: {counter: 1, ...product}};

        setCartProducts(products => {
            return {...bundledProduct, ...products}
        });
        
        return cartProducts;
    }

    function removeFromCart(product) {
        /** Removes a product from cart */
        setCartProducts(products => {
            const copyProducts = {...products}; // Creating a copy

            delete copyProducts[product.id]; // Removing product from object

            return copyProducts;
        })

        return cartProducts;
    }


    function getCartProducts() {
        /** Get all cart products to be displayed in the cart page */
        return cartProducts;
    }

    function increaseQuantity(product) {
        /** Increases the quantity of a particular product in the cart */
        setCartProducts((products) => {
            const copyProducts = {...products}; // Make a copy
            
            copyProducts[product.id]["counter"] += 1; // Increment product counter

            return copyProducts;
        });
        return cartProducts;
    }

    function decreaseQuantity(product) {
        /** Reduces the quantity of a particular product in the cart */
        setCartProducts((products) => {
            const copyProducts = {...products}; // Make a copy
            
            // If product is 2 or more items decrease by 1
            if (copyProducts[product.id]["counter"] > 1) {
                copyProducts[product.id]["counter"] -= 1; // Decrement product counter
            } else { // If item count is 1 (remove)
                delete copyProducts[product.id]; // Removing product from object
            }

            return copyProducts;
        });
        return cartProducts;
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