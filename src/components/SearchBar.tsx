
import { X } from "lucide-react";
import React from "react";

interface SearchBarProps {
  keyword: string;
  setKeyword: (value: string) => void;
}

export function SearchBar({ keyword, setKeyword }: SearchBarProps) {
  return (
    <div className="relative w-full max-w-sm">
      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Cari nama barang..."
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />
      
      {keyword && (
        <button
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
          onClick={() => setKeyword("")}
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}
