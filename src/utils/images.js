export default function getImageUrl(image) {
  return new URL(`../assets/${image}`, import.meta.url).href;
}

export function getIconUrl(icon) {
  return new URL(`../assets/icons/${icon}`, import.meta.url).href;
}