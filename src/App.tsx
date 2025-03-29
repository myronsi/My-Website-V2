import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import "./index.css";
import Home from "./Pages/Home";
import About from "./Pages/About";
import AnimatedBackground from "./components/Background";
import Navbar from "./components/Navbar";
import Portfolio from "./Pages/Portfolio";
import ContactPage from "./Pages/Contact";
import ProjectDetails from "./components/ProjectDetail";
import WelcomeScreen from "./Pages/WelcomeScreen";
import { AnimatePresence } from "framer-motion";
import SectionObserver from "./components/SectionObserver";

interface LandingPageProps {
  showWelcome: boolean;
  setShowWelcome: Dispatch<SetStateAction<boolean>>;
}

const LandingPage: React.FC<LandingPageProps> = ({ showWelcome, setShowWelcome }) => {
  const location = useLocation();

  useEffect(() => {
    if (!showWelcome) {
      const params = new URLSearchParams(location.search);
      const page = params.get("page");
      if (page && !page.startsWith("project/")) {
        const section = document.getElementById(page);
        if (section) {
          const navbarHeight = 80;
          const sectionPosition = section.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = sectionPosition - navbarHeight;
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
      }
    }
  }, [showWelcome, location.search]);

  return (
    <>
      <AnimatePresence mode="wait">
        {showWelcome && (
          <WelcomeScreen onLoadingComplete={() => setShowWelcome(false)} />
        )}
      </AnimatePresence>

      {!showWelcome && (
        <>
          <Navbar />
          <AnimatedBackground />
          <SectionObserver sectionIds={["Home", "About", "Portfolio", "Contact"]} threshold={0.5} />

          <section id="Home" className="scroll-mt-20">
            <Home />
          </section>
          <section id="About" className="scroll-mt-20">
            <About />
          </section>
          <section id="Portfolio" className="scroll-mt-20">
            <Portfolio />
          </section>
          <section id="Contact" className="scroll-mt-20">
            <ContactPage />
          </section>
          <footer>
            <center>
              <hr className="my-3 border-gray-400 opacity-15 sm:mx-auto lg:my-6 text-center" />
              <span className="block text-sm pb-4 text-gray-500 text-center dark:text-gray-400">
                Copyright © 2025{" "}
                <a className="hover:underline">
                  Viserix
                </a>
                ⠀All rights reserved
              </span>
            </center>
          </footer>
        </>
      )}
    </>
  );
};

interface AppRoutesProps {
  showWelcome: boolean;
  setShowWelcome: Dispatch<SetStateAction<boolean>>;
}

const AppRoutes: React.FC<AppRoutesProps> = ({ showWelcome, setShowWelcome }) => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const page = params.get("page");

  if (page?.startsWith("project/")) {
    const id = page.split("/")[1];
    return <ProjectDetails id={id} />;
  }
  return <LandingPage showWelcome={showWelcome} setShowWelcome={setShowWelcome} />;
};

function App() {
  const [showWelcome, setShowWelcome] = useState<boolean>(true);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="*"
          element={<AppRoutes showWelcome={showWelcome} setShowWelcome={setShowWelcome} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;