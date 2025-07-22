import { motion } from "framer-motion";
import Spline from "@splinetool/react-spline";

const HeroSection = () => {
  return (
    <section
      id="home"
      className="h-screen bg-gradient-to-b from-violet-900 to-black flex xl:flex-row flex-col-reverse items-center justify-between lg:px-[150px] px-10 relative overflow-hidden"
    >
      {/* LEFT SECTION */}

      <div className="z-40 xl:mb-0 mb-[20%]">
        <motion.h1
          className="text-5xl md:text-7xl lg:text-8xl font-bold z-10 mb-6 stroke-purple text-slate-300 hero-font"
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 40,
            damping: 25,
            delay: 1.3,
            duration: 1.5,
          }}
        >
          Hello, World.
          <br /> I'm{" "}
          <span className="text-purple-500 stroke-white">Daniel</span>. <br />{" "}
          Frontend Dev.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 40,
            damping: 25,
            delay: 1.8,
            duration: 1.5,
          }}
          className="text-xl md:text-1xl lg:text-2xl text-purple-200 pt-5 max-w-3xl"
        >
          Freshly compiled, smooth by Design, ready for Production. <br />
          Crafted interfaces that don't just click - they flow. <br /> <br />
          I build with React, style with Tailwind, and animate with GSAP –
          turning bold ideas into exceptional digital experiences.
          <br />
          <br />
          Let's build something that people don't want to scroll past.
        </motion.p>
      </div>

      {/* RIGHT SECTION */}

      <Spline
        className="absolute lg:scale-[79%] left-[-21%] xl:left-[20%] over top-[-22%] lg:top-0"
        scene="https://prod.spline.design/RJvzrMJFmoFJPD6q/scene.splinecode"
      />
    </section>
  );
};

export default HeroSection;
