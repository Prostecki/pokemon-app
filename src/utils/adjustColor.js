export function adjustColor(hex, percent) {
  // Убираем # если есть
  hex = hex.replace("#", "");

  // Преобразуем hex в RGB
  let r = parseInt(hex.substring(0, 2), 16);
  let g = parseInt(hex.substring(2, 4), 16);
  let b = parseInt(hex.substring(4, 6), 16);

  // Осветляем каждый канал
  r = Math.min(255, Math.floor(r + (255 - r) * (percent / 100)));
  g = Math.min(255, Math.floor(g + (255 - g) * (percent / 100)));
  b = Math.min(255, Math.floor(b + (255 - b) * (percent / 100)));

  // Преобразуем обратно в hex
  return `#${r.toString(16).padStart(2, "0")}${g
    .toString(16)
    .padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
}

export function getGradientFromColor(color, percent = 30) {
  return `linear-gradient(45deg, ${color} 0%, ${adjustColor(
    color,
    percent
  )} 100%)`;
}
