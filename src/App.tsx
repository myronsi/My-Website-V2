import { BrowserRouter, Routes, Route, useLocation, useNavigate } from "react-router-dom";
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
      const pathToSection: { [key: string]: string } = {
        '/': 'Home',
        '/about': 'About',
        '/portfolio': 'Portfolio',
        '/contact': 'Contact',
      };
      
      const sectionId = pathToSection[location.pathname];
      if (sectionId) {
        const section = document.getElementById(sectionId);
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
  }, [showWelcome, location.pathname]);

  const currentYear = new Date().getFullYear();

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
          <SectionObserver
            sectionIds={["Home", "About", "Portfolio", "Contact"]}
            threshold={0.5}
          />

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
              <hr className="my-3 border-gray-300 dark:border-gray-700 opacity-50 sm:mx-auto lg:my-6 text-center" />
              <span className="block text-sm pb-4 text-gray-600 dark:text-gray-400 text-center">
                Copyright © {currentYear}{" "}
                <a className="hover:underline">Viserix</a> ⠀All rights reserved
              </span>
            </center>
          </footer>
        </>
      )}
    </>
  );
};

const NotFound: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-white dark:bg-[#030014] flex flex-col items-center justify-center">
      <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white">404</h1>
      <p className="mt-4 text-lg md:text-2xl text-gray-700 dark:text-gray-300">Page Not Found</p>
      <button
        onClick={() => navigate(-1)}
        className="mt-8 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300"
      >
        Go Back
      </button>
    </div>
  );
};

function App() {
  const [showWelcome, setShowWelcome] = useState<boolean>(true);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage showWelcome={showWelcome} setShowWelcome={setShowWelcome} />} />
        <Route path="/about" element={<LandingPage showWelcome={showWelcome} setShowWelcome={setShowWelcome} />} />
        <Route path="/portfolio" element={<LandingPage showWelcome={showWelcome} setShowWelcome={setShowWelcome} />} />
        <Route path="/contact" element={<LandingPage showWelcome={showWelcome} setShowWelcome={setShowWelcome} />} />
        <Route path="/project/:id" element={<ProjectDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;