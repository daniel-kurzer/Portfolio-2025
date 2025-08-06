import React, { useEffect, lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

// Globale Komponenten, die auf jeder Seite erscheinen sollen:
import Header from "./components/Header";
import CustomCursor from "./components/CustomCursor";
import Footer from "./components/Footer";
import ProgressBar from "./components/ProgressBar";

// Lazy-geladene Sektions-Komponenten:
const HeroSection = lazy(() => import("./components/HeroSection"));
const AboutSection = lazy(() => import("./components/AboutSection"));
const ProjectsSection = lazy(() => import("./components/ProjectsSection"));
const ExperienceSection = lazy(() => import("./components/ExperienceSection"));
const TechStack = lazy(() => import("./components/TechStack"));
const ContactSection = lazy(() => import("./components/ContactSection"));

export default function App() {
  useEffect(() => {
    // GSAP ScrollTrigger Initialisierung (global für alle Seiten)
    gsap.registerPlugin(ScrollTrigger);

    // Ein globaler ScrollTrigger.refresh() kann hier sinnvoll sein,
    // um sicherzustellen, dass GSAP das Layout nach dem initialen Render
    // und möglichen dynamischen Inhaltsänderungen korrekt neu berechnet.
    ScrollTrigger.refresh();

    // Da die einzelnen Sektionskomponenten jetzt gsap.context() für ihren Cleanup verwenden,
    // ist hier im globalen App-useEffect kein spezifischer GSAP-Cleanup mehr notwendig.
    // Die leere Return-Funktion ist daher in Ordnung.
    return () => {
      // Optional: Wenn Sie globale ScrollTrigger hätten, die NICHT in einem Kontext sind,
      // müssten Sie sie hier killen. Aber das ist hier nicht der Fall.
    };
  }, []); // Leeres Dependency Array, damit dies nur einmal beim Mounten der App ausgeführt wird

  return (
    <Router>
      <Header />
      <CustomCursor />
      <ProgressBar />
      {/* Suspense umschließt die Routes, damit alle lazy-geladenen Sektionen
          einen Fallback anzeigen können, während sie geladen werden. */}
      <Suspense fallback={<div className="flex items-center justify-center text-purple-400 font-extrabold text-center text-6xl py-64">Loading content...</div>}>
        <Routes>
          <Route path="/" element={<HeroSection />} />
          <Route path="/about" element={<AboutSection />} />
          <Route path="/projects" element={<ProjectsSection />} />
          <Route path="/experience" element={<ExperienceSection />} />
          <Route path="/techstack" element={<TechStack />} />
          <Route path="/contact" element={<ContactSection />} />
          <Route path="*" element={<div className="flex items-center justify-center font-extrabold text-center text-6xl py-64">404 - Page Not Found</div>} />
        </Routes>
      </Suspense>
      <Footer />
    </Router>
  );
}
