import "./_footer.scss";
import logo from "../../Assets/images/full_logo.jpg";
import call from "../../Assets/images/call_icon.svg";
import { ArrowButton } from "../../Components/Button/Button";
import { Link } from  "react-router-dom";


function Footer(props) {

    return (
        <footer className="footer">
            <div className="width-wrapper">
                <div className="footer__wrapper">
                    <div className="footer__left">
                        <Link to="/">
                            <figure className="footer__image">
                                <img src={logo} alt="Allway full logo" />

                                <figcaption className="hide">Allyway full logo</figcaption>
                            </figure>
                        </Link>

                        <p className="body-copy--big color-white">©2022, THE ALLWAY LLC</p>
                    </div>

                    <nav className="footer__right">
                        <div className="footer__container">
                            <h3 className="footer__heading">Navigation</h3>

                            <ul className="footer__list list-s-none">
                                <li className="footer__item"><Link to="/" className="footer__link">Home</Link></li>
                                <li className="footer__item"><Link to="/about" className="footer__link">About Us</Link></li>
                                <li className="footer__item"><Link to="/shop" className="footer__link">Shop</Link></li>
                                <li className="footer__item"><Link to="/contact" className="footer__link">Contact Us</Link></li>
                            </ul>
                        </div>

                        <div className="footer__container">
                            <h3 className="footer__heading">Follow Us</h3>

                            <ul className="footer__list list-s-none">
                                <li className="footer__item"><a href="javacript:void(0)" className="footer__link">Twitter</a></li>
                                <li className="footer__item"><a href="javacript:void(0)" className="footer__link">Instagram</a></li>
                                <li className="footer__item"><a href="javacript:void(0)" className="footer__link">Facebook</a></li>
                            </ul>
                        </div>

                        <div className="footer__container">
                            <h3 className="footer__heading">Call or Email Us</h3>

                            <ul className="footer__list list-s-none">
                                <li className="footer__item"><a href="/" className="footer__link">Deeallyway@gmail.com</a></li>
                                <li className="footer__item">
                                    <a href="/about" className="footer__link">
                                        <img src={call} alt="Call icon" />
                                        <span>08139743121</span>
                                    </a>
                                </li>

                                <li className="footer__item margin-top-4">
                                    <ArrowButton link="/shop" text="Shop Now" addon="body-copy--largerr" />
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>
            </div>
        </footer>
    );
}

export default Footer;