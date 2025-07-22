import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import emailjs from "@emailjs/browser";
const ContactSection = () => {
  // GSAP refs
  const circleRef = useRef(null);
  const sectionRef = useRef(null);
  const initialTextRef = useRef(null);
  const finalTextRef = useRef(null);

  // State for modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);

  // EmailJS specific state and ref
  const form = useRef(); // Ref for the form element
  const [isSending, setIsSending] = useState(false); // State for loading indicator
  const [sendSuccess, setSendSuccess] = useState(null); // State for success/error message (null: no attempt, true: success, false: failure)

  // Function to open the modal
  const openModal = () => setIsModalOpen(true);
  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSendSuccess(null); // Reset success/error message when closing
  };

  // GSAP animation logic
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const cleanup = () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.vars.trigger === sectionRef.current) {
          st.kill(true);
        }
      });
    };

    cleanup();

    gsap.set(circleRef.current, { scale: 1, backgroundColor: "white" });
    gsap.set(initialTextRef.current, { opacity: 1 });
    gsap.set(finalTextRef.current, { opacity: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=200%",
        pin: true,
        scrub: 0.5,
        anticipatePin: 1,
        fastScrollEnd: true,
        preventOverlaps: true,
        invalidateOnRefresh: true,
      },
    });

    tl.to(circleRef.current, { scale: 5, backgroundColor: "#9333EA", ease: "power1.inOut", duration: 0.5 }, 0);
    tl.to(initialTextRef.current, { opacity: 0, ease: "power1.out", duration: 0.2 }, 0.1);
    tl.to(circleRef.current, {
      scale: 17,
      backgroundColor: "#E9D5FF",
      boxShadow: "0 0 50px 20px rgba(233, 213, 255, 0.3)",
      ease: "power2.inOut",
      duration: 0.5,
    }, 0.5);
    tl.to(finalTextRef.current, { opacity: 1, ease: "power2.in", duration: 0.2 }, 0.7);

    return cleanup;
  }, []);

  // Function to send email (copied from Header component)
  const sendEmail = (e) => {
    e.preventDefault(); // Prevent default form submission

    setIsSending(true);
    setSendSuccess(null); // Clear previous messages

    // --- IMPORTANT: Replace with your actual EmailJS IDs ---
    // Make sure these match the ones used in your Header component and EmailJS dashboard
    const serviceId = "service_8hwgdcl";
    const templateId = "template_4qtj5xs";
    const publicKey = "ZC7WbftNbqWHfFlsR";
    // --------------------------------------------------------

    emailjs.sendForm(serviceId, templateId, form.current, publicKey)
      .then((result) => {
          console.log('Email successfully sent!', result.text);
          setSendSuccess(true);
          setIsSending(false);
          form.current.reset(); // Clear form fields after successful submission
          // Optional: close modal after successful send
          // setTimeout(() => closeModal(), 2000); // Close after 2 seconds
      }, (error) => {
          console.error('Failed to send email:', error.text);
          setSendSuccess(false);
          setIsSending(false);
      });
  };

  return (
    <>
      <section
        ref={sectionRef}
        id="contact"
        className="flex items-center justify-center bg-gradient-to-b from-[#9a74cf50] to-black relative w-full"
        style={{ overscrollBehavior: "none" }}
      >
        <div
          ref={circleRef}
          className="w-24 sm:w-28 md:w-32 h-24 sm:h-28 md:h-32 rounded-full flex items-center justify-center relative transition-shadow duration-1000 shadow-violet-300/50 shadow-lg bg-gradient-to-r from-violet-400 to-pink-100"
        >
          <p
            ref={initialTextRef}
            className="text-black font-bold text-base sm:text-lg md:text-xl absolute inset-0 flex items-center text-center"
          >
            SCROLL DOWN
          </p>

          <div
            ref={finalTextRef}
            className="text-center relative flex flex-col items-center justify-center opacity-0"
          >
            <h1 className="text-black md:w-[15rem] w-[20rem] lg:scale-[0.4] sm:scale-[0.25] scale-[0.07] md:font-bold text-sm sm:text-base leading-none mb-5 translate-y-[-8px] md:translate-y-[-6px] hero-font uppercase">
              Step into the Future <br /> with Daniel Kurzer
            </h1>

            <p className="text-black lg:w-[47rem] w-[20rem] absolute sm:mt-3 mt-1 md:scale-[0.1] scale-[0.068]">
              Ready to transform visions into stunning digital realities ? <br /> <br /> As a<span className="font-bold"> Front-End Alchemist</span>, I meticulously craft modern, <br /> responsive web interfaces that don't just exist – they captivate. <br /> <br /> With a passion for<span className="font-bold"> React</span>, the precision of<span className="font-bold"> Tailwind CSS</span>, and an <span className="font-bold">arsenal of advanced UI animation techniques</span>, I bring pixel-perfect designs to life with remarkably clean code. <br /> <br /> Let's create something extraordinary together.
            </p>

            <button
              onClick={openModal}
              className="px-10 py-2 rounded-xl bg-black hover:bg-white hover:text-black transition-all duration-500 scale-[0.1] absolute sm:mt-12 mt-10 text-nowrap shadow-xl hover:scale-[0.103] border hover:border-black"
            >
              Contact me
            </button>
          </div>
        </div>
      </section>

      {/* Contact Form Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 backdrop-blur-md bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl max-w-md w-full relative">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              onClick={closeModal}
              aria-label="Close Contact Form"
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold mb-4 text-gray-300">Contact Me</h2> {/* Added text-gray-300 for consistency */}

            {/* Form structure, ref, onSubmit, name attributes, and feedback */}
            <form ref={form} onSubmit={sendEmail} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="user_name"
                  required
                  placeholder="Your Name..."
                  className="w-full px-4 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 bg-gray-700"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
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
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                  Message
                </label>
                <textarea
                  rows={4}
                  id="message"
                  name="message"
                  required
                  placeholder="How can I help you?"
                  className="w-full px-4 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 bg-gray-700"
                />
              </div>

              {/* User Feedback (same as Header) */}
              {isSending && (
                <p className="text-violet-300 text-center">Sending message...</p>
              )}
              {sendSuccess === true && (
                <p className="text-green-500 text-center">Message sent successfully!</p>
              )}
              {sendSuccess === false && (
                <p className="text-red-500 text-center">Failed to send message. Please try again.</p>
              )}

              <button
                type="submit"
                className="w-full bg-violet-600 text-white py-2 rounded-lg hover:bg-violet-700 transition" // Updated classes for consistency
                disabled={isSending} // Disable button while sending
              >
                {isSending ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ContactSection;