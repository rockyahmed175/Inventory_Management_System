import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { searchInventories } from "../services/api";

export default function Search() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tag = params.get("tag");
    if (tag) {
      handleSearch(tag);
    }
  }, [location.search]);

  const handleSearch = async (searchQuery) => {
    setLoading(true);
    setQuery(searchQuery);
    try {
      const data = await searchInventories(searchQuery);
      setResults(data);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() === "") return;
    handleSearch(query);
  };

  return (
    <div className="p-6">
      <form onSubmit={handleSubmit} className="mb-6 flex space-x-2">
        <input
          type="text"
          placeholder="Search inventories..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 px-3 py-2 border rounded-md"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500"
        >
          Search
        </button>
      </form>

      {loading && <p className="text-gray-500">Loading...</p>}

      {!loading && results.length === 0 && query && (
        <p className="text-gray-500">No inventories found for "{query}"</p>
      )}

      {!loading && results.length > 0 && (
        <div>
          <h2 className="text-xl font-bold mb-2">
            Search Results for "{query}"
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {results.map((inv) => (
              <Link
                key={inv.id}
                to={`/inventories/${inv.id}`}
                className="p-4 border rounded-md hover:shadow-lg"
              >
                <h3 className="font-semibold">{inv.title}</h3>
                <p className="text-gray-500">{inv.description}</p>
                <p className="mt-2 text-sm text-gray-400">By: {inv.creatorName}</p>
                <p className="mt-1 text-sm text-gray-400">Items: {inv.itemsCount}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
