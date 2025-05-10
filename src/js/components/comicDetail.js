import { renderTemplate } from "../utils/template.js";

/**
 * Shows the comic detail page
 */
export async function showComicDetail(comic) {
  let detailSection = document.getElementById("comic-detail");
  if (!detailSection) {
    detailSection = document.createElement("section");
    detailSection.id = "comic-detail";
    detailSection.className =
      "fixed inset-0 bg-black bg-opacity-95 z-50 p-6 overflow-y-auto";
    document.body.appendChild(detailSection);
  }
  detailSection.innerHTML = '<p class="text-white text-center">Loading...</p>';

  try {
    const html = await renderTemplate("templates/comic-detail.html", comic);
    detailSection.innerHTML = html;
    detailSection.scrollTop = 0;

    //Push a new history state
    window.history.pushState({ comicId: comic.id }, "", `/comic/${comic.id}`);
  } catch (error) {
    console.error("Error rendering comic detail:", error);
    detailSection.innerHTML =
      "<p class=text-white text-center>Error loading comic details.</p>";
  }
}
