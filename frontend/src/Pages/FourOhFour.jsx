import "./../Assets/css/404.css";
import { Link } from "react-router-dom";

const FourOhFour = () => {
  return (
    <section
      id="F0F"
      className="py-5 position-relative overflow-hidden bg-yellow"
    >
      <div
        className="position-absolute bg-white py-md-5 py-3 text-center ease-1"
        id="F0FTitle"
      >
        <h1 className="display-1 font-weight-900 text-black mt-4">404</h1>
      </div>
      <div className="container py-5">
        <div className="row justify-content-end pt-5">
          <div className="col-md-5 col-9 col-sm-7 pt-md-5">
            <h2 className="h1 heading mb-4">You must have gotten lost.</h2>
            <p className="lead">
              The page you're looking for doesn't exist. That's fine; you can
              always{" "}
              <Link
                to="/home"
                className="text-reset text-decoration-underline font-weight-600"
              >
                go back Home
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FourOhFour;
