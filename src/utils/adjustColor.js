/**
 * Adjusts a hex color towards white by the given percentage.
 * @param {string} hex - The hex code of the color (with or without the #).
 * @param {number} percent - The percentage to lighten the color (0-100).
 * @returns {string} - The adjusted hex color.
 */
export function adjustColor(hex, percent) {
  // Remove the '#' character if present.
  hex = hex.replace("#", "");

  // Convert hex to RGB values.
  let r = parseInt(hex.substring(0, 2), 16);
  let g = parseInt(hex.substring(2, 4), 16);
  let b = parseInt(hex.substring(4, 6), 16);

  // Lighten each channel by the given percentage.
  r = Math.min(255, Math.floor(r + (255 - r) * (percent / 100)));
  g = Math.min(255, Math.floor(g + (255 - g) * (percent / 100)));
  b = Math.min(255, Math.floor(b + (255 - b) * (percent / 100)));

  // Convert back to hex and return.
  return `#${r.toString(16).padStart(2, "0")}${g
    .toString(16)
    .padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
}

/**
 * Creates a CSS linear gradient using a color and its lightened version.
 * @param {string} color - The starting hex color.
 * @param {number} [percent=30] - The percentage to lighten the color for the gradient.
 * @returns {string} - The CSS linear gradient string.
 */
export function getGradientFromColor(color, percent = 30) {
  return `linear-gradient(45deg, ${color} 0%, ${adjustColor(
    color,
    percent
  )} 100%)`;
}
