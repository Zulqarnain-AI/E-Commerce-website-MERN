const categories = [
  "Electronics",
  "Fashion",
  "Home Appliances",
  "Accessories",
];

const Categories = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-2xl font-bold mb-6">Categories</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((cat, index) => (
          <div
            key={index}
            className="border rounded-lg p-6 text-center hover:bg-black hover:text-white cursor-pointer transition"
          >
            {cat}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
