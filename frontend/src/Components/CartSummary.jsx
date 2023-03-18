import NairaSign from "./NairaSign";
import { useCart } from "../Contexts/CartContext";

const CartSummary = () => {
  const { cartTotalPrice } = useCart();
  return (
    <table className="table table-borderless mb-0">
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
      <tfoot className="fw-bold border-top border-secondary">
        <tr>
          <td className="py-3">Total</td>
          <td className="py-3">
            <NairaSign />
            {cartTotalPrice.toLocaleString()}
          </td>
        </tr>
      </tfoot>
    </table>
  );
};

export default CartSummary;
