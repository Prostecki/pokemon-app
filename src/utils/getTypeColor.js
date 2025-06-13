export function getTypeColor(type) {
  const typeColors = {
    normal: "#A8A77A",
    fire: "#EE8130",
    water: "#6390F0",
    electric: "#F7D02C",
    grass: "#7AC74C",
    ice: "#96D9D6",
    fighting: "#C22E28",
    poison: "#A33EA1",
    ground: "#E2BF65",
    flying: "#A98FF3",
    psychic: "#F95587",
    bug: "#A6B91A",
    rock: "#B6A136",
    ghost: "#735797",
    dragon: "#6F35FC",
    dark: "#705746",
    steel: "#B7B7CE",
    fairy: "#D685AD",
  };
  return typeColors[type] || "#777";
}

export const pokemonTypes = [
  {
    id: "normal",
    label: "Normal",
    description: "Standard physical attacks",
    color: getTypeColor("normal"),
  },
  {
    id: "fire",
    label: "Fire",
    description: "Powerful flame attacks",
    color: getTypeColor("fire"),
  },
  {
    id: "water",
    label: "Water",
    description: "Fluid and adaptable moves",
    color: getTypeColor("water"),
  },
  {
    id: "grass",
    label: "Grass",
    description: "Nature-based abilities",
    color: getTypeColor("grass"),
  },
  {
    id: "electric",
    label: "Electric",
    description: "Lightning fast attacks",
    color: getTypeColor("electric"),
  },
  {
    id: "ice",
    label: "Ice",
    description: "Freezing cold moves",
    color: getTypeColor("ice"),
  },
  {
    id: "fighting",
    label: "Fighting",
    description: "Strong physical combat",
    color: getTypeColor("fighting"),
  },
  {
    id: "poison",
    label: "Poison",
    description: "Toxic and status effects",
    color: getTypeColor("poison"),
  },
  {
    id: "ground",
    label: "Ground",
    description: "Earth-based attacks",
    color: getTypeColor("ground"),
  },
  {
    id: "flying",
    label: "Flying",
    description: "Aerial maneuvers",
    color: getTypeColor("flying"),
  },
  {
    id: "psychic",
    label: "Psychic",
    description: "Mind-bending powers",
    color: getTypeColor("psychic"),
  },
  {
    id: "bug",
    label: "Bug",
    description: "Insect-like abilities",
    color: getTypeColor("bug"),
  },
  {
    id: "rock",
    label: "Rock",
    description: "Hard-hitting mineral moves",
    color: getTypeColor("rock"),
  },
  {
    id: "ghost",
    label: "Ghost",
    description: "Supernatural abilities",
    color: getTypeColor("ghost"),
  },
  {
    id: "dragon",
    label: "Dragon",
    description: "Legendary power",
    color: getTypeColor("dragon"),
  },
  {
    id: "dark",
    label: "Dark",
    description: "Mysterious abilities",
    color: getTypeColor("dark"),
  },
  {
    id: "steel",
    label: "Steel",
    description: "Metal-based defense",
    color: getTypeColor("steel"),
  },
  {
    id: "fairy",
    label: "Fairy",
    description: "Magical enchantments",
    color: getTypeColor("fairy"),
  },
];

export function getMoveName(move) {
  return typeof move === "object" && move.name ? move.name : move;
}

export default pokemonTypes;
