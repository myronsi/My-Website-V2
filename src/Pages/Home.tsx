import React, { useState, useEffect, useCallback, memo, MouseEvent } from "react";
import { Github, Linkedin, Mail, ExternalLink, Instagram } from "lucide-react";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useNavigate, useLocation } from "react-router-dom";

interface TechStackProps {
  tech: string;
}

interface CTAButtonProps {
  page: string;
  text: string;
  icon: React.ComponentType<React.ComponentProps<'svg'>>;
  onClick: (e: MouseEvent<HTMLButtonElement>, page: string) => void;
}

interface SocialLinkProps {
  icon: React.ComponentType<React.ComponentProps<'svg'>>;
  link: string;
}

const MainTitle: React.FC = memo(() => (
  <div className="space-y-2 mt-20" data-aos="fade-up" data-aos-delay="600">
    <h1 className="text-5xl sm:text-6xl md:text-6xl lg:text-6xl xl:text-7xl font-bold tracking-tight">
      <span className="relative inline-block">
        <span className="absolute -inset-2 bg-gradient-to-r from-[#6366f1] to-[#a855f7] blur-2xl opacity-20"></span>
        <span className="relative bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 dark:from-white dark:via-blue-100 dark:to-purple-200 bg-clip-text text-transparent">
          System
        </span>
      </span>
      <br />
      <span className="relative inline-block mt-2">
        <span className="absolute -inset-2 bg-gradient-to-r from-[#6366f1] to-[#a855f7] blur-2xl opacity-10 dark:opacity-20"></span>
        <span className="relative bg-gradient-to-r from-[#6366f1] to-[#a855f7] bg-clip-text text-transparent">
          Programmer
        </span>
      </span>
    </h1>
  </div>
));

const TechStack: React.FC<TechStackProps> = memo(({ tech }) => (
  <div className="px-4 py-2 hidden sm:block rounded-full bg-gray-100 dark:bg-white/5 backdrop-blur-sm border border-gray-300 dark:border-white/10 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/10 transition-colors">
    {tech}
  </div>
));

const CTAButton: React.FC<CTAButtonProps> = memo(({ page, text, icon: Icon, onClick }) => (
  <button onClick={(e) => onClick(e, page)} className="group relative w-[160px]">
    <div className="absolute -inset-0.5 bg-gradient-to-r from-[#4f52c9] to-[#8644c5] rounded-xl opacity-30 dark:opacity-50 blur-md group-hover:opacity-60 dark:group-hover:opacity-90 transition-all duration-700"></div>
    <div className="relative h-11 bg-white dark:bg-[#030014] backdrop-blur-xl rounded-lg border border-gray-300 dark:border-white/10 leading-none overflow-hidden">
      <div className="absolute inset-0 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 bg-gradient-to-r from-[#4f52c9]/10 dark:from-[#4f52c9]/20 to-[#8644c5]/10 dark:to-[#8644c5]/20"></div>
      <span className="absolute inset-0 flex items-center justify-center gap-2 text-sm group-hover:gap-3 transition-all duration-300">
        <span className="bg-gradient-to-r from-gray-700 to-gray-900 dark:from-gray-200 dark:to-white bg-clip-text text-transparent font-medium z-10">
          {text}
        </span>
        <Icon
          className={`w-4 h-4 text-gray-700 dark:text-gray-200 ${
            text === "Contact" ? "group-hover:translate-x-1" : "group-hover:rotate-0"
          } transform transition-all duration-300 z-10`}
        />
      </span>
    </div>
  </button>
));

const SocialLink: React.FC<SocialLinkProps> = memo(({ icon: Icon, link }) => (
  <a href={link} target="_blank" rel="noopener noreferrer">
    <button className="group relative p-3">
      <div className="absolute inset-0 bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-xl blur opacity-10 dark:opacity-20 group-hover:opacity-20 dark:group-hover:opacity-40 transition duration-300"></div>
      <div className="relative rounded-xl bg-white dark:bg-black/50 backdrop-blur-xl p-2 flex items-center justify-center border border-gray-300 dark:border-white/10 group-hover:border-gray-400 dark:group-hover:border-white/20 transition-all duration-300">
        <Icon className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors" />
      </div>
    </button>
  </a>
));

const TYPING_SPEED = 100;
const ERASING_SPEED = 50;
const PAUSE_DURATION = 2000;
const WORDS: string[] = ["Responsible", "Enthusiast", "Skilled"];
const TECH_STACK: string[] = ["C", "Python", "Java", "Javascript"];
const SOCIAL_LINKS: SocialLinkProps[] = [
  { icon: Github, link: "https://github.com/myronsi" },
  { icon: Linkedin, link: "https://www.linkedin.com/in/myron-ilchenko" },
  { icon: Instagram, link: "https://www.instagram.com/myron.il_820/" }
];

