import React from 'react';
import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { Spinner } from "react-bootstrap";

const ProductContext = createContext(); 

function useProduct() {
    return useContext(ProductContext);
}

const baseURL = "http://localhost:8000";

const client = axios.create({
    baseURL: baseURL
})

function ProductProvider({ children }) {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getData = async () => {
            // Add things here that should be preloaded

            // After fetching data set loading to false to stop spinner
            setLoading(false);
        }

        getData();
    }, []);


    // API setup
    const value = {
        getProductDetails,
        getSampleProducts,

        getSimilarProducts
    }

    // Fetch a single product from the database (Add on axios to this)
    function getProductDetails(id) {
        const result = [
            {
                id: 1, 
                title: "D2250.4 PRO ROUND", 
                price: "15000", 
                images: [
                    "./Assets/images/product.jpg",
                    "./Assets/images/product.jpg"
                ],
                alts: [
                    "Image of weights",
                    "Image of weights",
                ],
                description: "This is a weight that is about 200 miles long and also there are other things that are doing the thing that I want to do here",
                discountPercentage: "23%",
                formerPrice: "40,000"
            },
        ];

        return result[0]; // Return raw product object
    }

    // Fetch top 3 similar products (Refactor to actually return recommendations)
    function getSimilarProducts(id) {
        const PRODUCTS = [
            {
                id: 1, 
                title: "D2250.4 PRO ROUND", 
                price: "15,000", 
                images: [
                    "./Assets/images/product.jpg",
                    "./Assets/images/product.jpg"
                ],
                alts: [
                    "Image of weights",
                    "Image of weights",
                ],
                discountPercentage: "23%",
                formerPrice: "40,000"
            },

            {
                id: 2, 
                title: "D2250.4 PRO ROUND", 
                price: "15,000", 
                images: [
                    "./Assets/images/product.jpg",
                    "./Assets/images/product.jpg"
                ],
                alts: [
                    "Image of weights",
                    "Image of weights",
                ],
                discount: true,
                discountPercentage: "23%",
                formerPrice: "40,000"
            },

            {
                id: 3, 
                title: "D2250.4 PRO ROUND", 
                price: "15,000", 
                images: [
                    "./Assets/images/product.jpg",
                    "./Assets/images/product.jpg"
                ],
                alts: [
                    "Image of weights",
                    "Image of weights",
                ],
                discount: true,
                discountPercentage: "23%",
                formerPrice: "40,000"
            },
        ];

        return PRODUCTS;
    }

    // Fetches the first three products
    function getSampleProducts() {
        const PRODUCTS = [
            {
                id: 1, 
                title: "D2250.4 PRO ROUND", 
                price: "15,000", 
                images: [
                    "./Assets/images/product.jpg",
                    "./Assets/images/product.jpg"
                ],
                alts: [
                    "Image of weights",
                    "Image of weights",
                ],
                discountPercentage: "23%",
                formerPrice: "40,000"
            },

            {
                id: 2, 
                title: "D2250.4 PRO ROUND", 
                price: "15,000", 
                images: [
                    "./Assets/images/product.jpg",
                    "./Assets/images/product.jpg"
                ],
                alts: [
                    "Image of weights",
                    "Image of weights",
                ],
                discount: true,
                discountPercentage: "23%",
                formerPrice: "40,000"
            },

            {
                id: 3, 
                title: "D2250.4 PRO ROUND", 
                price: "15,000", 
                images: [
                    "./Assets/images/product.jpg",
                    "./Assets/images/product.jpg"
                ],
                alts: [
                    "Image of weights",
                    "Image of weights",
                ],
                discount: true,
                discountPercentage: "23%",
                formerPrice: "40,000"
            },
        ];

        return PRODUCTS;
    }

    const spinner = (
        <div className="d-flex vh-100 align-items-center justify-content-center">
            <Spinner animation="grow" size="xl" role="status" variant="primary">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </div>
    );

    return (
        <ProductContext.Provider value={value}>
            { !loading ? children : spinner}
        </ProductContext.Provider>
    )
}

export { useProduct, ProductProvider };