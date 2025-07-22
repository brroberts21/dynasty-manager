import React, { useState } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";

interface SearchbarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

const Searchbar = ({ onSearch, placeholder }: SearchbarProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  return (
    <div className="w-full max-w-md">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
          <FaSearch className="w-5 h-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder={placeholder || "Search..."}
          className="w-full pl-12 pr-12 py-3 text-gray-700  border-0 border-b-2 border-gray-200 rounded-none focus:outline-none focus:border-b-primary focus:bg-white transition-all duration-300 placeholder-gray-400"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            onSearch(e.target.value);
          }}
        />
        {searchQuery && (
          <button
            onClick={() => {
              setSearchQuery("");
              onSearch("");
            }}
            className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 hover:text-primary transition-colors duration-200"
          >
            <FaTimes className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Searchbar;
