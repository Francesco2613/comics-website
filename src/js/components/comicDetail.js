// src/js/components/comicDetail.js
import { renderTemplate } from "../utils/template.js";
import { initNav } from "./nav.js";

export async function showComicDetail(comic) {
  try {
    // Load the detail template
    const detailHtml = await renderTemplate(
      "templates/comic-detail.html",
      comic
    );
    console.log("Detail HTML loaded:", detailHtml.substring(0, 100) + "...");

    // Create detail section
    const detailSection = document.createElement("section");
    detailSection.id = "comic-detail";
    detailSection.innerHTML = detailHtml;

    // Remove existing detail section if present
    const existingDetail = document.getElementById("comic-detail");
    if (existingDetail) {
      existingDetail.remove();
    }

    // Hide homepage content
    const mainContent = document.querySelector("main") || document.body;
    const homepageElements = mainContent.querySelectorAll(
      ":scope > :not(nav):not(#comic-detail)"
    );
    homepageElements.forEach((el) => {
      el.classList.add("hidden");
      console.log(`Hid element: ${el.tagName}${el.id ? `#${el.id}` : ""}`);
    });

    // Prevent body scrolling
    document.body.classList.add("overflow-hidden");

    // Preserve the nav
    const navElement = document.querySelector("nav");
    if (!navElement) {
      console.warn("Navigation bar not found; re-inserting");
      await initNav();
    }

    // Insert detail section after nav
    document.body.insertBefore(
      detailSection,
      navElement ? navElement.nextSibling : document.body.firstChild
    );

    // Setup close button
    const closeButton = detailSection.querySelector("button.text-white.mb-4");
    if (closeButton) {
      closeButton.addEventListener("click", () => {
        detailSection.remove();
        // Show homepage content
        homepageElements.forEach((el) => {
          el.classList.remove("hidden");
          console.log(
            `Showed element: ${el.tagName}${el.id ? `#${el.id}` : ""}`
          );
        });
        // Restore body scrolling
        document.body.classList.remove("overflow-hidden");
        window.history.back();
      });
    } else {
      console.warn("Close button not found in detail section");
    }

    // Update history
    window.history.pushState({ comicId: comic.id }, "", `/comic/${comic.id}`);
    console.log("Comic detail displayed for:", comic.id);
  } catch (error) {
    console.error("Error showing comic detail:", error);
    // Ensure body scrolling is restored on error
    document.body.classList.remove("overflow-hidden");
  }
}
