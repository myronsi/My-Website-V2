import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
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

const LandingPage = ({ showWelcome, setShowWelcome }) => {
  const location = useLocation();

  useEffect(() => {
    if (!showWelcome) {
      const params = new URLSearchParams(location.search);
      const page = params.get("page");
      if (page) {
        const section = document.getElementById(page);
        if (section) {
          const navbarHeight = 80; // настройте под высоту вашего навбара
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
          {/* Добавляем id и, при желании, класс для отступа */}
          <Home id="Home" className="scroll-mt-20" />
          <About id="About" className="scroll-mt-20" />
          <Portfolio id="Portfolio" className="scroll-mt-20" />
          <ContactPage id="Contact" className="scroll-mt-20" />
          <footer>
            <center>
              <hr className="my-3 border-gray-400 opacity-15 sm:mx-auto lg:my-6 text-center" />
              <span className="block text-sm pb-4 text-gray-500 text-center dark:text-gray-400">
                Copyright © 2025{" "}
                <a href="https://flowbite.com/" className="hover:underline">
                  Viserix
                </a>
                ⠀All rights reserved
                <br />
                <a href="https://github.com/EkiZR/Portofolio_V5">
                  Credits to https://github.com/EkiZR/Portofolio_V5
                </a>
              </span>
            </center>
          </footer>
        </>
      )}
    </>
  );
};

const ProjectPageLayout = () => (
  <>
    <ProjectDetails />
    <footer>
      <center>
        <hr className="my-3 border-gray-400 opacity-15 sm:mx-auto lg:my-6 text-center" />
        <span className="block text-sm pb-4 text-gray-500 text-center dark:text-gray-400">
          Copyright © 2025{" "}
          <a href="https://flowbite.com/" className="hover:underline">
            Viserix
          </a>
          ⠀All rights reserved
        </span>
      </center>
    </footer>
  </>
);

function App() {
  const [showWelcome, setShowWelcome] = useState(true);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <LandingPage showWelcome={showWelcome} setShowWelcome={setShowWelcome} />
          }
        />
        <Route path="/project/:id" element={<ProjectPageLayout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;