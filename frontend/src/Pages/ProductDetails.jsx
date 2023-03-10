import { useState, useEffect } from "react";
import { useCart } from "../Contexts/CartContext";
import { useParams } from "react-router-dom";
import Button from "../Components/Button";
import DiscountTag from "../Components/DiscountTag";
import productListing from "../Hooks/products";
import { productIsAvailable } from "../Hooks/ProductControls";
import StatusTag from "../Components/StatusTag";
import ProductPrice from "../Components/ProductPrice";
import FourOhFour from "./FourOhFour";
import Product from "../Components/Product";
import "../Assets/css/product-details.css";

/**
 * Get product details
 * @param {String} productId
 * @returns
 */
function getProductDetails(productId) {
  var matchingProduct;

  matchingProduct = productListing.filter(
    (product) => product.id === productId
  );

  return matchingProduct[0] || false;
}

function getRecommendations(productId) {
  // sample products
  const products = [
    {
      id: "eje-snkqo",
      title: '54" Plasma TV',
      currentPrice: 540000,
      quantity: 10,
      formerPrice: 600000,
    },

    {
      id: "aoo-adwop",
      title: "Lime Christmas sweater",
      currentPrice: 7500,
      quantity: 31,
    },

    {
      id: "ssl-akila",
      title: "Bouquet of peonies",
      currentPrice: 38750,
      quantity: 7,
      formerPrice: 40000,
    },
  ];

  return products;
}

const ProductDetails = () => {
  const { product_id } = useParams();

  const product = getProductDetails(product_id);

  const {
    addProductToCart,
    increaseProductInCart,
    reduceProductInCart,
    getProductQuantityInCart,
  } = useCart();

  const [quantityInCart, setQuantityInCart] = useState(
    getProductQuantityInCart(product.id || null)
  );

  useEffect(() => {
    const quantity = getProductQuantityInCart(product.id || null);
    if (quantity) setQuantityInCart(quantity);
  }, []);

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
    const available = productIsAvailable(product.quantity);

    const recommendedProducts = getRecommendations(product_id);

    return (
      <>
        <section id="productDetails" className="py-5">
          <div className="container mt-5">
            <div className="row">
              <div className="col-md-5">
                <div className="bg-secondary" style={{ height: "30rem" }}></div>
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
                    {product.title}
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
          </div>
        </section>

        <section id="productRec" className="py-5 bg-light">
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
