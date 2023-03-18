import { useState } from "react";

import CartNotFound from "../Components/CartNotFound";

import CartSummary from "../Components/CartSummary";
import Button from "../Components/Button";

import {
  formControlClass,
  validateFormInput,
  InvalidError,
  getFormData,
} from "../Hooks/form";

import { useCart } from "../Contexts/CartContext";

import "../Assets/css/checkout.css";
import CheckedOut from "../Assets/icons/order-confirmed.svg";

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

  const { getCartCount, emptyCart } = useCart();
  const [checkedOut, setCheckedOut] = useState(false);
  const [validEmailAddress, setValidEmailAddress] = useState(true);
  const [validCardNumber, setValidCardNumber] = useState(true);
  const [validCVV, setValidCVV] = useState(true);

  var hasItemInCart = getCartCount() !== 0;

  if (hasItemInCart) {
    /**
     * Checkout
     * @param {Event} e
     */
    function handleCheckout(e) {
      e.preventDefault();
      console.log(getFormData(e.target));
      setCheckedOut(true);
      emptyCart();
    }

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
                        ></select>
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
                        ></select>
                      </div>
                    </div>
                  </div>
                </fieldset>

                <fieldset
                  className="p-5 card border-light p-5 mb-4"
                  style={{ backgroundColor: "var(--light-green)" }}
                >
                  <h1 className="d-inline-block h4 text-black mb-5 mb-4 text-uppercase underlined">
                    Payment
                  </h1>

                  <div className="form-group mb-4">
                    <div className="row">
                      <div className="col">
                        <label htmlFor="number" className="mb-0 text-secondary">
                          Card number
                        </label>
                        <input
                          type="text"
                          className={`${formControlClass} ${
                            validCardNumber || "is-invalid"
                          }`}
                          name="number"
                          id="number"
                          pattern="\d{16}"
                          placeholder="XXXX XXXX XXXX XXXX"
                          required
                          maxLength={16}
                          onInput={(e) => {
                            validateFormInput(e, setValidCardNumber);
                          }}
                        />
                        <InvalidError
                          valid={validCardNumber}
                          error="Invalid card number"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-group mb-4">
                    <div className="row">
                      <div className="col-md-6 d-flex flex-column justify-content-between">
                        <label htmlFor="month" className="mb-0 text-secondary">
                          Expiry Date
                        </label>
                        <input
                          type="month"
                          className={formControlClass}
                          name="month"
                          id="month"
                          required
                        />
                      </div>
                      <div className="col-md-6 d-flex flex-column justify-content-between">
                        <label htmlFor="cvv" className="mb-0 text-secondary">
                          CVV
                        </label>
                        <p className="small text-black-50 mb-0">
                          This 3 or 4-digit code is usually found on the back of
                          your card
                        </p>
                        <input
                          type="text"
                          className={`${formControlClass} ${
                            validCVV || "is-invalid"
                          }`}
                          name="cvv"
                          id="cvv"
                          placeholder="XXX"
                          required
                          pattern="\d{3,4}"
                          maxLength={4}
                          onInput={(e) => {
                            validateFormInput(e, setValidCVV);
                          }}
                        />
                        <InvalidError valid={validCVV} error="Invalid CVV" />
                      </div>
                    </div>
                  </div>
                </fieldset>

                <fieldset className="text-center ">
                  <Button size="lg" type="submit">
                    Confirm
                  </Button>
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
