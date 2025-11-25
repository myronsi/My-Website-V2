import { useEffect } from 'react';

interface SectionObserverProps {
  sectionIds: string[];
  threshold?: number;
}

const SectionObserver: React.FC<SectionObserverProps> = ({ 
  sectionIds, 
  threshold = 0.5 
}) => {
  useEffect(() => {
    const options: IntersectionObserverInit = {
      root: null,
      threshold: threshold,
    };

    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry: IntersectionObserverEntry) => {
        if (entry.isIntersecting) {
          const sectionToPath: { [key: string]: string } = {
            'Home': '/',
            'About': '/about',
            'Portfolio': '/portfolio',
            'Contact': '/contact',
          };
          
          const newPath = sectionToPath[entry.target.id];
          if (newPath && window.location.pathname !== newPath) {
            window.history.replaceState(null, '', newPath);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, options);

    sectionIds.forEach((id: string) => {
      const section = document.getElementById(id);
      if (section) {
        observer.observe(section);
      }
    });

    return () => {
      sectionIds.forEach((id: string) => {
        const section = document.getElementById(id);
        if (section) {
          observer.unobserve(section);
        }
      });
    };
  }, [sectionIds, threshold]);

  return null;
};

export default SectionObserver;