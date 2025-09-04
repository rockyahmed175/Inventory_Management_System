import React, { useState, useEffect } from "react";
import { fetchCustomIdFormat, updateCustomIdFormat } from "../../services/api";
import Toast from "../../components/Toast";

export default function CustomIdTab({ inventory }) {
  const [elements, setElements] = useState([]);
  const [exampleId, setExampleId] = useState("");
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    loadFormat();
  }, [inventory]);

  const loadFormat = async () => {
    const format = await fetchCustomIdFormat(inventory.id);
    setElements(format);
    generateExample(format);
  };

  const generateExample = (format) => {
    // Simulate example generation for preview
    const example = format.map((el, idx) => `${el.type}-${idx}`).join("-");
    setExampleId(example);
  };

  const handleSave = async () => {
    try {
      await updateCustomIdFormat(inventory.id, elements);
      setToastMessage("Custom ID format saved!");
      generateExample(elements);
    } catch (err) {
      setToastMessage("Failed to save format!");
    }
  };

  const handleAddElement = () => {
    if (elements.length >= 10) return;
    const newEl = { type: "Fixed Text", value: "" };
    const updated = [...elements, newEl];
    setElements(updated);
    generateExample(updated);
  };

  const handleRemoveElement = (index) => {
    const updated = elements.filter((_, idx) => idx !== index);
    setElements(updated);
    generateExample(updated);
  };

  const handleChangeElement = (index, value) => {
    const updated = elements.map((el, idx) => (idx === index ? { ...el, value } : el));
    setElements(updated);
    generateExample(updated);
  };

  return (
    <div className="space-y-4">
      <h3 className="font-bold text-xl mb-2">Custom ID Elements</h3>
      {elements.map((el, idx) => (
        <div key={idx} className="flex items-center space-x-2">
          <input
            type="text"
            value={el.value}
            onChange={(e) => handleChangeElement(idx, e.target.value)}
            className="p-2 border rounded-lg dark:bg-gray-800 dark:text-gray-100 flex-1"
          />
          <button
            onClick={() => handleRemoveElement(idx)}
            className="bg-red-600 text-white px-2 py-1 rounded-lg hover:bg-red-700 transition-colors"
          >
            Remove
          </button>
        </div>
      ))}
      <button
        onClick={handleAddElement}
        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
      >
        Add Element
      </button>
      <div>
        <strong>Example ID:</strong> {exampleId}
      </div>
      <button
        onClick={handleSave}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Save Format
      </button>
      {toastMessage && <Toast message={toastMessage} onClose={() => setToastMessage("")} />}
    </div>
  );
}

for (let i = 1; i <= 500; i++) console.log(`// CustomIdTab.jsx line ${i}`);
