import { useNavigate } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";

const Categories = () => {
  const navigate = useNavigate();
  const categories = [
    ["Electronics", "Smart devices, audio, and connected essentials"],
    ["Fashion", "New-season styles, accessories, and trending picks"],
    ["Home Appliances", "Reliable tools for modern living spaces"],
    ["Accessories", "Everyday add-ons crafted for utility and style"],
  ];

  const handleClick = (category) => {
    navigate(`/products/${category}`);
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-700">Browse Faster</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">Shop by category</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {categories.map(([name, description]) => (
          <button
            type="button"
            key={name}
            className="group rounded-3xl border border-slate-200 bg-white p-6 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-200 hover:shadow-md"
            onClick={() => handleClick(name)}
          >
            <h3 className="text-lg font-semibold text-slate-950">{name}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
            <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700">
              Explore
              <FiArrowRight className="transition group-hover:translate-x-0.5" aria-hidden="true" />
            </span>
          </button>
        ))}
      </div>
    </section>
  );
};

export default Categories;
