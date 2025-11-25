import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { projects } from "../data/projectsData";
import {
  ArrowLeft,
  ExternalLink,
  Github,
  Code2,
  Star,
  ChevronRight,
  Layers,
  Layout,
  Package,
  Cpu,
  Code,
  Server,
  Network,
  Database,
  Atom,
  User
} from "lucide-react";
import Swal from "sweetalert2";

interface TechIcons {
  [key: string]: React.ComponentType<any>;
}

interface TechBadgeProps {
  tech: string;
}

interface FeatureItemProps {
  feature: string;
}

interface ProjectStatsProps {
  project: Project;
}

interface ProjectDetailsProps {
  id?: string;
}

interface Project {
  id: number;
  Title: string;
  Description: string;
  Img: string;
  Link: string;
  Github?: string;
  TechStack?: string[];
  Features?: string[];
  Mention?: string;
}

const TECH_ICONS: TechIcons = {
  SQLite: Database,
  WebSocket: Network,
  Vite: Server,
  React: Atom,
  Tailwind: Layout,
  "shadcn-ui": Layout,
  Express: Cpu,
  Python: Code,
  JavaScript: Code,
  TypeScript: Code,
  "HTML & CSS": Code,
  default: Package,
};

const TechBadge: React.FC<TechBadgeProps> = ({ tech }) => {
  const Icon = TECH_ICONS[tech] || TECH_ICONS["default"];
  
  return (
    <div className="group relative overflow-hidden px-3 py-2 md:px-4 md:py-2.5 bg-gradient-to-r from-blue-50 dark:from-blue-600/10 to-purple-50 dark:to-purple-600/10 rounded-xl border border-blue-300 dark:border-blue-500/10 hover:border-blue-400 dark:hover:border-blue-500/30 transition-all duration-300 cursor-default">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-100/0 dark:from-blue-500/0 to-purple-100/0 dark:to-purple-500/0 group-hover:from-blue-100/50 dark:group-hover:from-blue-500/10 group-hover:to-purple-100/50 dark:group-hover:to-purple-500/10 transition-all duration-500" />
      <div className="relative flex items-center gap-1.5 md:gap-2">
        <Icon className="w-3.5 h-3.5 md:w-4 md:h-4 text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors" />
        <span className="text-xs md:text-sm font-medium text-blue-700 dark:text-blue-300/90 group-hover:text-blue-800 dark:group-hover:text-blue-200 transition-colors">
          {tech}
        </span>
      </div>
    </div>
  );
};

const FeatureItem: React.FC<FeatureItemProps> = ({ feature }) => {
  return (
    <li className="group flex items-start space-x-3 p-2.5 md:p-3.5 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 transition-all duration-300 border border-transparent hover:border-gray-200 dark:hover:border-white/10">
      <div className="relative mt-2">
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-400/20 dark:from-blue-600/20 to-purple-400/20 dark:to-purple-600/20 rounded-full blur group-hover:opacity-100 opacity-0 transition-opacity duration-300" />
        <div className="relative w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-gradient-to-r from-blue-500 dark:from-blue-400 to-purple-500 dark:to-purple-400 group-hover:scale-125 transition-transform duration-300" />
      </div>
      <span className="text-sm md:text-base text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
        {feature}
      </span>
    </li>
  );
};

const ProjectStats: React.FC<ProjectStatsProps> = ({ project }) => {
  const techStackCount = project?.TechStack?.length || 0;
  const featuresCount = project?.Features?.length || 0;

  return (
    <div className="grid grid-cols-2 gap-3 md:gap-4 p-3 md:p-4 bg-white dark:bg-[#0a0a1a] rounded-xl overflow-hidden relative border border-gray-200 dark:border-transparent">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100/30 dark:from-blue-900/20 to-purple-100/30 dark:to-purple-900/20 opacity-50 blur-2xl z-0" />

      <div className="relative z-10 flex items-center space-x-2 md:space-x-3 bg-white dark:bg-white/5 p-2 md:p-3 rounded-lg border border-blue-200 dark:border-blue-500/20 transition-all duration-300 hover:scale-105 hover:border-blue-400 dark:hover:border-blue-500/50 hover:shadow-lg">
        <div className="bg-blue-100 dark:bg-blue-500/20 p-1.5 md:p-2 rounded-full">
          <Code2 className="text-blue-600 dark:text-blue-300 w-4 h-4 md:w-6 md:h-6" strokeWidth={1.5} />
        </div>
        <div className="flex-grow">
          <div className="text-lg md:text-xl font-semibold text-blue-800 dark:text-blue-200">{techStackCount}</div>
          <div className="text-[10px] md:text-xs text-gray-600 dark:text-gray-400">Total Technologies</div>
        </div>
      </div>

      <div className="relative z-10 flex items-center space-x-2 md:space-x-3 bg-white dark:bg-white/5 p-2 md:p-3 rounded-lg border border-purple-200 dark:border-purple-500/20 transition-all duration-300 hover:scale-105 hover:border-purple-400 dark:hover:border-purple-500/50 hover:shadow-lg">
        <div className="bg-purple-100 dark:bg-purple-500/20 p-1.5 md:p-2 rounded-full">
          <Layers className="text-purple-600 dark:text-purple-300 w-4 h-4 md:w-6 md:h-6" strokeWidth={1.5} />
        </div>
        <div className="flex-grow">
          <div className="text-lg md:text-xl font-semibold text-purple-800 dark:text-purple-200">{featuresCount}</div>
          <div className="text-[10px] md:text-xs text-gray-600 dark:text-gray-400">Key Features</div>
        </div>
      </div>
    </div>
  );
};

