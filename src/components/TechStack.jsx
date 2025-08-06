import { useRef, useEffect } from "react";
import { Icon } from "@iconify/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import splinePng from "../assets/spline-icon.png";
import javaPng from "../assets/java-icon.png"

// Iconify-basierte TechStack-Definition
const categorizedTechStack = [
  {
    category: "Programming languages",
    items: [
      { name: "JavaScript", icon: "simple-icons:javascript", color: "text-yellow-400" },
      { name: "TypeScript", icon: "simple-icons:typescript", color: "text-blue-600" },
      { name: "C#", icon: "simple-icons:csharp", color: "text-purple-600" },
      { name: "Java", icon: ({ className }) => (
          <img src={javaPng} alt="Spline Logo" className={className} />
        ), color: "text-red-500" },
    ],
  },
  {
    category: "Front-end development",
    items: [
      { name: "HTML5", icon: "fa6-brands:html5", color: "text-orange-500" },
      { name: "CSS3", icon: "fa6-brands:css3", color: "text-blue-500" },
      { name: "React", icon: "simple-icons:react", color: "text-cyan-400" },
      { name: "Next.js", icon: "simple-icons:nextdotjs", color: "text-gray-300" },
      { name: "Tailwind CSS", icon: "simple-icons:tailwindcss", color: "text-teal-400" },
    ],
  },
  {
    category: "UI/UX & Animation",
    items: [
      { name: "Framer Motion", icon: "simple-icons:framer", color: "text-pink-500" },
      { name: "GSAP", icon: "simple-icons:greensock", color: "text-green-500" },
      {
        name: "Spline",
        icon: ({ className }) => (
          <img src={splinePng} alt="Spline Logo" className={className} />
        ),
        color: "text-green-400",
      },
      { name: "Figma", icon: "simple-icons:figma", color: "text-purple-500" },
    ],
  },
  {
    category: "Backend & Databases",
    items: [
      { name: "Node.js", icon: "simple-icons:nodedotjs", color: "text-green-600" },
      { name: "MySQL", icon: "simple-icons:mysql", color: "text-blue-800" },
    ],
  },
  {
    category: "Version management",
    items: [
      { name: "Git", icon: "fa6-brands:git", color: "text-red-600" },
      { name: "GitHub", icon: "fa6-brands:github", color: "text-gray-400" },
    ],
  },
];

