import NairaSign from "./NairaSign";

const ProductPrice = ({ product }) => {
  return (
    <div className="align-items-center d-flex flex-wrap mb-0 text-black">
      <NairaSign />
      {product.currentPrice.toLocaleString()}
      {!!product.formerPrice ? (
        <del className="text-muted ms-1 small" style={{ fontSize: "75%" }}>
          <NairaSign />
          {product.formerPrice.toLocaleString()}
        </del>
      ) : (
        ""
      )}
    </div>
  );
};

export default ProductPrice;
