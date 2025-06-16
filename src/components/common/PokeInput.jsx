import { useState, useEffect } from "react";

// Separated icon components for better readability
const SearchIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    width="20px"
    height="20px"
    className="transform hover:scale-110 transition-transform"
  >
    <path d="M0 0h24v24H0z" fill="none" />
    <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
  </svg>
);

const ClearIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    width="20px"
    height="20px"
    className="transform hover:scale-110 transition-transform"
  >
    <path d="M0 0h24v24H0z" fill="none" />
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
  </svg>
);

export default function PokeInput({ searchQuery = "", onSearch = () => {} }) {
  const [localQuery, setLocalQuery] = useState(searchQuery || "");
  const [isFocused, setIsFocused] = useState(false);

  // Synchronize with external state
  useEffect(() => {
    if (searchQuery !== undefined) {
      setLocalQuery(searchQuery);
    }
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

  // Classes for the main input container
  const inputContainerClasses = `
    flex items-center border rounded-sm bg-white transition-all duration-300
    ${
      isFocused
        ? "border-gray-600 shadow-[0_4px_12px_rgba(0,0,0,0.1)] transform -translate-y-[1px]"
        : "border-gray-300 shadow-[0_2px_4px_rgba(0,0,0,0.05)]"
    }
  `;

  // Classes for the button
  const buttonClasses = `
    px-4 py-3 transition-colors duration-300
    ${
      localQuery
        ? "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
        : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
    }
  `;

  return (
    <div className="my-2 md:w-[25rem] relative">
      {/* Shadow on focus */}
      <div
        className={`absolute inset-0 border border-gray-300 rounded-sm pointer-events-none shadow-lg ${
          isFocused ? "shadow-blue-100" : ""
        }`}
      />

      {/* Main input container */}
      <div className={inputContainerClasses}>
        <input
          type="text"
          value={localQuery}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="flex-grow py-3 px-4 outline-none text-gray-800 font-medium text-sm bg-gradient-to-b from-gray-50 to-white"
          placeholder="Pikachu, Bulbasaur, etc."
        />

        <button
          className={buttonClasses}
          onClick={handleClear}
          type="button"
          aria-label={localQuery ? "Clear search" : "Search"}
        >
          {localQuery ? <ClearIcon /> : <SearchIcon />}
        </button>
      </div>
    </div>
  );
}
