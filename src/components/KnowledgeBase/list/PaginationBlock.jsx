import { usePaginationContext } from "../../../contexts/PaginationContext";

export default function PaginationBlock() {
  const { currentPage, totalPages, onPrevPage, onNextPage, onGoToPage } =
    usePaginationContext();

  // Updated function for generating an array of page numbers
  const getPageNumbers = () => {
    const pageNumbers = [];
    const pageSize = 10; // Number of pages in one "decade"

    // Define the current "decade" of pages
    const currentDecade = Math.floor((currentPage - 1) / pageSize);
    const startPage = currentDecade * pageSize + 1;
    const endPage = Math.min(startPage + pageSize - 1, totalPages);

    // Always show the first page
    if (startPage > 1) {
      pageNumbers.push(1);
      if (startPage > 2) {
        pageNumbers.push("...");
      }
    }

    // Add pages of the current decade
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    // Always show the last page
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pageNumbers.push("...");
      }
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  // Simplify the function for navigating to a specific page
  const goToPage = (page) => {
    if (page !== "..." && page >= 1 && page <= totalPages) {
      onGoToPage(parseInt(page)); // Use the new function
    }
  };

  return (
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
      <div className="flex flex-wrap gap-1 mx-1 max-md:hidden">
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
  );
}
