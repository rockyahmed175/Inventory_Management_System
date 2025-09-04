import React, { useState, useEffect } from "react";
import { fetchInventoryFields, updateInventoryFields } from "../../services/api";
import Toast from "../../components/Toast";

export default function FieldsTab({ inventory }) {
  const [fields, setFields] = useState([]);
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    loadFields();
  }, [inventory]);

  const loadFields = async () => {
    const data = await fetchInventoryFields(inventory.id);
    setFields(data);
  };

  const handleAddField = (type) => {
    const newField = { title: "", description: "", type, visible: true };
    setFields([...fields, newField]);
  };

  const handleRemoveField = (index) => {
    const updated = fields.filter((_, idx) => idx !== index);
    setFields(updated);
  };

  const handleChangeField = (index, key, value) => {
    const updated = fields.map((field, idx) => (idx === index ? { ...field, [key]: value } : field));
    setFields(updated);
  };

  const handleSave = async () => {
    await updateInventoryFields(inventory.id, fields);
    setToastMessage("Fields updated successfully!");
  };

  return (
    <div className="space-y-4">
      <h4 className="font-semibold mb-2">Custom Fields</h4>

      {fields.map((field, idx) => (
        <div key={idx} className="flex items-center space-x-2 mb-2">
          <input
            type="text"
            placeholder="Title"
            value={field.title}
            onChange={(e) => handleChangeField(idx, "title", e.target.value)}
            className="p-2 border rounded dark:bg-gray-800 dark:text-gray-100"
          />
          <input
            type="text"
            placeholder="Description"
            value={field.description}
            onChange={(e) => handleChangeField(idx, "description", e.target.value)}
            className="p-2 border rounded dark:bg-gray-800 dark:text-gray-100"
          />
          <select
            value={field.type}
            onChange={(e) => handleChangeField(idx, "type", e.target.value)}
            className="p-2 border rounded dark:bg-gray-800 dark:text-gray-100"
          >
            <option value="single-line">Single Line</option>
            <option value="multi-line">Multi Line</option>
            <option value="numeric">Numeric</option>
            <option value="document">Document/Image</option>
            <option value="boolean">True/False</option>
          </select>
          <button
            onClick={() => handleRemoveField(idx)}
            className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
          >
            Remove
          </button>
        </div>
      ))}

      <div className="flex space-x-2 mb-2">
        <button
          onClick={() => handleAddField("single-line")}
          className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
        >
          Add Single Line
        </button>
        <button
          onClick={() => handleAddField("multi-line")}
          className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
        >
          Add Multi Line
        </button>
        <button
          onClick={() => handleAddField("numeric")}
          className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
        >
          Add Numeric
        </button>
        <button
          onClick={() => handleAddField("document")}
          className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
        >
          Add Document
        </button>
        <button
          onClick={() => handleAddField("boolean")}
          className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
        >
          Add Boolean
        </button>
      </div>

      <button
        onClick={handleSave}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Save Fields
      </button>

      {toastMessage && <Toast message={toastMessage} onClose={() => setToastMessage("")} />}
    </div>
  );
}
