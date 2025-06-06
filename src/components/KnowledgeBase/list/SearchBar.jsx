import { useState, useEffect } from "react";

export default function SearchBar({ searchQuery, onSearch }) {
  const [localQuery, setLocalQuery] = useState(searchQuery || "");

  // Update local state when prop changes
  useEffect(() => {
    setLocalQuery(searchQuery);
  }, [searchQuery]);

  const handleChange = (e) => {
    const value = e.target.value;
    setLocalQuery(value);
    onSearch(value);
  };

  const handleClear = () => {
    setLocalQuery("");
    onSearch("");
  };

  return (
    <div className="relative w-full max-w-md mx-auto mb-6">
      <input
        type="text"
        className="w-full px-4 py-2 pl-10 pr-10 border-2 border-blue-400 rounded-full focus:outline-none focus:border-blue-600 transition-colors"
        placeholder="Search Pokémon..."
        value={localQuery}
        onChange={handleChange}
      />
      <div className="absolute inset-y-0 left-0 flex items-center pl-3">
        <svg
          className="w-5 h-5 text-blue-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          ></path>
        </svg>
      </div>
      {localQuery && (
        <button
          className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
          onClick={handleClear}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
      )}
    </div>
  );
}
