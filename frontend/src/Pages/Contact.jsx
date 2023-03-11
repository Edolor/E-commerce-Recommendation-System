import "../Assets/css/contact.css";
import Button from "../Components/Button";

const Contact = () => {
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
  function handleFormSubmit(e) {
    e.preventDefault();
  }

  return (
    <section id="contact">
      <div className="container-fluid">
        <div className="row overflow-hidden">
          <div
            className="col-sm-7 px-5 pb-5 pt-1 text-white"
            style={{ backgroundColor: "var(--dark-blue)" }}
          >
            <div className="px-3">
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
                        className="bg-transparent border-end-0 border-start-0 border-top-0 form-control form-control-lg ps-0 rounded-0 shadow-none text-white"
                        required
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
                        id="contactEmail"
                        className="bg-transparent border-end-0 border-start-0 border-top-0 form-control form-control-lg ps-0 rounded-0 shadow-none text-white"
                        required
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
                        className="bg-transparent border-end-0 border-start-0 border-top-0 form-control form-control-lg ps-0 rounded-0 shadow-none text-white"
                        required
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
                        className="bg-transparent border-end-0 border-start-0 border-top-0 form-control form-control-lg ps-0 rounded-0 shadow-none text-white"
                        rows={3}
                        style={{ resize: "none" }}
                        required
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

          <div className="col-sm-5 p-5 bg-light flex-column d-flex pt-5 pb-3">
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
