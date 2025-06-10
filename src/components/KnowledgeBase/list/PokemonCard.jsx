import { motion } from "framer-motion";
import { getTypeColor } from "../../../utils/getTypeColor";
import { getGradientFromColor } from "../../../utils/adjustColor";
import { Card3D } from "../../common/Card3D";

export default function PokemonCard({ character, onClick }) {
  // Определяем основной тип покемона и создаем градиент
  const getTypeBackground = () => {
    // Упрощенная проверка на наличие типа
    let mainType = "normal"; // значение по умолчанию

    // Проверяем есть ли массив типов
    if (
      character.types &&
      Array.isArray(character.types) &&
      character.types.length > 0
    ) {
      mainType = character.types[0]; // берем первый тип из массива
    }
    // Если есть просто строка типа
    else if (character.type) {
      mainType = character.type;
    }

    // Получаем цвет и создаем градиент
    const typeColor = getTypeColor(mainType);
    return getGradientFromColor(typeColor, 30);
  };

  // Содержимое верхней части карточки
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
      <motion.img
        src={character.image}
        alt={character.name}
        style={{
          width: "150px",
          height: "150px",
          filter: "drop-shadow(rgba(0, 0, 0, 0.5) 3px 3px 5px)",
          objectFit: "contain",
          transform: "translateZ(5px)",
        }}
        whileHover={{ scale: 1.05 }}
      />
    </motion.div>
  );

  // Содержимое нижней части карточки
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
          <span className="big-text">
            {character.types
              ? Array.isArray(character.types)
                ? character.types.join("/")
                : character.types
              : character.type || "???"}
          </span>
          <span className="regular-text">Type</span>
        </div>
        <div className="item">
          <span className="big-text">{character.level || "???"}</span>
          <span className="regular-text">Level</span>
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
