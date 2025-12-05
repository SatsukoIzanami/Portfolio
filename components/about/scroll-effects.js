// event listener for page load
document.addEventListener("DOMContentLoaded", () => {
    // grab sections to fade
    const sections = document.querySelectorAll(".fade-section");
  
    // add observer for 
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
  });
  