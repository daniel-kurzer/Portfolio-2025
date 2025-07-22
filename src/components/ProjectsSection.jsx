import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SlShareAlt } from "react-icons/sl";

const ProjectsSection = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const titleLineRef = useRef(null);
  const triggerRef = useRef(null);
  const horizontalRef = useRef(null);
  // Project Images data
  const projectImages = [
    {
      id: 1,
      title: "LATEST. Fashion-Webshop",
      imageSrc: "images/SS_Startseite.png",
      github: "https://github.com/daniel-kurzer/LATEST.-Webshop",
    },
    {
      id: 2,
      title: "QUANTUMLEAP SEO. Platform",
      imageSrc: "images/QuantumLeap_SEO.png",
      github: "https://github.com/daniel-kurzer/QuantumLeapSEO",
    },
    {
      id: 3,
      title: "OPTIMAL BITE. Food-Ordering Webshop",
      imageSrc: "images/Optimal_Bite.png",
      github:
        "https://github.com/daniel-kurzer/OPTIMAL-BITE/tree/main/Food-App-React.JS",
    },
    {
      id: 4,
      title: "KURZER CODE. Webdev-page",
      imageSrc: "images/KurzerCODE.png",
      github: "https://github.com/daniel-kurzer/KurzerCODE",
    },
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    //title reveal animation
    gsap.fromTo(
      titleRef.current,
      {
        y: 100,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // title line animation
    gsap.fromTo(
      titleLineRef.current,
      {
        width: "0%",
        opacity: 0,
      },
      {
        width: "100%",
        opacity: 1,
        duration: 1.5,
        ease: "power3.inOut",
        delay: 0.3,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // section entrance effect
    gsap.fromTo(
      triggerRef.current,
      {
        y: 100,
        rotationX: 20,
        opacity: 0,
      },
      {
        y: 0,
        rotationX: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
        delay: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Parallax effect for the entire section
    gsap.fromTo(
      sectionRef.current,
      {
        backgroundPosition: "50% 0%",
      },
      {
        backgroundPosition: "50% 100%",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      }
    );

    // Horizontal Scrolling
    // Create the horizontal scrolling animation

    const horizontalScroll = gsap.to(".panel", {
      xPercent: -100 * (projectImages.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: triggerRef.current,
        start: "top top",
        end: () => `+=${horizontalRef.current.offsetWidth}`,
        pin: true,
        scrub: 1,
        snap: {
          snapTo: 1 / (projectImages.length - 1),
          duration: { main: 0.2, max: 0.3 },
          delay: 0.1,
        },
        invalidateOnRefresh: true,
      },
    });

    // Image Animation
    // Animate each image panel
    const panels = gsap.utils.toArray(".panel");
    panels.forEach((panel, i) => {
      const image = panel.querySelector(".project-image");
      const imageTitle = panel.querySelector(".project-title");

      // Create a timeline for each panel
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: panel,
          containerAnimation: horizontalScroll,
          start: "left right",
          end: "right left",
          scrub: true,
        },
      });

      // Image scale and opacity animation
      tl.fromTo(
        image,
        { scale: 0, rotate: -20 },
        { scale: 1, rotate: 1, duration: 0.5 }
      );

      // Title animation if it exits
      if (imageTitle) {
        tl.fromTo(imageTitle, { y: 30, opacity: 1 }, { y: -100, opacity:0, duration: 0.3 }, 0.2);
      }
    });
  }, [projectImages.length]);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative py-20 bg-gradient-to-b from-[#9a74cf50] to-black overflow-hidden"
    >
      {/* SECTION TITLE */}
      <div className="container mx-auto px-4 mb-16 relative z-10">
        <h2
          ref={titleRef}
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-purple-200 text-center mb-4 opacity-0"
        >
          Featured Projects
        </h2>
        <div
          ref={titleLineRef}
          className="w-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto opacity-0"
        ></div>
      </div>

      {/* HORIZONTAL SCROLL SECTION */}
      <div ref={triggerRef} className="overflow-hidden opacity-0">
        <div
          ref={horizontalRef}
          className="horizontal-section flex md:w-[400%] w-[420%]"
        >
          {projectImages.map((project) => (
            <div
              key={project.id}
              className="panel relative flex items-center justify-center"
            >
              <div className="relative w-full h-full flex flex-col items-center justify-center p-4 sm:p-8 md:p-12">
                <img
                  className="project-image max-w-full z-50 max-h-full rounded-2xl object-cover"
                  src={project.imageSrc}
                  alt="Project Image"
                />
                <h3 className="project-title flex items-center gap-3 md:text-3xl text-md font-bold underline underline-offset-4 decoration-purple-500 decoration-2 text-gray-200 mt-6 z-20 text-nowrap hover:text-gray-400 transition-colors duration-300 cursor-pointer">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-purple-200 gap-3"
                  >
                    {project.title}
                    <SlShareAlt className="translate-y-[-3px]" />
                  </a>
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
