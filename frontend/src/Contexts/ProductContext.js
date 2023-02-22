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

function fakeData() {
    /** Simulates a fate HTTP request to a server */
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const PRODUCTS = {
                "d2250-4-pro-round-656754": {
                    id: 1, 
                    title: "D2250.4 PRO ROUND", 
                    price: "15000", 
                    images: [
                        "./Assets/images/product.jpg"
                    ],
                    alts: [
                        "Image of weights"
                    ],
                },
    
                "t65-weight-machine-242890": {
                    id: 2, 
                    title: "T65 WEIGHT MACHINE", 
                    price: "40000", 
                    images: [
                        "./Assets/images/product-1.jpg",
                    ],
                    alts: [
                        "Image of weights",
                    ],
                },
    
                "jumbotron-500-x-series": {
                    id: 3, 
                    title: "JUMBOTRON 500 X SERIES", 
                    price: "15000", 
                    images: [
                        "./Assets/images/product-2.jpg"
                    ],
                    alts: [
                        "Image of weights",
                    ]
                },
            };
            if (PRODUCTS) {
                resolve(PRODUCTS);
            } else {
                return reject(new Error("Error failed."));
            }
        }, 1500);
    })
}

function ProductProvider({ children }) {
    // API setup
    const value = {
        getProductDetails,
        getSampleProducts,

        getSimilarProducts
    }

    // Fetch a single product from the database (Add on axios to this)
    function getProductDetails(id) {
        // Send request to fetch product details
        const PRODUCTS = {
            "d2250-4-pro-round-656754": {
                id: "d2250-4-pro-round-656754", 
                title: "D2250.4 PRO ROUND", 
                price: "15000", 
                images: [
                    "./Assets/images/product.jpg"
                ],
                alts: [
                    "Image of weights"
                ],
            },

            "t65-weight-machine-242890": {
                id: "t65-weight-machine-242890", 
                title: "T65 WEIGHT MACHINE", 
                price: "40000", 
                images: [
                    "./Assets/images/product-1.jpg",
                ],
                alts: [
                    "Image of weights",
                ],
            },

            "jumbotron-500-x-series-987698": {
                id: "jumbotron-500-x-series-987698", 
                title: "JUMBOTRON 500 X SERIES", 
                price: "15000", 
                images: [
                    "./Assets/images/product-2.jpg"
                ],
                alts: [
                    "Image of weights",
                ]
            },
        };

        return PRODUCTS[id]; // Return raw product object
    }

    // Fetch top 3 similar products (Refactor to actually return recommendations)
    function getSimilarProducts(id) {
        const PRODUCTS = {
            "d2250-4-pro-round-656754": {
                id: "d2250-4-pro-round-656754", 
                title: "D2250.4 PRO ROUND", 
                price: "15000", 
                images: [
                    "./Assets/images/product.jpg"
                ],
                alts: [
                    "Image of weights"
                ],
            },

            "t65-weight-machine-242890": {
                id: "t65-weight-machine-242890", 
                title: "T65 WEIGHT MACHINE", 
                price: "40000", 
                images: [
                    "./Assets/images/product-1.jpg",
                ],
                alts: [
                    "Image of weights",
                ],
            },

            "jumbotron-500-x-series-987698": {
                id: "jumbotron-500-x-series-987698", 
                title: "JUMBOTRON 500 X SERIES", 
                price: "15000", 
                images: [
                    "./Assets/images/product-2.jpg"
                ],
                alts: [
                    "Image of weights",
                ]
            },
        };

        return PRODUCTS;
    }

    // Fetches the first three products
    function getSampleProducts() {
        const PRODUCTS = {
            "d2250-4-pro-round-656754": {
                id: "d2250-4-pro-round-656754", 
                title: "D2250.4 PRO ROUND", 
                price: "15000", 
                images: [
                    "./Assets/images/product.jpg"
                ],
                alts: [
                    "Image of weights"
                ],
            },

            "t65-weight-machine-242890": {
                id: "t65-weight-machine-242890", 
                title: "T65 WEIGHT MACHINE", 
                price: "40000", 
                images: [
                    "./Assets/images/product-1.jpg",
                ],
                alts: [
                    "Image of weights",
                ],
            },

            "jumbotron-500-x-series-987698": {
                id: "jumbotron-500-x-series-987698", 
                title: "JUMBOTRON 500 X SERIES", 
                price: "15000", 
                images: [
                    "./Assets/images/product-2.jpg"
                ],
                alts: [
                    "Image of weights",
                ]
            },
        };

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
            { children }
        </ProductContext.Provider>
    )
}

export { useProduct, ProductProvider };