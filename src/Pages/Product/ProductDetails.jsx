import React from 'react'
import { useParams } from "react-router-dom";

function ProductDetails() {
    // Extract product id from parameter
    const { product_id } = useParams();

    // Send request to database to fetch product data
    console.log(product_id);

    
  return (
    <div>ProductDetails</div>
  )
}

export default ProductDetails