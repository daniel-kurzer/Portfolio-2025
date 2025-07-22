import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";


const CustomCursor = () => {
    // Refs for cursor elements
    const cursorRef = useRef(null);
    const cursorBorderRef = useRef(null);

    // Dynamisch prüfen, ob mobile
    const [isMobile, setIsMobile] = useState(
      typeof window !== "undefined" && window.matchMedia("(max-width: 768px)").matches
    );

    useEffect(() => {
      const handleResize = () => {
        setIsMobile(window.matchMedia("(max-width: 768px)").matches);
      };
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
      if (isMobile) return;

      // Get Cursor elements
      const cursor = cursorRef.current
      const cursorBorder = cursorBorderRef.current
 
      // initial position off-screen
      gsap.set([cursor, cursorBorder], {
        xPercent: -50,
        yPercent: -50
      })

      // Variables for cursor position with different speeds
      const xTo = gsap.quickTo(cursor, "x", {
        duration: 0.2, ease: "power3.out"
      })

      const yTo = gsap.quickTo(cursor, "y", {
        duration: 0.2, ease: "power3.out"
      })

      const xToBorder = gsap.quickTo(cursorBorder, "x", {duration: 0.5, ease: "power3.out"})
      const yToBorder = gsap.quickTo(cursorBorder, "y", {duration: 0.5, ease: "power3.out"})

      // Mouse move handler
      const handleMouseMove = (e) => {
        xTo(e.clientX)
        yTo(e.clientY)
        xToBorder(e.clientX)
        yToBorder(e.clientY)
      }

      // Add mouse move listener
      window.addEventListener("mousemove", handleMouseMove)

      // Add Click Animation
      document.addEventListener("mousedown", () => {
        gsap.to([cursor, cursorBorder], {
          scale: 0.6, duration: 0.2
        })
      })

      document.addEventListener("mouseup", () => {
        gsap.to([cursor, cursorBorder], {
          scale: 1, duration: 0.2
        })
      })

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
      };
    }, [isMobile])

    if (isMobile) {
      return null
    }

  return (
    <>
      {/* MAIN CURSOR DOT */}
      <div ref={cursorRef} className="fixed top-0 left-0 w-[20px] h-[20px] bg-white rounded-full pointer-events-none z-[999] mix-blend-difference" />

      <div ref={cursorBorderRef} className="fixed top-0 w-[40px] h-[40px] border border-white rounded-full pointer-events-none z-[999] mix-blend-difference opacity-50"></div>
    </>
  )
}

export default CustomCursor