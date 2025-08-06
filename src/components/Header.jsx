import { motion, AnimatePresence } from "framer-motion";
import { FiGithub, FiLinkedin, FiMenu, FiX } from "react-icons/fi";
import { FaXTwitter } from "react-icons/fa6";
import { useState, useRef, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { Link } from "react-router-dom"; // <-- Importiere Link von react-router-dom

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  const [contactFormOpen, setContactFormOpen] = useState(false);
  const openContactForm = () => setContactFormOpen(true);
  const closeContactForm = () => setContactFormOpen(false);

  const cursorRef = useRef(null);
  const cursorBorderRef = useRef(null);

  const form = useRef();
  const [isSending, setIsSending] = useState(false); 
  const [sendSuccess, setSendSuccess] = useState(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${clientX}px, ${clientY}px, 0)`;
      }
      if (cursorBorderRef.current) {
        cursorBorderRef.current.style.transform = `translate3d(${clientX}px, ${clientY}px, 0)`;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const sendEmail = (e) => {
    e.preventDefault();

    setIsSending(true);
    setSendSuccess(null);

    // Email.js Keys
    const serviceId = "service_8hwgdcl";
    const templateId = "template_4qtj5xs";
    const publicKey = "ZC7WbftNbqWHfFlsR";

    emailjs.sendForm(serviceId, templateId, form.current, publicKey).then(
      (result) => {
        console.log("Email successfully sent!", result.text);
        setSendSuccess(true); 
        setIsSending(false); 
        form.current.reset();
      },
      (error) => {
        console.error("Failed to send email:", error.text);
        setSendSuccess(false); 
        setIsSending(false); 
        console.log(error.text);
      }
    );
  };

  
  const getPath = (item) => {
    if (item === "Home") return "/";
    if (item === "Technologies") return "/techstack";
    return `/${item.toLowerCase()}`;
  };

  return (
    <>
      <header className="w-[80%] absolute mt-5 left-1/2 -translate-x-1/2 z-50 transition-all glass-effect duration-300">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 md:h-20">
          {/* Logo - Führt zur Startseite */}
          <motion.div
            className="flex items-center"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 25,
              delay: 0.3,
              duration: 1.2,
            }}
          >
            <Link to="/" className="flex items-center"> {/* Fügen Sie hier den Link ein */}
              <div className="h-10 w-10 rounded-xl bg-gradient-to-r from-gray-500 to-gray-100 flex items-center justify-center text-purple-600 font-bold text-xl mr-3">
                DK
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-gray-300 to-gray-100 bg-clip-text text-transparent text-glow-purple">
                Daniel Kurzer
              </span>
            </Link>
          </motion.div>

          {/* Desktop Nav */}
          <nav className="lg:flex hidden space-x-8">
            {["Home", "About", "Projects", "Experience", "Technologies", "Contact"].map(
              (item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 100,
                    damping: 20,
                    delay: 0.7 + index * 0.2,
                  }}
                >
                  {/* Ändere <a> zu <Link> */}
                  <Link
                    to={getPath(item)} // Verwende die getPath Funktion
                    className="relative text-gray-800 dark:text-gray-200 hover:text-violet-600 dark:hover:text-violet-300 font-medium transition-colors duration-300 group"
                  >
                    {item}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-violet-600 group-hover:w-full transition-all duration-300"></span>
                  </Link>
                </motion.div>
              )
            )}
          </nav>

          {/* Socials + Hire Me Button */}
          <div className="md:flex hidden items-center space-x-4">
            {[
              { Icon: FiGithub, href: "https://github.com/daniel-kurzer" },
              { Icon: FaXTwitter, href: "https://x.com/daniel_kurzer" },
              {
                Icon: FiLinkedin,
                href: "https://www.linkedin.com/in/daniel-kurzer/",
              },
            ].map((item, i) => (
              <motion.a
                key={i}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 dark:text-gray-300 hover:text-violet-600 dark:hover:text-violet-400 transition-colors duration-300"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.3, duration: 0.8 }}
              >
                <item.Icon className="w-5 h-5" />
              </motion.a>
            ))}

            <motion.button
              onClick={openContactForm}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: 1.4,
                duration: 0.8,
                type: "spring",
                stiffness: 100,
                damping: 15,
              }}
              className="ml-4 px-4 py-2 rounded-xl bg-gradient-to-r from-gray-400 to-gray-100 font-bold text-violet-700 hover:from-violet-500 hover:to-purple-700 hover:text-white transition-all duration-500"
            >
              Hire me
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <motion.button
              onClick={toggleMenu}
              className="text-gray-300"
              whileTap={{ scale: 0.7 }}
            >
              {isOpen ? (
                <FiX className="h-6 w-6" />
              ) : (
                <FiMenu className="h-6 w-6" />
              )}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              key="mobile-menu"
              className="md:hidden overflow-hidden bg-white dark:bg-gray-900 shadow-lg px-4 py-5 space-y-5"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4 }}
            >
              <nav className="flex flex-col space-y-3">
                {["Home", "About", "Projects", "Experience", "Technologies", "Contact"].map(
                  (item) => (
                    // Ändere <a> zu <Link> und entferne href, nutze to
                    <Link
                      onClick={() => setTimeout(() => toggleMenu(), 100)} // Menü schließen nach Klick
                      className="text-gray-300 font-medium py-2"
                      key={item}
                      to={getPath(item)} // Verwende die getPath Funktion
                    >
                      {item}
                    </Link>
                  )
                )}
              </nav>

              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex space-x-5">
                  {[
                    {
                      Icon: FiGithub,
                      href: "https://github.com/daniel-kurzer",
                    },
                    { Icon: FaXTwitter, href: "https://x.com/daniel_kurzer" },
                    {
                      Icon: FiLinkedin,
                      href: "https://www.linkedin.com/in/daniel-kurzer/",
                    },
                  ].map((item, i) => (
                    <a
                      href={item.href}
                      key={i}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <item.Icon className="h-5 w-5 text-gray-300" />
                    </a>
                  ))}
                </div>

                <button
                  onClick={() => {
                    toggleMenu();
                    openContactForm();
                  }}
                  className="mt-4 block w-full px-4 py-2 rounded-lg bg-gradient-to-r from-violet-600 to-violet-400 font-bold"
                >
                  Contact me
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Contact Form Modal (Bleibt unverändert) */}
      <AnimatePresence>
        {contactFormOpen && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-md z-[999] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-md p-6"
              initial={{ scale: 0.8, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 30 }}
              transition={{
                type: "spring",
                damping: 30,
                stiffness: 200,
                duration: 0.8,
              }}
            >
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-extrabold text-gray-300">
                  Get in Touch
                </h1>
                <button onClick={closeContactForm}>
                  <FiX className="w-5 h-5 text-gray-300" />
                </button>
              </div>

              <form ref={form} onSubmit={sendEmail} className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="user_name"
                    placeholder="Your Name..."
                    required
                    className="w-full px-4 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 bg-gray-700"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="user_email"
                    required
                    placeholder="Your Email..."
                    className="w-full px-4 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 bg-gray-700"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    Message
                  </label>
                  <textarea
                    rows="4"
                    id="message"
                    name="message"
                    required
                    placeholder="How can I help you?"
                    className="w-full px-4 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 bg-gray-700"
                  />
                </div>

                {isSending && (
                  <p className="text-violet-300 text-center">
                    Sending message...
                  </p>
                )}
                {sendSuccess === true && (
                  <p className="text-green-500 text-center">
                    Message sent successfully!
                  </p>
                )}
                {sendSuccess === false && (
                  <p className="text-red-500 text-center">
                    Failed to send message. Please try again.
                  </p>
                )}

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full px-4 py-2 bg-gradient-to-r from-violet-600 to-violet-400 hover:from-violet-700 hover:to-purple-700 transition-all duration-300 rounded-lg shadow-md hover:shadow-lg hover:shadow-violet-600/50"
                >
                  Send Message
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;