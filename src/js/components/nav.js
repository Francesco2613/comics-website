// src/js/components/nav.js
import { renderTemplate } from "../utils/template.js";

export async function initNav() {
  try {
    // Load the nav template
    const navHtml = await renderTemplate("templates/nav.html", {});
    console.log("Nav HTML loaded:", navHtml.substring(0, 100) + "...");

    // Create container and insert HTML
    const navContainer = document.createElement("div");
    navContainer.innerHTML = navHtml;

    // Verify the first child is a <nav>
    const navElementToInsert = navContainer.firstChild;
    console.log(
      "Element to insert:",
      navElementToInsert ? navElementToInsert.tagName : "null"
    );
    if (
      !navElementToInsert ||
      navElementToInsert.tagName.toLowerCase() !== "nav"
    ) {
      throw new Error("Invalid nav HTML: <nav> element not found");
    }

    // Insert into DOM
    document.body.prepend(navElementToInsert);
    console.log("Nav inserted into DOM");

    // Wait for DOM update
    await new Promise((resolve) => setTimeout(resolve, 10));

    // Verify <nav> exists
    const navElement = document.querySelector("nav");
    console.log(
      "Nav element found:",
      navElement ? navElement.outerHTML.substring(0, 200) + "..." : null
    );
    if (!navElement) {
      console.error("No <nav> element found after insertion");
      document.body.insertAdjacentHTML(
        "afterbegin",
        '<nav class="fixed top-0 w-full z-50 bg-black/60 border-b border-zinc-800 backdrop-blur-sm"><div class="max-w-7xl mx-auto px-4"><a href="/" class="home-link text-white">Home</a></div></nav>'
      );
      return; // Exit to avoid mobile menu setup
    }

    // Setup mobile menu toggle
    const menuButton = document.querySelector(
      'nav button[aria-controls="mobile-menu"]'
    );
    const mobileMenu = document.querySelector("nav #mobile-menu");
    console.log("Menu button:", menuButton);
    console.log("Mobile menu:", mobileMenu);

    if (menuButton && mobileMenu) {
      menuButton.addEventListener("click", () => {
        const isExpanded = menuButton.getAttribute("aria-expanded") === "true";
        menuButton.setAttribute("aria-expanded", !isExpanded);
        mobileMenu.classList.toggle("hidden");
        const icon = menuButton.querySelector("i.fas");
        if (icon) {
          icon.classList.toggle("fa-bars");
          icon.classList.toggle("fa-times");
        } else {
          console.warn("Font Awesome icon not found in menu button");
        }
      });
    } else {
      console.warn("Mobile menu elements not found:", {
        menuButton,
        mobileMenu,
      });
    }
  } catch (error) {
    console.error("Error initializing navigation bar:", error);
    document.body.insertAdjacentHTML(
      "afterbegin",
      '<nav class="fixed top-0 w-full z-50 bg-black/60 border-b border-zinc-800 backdrop-blur-sm"><div class="max-w-7xl mx-auto px-4"><a href="/" class="home-link text-white">Home</a></div></nav>'
    );
    console.warn("Using fallback navigation; mobile menu unavailable");
  }
}
