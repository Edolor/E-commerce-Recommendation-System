const StatusTag = ({ available, show }) => {
  if (!show && available) return;

  const productStatus = available ? "in stock" : "out of stock";

  return (
    <div
      className={`product-status border badge bg-transparent text-capitalize me-3 ${
        available ? "text-blue" : "text-danger"
      }`}
    >
      {productStatus}
    </div>
  );
};

export default StatusTag;
