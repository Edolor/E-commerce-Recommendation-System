import Button from "../Components/Button";
import "../Assets/css/cart.css";
import { useCart } from "../Contexts/CartContext";
import EmptyCart from "../Assets/icons/empty-cart.svg";
import { Link } from "react-router-dom";
import ProductPrice from "../Components/ProductPrice";
import { useState } from "react";
import NairaSign from "../Components/NairaSign";
import _get from "../Hooks/fetch";

const tableHeaders = ["Product", "Quantity", "Price"];

const ProductItem = ({ productId }) => {
  const { increaseProductInCart, reduceProductInCart, getProductFromCart } =
    useCart();
  const item = getProductFromCart(productId);
  const [quantity, setQuantity] = useState(item.quantity);
  const product = item.product;
  const price = quantity * product.currentPrice;

  function handleReduceCartQuantity() {
    setQuantity(reduceProductInCart(product));
  }

  function handleIncreaseCartQuantity() {
    setQuantity(increaseProductInCart(product));
  }

  if (quantity) {
    return (
      <tr key={productId}>
        <td className="py-3">
          <Link
            to={`/product/${productId}`}
            className="text-reset text-decoration-none ease"
          >
            <div
              className="d-flex align-items-center"
              aria-labelledby={`${productId}_Lbl`}
            >
              <div>
                <div className="cart-product-img rounded-3 bg-light border overflow-hidden"></div>
              </div>
              <div className="cart-product-details ms-3">
                <div
                  id={`${productId}_Lbl`}
                  className="h5 font-weight-500 mb-1"
                >
                  {product.title}
                </div>
                <div>
                  <ProductPrice product={product} />
                </div>
              </div>
            </div>
          </Link>
        </td>
        <td>
          <div>
            <div
              className="input-group align-items-center flex-nowrap"
              style={{ height: 42 }}
            >
              <div className="cart-qty-btn" aria-label="Reduce quantity">
                <Button size="sm" onclick={handleReduceCartQuantity}>
                  <i className="fa-solid fa-minus"></i>
                </Button>
              </div>
              <div
                className="align-items-center cart-qty d-flex font-weight-700 justify-content-center px-3 text-secondary"
                aria-label="Quantity in cart"
              >
                {quantity}
              </div>
              <div className="cart-qty-btn" aria-label="Increase quantity">
                <Button size="sm" onclick={handleIncreaseCartQuantity}>
                  <i className="fa-solid fa-plus"></i>
                </Button>
              </div>
            </div>
          </div>
        </td>
        <td>
          <div className="font-weight-600 d-flex align-items-center">
            <NairaSign />
            <span>{price.toLocaleString()}</span>
          </div>
        </td>
      </tr>
    );
  }
};

async function getData() {
  const res = await _get("products/list/");
  console.log(res);
}

const Cart = () => {
  const { getCartProducts, getCartCount, cartTotalPrice } = useCart();
  getData();
  if (getCartCount() > 0) {
    const products = getCartProducts();
    const productIds = Object.keys(products);

    return (
      <div className="container-fluid cart-page">
        <div className="row mt-sm-3 h-100">
          <div className="col-md-7 pb-5 px-sm-5 pt-4 h-100">
            <h1 className="display-5 heading mb-4 mb-5">Cart</h1>

            <div className="table-responsive" id="cartWrap">
              <table className="table table-borderless table-hover" id="cart">
                <thead>
                  <tr>
                    {tableHeaders.map((th, key) => (
                      <th key={key} className="pb-3">
                        {th}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="table-group-divider border-top border-2 border-dark align-middle">
                  {productIds.map((productId) => (
                    <ProductItem productId={productId} key={productId} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div
            className="col-md-4 offset-md-1 px-0 d-flex flex-column justify-content-between"
            style={{ backgroundColor: "var(--light-purple)" }}
          >
            <div id="cartSummary" className="my-md-5 my-4 px-5">
              <table className="table table-borderless">
                <caption className="text-black h4 text-uppercase underlined d-inline-block">
                  Cart Summary
                </caption>
                <tbody>
                  <tr>
                    <td className="py-3">Subtotal</td>
                    <td className="py-3">
                      <NairaSign />
                      {cartTotalPrice.toLocaleString()}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3">Shipping</td>
                    <td className="text-success py-3">Free</td>
                  </tr>
                </tbody>
                <tfoot className="font-weight-600 border-top border-secondary">
                  <tr>
                    <td className="py-3">Total</td>
                    <td className="py-3">
                      <NairaSign />
                      {cartTotalPrice.toLocaleString()}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
            <div id="checkoutButton">
              <Button href="/checkout" color="purple">
                <i className="fa-solid fa-bag-shopping me-2"></i>Checkout
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div
        className="container-fluid py-4 cart-page d-flex flex-column justify-content-center align-items-center position-relative text-center"
        id="cartNotFound"
        style={{ zIndex: 1 }}
      >
        <img src={EmptyCart} alt="Empty cart icon" />
        <h1 className="h2 font-weight-600 heading mt-5 mb-4">Cart is empty</h1>
        <div>
          <Button color="purple">Start shopping</Button>
        </div>
      </div>
    );
  }
};

export default Cart;
