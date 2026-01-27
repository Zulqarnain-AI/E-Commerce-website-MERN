import { useEffect, useState } from "react";

const slides = [
  {
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
    title: "Discover Premium Products",
    description:
      "Explore a wide range of high-quality electronics, fashion, and lifestyle products — all in one place.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
    title: "Modern Shopping Experience",
    description:
      "A fast, secure, and seamless shopping experience designed for your everyday needs.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
    title: "Quality You Can Trust",
    description:
      "Carefully curated products with reliable delivery and customer satisfaction at the core.",
  },
];

const HeroSection = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative px-15 h-[70vh] ml-3 mr-3 overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={` absolute inset-0 transition-opacity duration-1000 ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Background Image */}
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/60 flex items-center">
            <div className="max-w-7xl mx-auto px-6 text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {slide.title}
              </h1>
              <p className="text-lg md:text-xl text-gray-200 max-w-2xl">
                {slide.description}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HeroSection;
