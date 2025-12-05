// Initialize scroll effects
function initScrollEffects() {
  // grab sections to fade
  const sections = document.querySelectorAll(".fade-section");
  
  if (sections.length === 0) {
    // If no sections found, wait a bit for custom elements to render
    requestAnimationFrame(() => {
      const retrySections = document.querySelectorAll(".fade-section");
      if (retrySections.length > 0) {
        setupObserver(retrySections);
      }
    });
    return;
  }
  
  setupObserver(sections);
}

function setupObserver(sections) {
  // add observer for intersection
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.15 }
  );
  
  sections.forEach(sec => observer.observe(sec));
}

// Since this is a module script, it's deferred and DOM should be ready
// But wait for custom elements to be defined and rendered
Promise.all([
  customElements.whenDefined('about-bio'),
  customElements.whenDefined('skills-list'),
  customElements.whenDefined('endorsements-list'),
  customElements.whenDefined('employment-timeline')
]).then(() => {
  // Wait one more frame to ensure elements are fully rendered
  requestAnimationFrame(() => {
    initScrollEffects();
  });
});
  