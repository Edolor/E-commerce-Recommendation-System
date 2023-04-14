import { Link } from "react-router-dom";

import ProductPrice from "../Components/ProductPrice";

import { api } from "../Hooks/fetch";

const ProductListItem = ({ product }) => {
  console.log(product);
  return (
    <Link
      to={`/product/${product.id}`}
      className="text-reset text-decoration-none ease"
    >
      <div
        className="d-flex align-items-center"
        aria-labelledby={`${product.id}_Lbl`}
      >
        <div>
          <div className="cart-product-img rounded-3 bg-light border overflow-hidden">
            <img
              src={api + product.images[0].replace("/", "")}
              alt=""
              className="h-100"
            />
          </div>
        </div>
        <div className="cart-product-details ms-3">
          <div
            id={`${product.id}_Lbl`}
            className="h5 font-weight-500 mb-1 text-truncate"
          >
            {product.name || product.title}
          </div>
          <div>
            <ProductPrice product={product} />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductListItem;
