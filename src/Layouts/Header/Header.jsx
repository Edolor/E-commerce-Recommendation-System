import "./_header.scss";
import logo from "../../Assets/images/logo_black.svg";
import cart from "../../Assets/images/shopping_cart.svg";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function Header({pageNo=0}) {
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
                    <a href="/" className="header__logo">
                        <img src={logo} alt="Allyway logo" />
                    </a>

                    <ul key={pageNo} className="header__list">
                        {headerItems}
                    </ul>
                </nav>

                <div className="header__end">
                    <a href="tel:+2348139743122" className="header__call btn__shadow">
                        <span>CALL NOW</span>
                    </a>
                    
                    <button className="header__cart pos-rel">
                        <img src={cart} alt="Cart icon" />
                        <span className="cart__item-qty">1</span>
                    </button>
                </div>
            </div>
        </header>
    );
}

export default Header;