import "./_header.scss";
import cart from "../../Assets/images/shopping_cart.svg";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useCart } from "../../Contexts/CartContext";

function Header({pageNo=0}) {
    // Cart item count
    const { cartCounter } = useCart();

    // HEADER LIST 
    const headerItemData = [
        {
            id: "0",
            name: "home",
            url: "/"
        },
        {
            id: "1",
            name: "about us",
            url: "/about"
        },
        {
            id: "2",
            name: "shop",
            url: "/shop"
        },
        {
            id: "3",
            name: "contact",
            url: "/contact"
        }
    ];  

    pageNo = parseInt(pageNo);

    const headerItems = headerItemData.map((listItem, index) => {
        return (
            <li className={"header__item" + (index === pageNo ? " header__item--active": "")} key={listItem.id}>
                <Link to={listItem.url} className="header__link">{listItem.name.toUpperCase()}</Link>
            </li>
        );
    });

    return (
        <header className="header">
            <div className="header__wrapper width-wrapper">
                <nav className="header__start">
                    <a href="/" style={{"display": "block"}} className="header__logo heading-1 color-black d-block">
                        Logo
                    </a>

                    <ul key={pageNo} className="header__list">
                        {headerItems}
                    </ul>
                </nav>

                <div className="header__end">
                    <a href="#" className="header__call btn__shadow">
                        <span>CALL NOW</span>
                    </a>
                    
                    <button className="header__cart pos-rel">
                        <img src={cart} alt="Cart icon" />

                        { cartCounter &&
                            <span className="cart__item-qty">{cartCounter}</span>
                        }
                    </button>
                </div>
            </div>
        </header>
    );
}

export default Header;