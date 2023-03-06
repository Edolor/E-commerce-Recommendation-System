import { useState, useEffect } from "react";
import Button from "./Button";
import { Link } from "react-router-dom";

const Product = ({ product }) => {
  // PRODUCT
  // title, alt, image, id, currentPrice, quqntity, formerPrice

  // DATA
  // quantity in cart

  // ACTIONS
  // add to cart
  // increase quantity
  // reduce quantity

  const isDiscounted = !!product.formerPrice;

  const [quantityInCart, setQuanityInCart] = useState(0);

  function handleReduceCartQuantity() {
    let quantity = quantityInCart;
    setQuanityInCart(quantity - 1);
  }

  function handleIncreaseCartQuantity() {
    let quantity = quantityInCart;
    setQuanityInCart(quantity + 1);
  }

  function handleAddToCart() {
    handleIncreaseCartQuantity();
  }

  const DiscountTag = () => {
    if (!isDiscounted) return;

    let discount =
      ((product.formerPrice - product.currentPrice) / product.formerPrice) *
      100;

    return (
      <div className="badge end-0 label m-3 position-absolute product-discount-tag top-0">
        -{Math.round(discount)}%
      </div>
    );
  };

  return (
    <article
      className="product p-2 mb-3 mb-md-0 ease-1"
      aria-labelledby={`pd${product.id}`}
    >
      <Link
        to={`/product/${product.id}`}
        className="position-relative text-decoration-none text-reset"
      >
        <figure
          className="product-img mb-0 bg-light"
          style={{ height: "16rem" }}
        >
          {/* <img src={mage} alt={product.altText} className="image" /> */}
          <figcaption className="sr-only">{product.title}</figcaption>
        </figure>
        <DiscountTag />
      </Link>

      <div className="border ease-1 mt-3 p-4 product-body">
        <div
          className="font-weight-700 h6 mb-2 text-black"
          id={`pd${product.id}`}
          title={product.title}
        >
          {product.title}
        </div>
        <div className="d-flex justify-content-between">
          <div className="align-items-center d-flex flex-wrap font-weight-700 h5 mb-0 text-black">
            <i className="fa-solid fa-naira-sign small"></i>
            {product.currentPrice.toLocaleString()}
            {isDiscounted ? (
              <del
                className="text-muted ms-1 small"
                style={{ fontSize: "75%" }}
              >
                {product.formerPrice.toLocaleString()}
              </del>
            ) : (
              ""
            )}
          </div>

          <div className="ms-1">
            <div
              className={
                `add-to-cart-btn ` + (quantityInCart === 0 ? "" : "d-none")
              }
              aria-label="Add to cart"
            >
              <Button rounded="circle" onclick={handleAddToCart} color="pink">
                <i className="fa-solid fa-cart-shopping"></i>
              </Button>
            </div>

            <div className={quantityInCart !== 0 ? "" : "d-none"}>
              <div
                className="input-group overflow-hidden rounded-pill"
                style={{ backgroundColor: "#bdcbcc" }}
              >
                <div className="cart-qty-btn" aria-label="Reduce quantity">
                  <Button size="sm" onclick={handleReduceCartQuantity}>
                    <i className="fa-solid fa-minus"></i>
                  </Button>
                </div>
                <div
                  className="align-items-center cart-qty d-flex form-control form-control-plaintext justify-content-center"
                  aria-label="Quantity in cart"
                >
                  {quantityInCart}
                </div>
                <div className="cart-qty-btn" aria-label="Increase quantity">
                  <Button size="sm" onclick={handleIncreaseCartQuantity}>
                    <i className="fa-solid fa-plus"></i>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default Product;
