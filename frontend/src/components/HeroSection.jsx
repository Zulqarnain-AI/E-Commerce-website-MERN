import { Link } from "react-router-dom";
import { FiArrowRight, FiHeart, FiShield, FiTruck } from "react-icons/fi";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(135deg,rgba(15,23,42,0.04)_0%,rgba(15,118,110,0.08)_50%,rgba(255,255,255,0)_100%)]" />
      <div className="absolute left-0 top-0 -z-10 h-64 w-64 rounded-full bg-emerald-200/30 blur-3xl" />
      <div className="absolute right-0 top-24 -z-10 h-72 w-72 rounded-full bg-sky-200/30 blur-3xl" />

      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-8 lg:py-24">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-800 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden="true" />
            2026-ready storefront experience
          </div>

          <h1 className="mt-6 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
            Commerce that feels calm, fast, and unmistakably premium.
          </h1>

          <p className="mt-6 max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
            Discover a mobile-first shopping experience with sharp product discovery,
            resilient checkout flows, and a visual system designed to scale with your catalog.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/#featured"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-950 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-slate-950/10 transition hover:-translate-y-0.5 hover:bg-slate-800"
            >
              Shop featured picks
              <FiArrowRight aria-hidden="true" />
            </Link>
            <Link
              to="/register"
              className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:text-slate-950"
            >
              Create account
            </Link>
          </div>

          <div className="mt-10 grid gap-3 sm:grid-cols-3">
            {[
              {
                icon: FiShield,
                title: "Secure by default",
                description: "JWT-ready auth and protected flows.",
              },
              {
                icon: FiTruck,
                title: "Fast delivery",
                description: "Clear tracking and order visibility.",
              },
              {
                icon: FiHeart,
                title: "Wishlist support",
                description: "Save products for later with ease.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-3xl border border-slate-200 bg-white/80 p-4 shadow-sm backdrop-blur"
              >
                <item.icon className="text-xl text-emerald-700" aria-hidden="true" />
                <h2 className="mt-3 text-sm font-semibold text-slate-950">{item.title}</h2>
                <p className="mt-1 text-sm leading-6 text-slate-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
          <div className="absolute inset-0 -z-10 rounded-[2rem] bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 shadow-2xl shadow-slate-950/20" />

          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950 p-4 shadow-2xl shadow-slate-950/20 sm:p-6">
            <div className="grid gap-4 sm:grid-cols-[1.1fr_0.9fr]">
              <div className="overflow-hidden rounded-[1.5rem] bg-white/5">
                <img
                  src="https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=1200&q=80"
                  alt="Curated fashion and lifestyle products"
                  className="h-full min-h-[320px] w-full object-cover"
                  loading="eager"
                  decoding="async"
                />
              </div>

              <div className="flex flex-col justify-between gap-4">
                <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5 text-white">
                  <p className="text-xs uppercase tracking-[0.3em] text-emerald-200/80">
                    Live storefront
                  </p>
                  <h2 className="mt-3 text-2xl font-semibold tracking-tight">
                    Built for discovery, trust, and conversion.
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-slate-300">
                    A refined layout with high contrast, clear hierarchy, and touch-friendly controls.
                  </p>
                </div>

                <div className="grid gap-3">
                  {[
                    "Mobile-first navigation",
                    "Persistent cart state",
                    "Accessible visual rhythm",
                  ].map((point) => (
                    <div
                      key={point}
                      className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-slate-100"
                    >
                      {point}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {[
                ["4.9/5", "Customer rating"],
                ["24h", "Fast fulfillment"],
                ["100%", "Secure checkout"],
              ].map(([value, label]) => (
                <div
                  key={label}
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-white"
                >
                  <p className="text-2xl font-semibold tracking-tight">{value}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.24em] text-slate-400">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
