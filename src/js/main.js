//src/js/main.js

import { fetchComics } from "./services/dataService.js";
import { setupComicCards } from "./components/comicCard.js";
import { renderComicCards } from "./components/comicCard.js";
import { initCarousel } from "./components/carousel.js";
import { setupHomeNavigation } from "./utils/navigation.js";
import { initNav } from "./components/nav.js";

async function init() {
  try {
    // Initialize Navigation Bar
    await initNav();
    // Set up Home Button
    setupHomeNavigation();
    // Initialize Carousel
    initCarousel();
    // Fetch comic data
    const comics = await fetchComics();
    // Render comic cards dynamically
    renderComicCards(comics);
    // Setup click events for comic cards
    setupComicCards(comics);
    // Handle back button
    window.addEventListener("popstate", (event) => {
      const detailSection = document.getElementById("comic-detail");
      if (detailSection) {
        detailSection.remove();
      }
    });
  } catch (error) {
    console.error("Failed to initialize app:", error);
  }
}

init();
