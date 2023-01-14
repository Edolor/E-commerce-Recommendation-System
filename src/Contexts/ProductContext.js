import React from 'react';
import { createContext, useContext, useState } from "react";
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

    }

    function getProductDetails(id) {
        const result = {

        }

        return result;
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

export default ProductContext;