import EmptyCart from "../Assets/icons/empty-cart.svg";
import Button from "./Button";

const CartNotFound = () => {
  return (
    <div
      className="container-fluid py-4 cart-page d-flex flex-column justify-content-center align-items-center position-relative text-center"
      id="cartNotFound"
      style={{ zIndex: 1 }}
    >
      <img src={EmptyCart} alt="Empty cart icon" />
      <h1 className="h2 fw-bold heading mt-5 mb-4">Cart is empty</h1>
      <div>
        <Button color="purple" href="/shop">
          Start shopping
        </Button>
      </div>
    </div>
  );
};

export default CartNotFound;
