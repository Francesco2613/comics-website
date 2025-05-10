/**
 * Fetches comic data from comics.json
 * @returns {Promise<Array>} Array of comic objects
 */
export async function fetchComics() {
  try {
    const response = await fetch("data/comics.json");
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data.comics;
  } catch (error) {
    console.error("Error fetching comics:", error);
    throw error;
  }
}
