import { useState, useEffect } from "react";
import Button from "./Button";
import { Link } from "react-router-dom";
import { useCart } from "../Contexts/CartContext";
import DiscountTag from "./DiscountTag";
import StatusTag from "./StatusTag";
import { productIsAvailable } from "../Hooks/ProductControls";
import ProductPrice from "./ProductPrice";

const Product = ({ product }) => {
  // PRODUCT
  // title, alt, image, id, currentPrice, quqntity, formerPrice

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
    setQuantityInCart(quantity);
  }, []);

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

  const available = productIsAvailable(product.quantity);

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
          className="product-img mb-0 bg-light border"
          style={{ height: "16rem" }}
        >
          {/* <img src={mage} alt={product.altText} className="image" /> */}
          <figcaption className="sr-only">{product.title}</figcaption>
        </figure>
        {
          <div className="top-0 end-0 label m-3 position-absolute ">
            <DiscountTag product={product} />
            <StatusTag available={available} show={false} />
          </div>
        }
      </Link>

      <div className="border ease-1 mt-3 p-4 product-body bg-white">
        <div
          className="font-weight-700 h6 mb-2 text-black"
          id={`pd${product.id}`}
          title={product.title}
        >
          <Link
            to={`/product/${product.id}`}
            className="position-relative text-reset text-decoration-hover"
          >
            {product.title}
          </Link>
        </div>

        <div className="d-flex justify-content-between align-items-center">
          <div className="my-0 h5 font-weight-700">
            <ProductPrice product={product} />
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
                className="input-group align-items-center overflow-hidden rounded-pill"
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
