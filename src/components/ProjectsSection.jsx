import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SlShareAlt } from "react-icons/sl";

// Verschiebe PROJECT_IMAGES außerhalb der Komponente für Stabilität und ESLint
const PROJECT_IMAGES = [
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
    title: "KURZER CODE. Webdev-page",
    imageSrc: "images/KurzerCODE.png",
    github:
      "https://daniel-kurzer/KurzerCODE",
  },
  {
    id: 4,
    title: "OPTIMAL BITE. Food-Ordering Webshop",
    imageSrc: "images/Optimal_Bite.png",
    github: "https://github.com/daniel-kurzer/OPTIMAL-BITE/tree/main/Food-App-React.JS",
  },
];

const ProjectsSection = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const titleLineRef = useRef(null);
  const projectItemRefs = useRef([]); // Referenzen für jedes einzelne Projekt-Item

  // NEU: useRef für die Sammlung aller ScrollTrigger-Instanzen dieser Komponente
  const createdTriggersRef = useRef([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    let animationInitTimeoutId; // Zum Speichern des Initialisierungs-Timeouts
    let cleanupTimeoutId; // Für den Cleanup-Timeout

    // Erstelle Kopien der Ref-Werte, die innerhalb des Effekts konstant bleiben
    const currentSectionNode = sectionRef.current;
    const currentTitleNode = titleRef.current;
    const currentTitleLineNode = titleLineRef.current;
    const currentProjectItemRefs = projectItemRefs.current; // Kopie des Arrays von Refs

    // Funktion zur Initialisierung der GSAP-Animationen
    const initializeGsapAnimation = () => {
      // Sicherstellen, dass die Haupt-Refs existieren
      if (!currentSectionNode || !currentTitleNode || !currentTitleLineNode) {
        console.warn("ProjectsSection: Einige DOM-Refs fehlen. GSAP-Initialisierung übersprungen.");
        return;
      }

      // Vermeiden Sie die Re-Initialisierung, wenn bereits Instanzen existieren und aktiv sind
      // Wir prüfen createdTriggersRef.current.length, da es im StrictMode geleert wird.
      if (createdTriggersRef.current.length > 0 && createdTriggersRef.current[0].isActive) {
        console.log("ProjectsSection: ScrollTriggers bereits initialisiert und aktiv, überspringe Re-Initialisierung.");
        return;
      }

      console.log("ProjectsSection: Starte GSAP-Animation Initialisierung.");

      // Leere das Array der erstellten Trigger bei jedem neuen Effekt-Lauf (wichtig für StrictMode)
      createdTriggersRef.current = [];

      // Titel- und Linien-Animation
      createdTriggersRef.current.push(
        gsap.fromTo(
          currentTitleNode,
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: currentSectionNode,
              start: "top 80%",
              toggleActions: "play none none reverse",
              // markers: true,
            },
          }
        )
      );

      createdTriggersRef.current.push(
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
              // markers: true,
            },
          }
        )
      );

      // Parallax-Effekt für die gesamte Sektion (optional)
      createdTriggersRef.current.push(
        gsap.fromTo(
          currentSectionNode,
          { backgroundPosition: "50% 0%" },
          {
            backgroundPosition: "50% 100%",
            ease: "none",
            scrollTrigger: {
              trigger: currentSectionNode,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
              // markers: true,
            },
          }
        )
      );

      // Animationen für jedes einzelne Projekt-Item mit gestaffeltem Delay
      const baseDelay = 0.3; // Start-Delay für das erste Projekt (nach dem Trigger)
      const staggerDelay = 0.2; // Zusätzliches Delay pro nachfolgendem Projekt

      currentProjectItemRefs.forEach((item, index) => {
        if (item) { // Sicherstellen, dass das Item-Element existiert
          gsap.set(item, { opacity: 0, y: 120 });

          const itemTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: item,
              start: "top 90%",
              toggleActions: "play none none reverse",
              // markers: true, // DEBUG: Hier aktivieren, um jeden Item-Trigger zu sehen
            },
          });

          itemTimeline.to(item, {
            opacity: 1,
            y: 0,
            duration: 1.5,
            ease: "power2.out",
            delay: baseDelay + index * staggerDelay,
          });

          // Wichtig: Speichere den ScrollTrigger des Timelines
          if (itemTimeline.scrollTrigger) {
            createdTriggersRef.current.push(itemTimeline.scrollTrigger);
          }
        }
      });

      // WICHTIG: ScrollTrigger.refresh() am Ende
      ScrollTrigger.refresh();
    };

    // Initialisiere die Animation verzögert
    animationInitTimeoutId = setTimeout(initializeGsapAnimation, 200);

    // Cleanup-Funktion
    return () => {
      console.log("--- ProjectsSection Cleanup START ---");
      console.log("ProjectsSection: Anzahl der zu killenden Trigger:", createdTriggersRef.current.length);

      clearTimeout(animationInitTimeoutId); // Den Initialisierungs-Timeout clearen

      cleanupTimeoutId = setTimeout(() => {
        createdTriggersRef.current.forEach((trigger) => {
          if (trigger) { // Sicherstellen, dass der Trigger existiert
            console.log("ProjectsSection: Killing specific ScrollTrigger:", trigger);
            // ProjectsSection hat keine gepinnten Elemente, daher kein disable(true)
            trigger.kill(true); // Killt den ScrollTrigger UND seine Animation
          } else {
            console.log("ProjectsSection: Trigger ist null, überspringe Kill.");
          }
        });
        createdTriggersRef.current = []; // Array leeren
        // ScrollTrigger.refresh(); // ENTFERNT: Dies könnte die Race Condition verschärfen
        console.log("--- ProjectsSection Cleanup ENDE --- (nach Timeout)");
      }, 200); // Timeout von 200ms beibehalten

      return () => clearTimeout(cleanupTimeoutId); // Timeout beim Unmount clearen
    };
  }, []); // Leeres Dependency Array, da PROJECT_IMAGES global ist und sich nicht ändert.

  // Hilfsfunktion zum Sammeln der Referenzen für die Projekt-Items
  const addProjectItemRef = (el) => {
    if (el && !projectItemRefs.current.includes(el)) {
      projectItemRefs.current.push(el);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative py-20 bg-gradient-to-b from-violet-900 to-black pt-16 md:pt-24 overflow-hidden"
    >
      {/* SECTION TITLE */}
      <div className="container mx-auto px-4 mt-8 mb-8 relative z-10 flex-shrink-0">
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

      {/* PROJECTS GRID / FLEX CONTAINER */}
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10 mt-12">
        {PROJECT_IMAGES.map((project, index) => (
          <div
            key={project.id}
            ref={addProjectItemRef} // Referenz für jedes Projekt-Item
            className="flex flex-col items-center p-6 glass-effect shadow-xl
                       transform transition-transform duration-300 !hover:scale-105
                       min-h-[300px] md:min-h-[435px] lg:min-h-[435px]" // Diese min-h Werte kannst du jetzt genauer justieren, da die Bildhöhen fest sind
          >
            {/* Bild-Wrapper */}
            <div className="w-full flex justify-center items-center aspect-video overflow-hidden mb-6">
              <img
                className="project-image w-full h-full object-cover rounded-xl shadow-lg"
                src={project.imageSrc}
                alt={`Screenshot of ${project.title}`}
                loading="lazy"
              />
            </div>
            {/* Titel-Container */}
            <h3 className="project-title flex items-center gap-3 text-2xl md:text-3xl font-bold underline underline-offset-4 decoration-purple-500 decoration-2 text-gray-200 text-center z-20">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-purple-200 gap-3 hover:text-gray-400 transition-colors duration-300 cursor-pointer"
                >
                  {project.title}
                  <SlShareAlt className="translate-y-[-3px]" />
                </a>
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;
