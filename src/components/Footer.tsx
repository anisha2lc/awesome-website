const Footer = () => {
  return (
    <footer className="bg-[#1c1c2b] text-white">
      <div className="max-w-7xl mx-auto py-16 px-12 grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
        <div>
          <h2 className="text-2xl font-bold mb-4">Awwwsome.</h2>
          <p className="text-sm text-gray-300 leading-relaxed">
            Our team can create amazing web experiences, beginning with deep
            market research, practical strategies, and professional execution.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-sm font-semibold uppercase mb-4 text-gray-400">
              About Us
            </h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <a href="#">Works</a>
              </li>
              <li>
                <a href="#">Strategy</a>
              </li>
              <li>
                <a href="#">Releases</a>
              </li>
              <li>
                <a href="#">Press</a>
              </li>
              <li>
                <a href="#">Mission</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase mb-4 text-gray-400">
              Customers
            </h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <a href="#">Trending</a>
              </li>
              <li>
                <a href="#">Popular</a>
              </li>
              <li>
                <a href="#">Customers</a>
              </li>
              <li>
                <a href="#">Features</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase mb-4 text-gray-400">
              Support
            </h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <a href="#">Developers</a>
              </li>
              <li>
                <a href="#">Support</a>
              </li>
              <li>
                <a href="#">Customer Service</a>
              </li>
              <li>
                <a href="#">Guide</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-[#181827] text-gray-500 text-center py-4 text-sm">
        2022 © Awwwsome Designers
      </div>
    </footer>
  );
};

export default Footer;
