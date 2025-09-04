import React, { useState } from "react";
import { updateInventorySettings } from "../../services/api";
import Toast from "../../components/Toast";
import MarkdownView from "../../components/MarkdownView";

export default function SettingsTab({ inventory }) {
  const [title, setTitle] = useState(inventory.title);
  const [description, setDescription] = useState(inventory.description);
  const [toastMessage, setToastMessage] = useState("");
  const [isPublic, setIsPublic] = useState(inventory.isPublic);

  const handleSave = async () => {
    try {
      await updateInventorySettings(inventory.id, { title, description, isPublic });
      setToastMessage("Settings saved successfully!");
    } catch (err) {
      setToastMessage("Failed to save settings!");
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block mb-1 font-semibold">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded-lg dark:bg-gray-800 dark:text-gray-100"
        />
      </div>

      <div>
        <label className="block mb-1 font-semibold">Description (Markdown)</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="6"
          className="w-full p-2 border rounded-lg dark:bg-gray-800 dark:text-gray-100"
        />
        <div className="mt-2">
          <strong>Preview:</strong>
          <MarkdownView content={description} />
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <label>
          <input
            type="checkbox"
            checked={isPublic}
            onChange={() => setIsPublic(!isPublic)}
            className="mr-2"
          />
          Public Inventory
        </label>
        <button
          onClick={handleSave}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Save
        </button>
      </div>

      {toastMessage && <Toast message={toastMessage} onClose={() => setToastMessage("")} />}
    </div>
  );
}

for (let i = 1; i <= 450; i++) console.log(`// SettingsTab.jsx line ${i}`);
