import { useState } from "react";
import { usePaystackPayment } from "react-paystack";

import States from "../Assets/lgas.json";

import CartNotFound from "../Components/CartNotFound";

import CartSummary from "../Components/CartSummary";
import Button from "../Components/Button";

import {
  formControlClass,
  validateFormInput,
  InvalidError,
} from "../Hooks/form";

import { useCart } from "../Contexts/CartContext";

import "../Assets/css/checkout.css";
import CheckedOut from "../Assets/icons/order-confirmed.svg";
import { useEffect } from "react";

const states = Array.from(States);

const StatesSelect = () => {
  return states.map((state, key) => (
    <option value={key} key={key}>
      {state.state}
    </option>
  ));
};

const Checkout = () => {
  const notice = [
    {
      icon: "fa-regular fa-credit-card",
      title: "Your card is safe with us",
      description:
        "This is because we never save your card details after your purchases.",
    },
    {
      icon: "fa-solid fa-truck",
      title: "Delivery date",
      description:
        "We'll deliver your order within 3 to 5 business days for locations within Nigeria.",
    },
  ];

  const key = "pk_test_e0b27da629bee90a917524323ed38e59436cdf5f";

  const { getCartCount, emptyCart, cartTotalPrice } = useCart();
  const [checkedOut, setCheckedOut] = useState(false);
  const [validEmailAddress, setValidEmailAddress] = useState(true);
  const [email, setEmail] = useState(null);
  const [currentState, setCurrentState] = useState(0);

  var hasItemInCart = getCartCount() !== 0;

  const CitySelect = () => {
    return states[currentState].lgas.map((lga, key) => (
      <option value={key} key={key}>
        {lga}
      </option>
    ));
  };

  useEffect(() => {});

  if (hasItemInCart) {
    /**
     * Checkout
     * @param {Event} e
     */
    function handleCheckout(e) {
      e.preventDefault();
      if (!e.target.checkValidity()) return;
      document.getElementById("paystackButton").click();
    }

    const PaystackHook = () => {
      const config = {
        reference: new Date().getTime().toString(),
        email: email,
        amount: cartTotalPrice * 100,
        publicKey: key,
      };

      const onSuccess = (ref) => {
        // console.log(ref);
        emptyCart();
        setCheckedOut(true);
      };

      const onClose = () => {};

      const initialise = usePaystackPayment(config);
      return (
        <div>
          <button
            type="button"
            onClick={() => {
              initialise(onSuccess, onClose);
            }}
            id="paystackButton"
            className="invisible"
          >
            Continue payment
          </button>
        </div>
      );
    };

    return (
      <div className="bg-light py-4">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-8">
              <form
                action=""
                method="post"
                id="checkout"
                onSubmit={handleCheckout}
              >
                <fieldset className="p-5 card border-light p-5 mb-4">
                  <h1 className="d-inline-block h4 text-black mb-5 text-uppercase underlined">
                    Shipping
                  </h1>

                  <div className="form-group mb-4">
                    <div className="row">
                      <div className="col-md-6 mb-2 mb-md-0">
                        <label htmlFor="name" className="mb-0 text-secondary">
                          Full name
                        </label>
                        <input
                          type="text"
                          className={formControlClass}
                          name="name"
                          id="name"
                          required
                        />
                      </div>

                      <div className="col-md-6">
                        <label htmlFor="email" className="mb-0 text-secondary">
                          Email address
                        </label>
                        <input
                          type="email"
                          className={`${formControlClass} ${
                            validEmailAddress || "is-invalid"
                          }`}
                          name="email"
                          id="email"
                          required
                          onInput={(e) => {
                            validateFormInput(e, setValidEmailAddress);
                            setEmail(e.target.value);
                          }}
                          onBlur={(e) => {
                            validateFormInput(e, setValidEmailAddress);
                          }}
                          onFocus={(e) => {
                            validateFormInput(e, setValidEmailAddress);
                          }}
                        />
                        <InvalidError
                          valid={validEmailAddress}
                          error="Invalid email address"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-group mb-4">
                    <div className="row">
                      <div className="col-md-6 mb-2 mb-md-0">
                        <label htmlFor="state" className="mb-0 text-secondary">
                          State
                        </label>
                        <select
                          className={`${formControlClass} form-select`}
                          name="state"
                          id="state"
                          required
                          onChange={(e) => {
                            setCurrentState(e.target.value);
                          }}
                        >
                          <StatesSelect />
                        </select>
                      </div>

                      <div className="col-md-6">
                        <label htmlFor="city" className="mb-0 text-secondary">
                          City
                        </label>
                        <select
                          className={`${formControlClass} form-select`}
                          name="city"
                          id="city"
                          required
                        >
                          <CitySelect />
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="form-group mb-4">
                    <div className="row">
                      <div className="col">
                        <label
                          htmlFor="address"
                          className="mb-0 text-secondary"
                        >
                          Street Address
                        </label>
                        <p className="small text-black-50 mb-0">
                          We'll deliver to this exact address
                        </p>
                        <input
                          type="text"
                          className={formControlClass}
                          name="address"
                          id="address"
                          placeholder="House number, (Apartment) (Estate name) Street name"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </fieldset>

                <fieldset className="text-center ">
                  <Button size="lg" type="submit">
                    Make Payment
                  </Button>

                  <PaystackHook />
                </fieldset>
              </form>
            </div>

            <div className="col-md-4">
              <div className="card bg-yellow border-light p-5">
                <CartSummary />
              </div>

              <div className="card bg-secondary border-secondary px-4 py-5 mt-5">
                <div className="list-group list-group-flush">
                  {notice.map(function (note, key) {
                    return (
                      <div
                        className="list-group-item d-flex align-items-start border-0 text-white bg-transparent"
                        key={key}
                      >
                        <div>
                          <i className={note.icon}></i>
                        </div>
                        <div className="ms-3">
                          <div className="fw-bold">{note.title}</div>
                          {note.description}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else if (checkedOut) {
    return (
      <div
        className="bg-light container-fluid py-5 cart-page d-flex flex-column justify-content-center align-items-center position-relative text-center"
        id="checkedOut"
        style={{ zIndex: 1 }}
      >
        <img
          src={CheckedOut}
          alt="Order placed icon"
          style={{ width: "16rem" }}
        />
        <h1 className="h2 fw-bold heading mt-5 mb-4 text-medium-green">
          Your order is on its way
        </h1>
        <p className="text-secondary">Check your email for a message from us</p>
      </div>
    );
  } else return <CartNotFound />;
};

export default Checkout;
