document.addEventListener("DOMContentLoaded", async function () {
  // Load comic data from JSON
  let comicsData = [];
  try {
    const response = await fetch("data/comics.json");
    const data = await response.json();
    comicsData = data.comics;
  } catch (error) {
    console.error("Error loading comics data:", error);
    return;
  }

  // Select all comic cards
  const comicCards = document.querySelectorAll(".comic-card");

  // Add click event to each card
  comicCards.forEach((card) => {
    card.addEventListener("click", function () {
      const comicId = this.getAttribute("data-comic-id");
      if (comicId) {
        showComicDetail(comicId);
      }
    });
  });

  // Function to show comic details
  async function showComicDetail(comicId) {
    // Find the comic by id
    const comic = comicsData.find((c) => c.id === comicId);
    if (comic) {
      try {
        // Add to browser history so back button works
        window.history.pushState(
          { comicId: comicId },
          `Comic: ${comic.title}`,
          `?comic=${comicId}` // Use query parameter instead of path
        );

        // Fetch the comic detail template
        const response = await fetch("/templates/comic-detail.html");
        let template = await response.text();

        // Replace placeholders with actual data
        template = template
          .replace("{cover}", comic.cover)
          .replace("__title__", comic.title)
          .replace("{title}", comic.title)
          .replace("{description}", comic.description)
          .replace("{publisher}", comic.publisher)
          .replace("{author}", comic.author)
          .replace("{rating}", comic.rating)
          .replace("{releaseYear}", comic.releaseYear)
          .replace("{genre}", comic.genre);

        // Create or update the detail section
        let detailSection = document.getElementById("comic-detail");
        if (!detailSection) {
          detailSection = document.createElement("section");
          detailSection.id = "comic-detail";
          detailSection.className =
            "fixed inset-0 bg-black bg-opacity-95 z-50 p-6 overflow-y-auto";
          document.body.appendChild(detailSection);
        }

        // Set the template content
        detailSection.innerHTML = template;

        // Scroll to top and show the detail section
        detailSection.scrollTop = 0;
      } catch (error) {
        console.error("Error loading comic detail template:", error);
      }
    }
  }
});

// Add an event listener for the popstate event to handle back button
window.addEventListener("popstate", (event) => {
  // Check if we're returning from a comic detail page
  const detailSection = document.getElementById("comic-detail");
  if (detailSection) {
    // Remove the detail section to go back to the comics listing
    detailSection.remove();
  }

  // If we have state data and are going to another comic
  if (event.state && event.state.comicId) {
    showComicDetail(event.state.comicId);
  }
});
