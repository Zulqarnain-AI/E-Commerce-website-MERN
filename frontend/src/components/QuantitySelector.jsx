const QuantitySelector = ({ qty, setQty, max }) => {
  return (
    <div className="flex items-center gap-3">
      <button
        onClick={() => qty > 1 && setQty(qty - 1)}
        className="border px-3 py-1 rounded"
      >
        −
      </button>

      <span className="font-semibold">{qty}</span>

      <button
        onClick={() => qty < max && setQty(qty + 1)}
        className="border px-3 py-1 rounded"
      >
        +
      </button>
    </div>
  );
};

export default QuantitySelector;
