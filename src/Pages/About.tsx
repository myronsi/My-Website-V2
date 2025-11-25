import React, { useEffect, memo, useMemo, useCallback } from "react";
import { FileText, Code, Globe, ArrowUpRight } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useNavigate, useLocation } from "react-router-dom";
import { projects } from "../data/projectsData";

interface StatCardProps {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  color: string;
  value: number;
  label: string;
  description: string;
  animation: string;
}

const Header: React.FC = memo(() => (
  <div className="text-center lg:mb-8 mb-2 px-[5%]">
    <div className="inline-block relative group">
      <h2 
        className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]" 
        data-aos="zoom-in-up"
        data-aos-duration="600"
      >
        About Me
      </h2>
    </div>
  </div>
));

const ProfileImage: React.FC = memo(() => (
  <div className="flex justify-end items-center sm:p-12 sm:py-0 p-0 py-2">
    <div 
      className="relative group" 
      data-aos="fade-up"
      data-aos-duration="1000"
    >
      <div className="absolute -inset-6 opacity-[25%] z-0 hidden sm:block">
        <div className="absolute inset-0 bg-gradient-to-r from-violet-600 via-indigo-500 to-purple-600 rounded-full blur-2xl animate-spin-slower" />
        <div className="absolute inset-0 bg-gradient-to-l from-fuchsia-500 via-rose-500 to-pink-600 rounded-full blur-2xl animate-pulse-slow opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-t from-blue-600 via-cyan-500 to-teal-400 rounded-full blur-2xl animate-float opacity-50" />
      </div>
      <div className="relative">
        <div className="w-72 h-72 sm:w-80 sm:h-80 rounded-full overflow-hidden shadow-[0_0_40px_rgba(120,119,198,0.3)] transform transition-all duration-300 group-hover:scale-105">
          <div className="absolute inset-0 border-4 border-white/20 rounded-full z-20 transition-all duration-300 group-hover:border-white/40" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40 z-10 transition-opacity duration-300 group-hover:opacity-0 hidden sm:block" />
          <div className="absolute inset-0 bg-gradient-to-t from-purple-500/20 via-transparent to-blue-500/20 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:block" />
          <img
            src="/Photo.png"
            alt="Profile"
            className="w-full h-full object-cover transition-all duration-300 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300 z-20 hidden sm:block">
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
            <div className="absolute inset-0 bg-gradient-to-bl from-transparent via-white/10 to-transparent transform translate-y-full group-hover:-translate-y-full transition-transform duration-500 delay-100" />
            <div className="absolute inset-0 rounded-full border-8 border-white/10 scale-0 group-hover:scale-100 transition-transform duration-300 animate-pulse-slow" />
          </div>
        </div>
      </div>
    </div>
  </div>
));

const StatCard: React.FC<StatCardProps> = memo(({ 
  icon: Icon, 
  color, 
  value, 
  label, 
  description, 
  animation 
}) => (
  <div data-aos={animation} data-aos-duration={1300} className="relative group">
    <div className="relative z-10 bg-white dark:bg-gray-900/50 backdrop-blur-lg rounded-2xl p-6 border border-gray-300 dark:border-white/10 overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl h-full flex flex-col justify-between">
      <div className={`absolute -z-10 inset-0 bg-gradient-to-br ${color} opacity-5 dark:opacity-10 group-hover:opacity-10 dark:group-hover:opacity-20 transition-opacity duration-300`}></div>
      <div className="flex items-center justify-between mb-4">
        <div className="w-16 h-16 rounded-full flex items-center justify-center bg-gray-100 dark:bg-white/10 transition-transform">
          <Icon className="w-8 h-8 text-gray-700 dark:text-white" />
        </div>
        <span 
          className="text-4xl font-bold text-gray-900 dark:text-white"
          data-aos="fade-up-left"
          data-aos-duration="1500"
          data-aos-anchor-placement="top-bottom"
        >
          {value}
        </span>
      </div>
      <div>
        <p 
          className="text-sm uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-2"
          data-aos="fade-up"
          data-aos-duration="800"
          data-aos-anchor-placement="top-bottom"
        >
          {label}
        </p>
        <div className="flex items-center justify-between">
          <p 
            className="text-xs text-gray-600 dark:text-gray-400"
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-anchor-placement="top-bottom"
          >
            {description}
          </p>
          <ArrowUpRight className="w-4 h-4 text-gray-500 dark:text-white/50 group-hover:text-gray-900 dark:group-hover:text-white transition-colors" />
        </div>
      </div>
    </div>
  </div>
));