const TechStack = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const titleLineRef = useRef(null);
  const categoryRefs = useRef([]);
  const itemRefs = useRef([]);
  const createdTweensRef = useRef([]);

  const addCategoryRef = (el) => {
    if (el && !categoryRefs.current.includes(el)) {
      categoryRefs.current.push(el);
    }
  };

  const addItemRef = (catIndex, el) => {
    if (el) {
      if (!itemRefs.current[catIndex]) {
        itemRefs.current[catIndex] = [];
      }
      if (!itemRefs.current[catIndex].includes(el)) {
        itemRefs.current[catIndex].push(el);
      }
    }
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    let animationInitTimeoutId;
    let cleanupTimeoutId;

    const currentSectionNode = sectionRef.current;
    const currentTitleNode = titleRef.current;
    const currentTitleLineNode = titleLineRef.current;
    const currentCategoryRefs = categoryRefs.current;
    const currentItemRefs = itemRefs.current;

    const initializeGsapAnimation = () => {
      if (!currentSectionNode || !currentTitleNode || !currentTitleLineNode) return;
      if (createdTweensRef.current.length > 0 && createdTweensRef.current[0]?.isActive?.()) return;

      createdTweensRef.current = [];

      createdTweensRef.current.push(
        gsap.fromTo(
          currentTitleNode,
          { opacity: 0, y: 100 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: currentSectionNode,
              start: "top 70%",
              toggleActions: "play none none reverse",
            },
          }
        )
      );

      createdTweensRef.current.push(
        gsap.fromTo(
          currentTitleLineNode,
          { width: "0%", opacity: 0 },
          {
            width: "100%",
            opacity: 1,
            duration: 1.5,
            ease: "power3.inOut",
            delay: 0.3,
            scrollTrigger: {
              trigger: currentSectionNode,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        )
      );

      currentCategoryRefs.forEach((categoryNode, catIndex) => {
        if (categoryNode) {
          createdTweensRef.current.push(
            gsap.fromTo(
              categoryNode,
              { opacity: 0, y: -30 },
              {
                opacity: 1,
                y: 0,
                duration: 0.6,
                delay: 0.1 * catIndex,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: categoryNode,
                  start: "top 90%",
                  toggleActions: "play none none reverse",
                },
              }
            )
          );
        }

        if (currentItemRefs[catIndex] && currentItemRefs[catIndex].length > 0) {
          createdTweensRef.current.push(
            gsap.fromTo(
              currentItemRefs[catIndex],
              { opacity: 0, y: 20 },
              {
                opacity: 1,
                y: 0,
                duration: 0.5,
                ease: "power2.out",
                stagger: {
                  grid: "auto",
                  from: "start",
                  each: 0.02,
                  amount: 1.2,
                },
                delay: 0.2 + 0.05 * catIndex,
                scrollTrigger: {
                  trigger: categoryNode,
                  start: "top 90%",
                  toggleActions: "play none none reverse",
                },
              }
            )
          );
        }
      });

      ScrollTrigger.refresh();
    };

    animationInitTimeoutId = setTimeout(initializeGsapAnimation, 200);

    return () => {
      clearTimeout(animationInitTimeoutId);

      cleanupTimeoutId = setTimeout(() => {
        createdTweensRef.current.forEach((tween) => {
          if (tween?.scrollTrigger) tween.scrollTrigger.kill();
          tween?.kill();
        });
        createdTweensRef.current = [];
      }, 200);

      return () => clearTimeout(cleanupTimeoutId);
    };
  }, []);

  return (
    <section
      id="technologies"
      ref={sectionRef}
      className="py-20 bg-gradient-to-b from-violet-900 to-black text-gray-100"
    >
      <div className="container mx-auto px-4 mt-4 md:mt-10 text-center">
        <h2
          ref={titleRef}
          className="text-4xl md:text-6xl font-bold mt-2 lg:mt-0 mb-2 md:mb-4 text-center text-purple-200 opacity-0"
        >
          My Tech Stack
        </h2>
        <div
          ref={titleLineRef}
          className="w-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto opacity-0 mb-12 md:mb-28"
        ></div>

        {categorizedTechStack.map((category, catIndex) => (
          <div key={catIndex} className="mb-16">
            <h3
              ref={addCategoryRef}
              className="text-3xl text-center lg:text-left font-bold mb-8 text-purple-400 underline underline-offset-4 decoration-purple-300 opacity-0"
            >
              {category.category}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 justify-items-center">
              {category.items.map((tech, itemIndex) => (
                <div
                  key={itemIndex}
                  ref={(el) => addItemRef(catIndex, el)}
                  className="flex flex-col items-center p-4 border border-purple-400/50 rounded-lg shadow-lg hover:shadow-violet-500/30 transition-shadow duration-300 transform w-full max-w-[150px] min-h-[150px] justify-center opacity-0"
                  style={{
                    background:
                      "radial-gradient(circle at center, rgba(88, 28, 135, 1) 0%, rgba(26, 26, 26, 0.8) 100%)",
                  }}
                >
                  {typeof tech.icon === "function" ? (
                    <tech.icon className={`w-12 h-12 mb-3 ${tech.color}`} />
                  ) : (
                    <Icon icon={tech.icon} className={`w-12 h-12 mb-3 ${tech.color}`} style={{ fill: 'currentColor' }}/>
                  )}
                  <p className="text-lg font-medium text-gray-200">{tech.name}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TechStack;
