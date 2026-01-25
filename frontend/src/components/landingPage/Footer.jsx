const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6 mt-10">
      <div className="max-w-7xl mx-auto text-center">
        <p>© {new Date().getFullYear()} E-Shop. All rights reserved.</p>
        <p className="text-sm text-gray-400 mt-2">
          Built with MERN Stack
        </p>
      </div>
    </footer>
  );
};

export default Footer;
