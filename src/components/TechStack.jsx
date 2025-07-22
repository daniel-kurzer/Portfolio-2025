import { motion } from "framer-motion";
import {
  FaReact,
  FaHtml5,
  FaCss3Alt,
  FaJsSquare,
  FaNodeJs,
  FaJava,
  FaGitAlt,
  FaGithub,
} from "react-icons/fa";
import {
  SiTailwindcss,
  SiTypescript,
  SiNextdotjs,
  SiFramer,
  SiGreensock,
  SiFigma,
  SiMysql,
} from "react-icons/si";
import { TbBrandCSharp } from "react-icons/tb";
import splinePng from "../assets/spline-icon.png";

// Define TechStack
const categorizedTechStack = [
  {
    category: "Programming languages",
    items: [
      { name: "JavaScript", icon: FaJsSquare, color: "text-yellow-400" },
      { name: "TypeScript", icon: SiTypescript, color: "text-blue-600" },
      { name: "C#", icon: TbBrandCSharp, color: "text-purple-600" },
      { name: "Java", icon: FaJava, color: "text-red-500" },
    ],
  },
  {
    category: "Front-end development",
    items: [
      { name: "HTML5", icon: FaHtml5, color: "text-orange-500" },
      { name: "CSS3", icon: FaCss3Alt, color: "text-blue-500" },
      { name: "React", icon: FaReact, color: "text-cyan-400" },
      { name: "Next.js", icon: SiNextdotjs, color: "text-gray-300" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "text-teal-400" },
    ],
  },
  {
    category: "UI/UX & Animation",
    items: [
      { name: "Framer Motion", icon: SiFramer, color: "text-pink-500" },
      { name: "GSAP", icon: SiGreensock, color: "text-green-500" },
      {
        name: "Spline",
        icon: (
          { className } 
        ) => <img src={splinePng} alt="Spline Logo" className={className} />,
        color: "text-green-400",
      },
      { name: "Figma", icon: SiFigma, color: "text-purple-500" },
    ],
  },
  {
    category: "Backend & Databases",
    items: [
      { name: "Node.js", icon: FaNodeJs, color: "text-green-600" },
      { name: "MySQL", icon: SiMysql, color: "text-blue-800" },
    ],
  },
  {
    category: "Version management",
    items: [
      { name: "Git", icon: FaGitAlt, color: "text-red-600" },
      { name: "GitHub", icon: FaGithub, color: "text-gray-400" },
    ],
  },
];

const TechStack = () => {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  };

  return (
    <section id="technologies" className="py-20 bg-[#9a74cf50] text-gray-100">
      <div className="container mx-auto px-4 text-center">
        <motion.h2
          className="text-4xl md:text-6xl font-bold mt-8 lg:mt-0 mb-8 md:mb-16 text-center text-purple-200"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8 }}
        >
          My Tech Stack
        </motion.h2>

        {categorizedTechStack.map((category, catIndex) => (
          <div key={catIndex} className="mb-16">
            <motion.h3
              className="text-3xl text-center lg:text-left font-bold mb-8 text-purple-400 underline underline-offset-4 decoration-purple-300"
              initial={{ opacity: 0, y: -30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {category.category}
            </motion.h3>
            <motion.div
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 justify-items-center"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              {category.items.map((tech, itemIndex) => (
                <motion.div
                  key={itemIndex}
                  className="flex flex-col items-center p-4 bg-gray-800 border border-purple-600/50 rounded-lg shadow-lg hover:shadow-violet-500/30 transition-shadow duration-300 transform w-full max-w-[150px] min-h-[150px] justify-center"
                  variants={itemVariants}
                >
                  <tech.icon className={`w-12 h-12 mb-3 ${tech.color}`} />
                  <p className="text-lg font-medium text-gray-200">
                    {tech.name}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TechStack;
