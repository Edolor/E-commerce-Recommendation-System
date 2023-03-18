import { useState, useEffect } from "react";

import Loader from "../Components/Loader";
import Button from "../Components/Button";
import Product from "../Components/Product";
import {
  formControlClass,
  InvalidError,
  validateFormInput,
} from "../Hooks/form";

import "../Assets/css/home.css";

import { _get, _post } from "../Hooks/fetch";

const features = [
  {
    title: "Free delivery",
    text: "On all purchases above N25,000",
    icon: "fa-truck-ramp-box",
  },

  {
    title: "14 days return",
    text: "For unsatisfactory goods",
    icon: "fa-money-bill-transfer",
  },

  {
    title: "Secure payment",
    text: "Your card details are safe with us",
    icon: "fa-vault",
  },

  {
    title: "24/7 Support",
    text: "Around-the-clock customer-service",
    icon: "fa-headset",
  },
];

const FeatureItem = ({ title, text, icon }) => {
  let classes = `fa-solid h4 mb-0 ${icon}`;
  return (
    <div className="col-md-6">
      <div className="my-3 d-flex align-items-start">
        <i className={classes}></i>
        <div className="ms-3">
          <div className="h6 mb-1 font-weight-700 text-uppercase">{title}</div>
          <div className="">{text}</div>
        </div>
      </div>
    </div>
  );
};

const steps = [
  {
    title: "Explore & Shop",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates quia et doloremque alias id aperiam.",
  },
  {
    title: "Add to Cart",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates quia et doloremque alias id aperiam.",
  },
  {
    title: "Checkout",
    text: "Confirm your order, make payments and we'll deliver your items to you.",
  },
];

// should fetch from somewhere
const windowCards = [
  {
    font: "display-5",
    title: "Home Workout Equipment",
    cta: {
      url: "/products/category/gym",
      title: "Find products",
    },
    color: "var(--dark-blue)",
  },
  {
    font: "h3",
    title: "Save up to 70% off",
    subtitle: "Kitchen appliances",
    cta: {
      url: "/products/category/kitchen-appliances",
      title: "Start shopping",
    },
    color: "#808274",
  },
];

const WindowCard = ({ card }) => {
  return (
    <div
      className="window-card shop-card d-flex position-relative flex-column p-5 justify-content-between text-white"
      style={{ backgroundColor: card.color }}
    >
      <div className="p-3">
        {card.subtitle ? (
          <div className="h6 mb-4 text-uppercase underlined d-inline-block">
            {card.subtitle}
          </div>
        ) : (
          ""
        )}
        <div className={`${card.font} heading text-uppercase mb-5`}>
          {card.title}
        </div>
        <Button href={card.cta.url} line={true}>
          {card.cta.title}
        </Button>
      </div>
    </div>
  );
};

