import React, { useEffect, useState, useCallback, SyntheticEvent } from "react";
import SwipeableViews from "react-swipeable-views";
import { useTheme, Theme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CardProject from "../components/CardProject";
import TechStackIcon from "../components/TechStackIcon";
import AOS from "aos";
import "aos/dist/aos.css";
import { Code, Boxes } from "lucide-react";
import { projects } from "../data/projectsData";

interface ToggleButtonProps {
  onClick: () => void;
  isShowingMore: boolean;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
  dir?: string;
}

interface TechStackItem {
  icon: string;
  language: string;
}

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const ToggleButton: React.FC<ToggleButtonProps> = ({ onClick, isShowingMore }) => (
  <button
    onClick={onClick}
    className="
      px-3 py-1.5
      text-gray-700 dark:text-slate-300 
      hover:text-gray-900 dark:hover:text-white 
      text-sm 
      font-medium 
      transition-all 
      duration-300 
      ease-in-out
      flex 
      items-center 
      gap-2
      bg-gray-100 dark:bg-white/5 
      hover:bg-gray-200 dark:hover:bg-white/10
      rounded-md
      border 
      border-gray-300 dark:border-white/10
      hover:border-gray-400 dark:hover:border-white/20
      backdrop-blur-sm
      group
      relative
      overflow-hidden
    "
  >
    <span className="relative z-10 flex items-center gap-2">
      {isShowingMore ? "See Less" : "See More"}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`
          transition-transform 
          duration-300 
          ${isShowingMore ? "group-hover:-translate-y-0.5" : "group-hover:translate-y-0.5"}
        `}
      >
        <polyline
          points={
            isShowingMore ? "18 15 12 9 6 15" : "6 9 12 15 18 9"
          }
        ></polyline>
      </svg>
    </span>
    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-500/50 transition-all duration-300 group-hover:w-full"></span>
  </button>
);

function TabPanel({ children, value, index, ...other }: TabPanelProps) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: { xs: 1, sm: 3 } }}>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const techStacks: TechStackItem[] = [
  { icon: "/icons/c.svg", language: "C" },
  { icon: "/icons/cpp.svg", language: "C++" },
  { icon: "/icons/python.svg", language: "Python" },
  { icon: "/icons/java.svg", language: "Java" },
  { icon: "/icons/html.svg", language: "HTML" },
  { icon: "/icons/css.svg", language: "CSS" },
  { icon: "/icons/javascript.svg", language: "JavaScript" },
  { icon: "/icons/git.svg", language: "Git" },
  { icon: "/icons/archlinux.svg", language: "Arch Linux" },
  { icon: "/icons/visual-studio-code.svg", language: "VS Code" },
  { icon: "/icons/tailwind.svg", language: "Tailwind CSS" },
  { icon: "/icons/reactjs.svg", language: "ReactJS" },
  { icon: "/icons/typescript.svg", language: "TypeScript" },
  { icon: "/icons/npm.svg", language: "NPM" },
  { icon: "/icons/mysql.svg", language: "MySQL" },
];

