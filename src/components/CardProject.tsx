import React, { MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, ArrowRight } from 'lucide-react';

interface CardProjectProps {
  Img: string;
  Title: string;
  Description: string;
  Link?: string;
  id?: string;
}

const CardProject: React.FC<CardProjectProps> = ({ 
  Img, 
  Title, 
  Description, 
  Link: ProjectLink, 
  id 
}) => {
  const handleView = (e: MouseEvent<HTMLAnchorElement>) => {
    if (!ProjectLink) {
      console.log("ProjectLink is empty");
      e.preventDefault();
      alert("View link is not available");
    }
  };
  
  const handleDetails = (e: MouseEvent<HTMLAnchorElement>) => {
    if (!id) {
      console.log("ID is empty");
      e.preventDefault();
      alert("Project details are not available");
    }
  };

  return (
    <div className="group relative w-full">
      <div className="relative overflow-hidden rounded-xl bg-white dark:bg-gradient-to-br dark:from-slate-900/90 dark:to-slate-800/90 backdrop-blur-lg border border-gray-300 dark:border-white/10 shadow-lg dark:shadow-2xl transition-all duration-300 hover:shadow-xl dark:hover:shadow-purple-500/20">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 dark:from-blue-500/10 dark:via-purple-500/10 dark:to-pink-500/10 opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>
    
        <div className="relative p-5 z-10">
          <div className="relative overflow-hidden rounded-lg">
            <img
              src={Img}
              alt={Title}
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          
          <div className="mt-4 space-y-3">
            <h3 className="text-xl font-semibold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-200 dark:via-purple-200 dark:to-pink-200 bg-clip-text text-transparent">
              {Title}
            </h3>
            
            <div className="text-gray-700 dark:text-gray-300/80 text-sm leading-relaxed line-clamp-2">
              {Description}
            </div>
            
            <div className="pt-4 flex items-center justify-between">
              {ProjectLink ? (
                <a
                  href={ProjectLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleView}
                  className="inline-flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-200"
                >
                  <span className="text-sm font-medium">View</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              ) : (
                <span className="text-gray-500 text-sm">View Not Available</span>
              )}
              
              {id ? (
                <Link
                  to={`?page=project/${id}`}
                  onClick={handleDetails}
                  className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 text-gray-900 dark:text-white/90 transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                >
                  <span className="text-sm font-medium">Details</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              ) : (
                <span className="text-gray-500 text-sm">Details Not Available</span>
              )}
            </div>
          </div>
          
          <div className="absolute inset-0 border border-transparent group-hover:border-purple-500/30 dark:group-hover:border-purple-500/50 rounded-xl transition-colors duration-300 -z-50"></div>
        </div>
      </div>
    </div>
  );
};

export default CardProject;