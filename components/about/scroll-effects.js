// Initialize scroll effects
function initScrollEffects() {
  // grab sections to fade
  const sections = document.querySelectorAll(".fade-section");
  
  if (sections.length === 0) {
    // Retry if sections aren't found yet
    setTimeout(initScrollEffects, 100);
    return;
  }
  
  // Create observer for intersection
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          // Unobserve once visible to improve performance
          observer.unobserve(entry.target);
        }
      });
    },
    { 
      threshold: 0.1,
      rootMargin: '0px 0px -20px 0px'
    }
  );
  
  // Check each section and set up observer
  sections.forEach(section => {
    // Remove visible class initially to ensure fade effect
    section.classList.remove("visible");
    
    // Check if element is already in viewport
    const rect = section.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    const isInViewport = rect.top < windowHeight && rect.bottom > 0;
    
    if (isInViewport) {
      // Element is already visible, add class after a small delay for animation
      setTimeout(() => {
        section.classList.add("visible");
      }, 50);
    } else {
      // Observe for when it comes into view
      observer.observe(section);
    }
  });
}

// Wait for custom elements to be defined and DOM to be ready
function startScrollEffects() {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      waitForCustomElements();
    });
  } else {
    waitForCustomElements();
  }
}

function waitForCustomElements() {
  Promise.all([
    customElements.whenDefined('about-bio'),
    customElements.whenDefined('skills-list'),
    customElements.whenDefined('endorsements-list'),
    customElements.whenDefined('employment-timeline')
  ]).then(() => {
    // Wait a bit for elements to be fully rendered
    setTimeout(initScrollEffects, 150);
  }).catch(() => {
    // Fallback: try anyway after a delay
    setTimeout(initScrollEffects, 300);
  });
}

// Start the scroll effects
startScrollEffects();
  