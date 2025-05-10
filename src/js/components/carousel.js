/**
 * Initializes the hero carousel
 */
export function initCarousel() {
  const slides = document.querySelectorAll(".carousel-slide");
  const indicators = document.querySelectorAll(".carousel-indicator");
  let currentSlide = 0;

  // Check if elements exist
  if (!slides.length || !indicators.length) {
    console.warn("Carousel elements not found:", {
      slides: slides.length,
      indicators: indicators.length,
    });
    return;
  }

  // Function to change slides
  function showSlide(index) {
    // Hide all slides
    slides.forEach((slide) => {
      slide.style.opacity = "0";
    });

    // Update indicators
    indicators.forEach((indicator) => {
      indicator.classList.remove("active", "bg-cbrand-1001");
      indicator.classList.add("bg-white", "bg-opacity-50");
    });

    // Show the selected slide
    slides[index].style.opacity = "1";

    // Update the active indicator
    indicators[index].classList.add("active", "bg-cbrand-1001");
    indicators[index].classList.remove("bg-white", "bg-opacity-50");

    // Update current slide index
    currentSlide = index;
  }

  // Auto-rotate slides
  const intervalId = setInterval(() => {
    const nextSlide = (currentSlide + 1) % slides.length;
    showSlide(nextSlide);
  }, 5000); // Change slide every 5 seconds

  // Set up indicator click handlers
  indicators.forEach((indicator, index) => {
    indicator.addEventListener("click", () => {
      showSlide(index);
    });
  });

  // Return cleanup function to stop interval if needed
  return () => clearInterval(intervalId);
}
