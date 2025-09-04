import React, { useEffect, useState } from "react";
import { fetchInventories, searchInventories } from "../services/api";
import { Link } from "react-router-dom";
import TagCloud from "../components/TagCloud";

export default function Home() {
  const [latestInventories, setLatestInventories] = useState([]);
  const [popularInventories, setPopularInventories] = useState([]);
  const [tags, setTags] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    loadLatestInventories();
    loadPopularInventories();
    loadTags();
  }, []);

  const loadLatestInventories = async () => {
    const data = await fetchInventories();
    const sorted = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    setLatestInventories(sorted.slice(0, 10));
  };

  const loadPopularInventories = async () => {
    const data = await fetchInventories();
    const sorted = data.sort((a, b) => b.itemsCount - a.itemsCount);
    setPopularInventories(sorted.slice(0, 5));
  };

  const loadTags = async () => {
    const data = await fetchInventories();
    const allTags = data.flatMap((inv) => inv.tags || []);
    const uniqueTags = [...new Set(allTags)];
    setTags(uniqueTags);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery) return;
    const results = await searchInventories(searchQuery);
    setSearchResults(results);
  };

  return (
    <div className="p-6">
      <form onSubmit={handleSearch} className="mb-6 flex space-x-2">
        <input
          type="text"
          placeholder="Search inventories..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 px-3 py-2 border rounded-md"
        />
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500">
          Search
        </button>
      </form>

      {searchResults.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2">Search Results</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {searchResults.map((inv) => (
              <Link
                key={inv.id}
                to={`/inventories/${inv.id}`}
                className="p-4 border rounded-md hover:shadow-lg"
              >
                <h3 className="font-semibold">{inv.title}</h3>
                <p className="text-gray-500">{inv.description}</p>
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="mb-6">
        <h2 className="text-xl font-bold mb-2">Latest Inventories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {latestInventories.map((inv) => (
            <Link
              key={inv.id}
              to={`/inventories/${inv.id}`}
              className="p-4 border rounded-md hover:shadow-lg"
            >
              <h3 className="font-semibold">{inv.title}</h3>
              <p className="text-gray-500">{inv.description}</p>
              <p className="mt-2 text-sm text-gray-400">By: {inv.creatorName}</p>
            </Link>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-bold mb-2">Top 5 Popular Inventories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {popularInventories.map((inv) => (
            <Link
              key={inv.id}
              to={`/inventories/${inv.id}`}
              className="p-4 border rounded-md hover:shadow-lg"
            >
              <h3 className="font-semibold">{inv.title}</h3>
              <p className="text-gray-500">{inv.description}</p>
              <p className="mt-2 text-sm text-gray-400">Items: {inv.itemsCount}</p>
            </Link>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-2">Tags</h2>
        <TagCloud tags={tags} />
      </div>
    </div>
  );
}