const Portfolio: React.FC = () => {
  const theme = useTheme();
  const [value, setValue] = useState<number>(0);
  const [showAllProjects, setShowAllProjects] = useState<boolean>(false);
  const isMobile = window.innerWidth < 768;
  const initialItems = isMobile ? 4 : 6;

  useEffect(() => {
    AOS.init({ once: false });
  }, []);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const toggleShowMore = useCallback(() => {
    setShowAllProjects((prev) => !prev);
  }, []);

  const displayedProjects = showAllProjects ? projects : projects.slice(0, initialItems);

  return (
    <div
      className="md:px-[10%] px-[5%] w-full sm:mt-0 mt-[3rem] bg-white dark:bg-[#030014] overflow-hidden"
      id="Portfolio"
    >
      <div className="text-center pb-10" data-aos="fade-up" data-aos-duration="1000">
        <h2
          className="inline-block text-3xl md:text-5xl font-bold text-center mx-auto text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]"
          style={{ backgroundImage: "linear-gradient(45deg, #6366f1 10%, #a855f7 93%)" }}
        >
          Portfolio Showcase
        </h2>
        <p className="text-gray-600 dark:text-slate-400 max-w-2xl mx-auto text-sm md:text-base mt-2">
          Explore my journey through projects, and technical expertise. Each section represents a milestone in my continuous learning path.
        </p>
      </div>

      <Box sx={{ width: "100%" }}>
        <AppBar
          position="static"
          elevation={0}
          sx={{
            bgcolor: "transparent",
            border: "1px solid rgba(0, 0, 0, 0.1)",
            borderRadius: "20px",
            position: "relative",
            overflow: "hidden",
            "@media (prefers-color-scheme: dark)": {
              border: "1px solid rgba(255, 255, 255, 0.1)",
            },
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background:
                "linear-gradient(180deg, rgba(139, 92, 246, 0.02) 0%, rgba(59, 130, 246, 0.02) 100%)",
              backdropFilter: "blur(10px)",
              zIndex: 0,
            },
          }}
          className="md:px-4"
        >
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="secondary"
            indicatorColor="secondary"
            variant="fullWidth"
            sx={{
              minHeight: "70px",
              "& .MuiTab-root": {
                fontSize: { xs: "0.9rem", md: "1rem" },
                fontWeight: "600",
                color: "#64748b",
                textTransform: "none",
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                padding: "20px 0",
                zIndex: 1,
                margin: "8px",
                borderRadius: "12px",
                "@media (prefers-color-scheme: dark)": {
                  color: "#94a3b8",
                },
                "&:hover": {
                  color: "#1e293b",
                  backgroundColor: "rgba(139, 92, 246, 0.05)",
                  transform: "translateY(-2px)",
                  "@media (prefers-color-scheme: dark)": {
                    color: "#ffffff",
                    backgroundColor: "rgba(139, 92, 246, 0.1)",
                  },
                },
                "&.Mui-selected": {
                  color: "#1e293b",
                  background:
                    "linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(59, 130, 246, 0.1))",
                  boxShadow: "0 4px 15px -3px rgba(139, 92, 246, 0.1)",
                  "@media (prefers-color-scheme: dark)": {
                    color: "#fff",
                    background:
                      "linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(59, 130, 246, 0.2))",
                    boxShadow: "0 4px 15px -3px rgba(139, 92, 246, 0.2)",
                  },
                },
              },
              "& .MuiTabs-indicator": { height: 0 },
              "& .MuiTabs-flexContainer": { gap: "8px" },
            }}
          >
            <Tab
              icon={<Code className="mb-2 w-5 h-5 transition-all duration-300" />}
              label="Projects"
              {...a11yProps(0)}
            />
            <Tab
              icon={<Boxes className="mb-2 w-5 h-5 transition-all duration-300" />}
              label="Tech Stack"
              {...a11yProps(1)}
            />
          </Tabs>
        </AppBar>

        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={value}
          onChangeIndex={(index: number) => setValue(index)}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            <div className="container mx-auto flex justify-center items-center overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 gap-5">
                {displayedProjects.length > 0 ? (
                  displayedProjects.map((project, index) => (
                    <div
                      key={project.id || index}
                      data-aos={
                        index % 3 === 0
                          ? "fade-up-right"
                          : index % 3 === 1
                          ? "fade-up"
                          : "fade-up-left"
                      }
                      data-aos-duration={
                        index % 3 === 0 ? "1000" : index % 3 === 1 ? "1200" : "1000"
                      }
                    >
                      <CardProject
                        Img={project.Img}
                        Title={project.Title}
                        Description={project.Description}
                        Link={project.Link}
                        id={project.id}
                      />
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-700 dark:text-slate-300">No projects found.</p>
                )}
              </div>
            </div>
            {projects.length > initialItems && (
              <div className="mt-6 w-full flex justify-start">
                <ToggleButton onClick={toggleShowMore} isShowingMore={showAllProjects} />
              </div>
            )}
          </TabPanel>

          <TabPanel value={value} index={1} dir={theme.direction}>
            <div className="container mx-auto flex justify-center items-center overflow-hidden pb-[5%]">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 lg:gap-8 gap-5">
                {techStacks.map((stack, index) => (
                  <div
                    key={index}
                    data-aos={
                      index % 3 === 0
                        ? "fade-up-right"
                        : index % 3 === 1
                        ? "fade-up"
                        : "fade-up-left"
                    }
                    data-aos-duration={
                      index % 3 === 0 ? "1000" : index % 3 === 1 ? "1200" : "1000"
                    }
                  >
                    <TechStackIcon TechStackIcon={stack.icon} Language={stack.language} />
                  </div>
                ))}
              </div>
            </div>
          </TabPanel>
        </SwipeableViews>
      </Box>
    </div>
  );
};

export default Portfolio;