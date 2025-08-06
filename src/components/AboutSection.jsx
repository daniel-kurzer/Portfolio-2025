import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const AboutSection = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const titleLineRef = useRef(null);
  const introRef = useRef(null);
  const starsRef = useRef([]);

  // NEU: useRef für die Sammlung aller GSAP-Tween/ScrollTrigger-Instanzen dieser Komponente
  const createdTriggersRef = useRef([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    let animationInitTimeoutId; // Zum Speichern des Initialisierungs-Timeouts
    let cleanupTimeoutId; // Für den Cleanup-Timeout

    // Erstelle Kopien der Ref-Werte, die innerhalb des Effekts konstant bleiben
    const currentSectionNode = sectionRef.current;
    const currentTitleNode = titleRef.current;
    const currentTitleLineNode = titleLineRef.current;
    const currentIntroNode = introRef.current;
    const currentStars = starsRef.current; // Kopie des Arrays von Refs

    // Funktion zur Initialisierung der GSAP-Animationen
    const initializeGsapAnimation = () => {
      // Sicherstellen, dass die Haupt-Refs existieren
      if (!currentSectionNode || !currentTitleNode || !currentTitleLineNode || !currentIntroNode) {
        console.warn("AboutSection: Einige DOM-Refs fehlen. GSAP-Initialisierung übersprungen.");
        return;
      }

      // Vermeiden Sie die Re-Initialisierung, wenn bereits Instanzen existieren und aktiv sind
      // Wir prüfen createdTriggersRef.current.length, da es im StrictMode geleert wird.
      if (createdTriggersRef.current.length > 0 && createdTriggersRef.current[0].isActive) {
        console.log("AboutSection: ScrollTriggers bereits initialisiert und aktiv, überspringe Re-Initialisierung.");
        return;
      }

      console.log("AboutSection: Starte GSAP-Animation Initialisierung.");

      // Leere das Array der erstellten Trigger bei jedem neuen Effekt-Lauf (wichtig für StrictMode)
      createdTriggersRef.current = [];

      // Title Animation
      createdTriggersRef.current.push(
        gsap.fromTo(
          currentTitleNode,
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            scrollTrigger: {
              trigger: currentSectionNode,
              start: "top 70%",
              end: "bottom top", // Behält den Endpunkt bei
              toggleActions: "play none none reverse",
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
            },
          }
        )
      );

      // Intro Animation
      createdTriggersRef.current.push(
        gsap.fromTo(
          currentIntroNode,
          { y: 100, opacity: 0, filter: "blur(10px)" },
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 1.5,
            scrollTrigger: {
              trigger: currentSectionNode,
              start: "top 60%",
              end: "bottom top", // Behält den Endpunkt bei
              toggleActions: "play none none reverse",
            },
          }
        )
      );

      // Stars Animation
      if (currentStars.length > 0) {
        currentStars.forEach((star, index) => {
          const direction = index % 2 === 0 ? 1 : -1;
          const speed = 0.5 + Math.random() * 0.5;

          createdTriggersRef.current.push(
            gsap.to(star, {
              x: `${direction * (100 + index * 20)}`,
              y: `${direction * -50 - index * 10}`,
              rotation: direction * 360,
              ease: "none",
              scrollTrigger: {
                trigger: currentSectionNode, // Trigger ist die Sektion, nicht der Stern selbst
                start: "top bottom",
                end: "bottom top",
                scrub: speed,
              },
            })
          );
        });
      }

      // Scroll Trigger refresh for Image-load
      const image = currentSectionNode.querySelector('img[alt="Profile-Image"]');
      if (image && !image.complete) {
        image.onload = () => ScrollTrigger.refresh();
      } else {
        ScrollTrigger.refresh();
      }
    };

    // Initialisiere die Animation verzögert
    animationInitTimeoutId = setTimeout(initializeGsapAnimation, 200);

    // Cleanup-Funktion
    return () => {
      console.log("--- AboutSection Cleanup START ---");
      console.log("AboutSection: Anzahl der zu killenden Trigger:", createdTriggersRef.current.length);

      clearTimeout(animationInitTimeoutId); // Den Initialisierungs-Timeout clearen

      cleanupTimeoutId = setTimeout(() => {
        createdTriggersRef.current.forEach((tween) => {
          if (tween) { // Sicherstellen, dass der Tween existiert
            if (tween.scrollTrigger) { // Prüfen, ob ein assoziierter ScrollTrigger existiert
              console.log("AboutSection: Killing specific ScrollTrigger associated with tween:", tween.scrollTrigger);
              // In AboutSection gibt es kein Pinning, daher kein disable(true)
              tween.scrollTrigger.kill(); 
            }
            // Dann killen wir den Tween selbst
            tween.kill(); 
          } else {
            console.log("AboutSection: Tween ist null, überspringe Kill.");
          }
        });
        createdTriggersRef.current = []; // Array leeren
        // ScrollTrigger.refresh(); // ENTFERNT: Dies könnte die Race Condition verschärfen
        console.log("--- AboutSection Cleanup ENDE --- (nach Timeout)");
      }, 200); // Timeout von 200ms beibehalten

      return () => clearTimeout(cleanupTimeoutId); // Cleanup-Timeout clearen
    };
  }, []); // Leeres Dependency Array

  const addToStars = (el) => {
    if (el && !starsRef.current.includes(el)) {
      starsRef.current.push(el);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative overflow-hidden bg-gradient-to-b from-violet-900 to-black flex flex-col z-10 min-h-screen pt-24 pb-24"
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

      {/* Haupt-Inhaltscontainer der About-Sektion */}
      <div className="container mx-auto px-4 flex flex-col items-center relative z-10 flex-grow">
        {/* Titel-Wrapper - für besseres Padding/Margin Management des Titels */}
        <div className="w-full flex flex-col items-center mb-8 md:mb-16">
          <h1
            ref={titleRef}
            className="text-4xl md:text-6xl font-bold mt-16 lg:mt-8 mb-4 text-center text-purple-200 opacity-0"
          >
            About me
          </h1>
          <div
            ref={titleLineRef}
            className="w-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto opacity-0"
          ></div>
        </div>

        {/* Intro-Text und Bild Container */}
        <div
          ref={introRef}
          className="w-full flex md:flex-row flex-col justify-between lg:px-24 px-5 items-center text-center opacity-0 mt-4 md:mt-0"
        >
          {/* Text-Spalte */}
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
          {/* Bild-Spalte */}
          <img
            className="lg:h-[40rem] md:h-[25rem] h-[20rem]"
            src="images/DK-RB-1.png"
            alt="Profile-Image"
          />
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
