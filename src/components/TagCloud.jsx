import React from "react";
import { useNavigate } from "react-router-dom";

export default function TagCloud({ tags }) {
  const navigate = useNavigate();

  const handleTagClick = (tag) => {
    navigate(`/search?tag=${encodeURIComponent(tag)}`);
  };

  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag, index) => (
        <button
          key={index}
          onClick={() => handleTagClick(tag)}
          className="px-3 py-1 bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 rounded-full text-sm hover:bg-blue-200 dark:hover:bg-blue-700 transition"
        >
          #{tag}
        </button>
      ))}
    </div>
  );
}
