// src/js/utils/template.js
let cachedTemplate = null;

export async function renderTemplate(templatePath, data = {}) {
  console.log("Fetching template:", templatePath, "with data:", data);
  try {
    if (!cachedTemplate || cachedTemplate.path !== templatePath) {
      const response = await fetch(templatePath);
      console.log("Template fetch status:", response.status);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      cachedTemplate = { path: templatePath, content: await response.text() };
    }
    let template = cachedTemplate.content;
    // Only replace placeholders if data is provided
    if (Object.keys(data).length > 0) {
      template = template
        .replace("{cover}", data.cover || "")
        .replace("{title}", data.title || "Unknown Title")
        .replace("__title__", data.title || "Unknown Title")
        .replace(
          "{description}",
          data.description || "No description available"
        )
        .replace("{publisher}", data.publisher || "Unknown Publisher")
        .replace("{author}", data.author || "Unknown Author")
        .replace("{rating}", data.rating != null ? data.rating : "N/A")
        .replace("{releaseYear}", data.releaseYear || "N/A")
        .replace("{genre}", data.genre || "Unknown Genre");
    }
    return template;
  } catch (error) {
    console.error(`Error loading template ${templatePath}:`, error);
    throw error;
  }
}
