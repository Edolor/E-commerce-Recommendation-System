import { useState } from "react";
import "../Assets/css/contact.css";
import Button from "../Components/Button";

import {
  formControlClass,
  validateFormInput,
  InvalidError,
  getFormData,
} from "../Hooks/form";

import SubmittedForm from "../Assets/icons/contact.svg";

import { _post } from "../Hooks/fetch";
import Loader from "../Components/Loader";

const Contact = () => {
  const [submittedForm, setSubmittedForm] = useState(false);
  const [submittingForm, setSubmittingForm] = useState(false);

  const [validEmailAddress, setValidEmailAddress] = useState(false);
  const [validPhoneNumber, setValidPhoneNumber] = useState(false);
  const [formData, setFormData] = useState(new FormData());

  const contacts = [
    {
      type: "email",
      icon: "envelope",
      value: "info@edolor.com",
      href: "mailto",
    },
    { type: "phone", icon: "phone", value: "+234 906 187 8334", href: "tel" },
  ];

  const socials = [
    { title: "Facebook", icon: "fa-brands fa-facebook", url: "" },
    { title: "Twitter", icon: "fa-brands fa-twitter", url: "" },
    { title: "Instagram", icon: "fa-brands fa-instagram", url: "" },
  ];

  /**
   * Handle submit event for contact form
   * @param {Event} e
   */
  async function handleFormSubmit(e) {
    e.preventDefault();
    // if form is not valid return
    if (!e.target.checkValidity()) return;

    setSubmittingForm(true);

    async function submit() {
      const res = await _post("contact/create-message/", getFormData(formData));
      setSubmittingForm(false);
      if (res) setSubmittedForm(true);
    }

    setTimeout(() => {
      submit();
    }, 3000);
  }

  /**
   *
   * @param {Event} e
   */
  function handleChange(e) {
    const { name, value } = e.target;
    const updatedFormData = formData;
    updatedFormData.set(name, value);
    setFormData(updatedFormData);
  }

  return submittedForm ? (
    <div className="container py-5" id="submittedForm">
      <div className="row py-md-5 py-4">
        <div className="col-md-5">
          <img
            src={SubmittedForm}
            alt="Order placed icon"
            style={{ width: "16rem" }}
            className="w-100"
          />
        </div>
        <div className="col-md-5 offset-md-2">
          <h1 className="display-5 fw-bold heading mt-5 mb-4 text-blue">
            Thank you for reaching out
          </h1>
          <p className="text-secondary">
            Check your email for a message from us
          </p>
        </div>
      </div>
    </div>
  ) : (
    <section id="contact">
      <div className="container-fluid">
        <div className="row overflow-hidden">
          <div
            className={`h-100 align-items-center col-sm-7 justify-content-center pb-5 pt-1 px-5 ${
              submittingForm ? "" : "d-none"
            }`}
          >
            <Loader />
          </div>
          <div
            className={`col-sm-7 px-5 pb-5 pt-1 text-white ${
              submittingForm ? "d-none" : ""
            }`}
            style={{ backgroundColor: "var(--dark-blue)" }}
          >
            <div className={`px-3 ${submittedForm ? "d-none" : ""}`}>
              <h1
                className="display-4 pt-4 position-relative font-weight-500 d-inline-block heading mb-3"
                id="contactTitle"
              >
                Get in touch
              </h1>

              <p className="lead">
                Ask a question, or say hi and we'll get back to you soon.
              </p>

              <form
                id="contactForm"
                className="mt-5"
                onSubmit={handleFormSubmit}
              >
                <div className="form-group mb-5">
                  <div className="row">
                    <div className="col-12">
                      <label
                        htmlFor="contactName"
                        className="form-label text-white-50"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        id="contactName"
                        name="name"
                        className={`${formControlClass} text-white`}
                        required
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="form-group mb-5">
                  <div className="row">
                    <div className="col-sm-6 mb-2 mb-md-0">
                      <label
                        htmlFor="contactEmail"
                        className="form-label text-white-50"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="contactEmail"
                        className={`${formControlClass} text-white`}
                        required
                        onBlur={(e) => {
                          validateFormInput(e, setValidEmailAddress);
                        }}
                        onFocus={(e) => {
                          validateFormInput(e, setValidEmailAddress);
                        }}
                        onChange={handleChange}
                      />
                      <InvalidError
                        valid={validEmailAddress}
                        error="Invalid email address"
                      />
                    </div>

                    <div className="col-sm-6 mb-2 mb-md-0">
                      <label
                        htmlFor="contactPhone"
                        className="form-label text-white-50"
                      >
                        Phone
                      </label>
                      <input
                        type="tel"
                        id="contactPhone"
                        className={`${formControlClass} text-white`}
                        name="phone"
                        required
                        onInput={(e) => {
                          validateFormInput(e, setValidPhoneNumber);
                        }}
                        pattern="[\+0-9\- ]{7,16}"
                        onChange={handleChange}
                      />
                      <InvalidError
                        valid={validPhoneNumber}
                        error="Invalid phone number"
                      />
                    </div>
                  </div>
                </div>

                <div className="form-group mb-5">
                  <div className="row">
                    <div className="col-12">
                      <label
                        htmlFor="contactMessage"
                        className="form-label text-white-50"
                      >
                        Message
                      </label>
                      <textarea
                        id="contactMessage"
                        name="message"
                        className={`${formControlClass} text-white`}
                        rows={3}
                        style={{ resize: "none" }}
                        required
                        onChange={handleChange}
                      ></textarea>
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <div className="row">
                    <div className="col-12 d-flex justify-content-end">
                      <Button
                        type="submit"
                        color="yellow"
                        outline={true}
                        size="lg"
                      >
                        Submit
                      </Button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>

          <div className="col-sm-5 p-5 bg-light flex-column d-flex py-5">
            <div className="pt-5">
              <h2 className="h4 text-uppercase underlined d-inline-block mt-4">
                Contact Information
              </h2>

              <ul
                className="mt-3 list-unstyled text-secondary"
                id="contactList"
              >
                {contacts.map((contact, key) => (
                  <li className="py-3" key={key}>
                    <i
                      className={`fa-solid fa-${contact.icon} me-3 text-yellow`}
                    ></i>
                    <a
                      href={`${contact.href}:${contact.value.replace(" ", "")}`}
                      className="text-decoration-hover text-reset"
                      aria-label={`Our ${contact.type}`}
                    >
                      {contact.value}
                    </a>
                  </li>
                ))}
              </ul>

              <ul className="list-inline mb-0 d-flex justify-content-center border-top pt-3">
                {socials.map((social, key) => (
                  <li key={key} className="list-inline-item mx-3">
                    <a href={social.url} className="p-2 ease-1 text-yellow">
                      <i className={social.icon} title={social.title}></i>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
