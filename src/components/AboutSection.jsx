import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const AboutSection = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const introRef = useRef(null);
  const starsRef = useRef([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const sectionNode = sectionRef.current;

    // Title Animation
    gsap.fromTo(
      titleRef.current,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        scrollTrigger: {
          trigger: sectionNode,
          start: "top 40%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Intro Animation
    gsap.fromTo(
      introRef.current,
      { y: 100, opacity: 0, filter: "blur(10px)" },
      {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        duration: 1.5,
        scrollTrigger: {
          trigger: sectionNode,
          start: "top 40%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Stars Animation
    starsRef.current.forEach((star, index) => {
      const direction = index % 2 === 0 ? 1 : -1;
      const speed = 0.5 + Math.random() * 0.5;

      gsap.to(star, {
        x: `${direction * (100 + index * 20)}`,
        y: `${direction * -50 - index * 10}`,
        rotation: direction * 360,
        ease: "none",
        scrollTrigger: {
          trigger: sectionNode,
          start: "top bottom",
          end: "bottom top",
          scrub: speed,
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === sectionNode) {
          trigger.kill();
        }
      });
    };
  }, []);

  const addToStars = (el) => {
    if (el && !starsRef.current.includes(el)) {
      starsRef.current.push(el);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="about"
      className="h-screen relative overflow-hidden bg-gradient-to-b from-black to-[#9a74cf50] flex flex-col justify-center items-center z-10 pt-16 md:pt-24"
    >
      <div className="absolute inset-0 overflow-hidden">
        {/* STARS ANIMATION */}
        {[...Array(7)].map((_, i) => (
          <div
            ref={addToStars}
            className="absolute rounded-full"
            key={`star-${i}`}
            style={{
              willChange: "transform",
              width: `${5 + i * 2}px`,
              height: `${5 + i * 2}px`,
              background: `radial-gradient(circle at center, rgba(255,255,255,1) 0%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0) 100%)`,
              opacity: 0.4 + Math.random() * 0.4,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              boxShadow: `0 0 8px rgba(255, 255, 255, 0.7), 0 0 15px rgba(255, 255, 255, 0.4)`,
              animation: `flicker ${
                2 + Math.random() * 3
              }s infinite alternate ease-in-out`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 h-full flex flex-col items-center justify-center relative z-10">
        <h1
          ref={titleRef}
          className="text-4xl md:text-6xl font-bold mt-8 lg:mt-0 mb-8 md:mb-16 text-center text-purple-200 opacity-0"
        >
          About me
        </h1>

        <div
          ref={introRef}
          className="w-full flex md:flex-row flex-col justify-between lg:px-24 px-5 items-center text-center opacity-0 mt-4 md:mt-0"
        >
          <div className="text-sm md:text-2xl font-bold text-purple-200 z-50 lg:max-w-[45rem] max-w-[27rem] tracking-wider mb-8 md:mb-0">
            <span className="block w-full text-center hero-font uppercase text-purple-200/60">
              From hands-on craftsmanship <br /> to the world of code,
            </span>
            <br /> <br />
            <p className="text-left">
              I'm Daniel, a certified IT Specialist for Application Development
              (IHK) with a fresh perspective on web development. My career
              journey, which includes roles as a plumber, product expert in
              e-bikes, and a dispatcher for critical communication systems, has
              instilled in me a strong technical understanding and a meticulous
              approach. Now, after dedicated self-study and a comprehensive IHK
              retraining program, I'm excited to apply my skills in JavaScript,
              React.js, and C# to build innovative web solutions. I'm a
              continuous learner who enjoys tackling complex problems and
              creating applications that are both functional and enjoyable to
              use. I'm enthusiastic about embracing new challenges, exploring
              cutting-edge technologies, and making a tangible impact in
              professional web projects.
            </p>
          </div>
          <img
            className="lg:h-[40rem] md:h-[25rem] h-[20rem] lg:translate-y-7 translate-y-[-35px]"
            src="images/DK-RB-1.png"
            alt="Profile-Image"
          />
        </div>
      </div>
    </section>
  );
};

export default AboutSection;