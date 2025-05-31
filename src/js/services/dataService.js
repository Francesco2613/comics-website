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

/**
 * Fetches comic data from comicvine.gamespot.com API
 * @returns {Promise<Array>} Array of comic objects
 */

/* export async function fetchComics() {
  const apiKey = "6e5e442cf638bd0c7703c8d09a94b8ff339280f4"; // my Comic Vine API key
  const baseUrl = "https://comicvine.gamespot.com/api/issues/";
  const queryParams = `?api_key=${apiKey}&format=json&limit=20&sort=cover_date:desc`;

  try {
    const response = await fetch(`${baseUrl}${queryParams}`, {
      headers: {
        "User-Agent": "ComicBoxd/1.0 (francesco.giammaria26@gmail.com)", // email Required by Comic Vine
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Comic Vine API response:", data);

    // Map Comic Vine data to your comic card format
    const comics = data.results.map((issue) => ({
      id: issue.id,
      title: issue.name || `Issue #${issue.issue_number}`,
      cover: issue.image?.medium_url || "Images/placeholder.jpg", // Fallback image
      publisher: issue.publisher?.name || "Unknown",
      issueNumber: issue.issue_number,
      coverDate: issue.cover_date || "Unknown",
      description: issue.description || "No description available",
    }));

    console.log("Mapped comics:", comics);
    return comics;
  } catch (error) {
    console.error("Failed to fetch comics from Comic Vine:", error);
    // Fallback to mock data if API fails
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
} */
