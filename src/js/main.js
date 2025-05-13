// src/js/main.js
import { fetchComics } from "./services/dataService.js";
import { setupComicCards, renderComicCards } from "./components/comicCard.js";
import { setupHomeNavigation } from "./utils/navigation.js";
import { initCarousel } from "./components/carousel.js";
import { initNav } from "./components/nav.js";
import { generatePopUp } from "./utils/subscriptionPopUp.js";

async function init() {
  try {
    console.log("Initial nav count:", document.querySelectorAll("nav").length);

    try {
      await initNav();
      console.log("Navigation initialized");
    } catch (navError) {
      console.error("Navigation initialization failed:", navError);
    }

    console.log(
      "Nav count after initNav:",
      document.querySelectorAll("nav").length
    );

    const comics = await fetchComics();
    console.log("Comics fetched:", comics.length);
    renderComicCards(comics);
    setupComicCards(comics);

    window.addEventListener("popstate", (event) => {
      const detailSection = document.getElementById("comic-detail");
      if (detailSection) {
        detailSection.remove();
        // Re-render and show homepage content
        renderComicCards(comics);
        setupComicCards(comics);
        const mainContent = document.querySelector("main") || document.body;
        const homepageElements = mainContent.querySelectorAll(
          ":scope > :not(nav):not(#comic-detail)"
        );
        homepageElements.forEach((el) => {
          if (!(el.id === "register-modal")) {
            el.classList.remove("hidden");
          }
          console.log(
            `Showed element: ${el.tagName}${el.id ? `#${el.id}` : ""}`
          );
        });
        // Restore body scrolling
        document.body.classList.remove("overflow-hidden");
      }
      // Ensure nav persists
      if (!document.querySelector("nav")) {
        console.warn("Navigation bar missing after popstate; re-initializing");
        initNav();
      }
    });

    setupHomeNavigation();
    initCarousel();
    generatePopUp();

    console.log("Final nav count:", document.querySelectorAll("nav").length);
  } catch (error) {
    console.error("Failed to initialize app:", error);
  }
}

init();