const Home = () => {
  const [loadedProducts, setLoadedProducts] = useState(false);
  const [products, setProducts] = useState([]);
  const [submittedForm, setSubmittedForm] = useState(false);
  const [submittingForm, setSubmittingForm] = useState(false);
  const [validEmailAddress, setValidEmailAddress] = useState(false);

  async function getProducts() {
    const data = await _get("products/list/?size=3");
    console.log(data);
    if (!data) return;
    setLoadedProducts(true);
    setProducts(data.results);
  }

  useEffect(() => {
    getProducts();
  }, []);

  const ProductList = () => {
    return products.map((product, key) => (
      <div className="col-md-4" key={key}>
        <Product product={product} />
      </div>
    ));
  };

  /**
   * Handle submission of newsletter
   * @param {Event} e
   */
  async function handleSubmit(e) {
    e.preventDefault();

    // if form is not valid return
    if (!e.target.checkValidity()) return;

    setSubmittingForm(true);

    async function submit() {
      const res = await _post("contact/join-newsletter/", {
        email: document.getElementById("email").value,
      });
      console.log(res);
      setSubmittingForm(false);
      if (res && res.success) setSubmittedForm(true);
    }

    setTimeout(() => {
      submit();
    }, 3000);
  }

  return (
    <>
      <section id="hero" className="align-items-center d-flex py-5">
        <div className="container py-2">
          <div className="row">
            <div className="col-md-6 offset-md-6">
              <h1 className="h6 text-uppercase underlined d-inline-block">
                Personalised Shopping Experience
              </h1>
              <h2 className="my-4 display-6 heading">
                Shopping <span className="fw-bold">Simplified</span>
              </h2>
              <p className="lead mb-4">
                We've made it easier for you to find what you need, all in one
                place, at no additional cost
              </p>

              <Button size="lg" color="dark">
                Start shopping
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section
        id="features"
        style={{
          /*backgroundColor: "#bdc9bb",*/ backgroundColor: "var(--light-blue)",
        }}
        className="py-5"
      >
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-7">
              <h1 className="display-6 heading text-black font-weight-500 mb-4">
                How we work
              </h1>
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Esse
                eligendi aut ea expedita incidunt corporis maxime ipsa voluptas?
                Repellendus animi asperiores debitis nam at magnam aut omnis
                officiis, quas ea!
              </p>

              <div className="row mt-4">
                {features.map((feature, key) => (
                  <FeatureItem key={key} {...feature} />
                ))}
              </div>

              <div className="row"></div>
            </div>

            <div className="col-md-3 offset-md-2">
              <ul className="list-unstyled mb-0" id="features">
                {steps.map((step, key) => (
                  <li key={key} className="my-3 position-relative px-3">
                    <div className="d-flex align-items-center">
                      <div className="feature-circle rounded-circle bg-dark"></div>
                      <div className="h6 text-black mb-0 ms-3 font-weight-800 text-uppercase">
                        {step.title}
                      </div>
                    </div>
                    <div className="border-2 border-start border-dark ps-3 mt-2">
                      <div className="small">{step.text}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="products" className="py-5">
        <div className="container">
          <h1 className="h4 text-uppercase underlined d-inline-block">
            Popular Products
          </h1>

          <div className="row mt-5 mx-0 align-items-center">
            <div className="col-sm-11 px-0">
              <div className="row mt-5">
                {loadedProducts ? <ProductList /> : <Loader />}
              </div>
            </div>
            <div className="col-sm-1 pe-sm-0">
              <div id="productsViewMore">
                <Button href="/shop" size="lg" outline={true} line={true}>
                  See More Products
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="windows" className="py-5">
        <div className="container-fluid">
          <div id="windowsWrapper">
            <div id="windowsRow">
              {windowCards.map((card, key) => (
                <WindowCard key={key} card={card} />
              ))}

              <div
                className="window-card d-flex position-relative flex-column p-5 justify-content-between text-white overflow-hidden"
                style={{ backgroundColor: "#c79a96" }}
              >
                <div className="h5 text-uppercase">
                  See what <div className="h1 my-1">Customers</div> are saying
                </div>

                <div>
                  <Button href="/about/testimonials" line={true}>
                    Testimonials
                  </Button>
                </div>

                <div
                  id="testimonialsCardIcon"
                  className="position-absolute opacity-50"
                  style={{ color: "#e1dcd9" }}
                >
                  <i className="fa-solid fa-comments"></i>
                </div>
              </div>

              <div
                className="window-card d-flex position-relative flex-column p-5 justify-content-between"
                style={{ backgroundColor: "#e1dcd9" }}
              >
                <div>
                  <div
                    className="font-weight-800 h2 heading mb-4 text-uppercase"
                    style={{ color: "var(--dark-pink)" }}
                  >
                    25% off on your first purchase
                  </div>
                  <p>
                    Subscribe to our newsletter and stand the chance to win
                    amazing prices for free.
                  </p>
                </div>
                {submittedForm ? (
                  <div className="mb-0 px-4 py-3 text-white">
                    <i className="fa-solid fa-check me-3"></i>Thank you for
                    joining
                  </div>
                ) : (
                  <form
                    method="post"
                    id="newsletterForm"
                    className="mb-0 mt-3"
                    onSubmit={handleSubmit}
                  >
                    <div className="border-0 input-group input-group-lg">
                      <input
                        type="email"
                        id="email"
                        className={formControlClass}
                        aria-label="Enter your email address"
                        placeholder="me@mail.com"
                        onBlur={(e) => {
                          validateFormInput(e, setValidEmailAddress);
                        }}
                        onFocus={(e) => {
                          validateFormInput(e, setValidEmailAddress);
                        }}
                        onChange={(e) => {
                          validateFormInput(e, setValidEmailAddress);
                        }}
                        style={{ borderColor: "#000" }}
                      />
                      <Button type="submit" color="dark">
                        Subscribe
                      </Button>
                    </div>
                    <InvalidError
                      valid={validEmailAddress}
                      error="Invalid email address"
                    />
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
