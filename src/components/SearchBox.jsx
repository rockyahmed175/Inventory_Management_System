import React, { useState, useEffect } from "react";

export default function SearchBox({ value = "", onSearch, placeholder = "Search..." , debounceTime = 500 }) {
  const [query, setQuery] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      onSearch && onSearch(query);
    }, debounceTime);

    return () => clearTimeout(handler);
  }, [query, onSearch, debounceTime]);

  return (
    <div className="relative w-full max-w-md">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
      />
      <span className="absolute right-3 top-2.5 text-gray-400 dark:text-gray-300">
        🔍
      </span>
    </div>
  );
}