const Home: React.FC = memo(() => {
  const [text, setText] = useState<string>("");
  const [isTyping, setIsTyping] = useState<boolean>(true);
  const [wordIndex, setWordIndex] = useState<number>(0);
  const [charIndex, setCharIndex] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isHovering, setIsHovering] = useState<boolean>(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const initAOS = () => {
      AOS.init({ once: true, offset: 10 });
    };
    initAOS();
    window.addEventListener("resize", initAOS);
    return () => window.removeEventListener("resize", initAOS);
  }, []);

  useEffect(() => {
    setIsLoaded(true);
    return () => setIsLoaded(false);
  }, []);

  const handleTyping = useCallback(() => {
    if (isTyping) {
      if (charIndex < WORDS[wordIndex].length) {
        setText(prev => prev + WORDS[wordIndex][charIndex]);
        setCharIndex(prev => prev + 1);
      } else {
        setTimeout(() => setIsTyping(false), PAUSE_DURATION);
      }
    } else {
      if (charIndex > 0) {
        setText(prev => prev.slice(0, -1));
        setCharIndex(prev => prev - 1);
      } else {
        setWordIndex(prev => (prev + 1) % WORDS.length);
        setIsTyping(true);
      }
    }
  }, [charIndex, isTyping, wordIndex]);

  useEffect(() => {
    const timeout = setTimeout(
      handleTyping,
      isTyping ? TYPING_SPEED : ERASING_SPEED
    );
    return () => clearTimeout(timeout);
  }, [handleTyping, isTyping]);

  const handleNavClick = (e: MouseEvent<HTMLButtonElement>, page: string) => {
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
  };

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

  const lottieOptions: {
    src: string;
    loop: boolean;
    autoplay: boolean;
    style: React.CSSProperties;
    className: string;
  } = {
    src: "https://lottie.host/58753882-bb6a-49f5-a2c0-950eda1e135a/NLbpVqGegK.lottie",
    loop: true,
    autoplay: true,
    style: { width: "100%", height: "100%" },
    className: `w-full h-full transition-all duration-500 ${
      isHovering 
        ? "scale-[180%] sm:scale-[160%] md:scale-[150%] lg:scale-[145%]" 
        : "scale-[175%] sm:scale-[155%] md:scale-[145%] lg:scale-[140%]"
    }`
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#030014] overflow-hidden" id="Home">
      <div className={`relative z-10 transition-all duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"}`}>
        <div className="container mx-auto px-[5%] sm:px-6 lg:px-[0%] min-h-screen">
          <div className="flex flex-col lg:flex-row items-center justify-center h-screen md:justify-between gap-0 sm:gap-12 lg:gap-20">
            <div 
              className="w-full lg:w-1/2 space-y-6 sm:space-y-8 text-left lg:text-left order-1 lg:order-1 lg:mt-0"
              data-aos="fade-right" 
              data-aos-delay="200"
            >
              <div className="space-y-4 sm:space-y-6">
                <MainTitle />

                <div className="h-8 flex items-center" data-aos="fade-up" data-aos-delay="800">
                  <span className="text-xl md:text-2xl bg-gradient-to-r from-gray-700 to-gray-900 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent font-light">
                    {text}
                  </span>
                  <span className="w-[3px] h-6 bg-gradient-to-t from-[#6366f1] to-[#a855f7] ml-1 animate-blink"></span>
                </div>

                <p 
                  className="text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-xl leading-relaxed font-light"
                  data-aos="fade-up" 
                  data-aos-delay="1000"
                >
                  Create rich applications for everyday use and to simplify complex operations.
                </p>

                <div
                  className="flex flex-wrap gap-3 justify-start"
                  data-aos="fade-up"
                  data-aos-delay="1200"
                >
                  {TECH_STACK.map((tech, index) => (
                    <TechStack key={index} tech={tech} />
                  ))}
                </div>

                <div
                  className="flex flex-row gap-3 w-full justify-start"
                  data-aos="fade-up"
                  data-aos-delay="1400"
                >
                  <CTAButton page="Portfolio" text="Projects" icon={ExternalLink} onClick={handleNavClick} />
                  <CTAButton page="Contact" text="Contact" icon={Mail} onClick={handleNavClick} />
                </div>

                <div className="hidden sm:flex gap-4 justify-start" data-aos="fade-up" data-aos-delay="1600">
                  {SOCIAL_LINKS.map((social, index) => (
                    <SocialLink key={index} {...social} />
                  ))}
                </div>
              </div>
            </div>

            <div 
              className="w-full py-[10%] sm:py-0 lg:w-1/2 h-auto lg:h-[600px] xl:h-[750px] relative flex items-center justify-center order-2 lg:order-2 mt-8 lg:mt-0"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              data-aos="fade-left" 
              data-aos-delay="600"
            >
              <div className="relative w-full opacity-90">
                <div className={`absolute inset-0 bg-gradient-to-r from-[#6366f1]/10 to-[#a855f7]/10 rounded-3xl blur-3xl transition-all duration-700 ease-in-out`}></div>
                <div className={`relative z-10 w-full opacity-90 transform transition-transform duration-500`}>
                  <DotLottieReact {...lottieOptions} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Home;