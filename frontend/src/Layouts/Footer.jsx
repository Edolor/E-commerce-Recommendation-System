import Logo from "../Components/Logo";

function Footer() {
  const payments = ["visa", "stripe", "mastercard", "paypal"];

  const PaymentCard = ({ card }) => {
    let classes = `fa-brands fa-cc-${card}`;
    return (
      <li className="list-inline-item px-2" title={card}>
        <i className={classes}></i>
      </li>
    );
  };

  return (
    <footer id="footer" className="">
      <div id="topFooter" className="py-4 bg-dark">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center">
            <div className="brand mb-0 h4 text-white" id="footerBrand">
              <Logo />
            </div>
            <ul
              className="list-inline text-secondary h4 mb-0"
              id="footerPayments"
              aria-label="Supported payments"
            >
              {payments.map((card, key) => (
                <PaymentCard card={card} key={key}></PaymentCard>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div id="bottomFooter" className="py-2 bg-secondary">
        <div className="container small text-center text-white-50">
          &copy; 2023 All rights reserved
        </div>
      </div>
    </footer>
  );
}

export default Footer;
