/**
 * Fetches and renders an HTML template with data
 *
 *
 */

export async function renderTemplate(templatePath, data) {
  try {
    const response = await fetch(templatePath);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    let template = await response.text();

    // Replace placeholders with data
    return template
      .replace("{cover}", data.cover)
      .replace("{title}", data.title)
      .replace("{description}", data.description)
      .replace("{publisher}", data.publisher)
      .replace("{author}", data.author)
      .replace("{rating}", data.rating)
      .replace("{releaseYear}", data.releaseYear)
      .replace("{genre}", data.genre);
  } catch (error) {
    console.error(`Error loading template ${templatePath}:`, error);
    throw error;
  }
}
