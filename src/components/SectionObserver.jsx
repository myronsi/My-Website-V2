import { useEffect } from 'react';

const SectionObserver = ({ sectionIds, threshold = 0.5 }) => {
  useEffect(() => {
    const options = {
      root: null,
      threshold: threshold,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Получаем текущие query-параметры
          const searchParams = new URLSearchParams(window.location.search);
          // Устанавливаем параметр page равным id секции
          searchParams.set("page", entry.target.id);
          // Формируем новый URL: сохраняем путь и query-параметры
          const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
          window.history.replaceState(null, '', newUrl);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, options);

    sectionIds.forEach((id) => {
      const section = document.getElementById(id);
      if (section) {
        observer.observe(section);
      }
    });

    return () => {
      sectionIds.forEach((id) => {
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