const AboutPage: React.FC = memo(() => {
  const navigate = useNavigate();
  const location = useLocation();

  const { totalProjects, YearExperience } = useMemo(() => {
    const totalProjects = projects.length;
    const startDate = new Date("2023-01-02");
    const today = new Date();
    const experience =
      today.getFullYear() -
      startDate.getFullYear() -
      (today < new Date(today.getFullYear(), startDate.getMonth(), startDate.getDate())
        ? 1
        : 0);
    return { totalProjects, YearExperience: experience };
  }, []);

  useEffect(() => {
    const initAOS = () => {
      AOS.init({ once: false });
    };
    initAOS();
    let resizeTimer: any;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(initAOS, 250);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimer);
    };
  }, []);

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, page: string) => {
      e.preventDefault();
      const pathMap: { [key: string]: string } = {
        Home: '/',
        About: '/about',
        Portfolio: '/portfolio',
        Contact: '/contact',
      };
      navigate(pathMap[page]);
      setTimeout(() => {
        const section = document.getElementById(page);
        if (section) {
          const yOffset = -80;
          const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: "smooth" });
        }
      }, 100);
    },
    [navigate]
  );

  useEffect(() => {
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
        const yOffset = -80;
        const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }
  }, [location.pathname]);

  const statsData = useMemo(
    () => [
      {
        icon: Code as React.ComponentType<React.SVGProps<SVGSVGElement>>,
        color: "from-[#6366f1] to-[#a855f7]",
        value: totalProjects,
        label: "Total Projects",
        description: "All my experience in projects",
        animation: "fade-right",
      },
      {
        icon: Globe as React.ComponentType<React.SVGProps<SVGSVGElement>>,
        color: "from-[#6366f1] to-[#a855f7]",
        value: YearExperience,
        label: "Years of Experience",
        description: "Continuous learning journey",
        animation: "fade-left",
      },
    ],
    [totalProjects, YearExperience]
  );

  return (
    <div
      className="h-auto pb-[10%] text-gray-900 dark:text-white overflow-hidden px-[5%] sm:px-[5%] lg:px-[10%] mt-10"
      id="About"
    >
      <Header />

      <div className="w-full mx-auto pt-8 sm:pt-12 relative">
        <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="space-y-6 text-center lg:text-left">
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold"
              data-aos="fade-right"
              data-aos-duration="1000"
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]">
                Hello, I'm
              </span>
              <span
                className="block mt-2 text-gray-900 dark:text-gray-200"
                data-aos="fade-right"
                data-aos-duration="1300"
              >
                Myron Ilchenko
              </span>
            </h2>
            <p
              className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-400 leading-relaxed text-justify pb-4"
              data-aos="fade-right"
              data-aos-duration="1500"
            >
              I am a student passionate about computer networks, Back-End and system programming.
              My main goal is to create immersive and innovative digital experiences that solve user problems efficiently.
            </p>

            <div className="flex flex-col lg:flex-row items-center gap-4 w-full">
              <a
                href="https://drive.google.com/file/d/1ER1V_dzlYmZQnyIRpaRcebdWEa_4AEar/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full lg:w-auto"
              >
                <button
                  data-aos="fade-up"
                  data-aos-duration="800"
                  className="w-full lg:w-auto sm:px-6 py-2 sm:py-3 rounded-lg bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white font-medium transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl animate-bounce-slow"
                >
                  <FileText className="w-4 h-4 sm:w-5 sm:h-5" /> Download CV
                </button>
              </a>
              <a onClick={(e) => handleNavClick(e, "Portfolio")} className="w-full lg:w-auto">
                <button
                  data-aos="fade-up"
                  data-aos-duration="1000"
                  className="w-full lg:w-auto sm:px-6 py-2 sm:py-3 rounded-lg border border-[#a855f7]/50 text-[#a855f7] font-medium transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 hover:bg-[#a855f7]/10 animate-bounce-slow delay-200"
                >
                  <Code className="w-4 h-4 sm:w-5 sm:h-5" /> View Projects
                </button>
              </a>
            </div>
          </div>

          <ProfileImage />
        </div>

        <a onClick={(e) => handleNavClick(e, "Portfolio")} className="cursor-pointer">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            {statsData.map((stat) => (
              <StatCard key={stat.label} {...stat} />
            ))}
          </div>
        </a>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        @keyframes spin-slower {
          to { transform: rotate(360deg); }
        }
        .animate-bounce-slow {
          animation: bounce 3s infinite;
        }
        .animate-pulse-slow {
          animation: pulse 3s infinite;
        }
        .animate-spin-slower {
          animation: spin-slower 8s linear infinite;
        }
      `}</style>
    </div>
  );
});

export default AboutPage;