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
// Projects are loaded from remote API at runtime.

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

interface ProjectItem {
  id?: string;
  Img?: string;
  Title?: string;
  Description?: string;
  Link?: string;
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

// Tech stack items will be loaded from the remote API at runtime.

const Portfolio: React.FC = () => {
  const theme = useTheme();
  const [value, setValue] = useState<number>(0);
  const [showAllProjects, setShowAllProjects] = useState<boolean>(false);
  const isMobile = window.innerWidth < 768;
  const initialItems = isMobile ? 4 : 6;

  const [techStacks, setTechStacks] = useState<TechStackItem[]>([]);
  const [loadingTech, setLoadingTech] = useState<boolean>(true);
  const [techError, setTechError] = useState<string | null>(null);
  const [projectsList, setProjectsList] = useState<ProjectItem[]>([]);
  const [loadingProjects, setLoadingProjects] = useState<boolean>(true);
  const [projectsError, setProjectsError] = useState<string | null>(null);

  useEffect(() => {
    AOS.init({ once: false });

    const fetchTechStack = async () => {
      setLoadingTech(true);
      setTechError(null);
      try {
        const res = await fetch('https://vcmsadm.viserix.com/api/tech-stack.php', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          // include credentials if the API needs cookies; adjust as necessary
          credentials: 'omit',
        });

        if (!res.ok) {
          throw new Error(`Network response was not ok (${res.status})`);
        }

        const payload = await res.json();
        const items = payload?.data ?? [];

        const mapped: TechStackItem[] = items.map((it: any) => ({
          icon: it.icon_image ?? it.icon ?? '',
          language: it.tech_name ?? it.language ?? '',
        }));

        setTechStacks(mapped);
      } catch (err: any) {
        setTechError(err?.message ?? 'Failed to load tech stack');
      } finally {
        setLoadingTech(false);
      }
    };

    fetchTechStack();
  }, []);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoadingProjects(true);
      setProjectsError(null);
      try {
        const res = await fetch('https://vcmsadm.viserix.com/api/projects.php', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'omit',
        });

        if (!res.ok) {
          throw new Error(`Network response was not ok (${res.status})`);
        }

        const payload = await res.json();
        const items = payload?.data ?? [];

        const mapped: ProjectItem[] = items.map((it: any) => ({
          id: it.id,
          Img: it.image ?? it.Image ?? it.Img ?? '',
          Title: it.title ?? it.Title ?? '',
          Description: it.description ?? it.Description ?? '',
          Link: it.link ?? it.Link ?? '',
        }));

        setProjectsList(mapped);
      } catch (err: any) {
        setProjectsError(err?.message ?? 'Failed to load projects');
      } finally {
        setLoadingProjects(false);
      }
    };

    fetchProjects();
  }, []);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const toggleShowMore = useCallback(() => {
    setShowAllProjects((prev) => !prev);
  }, []);

  const displayedProjects = showAllProjects ? projectsList : projectsList.slice(0, initialItems);

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
              icon={<Code className="mb-2 w-5 h-5 transition-all duration-300 text-gray-700 dark:text-slate-300" />}
              label={<span className="text-gray-700 dark:text-slate-300">Projects</span>}
              {...a11yProps(0)}
            />
            <Tab
              icon={<Boxes className="mb-2 w-5 h-5 transition-all duration-300 text-gray-700 dark:text-slate-300" />}
              label={<span className="text-gray-700 dark:text-slate-300">Tech Stack</span>}
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
            {projectsList.length > initialItems && (
              <div className="mt-6 w-full flex justify-start">
                <ToggleButton onClick={toggleShowMore} isShowingMore={showAllProjects} />
              </div>
            )}
          </TabPanel>

          <TabPanel value={value} index={1} dir={theme.direction}>
            <div className="container mx-auto flex justify-center items-center overflow-hidden pb-[5%]">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 lg:gap-8 gap-5">
                {loadingTech ? (
                  <div className="col-span-full text-center">
                    <p className="text-gray-700 dark:text-slate-300">Loading tech stack...</p>
                  </div>
                ) : techError ? (
                  <div className="col-span-full text-center">
                    <p className="text-red-500">{techError}</p>
                  </div>
                ) : techStacks.length === 0 ? (
                  <div className="col-span-full text-center">
                    <p className="text-gray-700 dark:text-slate-300">No tech stack items found.</p>
                  </div>
                ) : (
                  techStacks.map((stack, index) => (
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
                  ))
                )}
              </div>
            </div>
          </TabPanel>
        </SwipeableViews>
      </Box>
    </div>
  );
};

export default Portfolio;