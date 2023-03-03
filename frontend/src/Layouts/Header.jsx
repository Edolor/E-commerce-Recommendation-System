import { Link } from "react-router-dom";
import Button from "../Components/Button";
import Logo from "../Components/Logo";

// import { useCart } from "../../Contexts/CartContext";

const Header = () => {
  // move to top-level context
  const pages = [
    { title: "home", active: false },
    { title: "about", active: false },
    { title: "shop", active: false },
    { title: "contact", active: false },
  ];

  // move to top-level context
  const socials = [
    { title: "Facebook", icon: "fa-brands fa-facebook", url: "" },
    { title: "Twitter", icon: "fa-brands fa-twitter", url: "" },
    { title: "Instagram", icon: "fa-brands fa-instagram", url: "" },
  ];

  const NavItem = ({ title, active }) => {
    let classes = "nav-link text-uppercase font-weight-500 px-4";
    if (active === true) classes += " active";

    // aria-current for active
    return (
      <li className="nav-item">
        <Link className={classes} to={title.replaceAll(" ", "-")}>
          {title}
        </Link>
      </li>
    );
  };

  return (
    <header id="header" className="fixed-top">
      <div id="topHeader" className="bg-white">
        <div className="align-items-center border-bottom border-light container d-flex justify-content-between py-2">
          <ul id="headerSocials" className="list-inline mb-0">
            {socials.map((social, key) => (
              <li key={key} className="list-inline-item">
                <a href={social.url} className="p-2 ease-1 text-secondary">
                  <i className={social.icon} title={social.title}></i>
                </a>
              </li>
            ))}
          </ul>

          <div id="headerBrand" className="brand h3 mb-0">
            <Logo />
          </div>

          <ul className="list-inline mb-0">
            <li className="list-inline-item">
              <Button>
                <span className="sr-only">Search</span>
                <i className="fa-solid fa-magnifying-glass"></i>
              </Button>
            </li>
            <li className="list-inline-item">
              <Button>
                <span className="sr-only">Cart</span>
                <i className="fa-solid fa-cart-shopping"></i>
              </Button>
            </li>
          </ul>
        </div>
      </div>

      <nav className="navbar navbar-expand-lg shadow-sm py-2 bg-white">
        <div className="container align-items-center justify-content-end">
          <button
            className="navbar-toggler border-0 ease-1 py-2"
            type="button"
            data-bd-toggler="collapse"
            data-bs-target="#navbarMenu"
            aria-controls="navbarMenu"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <div className="navbar-toggle-icon"></div>
            <div className="navbar-toggle-icon"></div>
            <div className="navbar-toggle-icon"></div>
          </button>

          <div
            className="collapse navbar-collapse justify-content-center"
            id="navbarMenu"
          >
            <ul className="navbar-nav">
              {pages.map((item, key) => (
                <NavItem {...item} key={key} />
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
