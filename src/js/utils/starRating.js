/**
 * Generates HTML for a star rating
 */

export function generateStarRating(rating) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  let stars = "";
  for (let i = 0; i < fullStars; i++) {
    stars += '<i class="fas fa-star active"></i>';
  }
  if (hasHalfStar) {
    stars += '<i class="fas fa-star-half-alt active"></i>';
  }
  for (let i = fullStars + (hasHalfStar ? 1 : 0); i < 5; i++) {
    stars += '<i class="fas fa-star"></i>';
  }
  return stars;
}
