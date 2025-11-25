import React, { useState } from 'react';
import { Eye, ArrowRight, ExternalLink } from 'lucide-react';

interface ProjectCardModalProps {
  title: string;
  description: string;
  link: string;
}

const ProjectCardModal: React.FC<ProjectCardModalProps> = ({ 
  title, 
  description, 
  link 
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <button
        className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/90 transition-colors duration-200"
        onClick={() => setIsOpen(true)}
      >
        <span className="text-sm">Details</span>
        <ArrowRight className="w-4 h-4" />
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 animate-fade-in"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="relative w-full max-w-md rounded-lg bg-white dark:bg-[#0a0a1a] p-6 text-gray-900 dark:text-white shadow-lg animate-slide-up sm:p-8 border border-transparent dark:border-white/10"
            onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 rounded-md p-2 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors duration-200"
              onClick={() => setIsOpen(false)}
            >
              <Eye className="h-5 w-5 text-gray-700 dark:text-gray-300" />
            </button>
            <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">{title}</h2>
            <p className="mb-6 text-gray-600 dark:text-gray-300">{description}</p>
            <div className="flex justify-end space-x-4">
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md bg-blue-600 dark:bg-blue-500 px-4 py-2 font-medium text-white hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors duration-200"
              >
                View <ExternalLink className="ml-2 inline-block h-5 w-5" />
              </a>
              <button
                className="rounded-md bg-gray-200 dark:bg-gray-700 px-4 py-2 font-medium text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectCardModal;