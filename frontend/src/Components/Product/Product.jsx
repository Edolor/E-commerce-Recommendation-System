import { useState, useReducer, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../Contexts/CartContext";
import "./_product.scss";
import shoppingBag from "../../Assets/images/shopping_bag.svg";
import image from "../../Assets/images/product.jpg";
import plus from "../../Assets/images/plus.svg";
import minus from "../../Assets/images/minus.svg";

function Discount({ percentage, formerPrice }) {
  return (
    <div className="product__discount body-copy--smallest">
      <span className="percentage">Save {percentage}</span>
      <span className="line">&nbsp;</span>
      <span className="price">Was ₦{formerPrice}</span>
    </div>
  );
}

function Product({ product }) {
  // return;
  const { cartProducts, setCartProducts, cartReducer } = useCart();
  const localCartProducts = { ...cartProducts };

  // useEffect(() => {
  //     // SET GLOBAL STATE TO UPDATE CART
  //     // setCartProducts(() => localCartProducts);
  // }, [localCartProducts]);

  const [cartItems, dispatch] = useReducer(cartReducer, localCartProducts);

  function handleAddProduct(product) {
    /** Add a product to cart */
    dispatch({
      type: "add",
      product: product,
    });
  }

  function handleReduceProductCount(productId) {
    /** Decreases product count in cart */
    dispatch({
      type: "reduce",
      id: productId,
    });
  }

  function handleIncreaseProductCount(productId) {
    /** Increase product count in cart */
    dispatch({
      type: "increase",
      id: productId,
    });
  }

  return (
    <div className="product body-copy">
      <Link to={`/product/${product.id}`}>
        <figure className="product__image margin-bottom-2">
          <img src={image} alt={product.altText} className="image" />
          <figcaption className="hide">{product.title}</figcaption>
        </figure>
      </Link>

      <h4 className="product__title body-copy--smallest">{product.title}</h4>

      <p className="product__price">₦{product.price}</p>

      <button onClick={handleAddProduct} className="product__button">
        <img src={shoppingBag} alt="Shopping bag icon" />
        <span>ADD TO CART</span>
      </button>

      <div className="mt-3">
        <button
          type="button"
          onClick={handleReduceProductCount}
          className="bg-primary"
        >
          {/* <img src={minus} alt="Minus icon" /> */}
          Minus
        </button>

        <div>0</div>

        <button
          type="button"
          onClick={handleIncreaseProductCount}
          className="bg-primary"
        >
          {/* <img src={plus} alt="Plus icon" /> */}
          Plus
        </button>
      </div>
    </div>
  );
}

export default Product;
