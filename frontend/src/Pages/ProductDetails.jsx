import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { _get, api } from "../Hooks/fetch";
import { useCart } from "../Contexts/CartContext";

import Button from "../Components/Button";
import DiscountTag from "../Components/DiscountTag";
import { productIsAvailable } from "../Hooks/ProductControls";
import StatusTag from "../Components/StatusTag";
import ProductPrice from "../Components/ProductPrice";
import FourOhFour from "./FourOhFour";
import Product from "../Components/Product";

import "../Assets/css/product-details.css";
import Loader from "../Components/Loader";

function getRecommendations(productId) {
  // sample products
  const products = [
    {
      id: "eje-snkqo",
      title: '54" Plasma TV',
      price: 540000,
      quantity: 10,
      formerPrice: 600000,
    },

    {
      id: "aoo-adwop",
      title: "Lime Christmas sweater",
      price: 7500,
      quantity: 31,
    },

    {
      id: "ssl-akila",
      title: "Bouquet of peonies",
      price: 38750,
      quantity: 7,
      formerPrice: 40000,
    },
  ];

  return products;
}

const ProductDetails = () => {
  const { product_id } = useParams();
  const [productId, setProductId] = useState(null);
  const [loadedProduct, setLoadedProduct] = useState(false);
  const [product, setProduct] = useState([]);
  const [recommendedProducts, setRecommendedProducts] = useState([]);

  /**
   * Get product details
   * @param {String} productId
   * @returns
   */
  async function getProductDetails() {
    const data = await _get(`products/${productId}/`);
    if (!data) return;
    setLoadedProduct(true);
    setProduct(data);
    setRecommendedProducts(data.recommended_products);
  }

  useEffect(() => {
    getProductDetails();
  }, [productId]);

  useEffect(() => {
    setProductId(product_id);
  }, [product_id]);

  const {
    addProductToCart,
    increaseProductInCart,
    reduceProductInCart,
    getProductQuantityInCart,
  } = useCart();

  const [quantityInCart, setQuantityInCart] = useState(
    getProductQuantityInCart(product.id)
  );

  useEffect(() => {
    const quantity = getProductQuantityInCart(product.id);
    if (quantity) setQuantityInCart(quantity);
  }, [product]);

  if (product) {
    function handleReduceCartQuantity() {
      setQuantityInCart(reduceProductInCart(product));
    }

    function handleIncreaseCartQuantity() {
      setQuantityInCart(increaseProductInCart(product));
    }

    function handleAddToCart() {
      addProductToCart(product);
      setQuantityInCart(1);
    }
    // get product details
    const available = productIsAvailable(product.total_quantity);

    return (
      <>
        <section id="productDetails" className="py-5">
          <div className="container mt-5">
            {!loadedProduct ? (
              <Loader />
            ) : (
              <div className="row">
                <div className="col-md-5">
                  <div className="bg-light" style={{ height: "30rem" }}>
                    <img
                      src={product.images[0]}
                      alt=""
                      className="w-100"
                    />
                  </div>
                </div>

                <div className="col-md-6 offset-md-1">
                  <div className="bg-white border border-4 p-5 rounded-4">
                    <div id="returnToProductsBtn">
                      <Button size="sm" href="/shop" link={true}>
                        <i className="fa-solid fa-arrow-left-long me-2"></i>All
                        products
                      </Button>
                    </div>

                    <h1 className="h2 font-weight-700 mt-3 mb-2">
                      {product.name}
                    </h1>
                    <div className="d-flex align-items-center">
                      <div>
                        <StatusTag available={available} show={true} />
                      </div>
                      <DiscountTag product={product} long={true} />
                    </div>

                    <div className="mt-4 mb-3">
                      <div>
                        <button
                          type="button"
                          id="productDescriptionToggle"
                          className="border border-2 btn-light border-end-0 border-start-0 btn btn-sm px-3 rounded rounded-0 text-start text-uppercase d-flex justify-content-between w-100 align-items-center"
                          data-bs-toggle="collapse"
                          data-bs-target="#productDescription"
                          aria-expanded={true}
                          aria-controls="productDescription"
                        >
                          Description
                          <i className="fa-solid fa-angles-down ease"></i>
                        </button>

                        <div
                          id="productDescription"
                          className="collapse p-2 show small text-secondary"
                        >
                          {product.description}
                        </div>
                      </div>
                    </div>

                    <div className="mt-4">
                      <div className="d-flex justify-content-between align-items-center flex-wrap">
                        <div className="h3 font-weight-700 my-0 heading">
                          <ProductPrice product={product} />
                        </div>

                        <div className="ms-3">
                          <div
                            className={
                              `add-to-cart-btn ` +
                              (quantityInCart === 0 ? "" : "d-none")
                            }
                            aria-label="Add to cart"
                          >
                            <Button
                              onclick={handleAddToCart}
                              color="pink"
                              rounded="2"
                            >
                              <i className="fa-solid fa-cart-shopping me-2"></i>{" "}
                              Add to cart
                            </Button>
                          </div>

                          <div className={quantityInCart !== 0 ? "" : "d-none"}>
                            <div
                              className="input-group align-items-center"
                              style={{ height: 42 }}
                            >
                              <div
                                className="cart-qty-btn"
                                aria-label="Reduce quantity"
                              >
                                <Button
                                  size="sm"
                                  onclick={handleReduceCartQuantity}
                                  rounded="circle"
                                  color="pink"
                                >
                                  <i className="fa-solid fa-minus"></i>
                                </Button>
                              </div>
                              <div
                                className="align-items-center cart-qty d-flex font-weight-700 justify-content-center px-3 text-secondary"
                                aria-label="Quantity in cart"
                              >
                                {quantityInCart}
                              </div>
                              <div
                                className="cart-qty-btn"
                                aria-label="Increase quantity"
                              >
                                <Button
                                  size="sm"
                                  onclick={handleIncreaseCartQuantity}
                                  rounded="circle"
                                  color="pink"
                                >
                                  <i className="fa-solid fa-plus"></i>
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        <section id="productRec" className="py-5">
          <div className="container">
            <h1 className="h4 text-uppercase underlined d-inline-block">
              You'll love these
            </h1>

            <div className="row mt-5">
              {recommendedProducts.map((product, key) => (
                <div className="col-md-4" key={key}>
                  <Product product={product} />
                </div>
              ))}
            </div>
          </div>
        </section>
      </>
    );
  } else {
    return <FourOhFour />;
  }
};

export default ProductDetails;
