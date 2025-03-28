import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [bgComplete, setBgComplete] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("Home");
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { page: "Home", label: "Home" },
    { page: "About", label: "About" },
    { page: "Portfolio", label: "Portfolio" },
    { page: "Contact", label: "Contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      const sections = navItems
        .map((item) => {
          const section = document.getElementById(item.page);
          if (section) {
            return {
              id: item.page,
              offset: section.offsetTop - 550,
              height: section.offsetHeight,
            };
          }
          return null;
        })
        .filter(Boolean);

      const currentPosition = window.scrollY;
      const active = sections.find(
        (section) =>
          currentPosition >= section.offset &&
          currentPosition < section.offset + section.height
      );
      if (active) {
        setActiveSection(active.id);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [navItems]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        setBgComplete(true);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setBgComplete(false);
    }
  }, [isOpen]);

  const handleNavClick = (e, page) => {
    e.preventDefault();
    navigate(`?page=${page}`);
    setIsOpen(false);
  };

  return (
    <nav
      className={`fixed w-full top-0 z-50 transition-all duration-500 ${
        isOpen
          ? "bg-[#030014] opacity-100"
          : scrolled
          ? "bg-[#030014]/50 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-[10%]">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <a
              href="?page=Home"
              onClick={(e) => handleNavClick(e, "Home")}
              className="text-xl font-bold bg-gradient-to-r from-[#a855f7] to-[#6366f1] bg-clip-text text-transparent"
            >
              Myron Ilchenko
            </a>
          </div>

          <div className="hidden md:block">
            <div className="ml-8 flex items-center space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={`?page=${item.page}`}
                  onClick={(e) => handleNavClick(e, item.page)}
                  className="group relative px-1 py-2 text-sm font-medium"
                >
                  <span
                    className={`relative z-10 transition-colors duration-300 ${
                      activeSection === item.page
                        ? "bg-gradient-to-r from-[#6366f1] to-[#a855f7] bg-clip-text text-transparent font-semibold"
                        : "text-[#e2d3fd] group-hover:text-white"
                    }`}
                  >
                    {item.label}
                  </span>
                  <span
                    className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#6366f1] to-[#a855f7] transform origin-left transition-transform duration-300 ${
                      activeSection === item.page
                        ? "scale-x-100"
                        : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </a>
              ))}
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`relative p-2 text-[#e2d3fd] hover:text-white transition-transform duration-300 ease-in-out transform ${
                isOpen ? "rotate-90 scale-125" : "rotate-0 scale-100"
              }`}
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      <div
        className={`md:hidden fixed inset-0 bg-[#030014] transition-all duration-500 ease-in-out ${
          isOpen
            ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
            : "opacity-0 -translate-y-full scale-95 pointer-events-none"
        }`}
        style={{ top: "64px", height: "40%" }}
      >
        <div className="flex flex-col h-full">
          <div className="px-4 py-6 space-y-4 flex-1">
            {navItems.map((item, index) => (
              <a
                key={item.label}
                href={`?page=${item.page}`}
                onClick={(e) => handleNavClick(e, item.page)}
                className={`block px-4 py-3 text-lg font-medium transition-all duration-500 ease-out transform ${
                  activeSection === item.page
                    ? "bg-gradient-to-r from-[#6366f1] to-[#a855f7] bg-clip-text text-transparent font-semibold"
                    : "text-[#e2d3fd] hover:text-white"
                }`}
                style={{
                  transitionDelay: bgComplete ? `${index * 100 + 200}ms` : "0ms",
                  transform: bgComplete
                    ? "translateX(0) translateY(0)"
                    : "translateX(50px) translateY(-10px)",
                  opacity: bgComplete ? 1 : 0,
                }}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;