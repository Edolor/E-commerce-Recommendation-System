const DiscountTag = ({ product, long = false }) => {
  if (!product.formerPrice || product.total_quantity === 0) return;

  let discount = Math.round(
    ((product.formerPrice - product.price) / product.formerPrice) * 100
  );

  return (
    <div className="badge product-discount-tag" aria-label="Discount">
      {long ? `${discount}% off` : `-${discount}%`}
    </div>
  );
};

export default DiscountTag;
