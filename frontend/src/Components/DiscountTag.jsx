const DiscountTag = ({ product, long = false }) => {
  if (!product.formerPrice || product.quantity === 0) return;

  let discount = Math.round(
    ((product.formerPrice - product.currentPrice) / product.formerPrice) * 100
  );

  return (
    <div className="badge product-discount-tag" aria-label="Discount">
      {long ? `${discount}% off` : `-${discount}%`}
    </div>
  );
};

export default DiscountTag;
