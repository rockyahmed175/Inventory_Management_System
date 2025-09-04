import React from "react";

export default function BulkToolbar({
  selectedCount = 0,
  actions = [], // [{ label: "Delete", onClick: () => {} }]
}) {
  if (selectedCount === 0) return null;

  return (
    <div className="mb-4 flex flex-wrap items-center justify-between bg-gray-100 dark:bg-gray-800 p-3 rounded shadow">
      <div className="text-gray-700 dark:text-gray-300 font-medium">
        {selectedCount} item{selectedCount > 1 ? "s" : ""} selected
      </div>
      <div className="flex space-x-2 mt-2 sm:mt-0">
        {actions.map((action, idx) => (
          <button
            key={idx}
            onClick={action.onClick}
            className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            {action.label}
          </button>
        ))}
      </div>
    </div>
  );
}
