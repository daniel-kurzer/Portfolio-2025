import { useRef, useEffect } from "react"
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const ProgressBar = () => {

    const progressBarRef = useRef(null);
    const progressFillRef = useRef(null);

    // Speichere die ScrollTrigger-Instanz hier
    const progressScrollTriggerInstance = useRef(null); 
    const progressColorTween = useRef(null); // Ref für den Farb-Tween, um ihn zu killen

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        let animationInitTimeoutId; // Zum Speichern des Initialisierungs-Timeouts
        let cleanupTimeoutId; // Für den Cleanup-Timeout

        const currentProgressFillRef = progressFillRef.current; // Lokale Kopie der Ref

        // Funktion zur Initialisierung der GSAP-Animationen
        const initializeGsapAnimation = () => {
            // Sicherstellen, dass das Füllelement existiert
            if (!currentProgressFillRef) {
                console.warn("ProgressBar: progressFillRef.current is null. Cannot initialize GSAP.");
                return;
            }

            // Vermeiden Sie die Re-Initialisierung, wenn bereits eine Instanz existiert UND sie noch aktiv ist
            if (progressScrollTriggerInstance.current && progressScrollTriggerInstance.current.isActive) {
                console.log("ProgressBar: ScrollTrigger bereits initialisiert und aktiv, überspringe Re-Initialisierung.");
                return;
            }

            console.log("ProgressBar: Starte GSAP-Animation Initialisierung.");

            // Cleanup previous instance if effect runs multiple times (e.g., in dev mode strict)
            // Dies ist jetzt Teil des allgemeinen Cleanups unten, aber zur Sicherheit hier nochmal
            if (progressScrollTriggerInstance.current) {
                progressScrollTriggerInstance.current.kill();
                progressScrollTriggerInstance.current = null;
            }
            if (progressColorTween.current) {
                progressColorTween.current.kill();
                progressColorTween.current = null;
            }


            // Erstelle den ScrollTrigger und speichere die Instanz
            progressScrollTriggerInstance.current = gsap.to(currentProgressFillRef, {
                width: "100%",
                ease: "none",
                scrollTrigger: {
                    trigger: document.body, // Trigger ist der gesamte Body
                    start: "top top", // Startet, wenn der Body oben ist
                    end: "bottom bottom", // Endet, wenn der Body unten ist
                    scrub: 0.3,
                    // markers: true, // Können Sie hier auch aktivieren, um den Marker zu sehen
                    onUpdate: (self) => {
                        const progress = self.progress.toFixed(2);

                        let newColor = "#c54bbc"; // Standardfarbe
                        if (progress > 0.75) {
                            newColor = "#7e22ce";
                        } else if (progress > 0.5) {
                            newColor = "#a855f7";
                        } else if (progress > 0.10) {
                            newColor = "#b53389";
                        }

                        const currentColor = gsap.getProperty(currentProgressFillRef, "backgroundColor");
                        if (currentColor !== newColor) {
                            if (progressColorTween.current) {
                                progressColorTween.current.kill();
                            }
                            progressColorTween.current = gsap.to(currentProgressFillRef, { backgroundColor: newColor, duration: 0.5 });
                        }
                    }
                }
            });

            console.log("ProgressBar: ScrollTrigger created.", progressScrollTriggerInstance.current);
            ScrollTrigger.refresh(); // Globaler Refresh nach der Initialisierung
        };

        animationInitTimeoutId = setTimeout(initializeGsapAnimation, 200); // Verzögerte Initialisierung

        // Cleanup-Funktion
        return () => {
            console.log("ProgressBar: Cleanup function triggered.");
            clearTimeout(animationInitTimeoutId); // Den Initialisierungs-Timeout clearen

            cleanupTimeoutId = setTimeout(() => {
                if (progressScrollTriggerInstance.current) {
                    progressScrollTriggerInstance.current.kill(); 
                    progressScrollTriggerInstance.current = null;
                    console.log("ProgressBar: ScrollTrigger killed.");
                } else {
                    console.log("ProgressBar: No ScrollTrigger instance to kill (was null/undefined).");
                }
                if (progressColorTween.current) {
                    progressColorTween.current.kill();
                    progressColorTween.current = null;
                }
                // ScrollTrigger.refresh(); // ENTFERNT: Dies könnte die Race Condition verschärfen
                console.log("ProgressBar: Cleanup complete.");
            }, 100); // Kleiner Timeout für den Cleanup

            return () => clearTimeout(cleanupTimeoutId);
        }
    }, []) // Leeres Dependency-Array

  return (
    <div ref={progressBarRef} className="fixed top-0 left-0 w-full h-[5px] bg-gray-800 z-50">
        <div ref={progressFillRef} className="h-full w-0 bg-[#A1045a] transition-colors duration-300" style={{ width: "0%" }}>
        </div>
    </div>
  )
}

export default ProgressBar
