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
          const searchParams = new URLSearchParams(window.location.search);
          searchParams.set("page", entry.target.id);
          const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
          window.history.replaceState(null, '', newUrl);
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