import { useState } from "react";
import { Link } from "react-router-dom";
import { useProduct } from "../../Contexts/CartContext";
import "./_product.scss";
import shoppingBag from "../../Assets/images/shopping_bag.svg";
import image from "../../Assets/images/product.jpg";
import plus from "../../Assets/images/plus.svg";
import minus from "../../Assets/images/minus.svg";

function Discount( {percentage, formerPrice} ) {
    return (
        <div className="product__discount body-copy--smallest">
            <span className="percentage">Save {percentage}</span>
            <span className="line">&nbsp;</span>
            <span className="price">Was ₦{formerPrice}</span>
        </div>
    );
}

const { addToCart, cartProducts } = useCart();

function cartReducer(cartItems, action) {
    switch (action.type) {
        case "add":
            if (action.product) {
                addToCart(action.product);
            }

            return cartProducts;
        case "reduce":

        case "increase":

        default:
            throw Error(`Unknown action: ${action.type}`);
    }
}

function Product({ product }) {

    const [counter, setCounter] = useState(1);

    const [cartItems, dispatch] = useReducer(
        cartReducer,
        cartProducts
    );

    function handleAddProduct(product) {
        /** Add a product to cart */
        dispatch({
            type: "add",
            counter: 0,
            product: product
        })
    }

    function handleReduceProductCount(id) {
        /** Decreases product count in cart */
        if (counter > 1) {
            setCounter(counter => counter - 1);
        } else {
            // Make product disappear from user interface
        }

        dispatch({
            type: "reduce",
            value: counter,
        })
    }
    
    function handleIncreaseProductCount(id) {
        /** Increase product count in cart */
        setCounter(counter => counter + 1);

        dispatch({
            type: "increase",
            value: counter
        })
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

            {/* {
                product.discount && <Discount percentage={product.discountPercentage} formerPrice={product.formerPrice}/>
            } */}

            <button className="product__button">
                <img src={shoppingBag} alt="Shopping bag icon" />
                <span>ADD TO CART</span>
            </button>

            <div className="mt-3">
                <button type="button" className="bg-primary">
                    <img src={minus} alt="Minus icon" />
                </button>

                <div>0</div>

                <button type="button" className="bg-primary">
                    <img src={plus} alt="Plus icon" />
                </button>
            </div>
        </div>
    );
}

export default Product;