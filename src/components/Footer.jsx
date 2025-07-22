import { FiGithub, FiLinkedin } from "react-icons/fi";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-16 px-6 mt-16">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center">
          {/* LOGO AND DESCRIPTION */}

          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-purple-200 bg-clip-text text-transparent">
            Daniel Kurzer
          </h2>

          {/* SCROLL LINKS */}

          <div>
            <h3 className="text-xl font-semibold mb-4 text-purple-200">
              Connect
            </h3>
            <div className="flex space-x-4">
              <a
                className="text-gray-700 hover:text-violet-400 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
                href="https://github.com/daniel-kurzer"
              >
                <FiGithub className="w-5 h-5" />
              </a>
              <a
                className="text-gray-700 hover:text-violet-400 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
                href="https://x.com/daniel_kurzer"
              >
                <FaXTwitter className="w-5 h-5" />
              </a>
              <a
                className="text-gray-700 hover:text-violet-400 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.linkedin.com/in/daniel-kurzer/"
              >
                <FiLinkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            &copy; 2025 Daniel Kurzer. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a
              className="text-gray-500 hover:text-white text-sm transition-colors"
              href="#"
            >
              Privacy Policy
            </a>
            <a
              className="text-gray-500 hover:text-white text-sm transition-colors"
              href="#"
            >
              Terms of Service
            </a>
            <a
              className="text-gray-500 hover:text-white text-sm transition-colors"
              href="#"
            >
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
