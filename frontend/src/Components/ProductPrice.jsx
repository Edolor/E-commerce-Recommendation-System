const ProductPrice = ({ product }) => {
  return (
    <div className="align-items-center d-flex flex-wrap mb-0 text-black">
      <i className="fa-solid fa-naira-sign small"></i>
      {product.currentPrice.toLocaleString()}
      {!!product.formerPrice ? (
        <del className="text-muted ms-1 small" style={{ fontSize: "75%" }}>
          {product.formerPrice.toLocaleString()}
        </del>
      ) : (
        ""
      )}
    </div>
  );
};

export default ProductPrice;
