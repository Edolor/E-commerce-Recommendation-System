import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link className="navbar-brand" to="/">
      <span className="text-uppercase font-weight-500">The Bazaar</span>
    </Link>
  );
};

export default Logo;
