import { Link } from "react-router-dom";

const Button = (props) => {
  let classes = "btn position-relative ease-1 text-uppercase rounded-";

  if (props.rounded) classes += props.rounded;
  else classes += "0";
  if (props.color) {
    if (props.outline === true) classes += ` btn-outline-${props.color}`;
    else classes += ` btn-${props.color}`;
  }

  if (props.line) classes += " btn-line";

  if (props.size) classes += ` btn-${props.size}`;

  if (props.href) {
    return (
      <Link to={props.href} className={classes}>
        {props.children}
      </Link>
    );
  } else {
    return (
      <button
        type={props.type || "button"}
        className={classes}
        disabled={props.disabled || false}
        onClick={props.onclick}
      >
        {props.children}
      </button>
    );
  }
};

export default Button;
