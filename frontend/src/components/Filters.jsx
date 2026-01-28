const Filters = ({ category, setCategory, price, setPrice }) => {
  const allCategories = ["All", "Electronics", "Fashion", "Home Appliances", "Accessories"];

  return (
    <div className="bg-white p-4 rounded-lg shadow">

      <h3 className="font-bold mb-4">Filters</h3>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">
          Category
        </label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border rounded px-2 py-1"
        >
          {allCategories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Max Price
        </label>
        <input
          type="range"
          min="0"
          max="1000"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full"
        />
        <p className="text-sm mt-1">Up to ${price}</p>
      </div>
    </div>
  );
};

export default Filters;
