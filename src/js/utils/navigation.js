// src/js/utils/navigation.js
export function setupHomeNavigation() {
  const homeLink = document.querySelector(".home-link");
  if (homeLink) {
    homeLink.addEventListener("click", (event) => {
      event.preventDefault();
      const detailSection = document.getElementById("comic-detail");
      if (detailSection) {
        detailSection.remove();
      }
      // Replace the current history state with the home page
      window.history.replaceState({}, "", "/");
      // Navigate to the home page
      window.location.href = "/";
      // Ensure no hash remains
      if (window.location.hash) {
        window.location.hash = "";
      }
    });
  }
}
