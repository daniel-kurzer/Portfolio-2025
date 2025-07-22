import { useEffect } from "react"
import { gsap } from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"

import AboutSection from "./components/AboutSection"
import CustomCursor from "./components/CustomCursor"
import Header from "./components/Header"
import HeroSection from "./components/HeroSection"
import ProjectsSection from "./components/ProjectsSection"
import ContactSection from "./components/ContactSection"
import Footer from "./components/Footer"
import ProgressBar from "./components/ProgressBar"
import ExperienceSection from "./components/ExperienceSection"
import TechStack from "./components/TechStack"

export default function App() {

    useEffect(() => {
      // Register ScrollTrigger plugin
      gsap.registerPlugin(ScrollTrigger)

      // Refresh ScrollTrigger when page is fully loaded
      ScrollTrigger.refresh()

      // Clean up ScrollTrigger on component unmount
      return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
      }
    }, [])

  return (
    <>
      <Header/>
      <HeroSection />
      <CustomCursor />
      <AboutSection />
      <ProjectsSection />
      <ExperienceSection />
      <TechStack />
      <ContactSection />
      <Footer />
      <ProgressBar />
    </>
  )
}