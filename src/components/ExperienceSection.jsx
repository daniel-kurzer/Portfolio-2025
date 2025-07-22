import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Spline from "@splinetool/react-spline";

const ExperienceSection = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const contentRef = useRef(null);
  const professionalExperienceRef = useRef(null);
  const educationRef = useRef(null);
  const experienceItemsRef = useRef([]);
  const educationItemsRef = useRef([]);
  const splineRef = useRef(null); // Ref for the Spline component container
  const splineContainerRef = useRef(null); // New ref for the div wrapping Spline

  const experiences = [
    {
      role: "Frontend Developer",
      company: "Freelance / Self-employed",
      duration: "Since July 2025",
      description:
        "Design and development of responsive web applications with React and Tailwind CSS. Implementation of UI animations with GSAP.",
      skills: [
        "JavaScript",
        "TypeScript",
        "C#",
        "React",
        "Tailwind CSS",
        "GSAP",
        "Git",
      ],
    },
    {
      role: "Intern - IT specialist for application development",
      company: "AIT Goehner GmbH",
      duration: "March 2024 - April 2025",
      description:
        "I supported IntraNet (C#) & website development and independently delivered key projects: StockHorizon (Next.js/TypeScript inventory), QuantumLeapSEO (SEO platform), and LATEST. (a comprehensive React web store). This hands-on experience was crucial for developing new features and optimizing the user interface.",
      skills: [
        "JavaScript",
        "TypeScript",
        "C#",
        "React",
        "Tailwind CSS",
        "Git",
        "MySQL",
      ],
    },
  ];

  const education = [
    {
      degree: "Retraining - IT specialist for application development",
      school: "ComCave College GmbH, Stuttgart",
      duration: "2023 - 2025",
    },
    {
      degree:
        "Apprenticeship - Plant mechanic for sanitary, heating and air conditioning technology",
      school: "Gottlieb-Daimler-Schule, Sindelfingen",
      duration: "2007 - 2011",
    },
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Create copies of ref values that remain constant within the effect
    const currentSectionNode = sectionRef.current;
    const currentTitleNode = titleRef.current;
    const currentContentNode = contentRef.current;
    const currentProfessionalExperienceNode = professionalExperienceRef.current;
    const currentEducationNode = educationRef.current;
    const currentExperienceItems = experienceItemsRef.current; // Copy of the array
    const currentEducationItems = educationItemsRef.current; // Copy of the array
    const currentSplineNode = splineRef.current; // Copy of the Spline ref
    const currentSplineContainerNode = splineContainerRef.current; // Copy of the Spline container ref

    // Title Animation
    gsap.fromTo(
      currentTitleNode,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        scrollTrigger: {
          trigger: currentSectionNode,
          start: "top 40%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Content (image + text) Animation - using a single trigger for the whole block
    gsap.fromTo(
      currentContentNode,
      { y: 100, opacity: 0, filter: "blur(10px)" },
      {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        duration: 1.5,
        scrollTrigger: {
          trigger: currentSectionNode,
          start: "top 40%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Professional Experience section header animation
    gsap.fromTo(
      currentProfessionalExperienceNode,
      { y: 50, opacity: 0, filter: "blur(5px)" },
      {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        duration: 1,
        delay: 0.5,
        scrollTrigger: {
          trigger: currentProfessionalExperienceNode,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Individual Experience items animation
    currentExperienceItems.forEach((item, index) => {
      gsap.fromTo(
        item,
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          delay: 0.7 + index * 0.1,
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    // Education section header animation - Start at the same point as content, but with delay
    gsap.fromTo(
      currentEducationNode,
      { y: 50, opacity: 0, filter: "blur(5px)" },
      {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        duration: 1,
        delay: 1.2,
        scrollTrigger: {
          trigger: currentProfessionalExperienceNode,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Individual Education items animation - Start at the same point as content, but with delay
    currentEducationItems.forEach((item, index) => {
      gsap.fromTo(
        item,
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          delay: 1.4 + index * 0.1,
          scrollTrigger: {
            trigger: currentProfessionalExperienceNode,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    // Optional: Individual animation for the Spline container
    // If you want the Spline model to have a different animation than the overall contentRef
    gsap.fromTo(
       currentSplineContainerNode,
       { x: -400, opacity: 0 },
       {
         x: 0,
         opacity: 1,
         duration: 1.5,
         delay: 0.5, // Start after the section title appears
         scrollTrigger: {
           trigger: currentSectionNode,
           start: "top 40%",
           toggleActions: "play none none reverse",
         },
       }
     );


    return () => {
      // Use local copies of ref values in the cleanup function
      ScrollTrigger.getAll().forEach((trigger) => {
        if (
          trigger.vars.trigger === currentSectionNode ||
          trigger.vars.trigger === currentContentNode ||
          trigger.vars.trigger === currentProfessionalExperienceNode ||
          trigger.vars.trigger === currentEducationNode ||
          currentExperienceItems.includes(trigger.trigger) ||
          currentEducationItems.includes(trigger.trigger) ||
          trigger.vars.trigger === currentSplineNode || // Include Spline node in cleanup
          trigger.vars.trigger === currentSplineContainerNode // Include Spline container in cleanup
        ) {
          trigger.kill();
        }
      });
    };
  }, []);

  const addExperienceRef = (el) => {
    if (el && !experienceItemsRef.current.includes(el)) {
      experienceItemsRef.current.push(el);
    }
  };

  const addEducationRef = (el) => {
    if (el && !educationItemsRef.current.includes(el)) {
      educationItemsRef.current.push(el);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="w-full relative overflow-hidden bg-gradient-to-b from-black to-[#9a74cf50] flex flex-col justify-center items-center z-10 pt-16 md:pt-5 text-white"
    >
      <div className="container mx-auto px-4 h-full flex flex-col items-center justify-center relative z-10">
        <h2
          ref={titleRef}
          className="text-4xl md:text-6xl font-bold mt-8 lg:mt-0 mb-8 md:mb-16 text-center text-purple-200 opacity-0"
        >
          Experience & Education
        </h2>

        <div
          ref={contentRef}
          className="w-full flex md:flex-row flex-col justify-between lg:px-24 px-0 items-start text-left opacity-0 mt-4 md:mt-0"
        >
          {/* Spline on the left */}
          <div
            ref={splineContainerRef}
            className="md:w-2/5 w-full flex justify-center items-center xl:right-[12%] xl:top-8 md:pr-8 mt-8 md:mt-0 order-last md:order-first relative min-h-[500px] lg:min-h-[600px]"
          >
            <Spline
              ref={splineRef}
              className="absolute inset-0 w-full h-full"
              scene="https://prod.spline.design/U6K-tT1B8WaDHTJY/scene.splinecode"
            />
          </div>

          {/* Experience and Education content on the right */}
          <div className="md:w-3/5 w-full pl-8">
            <h3
              ref={professionalExperienceRef}
              className="text-2xl font-semibold mb-4 text-purple-400 underline underline-offset-4 decoration-purple-300 opacity-0"
            >
              Professional experience
            </h3>
            {experiences.map(
              ({ role, company, duration, description, skills }, i) => (
                <div
                  key={i}
                  ref={addExperienceRef}
                  className="mb-6 border-b border-purple-300 pb-4 opacity-0"
                >
                  <h4 className="text-xl font-bold text-purple-200">{role}</h4>
                  <p className="italic text-purple-300">
                    {company} — {duration}
                  </p>
                  <p className="mt-1 text-gray-200">{description}</p>
                  <p className="mt-1 text-sm text-purple-400">
                    <span className="font-semibold">Skills:</span>{" "}
                    {skills.join(", ")}
                  </p>
                </div>
              )
            )}

            <h3
              ref={educationRef}
              className="text-2xl font-semibold mb-4 text-purple-400 underline underline-offset-4 decoration-purple-300 opacity-0 mt-8"
            >
              Education
            </h3>
            {education.map(({ degree, school, duration }, i) => (
              <div key={i} ref={addEducationRef} className="mb-4 opacity-0">
                <h4 className="font-semibold text-purple-200">{degree}</h4>
                <p className="italic text-purple-300">
                  {school} — {duration}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;