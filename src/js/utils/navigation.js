// src/js/utils/navigation.js
export function setupHomeNavigation() {
  const homeLink = document.querySelector('a[href="index.html"], a[href="/"]');
  if (homeLink) {
    homeLink.addEventListener("click", (event) => {
      event.preventDefault();
      const detailSection = document.getElementById("comic-detail");
      if (detailSection) {
        detailSection.remove();
      }
      window.location.href = "index.html";
    });
  }
}
