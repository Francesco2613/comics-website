import { showComicDetail } from "./comicDetail.js";
import { generateStarRating } from "../utils/starRating.js";

/**
 * Renders comic cards dynamically in the Popular This Week section
 * @param {Array} comics - Array of comic objects
 */
export function renderComicCards(comics) {
  const popularSection = document.querySelector(
    ".grid.grid-cols-2.sm\\:grid-cols-3.md\\:grid-cols-4.lg\\:grid-cols-5"
  );
  if (popularSection) {
    popularSection.innerHTML = comics
      .map(
        (comic) => `
      <div class="comic-card group" data-comic-id="${comic.id}">
        <div class="relative aspect-[2/3] overflow-hidden rounded-lg shadow-lg mb-3">
          <img src="${comic.cover}" alt="${
          comic.title
        }" class="w-full h-full object-cover">
          <div class="comic-hover-details opacity-0 transition-opacity absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent flex flex-col justify-end p-4 group-hover:opacity-100">
            <div class="flex justify-between items-center mb-1">
              <span class="text-sm text-cbrand-1001">${comic.publisher}</span>
              <div class="flex">
                <i class="fas fa-star text-yellow-400 text-sm"></i>
                <span class="text-sm ml-1">${comic.rating}</span>
              </div>
            </div>
            <div class="flex space-x-2 mt-2">
              <button class="bg-cbrand-1000 hover:bg-cbrand-1002 p-2 rounded-full">
                <i class="fas fa-bookmark text-xs"></i>
              </button>
              <button class="bg-zinc-800 hover:bg-zinc-700 p-2 rounded-full">
                <i class="fas fa-heart text-xs"></i>
              </button>
              <button class="bg-zinc-800 hover:bg-zinc-700 flex-1 rounded-full text-xs">Add to list</button>
            </div>
          </div>
        </div>
        <h3 class="font-medium text-sm">${comic.title}</h3>
        <p class="text-cbrand-400 text-xs mb-1">${comic.author}</p>
        <div class="rating-stars text-xs">
          ${generateStarRating(comic.rating)}
        </div>
      </div>
    `
      )
      .join("");
  }
}

/**
 * Sets up click event listeners for comic cards
 * @param {Array} comics - Array of comic objects
 */
export function setupComicCards(comics) {
  const comicCards = document.querySelectorAll(".comic-card");
  comicCards.forEach((card) => {
    card.addEventListener("click", function () {
      const comicId = this.getAttribute("data-comic-id");
      if (comicId) {
        const comic = comics.find((c) => c.id === comicId);
        if (comic) {
          showComicDetail(comic);
        }
      }
    });
  });
}