const handleGithubClick = (githubLink: string): boolean => {
  if (githubLink === "Private") {
    const isDark = document.documentElement.classList.contains('dark');
    Swal.fire({
      icon: "info",
      title: "Source Code Private",
      text: "Sorry, the source code for this project is private.",
      confirmButtonText: "OK",
      confirmButtonColor: "#3085d6",
      background: isDark ? "#030014" : "#ffffff",
      color: isDark ? "#ffffff" : "#000000",
    });
    return false;
  }
  return true;
};

const ProjectDetails: React.FC<ProjectDetailsProps> = ({ id: propId }) => {
  const { id: paramId } = useParams<{ id?: string }>();
  const id = propId || paramId;
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const selectedProject = projects.find((p) => String(p.id) === id);

    if (selectedProject) {
      const enhancedProject: Project = {
        ...selectedProject,
        Features: selectedProject.Features || [],
        TechStack: selectedProject.TechStack || [],
        Github: selectedProject.Github || "https://github.com/myronsi",
      };
      setProject(enhancedProject);
    } else {
      setNotFound(true);
    }
  }, [id]);

  if (notFound) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#030014] flex flex-col items-center justify-center">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white">404</h1>
        <p className="mt-4 text-lg md:text-2xl text-gray-700 dark:text-gray-300">Project Not Found</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-8 px-6 py-3 bg-blue-500 dark:bg-blue-600 text-white rounded-lg hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors duration-300"
        >
          Go Back
        </button>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#030014] flex items-center justify-center">
        <div className="text-center space-y-6 animate-fadeIn">
          <div className="w-16 h-16 md:w-24 md:h-24 mx-auto border-4 border-blue-200 dark:border-blue-800 border-t-blue-500 dark:border-t-blue-400 rounded-full animate-spin" />
          <h2 className="text-xl md:text-3xl font-bold text-gray-900 dark:text-white">Loading Project...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#030014] px-[2%] sm:px-0 relative overflow-hidden">
      <div className="fixed inset-0">
        <div className="absolute -inset-[10px] opacity-10 dark:opacity-20">
          <div className="absolute top-0 -left-4 w-72 md:w-96 h-72 md:h-96 bg-purple-300 dark:bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-40 dark:opacity-70 animate-blob" />
          <div className="absolute top-0 -right-4 w-72 md:w-96 h-72 md:h-96 bg-blue-300 dark:bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-40 dark:opacity-70 animate-blob animation-delay-2000" />
          <div className="absolute -bottom-8 left-20 w-72 md:w-96 h-72 md:h-96 bg-pink-300 dark:bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-40 dark:opacity-70 animate-blob animation-delay-4000" />
        </div>
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02]" />
      </div>

      <div className="relative">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-16">
          <div className="flex items-center space-x-2 md:space-x-4 mb-8 md:mb-12 animate-fadeIn">
            <button
              onClick={() => navigate('/?page=Portfolio')}
              className="group inline-flex items-center space-x-1.5 md:space-x-2 px-3 md:px-5 py-2 md:py-2.5 bg-white dark:bg-white/5 backdrop-blur-xl rounded-xl text-gray-900 dark:text-white/90 hover:bg-gray-100 dark:hover:bg-white/10 transition-all duration-300 border border-gray-300 dark:border-white/10 hover:border-gray-400 dark:hover:border-white/20 text-sm md:text-base"
            >
              <ArrowLeft className="w-4 h-4 md:w-5 md:h-5 group-hover:-translate-x-1 transition-transform" />
              <span>Back</span>
            </button>
            <div className="flex items-center space-x-1 md:space-x-2 text-sm md:text-base text-gray-500 dark:text-white/50">
              <span>Projects</span>
              <ChevronRight className="w-3 h-3 md:w-4 md:h-4" />
              <span className="text-gray-900 dark:text-white/90 truncate">{project.Title}</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 md:gap-16">
            <div className="space-y-6 md:space-y-10 animate-slideInLeft">
              <div className="space-y-4 md:space-y-6">
                <h1 className="text-3xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-200 dark:via-purple-200 dark:to-pink-200 bg-clip-text text-transparent leading-tight">
                  {project.Title}
                </h1>
                <div className="relative h-1 w-16 md:w-24">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse" />
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-sm" />
                </div>
              </div>

              <div className="prose dark:prose-invert max-w-none">
                <p className="text-base md:text-lg text-gray-700 dark:text-gray-300/90 leading-relaxed">
                  {project.Description}
                </p>
              </div>

              <ProjectStats project={project} />

              <div className="flex flex-wrap gap-3 md:gap-4">
                <a
                  href={project.Link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center space-x-1.5 md:space-x-2 px-4 md:px-8 py-2.5 md:py-4 bg-gradient-to-r from-blue-600/10 to-purple-600/10 hover:from-blue-600/20 hover:to-purple-600/20 text-blue-300 rounded-xl transition-all duration-300 border border-blue-500/20 hover:border-blue-500/40 backdrop-blur-xl overflow-hidden text-sm md:text-base"
                >
                  <div className="absolute inset-0 translate-y-[100%] bg-gradient-to-r from-blue-600/10 to-purple-600/10 transition-transform duration-300 group-hover:translate-y-[0%]" />
                  <ExternalLink className="relative w-4 h-4 md:w-5 md:h-5 transition-transform" />
                  <span className="relative font-medium">View</span>
                </a>

                <a
                  href={project.Github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center space-x-1.5 md:space-x-2 px-4 md:px-8 py-2.5 md:py-4 bg-gradient-to-r from-purple-600/10 to-pink-600/10 hover:from-purple-600/20 hover:to-pink-600/20 text-purple-300 rounded-xl transition-all duration-300 border border-purple-500/20 hover:border-purple-500/40 backdrop-blur-xl overflow-hidden text-sm md:text-base"
                  onClick={(e) => !handleGithubClick(project.Github) && e.preventDefault()}
                >
                  <div className="absolute inset-0 translate-y-[100%] bg-gradient-to-r from-purple-600/10 to-pink-600/10 transition-transform duration-300 group-hover:translate-y-[0%]" />
                  <Github className="relative w-4 h-4 md:w-5 md:h-5 transition-transform" />
                  <span className="relative font-medium">Github</span>
                </a>

                {project.Mention && (
                  <a
                    href={project.Mention}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative inline-flex items-center space-x-1.5 md:space-x-2 px-4 md:px-8 py-2.5 md:py-4 bg-gradient-to-r from-purple-600/10 to-pink-600/10 hover:from-purple-600/20 hover:to-pink-600/20 text-purple-300 rounded-xl transition-all duration-300 border border-purple-500/20 hover:border-purple-500/40 backdrop-blur-xl overflow-hidden text-sm md:text-base"
                  >
                    <div className="absolute inset-0 translate-y-[100%] bg-gradient-to-r from-blue-600/10 to-purple-600/10 transition-transform duration-300 group-hover:translate-y-[0%]" />
                    <User className="relative w-4 h-4 md:w-5 md:h-5 transition-transform" />
                    <span className="relative font-medium">My Mention</span>
                  </a>
                )}
              </div>

              <div className="space-y-4 md:space-y-6">
                <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white/90 mt-[3rem] md:mt-0 flex items-center gap-2 md:gap-3">
                  <Code2 className="w-4 h-4 md:w-5 md:h-5 text-blue-600 dark:text-blue-400" />
                  Technologies Used
                </h3>
                {project.TechStack.length > 0 ? (
                  <div className="flex flex-wrap gap-2 md:gap-3">
                    {project.TechStack.map((tech, index) => (
                      <TechBadge key={index} tech={tech} />
                    ))}
                  </div>
                ) : (
                  <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 opacity-50">
                    No technologies added.
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-6 md:space-y-10 animate-slideInRight">
              <div className="relative rounded-2xl overflow-hidden border border-gray-300 dark:border-white/10 shadow-2xl group">
                <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-[#030014] via-transparent to-transparent opacity-0 group-hover:opacity-50 dark:group-hover:opacity-100 transition-opacity duration-500" />
                <img
                  src={project.Img}
                  alt={project.Title}
                  className="w-full object-cover transform transition-transform duration-700 will-change-transform group-hover:scale-105"
                  onLoad={() => setIsImageLoaded(true)}
                />
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-gray-400 dark:group-hover:border-white/10 transition-colors duration-300 rounded-2xl" />
              </div>

              <div className="bg-white dark:bg-white/[0.02] backdrop-blur-xl rounded-2xl p-8 border border-gray-200 dark:border-white/10 space-y-6 hover:border-gray-300 dark:hover:border-white/20 transition-colors duration-300 group">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white/90 flex items-center gap-3">
                  <Star className="w-5 h-5 text-yellow-500 dark:text-yellow-400 transition-transform duration-300" />
                  Key Features
                </h3>
                {project.Features.length > 0 ? (
                  <ul className="list-none space-y-2">
                    {project.Features.map((feature, index) => (
                      <FeatureItem key={index} feature={feature} />
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-600 dark:text-gray-400 opacity-50">No features added.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 10s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animate-fadeIn {
          animation: fadeIn 0.7s ease-out;
        }
        .animate-slideInLeft {
          animation: slideInLeft 0.7s ease-out;
        }
        .animate-slideInRight {
          animation: slideInRight 0.7s ease-out;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
};

export default ProjectDetails;