import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link className="navbar-brand" to="/">
      <span class="text-uppercase font-weight-500">Edolor</span>
    </Link>
  );
};

export default Logo;
