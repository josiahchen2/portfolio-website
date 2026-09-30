import './fluid.js';

const year = document.querySelector('#year');
year.textContent = new Date().getFullYear();

const sections = document.querySelectorAll('.section-shell');

if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.documentElement.classList.add('has-motion');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 },
  );

  sections.forEach((section) => observer.observe(section));
}
