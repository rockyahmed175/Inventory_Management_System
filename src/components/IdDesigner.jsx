import React, { useState } from "react";

const defaultElements = [
  { id: 1, type: "fixed", value: "INV-" },
  { id: 2, type: "seq", value: 1 },
];

export default function IdDesigner({ elements = defaultElements, onChange }) {
  const [idElements, setIdElements] = useState(elements);

  const addElement = (type) => {
    const newEl = {
      id: Date.now(),
      type,
      value: type === "fixed" ? "TEXT" : 0,
    };
    const updated = [...idElements, newEl];
    setIdElements(updated);
    onChange && onChange(generateId(updated));
  };

  const removeElement = (id) => {
    const updated = idElements.filter((el) => el.id !== id);
    setIdElements(updated);
    onChange && onChange(generateId(updated));
  };

  const updateValue = (id, value) => {
    const updated = idElements.map((el) => (el.id === id ? { ...el, value } : el));
    setIdElements(updated);
    onChange && onChange(generateId(updated));
  };

  const generateId = (elements) => {
    return elements
      .map((el) => {
        switch (el.type) {
          case "fixed":
            return el.value;
          case "seq":
            return el.value.toString().padStart(4, "0");
          case "random":
            return Math.floor(Math.random() * 10000);
          case "guid":
            return crypto.randomUUID().split("-")[0];
          case "date":
            return new Date().toISOString().split("T")[0].replace(/-/g, "");
          default:
            return "";
        }
      })
      .join("-");
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded shadow space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Custom ID Designer</h3>

      <div className="space-y-2">
        {idElements.map((el) => (
          <div key={el.id} className="flex items-center space-x-2">
            <span className="capitalize text-gray-700 dark:text-gray-300">{el.type}:</span>
            <input
              type="text"
              value={el.value}
              onChange={(e) => updateValue(el.id, e.target.value)}
              className="px-2 py-1 border rounded w-32 dark:bg-gray-700 dark:text-white"
            />
            <button
              onClick={() => removeElement(el.id)}
              className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        <button onClick={() => addElement("fixed")} className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
          Add Fixed Text
        </button>
        <button onClick={() => addElement("seq")} className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600">
          Add Sequence
        </button>
        <button onClick={() => addElement("random")} className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600">
          Add Random
        </button>
        <button onClick={() => addElement("guid")} className="px-3 py-1 bg-purple-500 text-white rounded hover:bg-purple-600">
          Add GUID
        </button>
        <button onClick={() => addElement("date")} className="px-3 py-1 bg-indigo-500 text-white rounded hover:bg-indigo-600">
          Add Date
        </button>
      </div>

      <div className="mt-4">
        <strong className="text-gray-800 dark:text-gray-200">Preview: </strong>
        <span className="text-lg font-mono">{generateId(idElements)}</span>
      </div>
    </div>
  );
}
