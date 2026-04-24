import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import Categories from "../components/Categories";
import FeaturedProducts from "../components/FeaturedProducts";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <section id="categories">
        <Categories />
      </section>
      <section id="featured">
        <FeaturedProducts />
      </section>
      <Footer />
    </main>
  );
};

export default Home;
