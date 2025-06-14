import { motion } from "framer-motion";
import { getTypeColor } from "../../../utils/getTypeColor";
import { getGradientFromColor } from "../../../utils/adjustColor";
import { Card3D } from "../../common/Card3D";

export default function PokemonCard({ character, onClick }) {
  // Determine the main pokemon type and create a gradient background
  const getTypeBackground = () => {
    // Simplified check for the existence of a type
    let mainType = "normal"; // default value

    // Check if there is an array of types
    if (
      character.types &&
      Array.isArray(character.types) &&
      character.types.length > 0
    ) {
      mainType = character.types[0]; // use the first type from the array
    }
    // If there's just a type string
    else if (character.type) {
      mainType = character.type;
    }

    // Get the type color and create a gradient using it
    const typeColor = getTypeColor(mainType);
    return getGradientFromColor(typeColor, 30);
  };

  // Get the main type for both background and badge
  const mainType =
    character.types &&
    Array.isArray(character.types) &&
    character.types.length > 0
      ? character.types[0]
      : character.type || "normal";

  // Content for the top section of the card
  const topSectionContent = character.image && (
    <motion.div
      style={{
        transformStyle: "preserve-3d",
        display: "flex",
        margin: "2rem auto",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        zIndex: 5,
        height: "100%",
      }}
    >
      {/* Type badge in top-left corner */}
      <div
        className="absolute top-[-1.8rem] left-[-0.6rem] px-2 py-1 rounded-tl-xl rounded-br-xl text-white text-xs font-bold uppercase shadow-md"
        style={{
          backgroundColor: getTypeColor(mainType),
          transform: "translateZ(10px)",
          zIndex: 10,
        }}
      >
        <span>{mainType}</span>
      </div>

      <motion.img
        src={character.image}
        alt={character.name}
        loading="lazy"
        style={{
          width: "150px",
          height: "150px",
          filter: "drop-shadow(rgba(0, 0, 0, 0.5) 3px 3px 5px)",
          objectFit: "contain",
          transform: "translateZ(5px)",
        }}
      />
    </motion.div>
  );

  // Content for the bottom section of the card
  const bottomSectionContent = (
    <>
      <motion.span
        className="title mt-5"
        style={{ transform: "translateZ(15px)" }}
      >
        {character.name?.toUpperCase() || "POKEMON"}
      </motion.span>

      <div className="row row1">
        <div className="item">
          <span className="big-text">{character.id || "???"}</span>
          <span className="regular-text">ID</span>
        </div>
        <div className="item">
          <span className="big-text">{character.baseExp || "???"}</span>
          <span className="regular-text">Exp</span>
        </div>
        <div className="item">
          <span className="big-text">{character.types?.length || "1"}</span>
          <span className="regular-text">Types</span>
        </div>
      </div>
    </>
  );

  return (
    <Card3D
      onClick={() => onClick(character.id)}
      topSectionBackground={getTypeBackground()}
      topSectionContent={topSectionContent}
      bottomSectionContent={bottomSectionContent}
    />
  );
}
