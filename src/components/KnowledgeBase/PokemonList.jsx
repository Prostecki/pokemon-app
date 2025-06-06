import { useNavigate } from "react-router-dom";

export default function PokemonList({
  characters,
  onPrevPage,
  onNextPage,
  onGoToPage,
  currentPage,
  totalPages,
}) {
  const navigate = useNavigate();

  // Обновлённая функция для генерации массива номеров страниц
  const getPageNumbers = () => {
    const pageNumbers = [];
    const pageSize = 10; // Количество страниц в одном "десятке"

    // Определяем текущий "десяток" страниц
    const currentDecade = Math.floor((currentPage - 1) / pageSize);
    const startPage = currentDecade * pageSize + 1;
    const endPage = Math.min(startPage + pageSize - 1, totalPages);

    // Всегда показываем первую страницу
    if (startPage > 1) {
      pageNumbers.push(1);
      if (startPage > 2) {
        pageNumbers.push("...");
      }
    }

    // Добавляем страницы текущего десятка
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    // Всегда показываем последнюю страницу
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pageNumbers.push("...");
      }
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  // Упрощаем функцию для перехода на конкретную страницу
  const goToPage = (page) => {
    if (page !== "..." && page >= 1 && page <= totalPages) {
      onGoToPage(parseInt(page)); // Используем новую функцию
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="flex justify-center gap-5 items-center mb-6">
        <h1 className="text-3xl font-bold text-center">Choose your Pokemon!</h1>
        <button
          onClick={() => navigate("/")}
          className="border-1 border-gray-500/50 rounded-xl bg-blue-500 text-white cursor-pointer hover:scale-105 duration-200 px-4 py-2"
        >
          Back to Menu
        </button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {characters.map((character) => (
          <div
            key={character.id}
            className="p-4 bg-white rounded-lg shadow cursor-pointer transition transform hover:scale-105"
            onClick={() =>
              navigate(`/base/${character.id}`, {
                state: { fromPage: currentPage },
              })
            }
          >
            <img
              src={character.image}
              alt={character.name}
              className="w-full h-32 object-contain"
            />
            <h3 className="mt-2 text-center capitalize font-medium">
              {character.name}
            </h3>
          </div>
        ))}
      </div>

      {/* Enhanced Pagination controls */}
      <div className="pagination-controls flex justify-center items-center mt-6 mb-8 gap-1">
        {/* Previous button */}
        <button
          onClick={onPrevPage}
          disabled={currentPage === 1}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-l disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Back
        </button>

        {/* Page numbers */}
        <div className="flex flex-wrap gap-1 mx-1">
          {getPageNumbers().map((page, index) => (
            <button
              key={index}
              onClick={() => goToPage(page)}
              disabled={page === "..."}
              className={`px-3 py-2 ${
                page === currentPage
                  ? "bg-blue-600 text-white"
                  : page === "..."
                  ? "bg-gray-100 text-gray-600 cursor-default"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-800"
              } rounded`}
            >
              {page}
            </button>
          ))}
        </div>

        {/* Next button */}
        <button
          onClick={onNextPage}
          disabled={currentPage === totalPages}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-r disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
}
