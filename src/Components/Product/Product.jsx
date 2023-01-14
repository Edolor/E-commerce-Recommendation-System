import "./_product.scss";
import shoppingBag from "../../Assets/images/shopping_bag.svg";
import image from "../../Assets/images/product.jpg";
import { Link } from "react-router-dom";

function Discount( {percentage, formerPrice} ) {
    return (
        <div className="product__discount body-copy--smallest">
            <span className="percentage">Save {percentage}</span>
            <span className="line">&nbsp;</span>
            <span className="price">Was ₦{formerPrice}</span>
        </div>
    );
}

function Product(props) {
    return (
        <div className="product body-copy">
            <Link to={`/product/${props.id}`}>
                <figure className="product__image margin-bottom-2">
                    <img src={image} alt={props.altText} className="image" />
                    <figcaption className="hide">{props.title}</figcaption>
                </figure>
            </Link>

            <h4 className="product__title body-copy--smallest">{props.title}</h4>

            <p className="product__price">₦{props.price}</p>

            {/* {
                props.discount && <Discount percentage={props.discountPercentage} formerPrice={props.formerPrice}/>
            } */}

            <button className="product__button">
                <img src={shoppingBag} alt="Shopping bag icon" />
                <span>ADD TO CART</span>
            </button>
        </div>
    );
}

export default Product;