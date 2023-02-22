import React, { useRef } from 'react'
import { useParams } from "react-router-dom";
import { useProduct } from "../../Contexts/ProductContext";
import Product from "../../Components/Product/Product";

function Details({product, id}) {
    let similarProducts = [];
    let productItems = [];

    const { getSimilarProducts } = useProduct();

    if (product) {
        // Fetch similar products
        similarProducts = getSimilarProducts(id);

        for (const productKey in similarProducts) {
            productItems.push(
                (
                    <li key={productKey.id}>
                    <Product product={similarProducts[productKey]}
                        />
                    </li>
                )
            )
        }
    }

    // Quantity input handler
    const quantityRef = useRef(1);

    const handleChange = (e) => { // Handle quantity input field change
        quantityRef.current.value = e.target.value;
    }

    return (
        <>
            <section className="width-wrapper">
                <article className="section-medium">
                    <div className="flex gap-2">
                        <ul className="grid grid-cols-[repeat(4,_minmax(150px,_1fr))] gap-4">
                            <li className="bg-primary h-56">Image 1</li>
                            <li className="bg-primary col-start-2 col-end-5 row-start-1 row-end-4">Image 2</li>
                            <li className="bg-primary h-56">Image 3</li>
                        </ul>

                        <div className="details">
                            <h1 className="heading-1 text-5xl mb-7">{product.title}</h1>
                            <p className="text-4xl font-weight-500 mb-12">${parseInt(product.price).toLocaleString("en-US")}</p>

                            <form action="#" className="flex gap-3" method="post">
                                <label htmlFor="quantity" className="hide">Quantity</label>
                                <input 
                                    className="border-[1px] px-4 text-2xl border-gray-600"
                                    type="number"
                                    min="1" name="quantity" 
                                    ref={quantityRef}
                                    id="quantity" 
                                    defaultValue="1" />
                                <button type="button"
                                    className="color-white font-medium px-9 py-5 drop-shadow-md bg-primary text-2xl">Add to Basket</button>
                            </form>
                        </div>
                    </div>
                </article>

                <article className="section-medium">
                    <h2 className="heading-2 margin-bottom-2">Description</h2>
                    <p className="body-copy">
                        {product.description}
                    </p>
                </article>
            </section>

            <section className="width-wrapper">
                <article className="section-medium">
                    <h2 className="heading-2 margin-bottom-4">
                        Similar Products
                    </h2>

                    <ul className="list-s-none products margin-bottom-3">
                        {productItems}
                    </ul>
                </article>
            </section>
        </>
    )
}

function ProductDetails() {
    // Extract product id from parameter
    const { product_id } = useParams();

    // Get function that will fetch a single product
    const { getProductDetails } = useProduct();

    // Fetch product data
    const product = getProductDetails(product_id);

    console.log(product_id)

  return (
    <>
        { !product ? 
            (
                <div className="container text-center h-96 text-3xl flex justify-center items-center">
                    <h1>Product not found </h1>
                </div>
            ) 
            :
            <Details product={product} id={product_id} />
        }
    </>
  );
}

export default ProductDetails