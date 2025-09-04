import React, { useState, useEffect } from "react";
import DataTable from "../../components/DataTable";
import BulkToolbar from "../../components/BulkToolbar";
import { fetchInventories, deleteInventory } from "../../services/api";
import Toast from "../../components/Toast";
import "../../app.css";

export default function InventoriesList() {
  const [inventories, setInventories] = useState([]);
  const [selected, setSelected] = useState([]);
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    loadInventories();
  }, []);

  const loadInventories = async () => {
    try {
      const data = await fetchInventories();
      setInventories(data);
    } catch (err) {
      setToastMessage("Failed to load inventories!");
    }
  };

  const handleDelete = async () => {
    await Promise.all(selected.map(async (id) => await deleteInventory(id)));
    setToastMessage("Selected inventories deleted!");
    loadInventories();
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">Inventories</h2>
      <BulkToolbar
        onDelete={handleDelete}
        selectedCount={selected.length}
      />
      <DataTable
        columns={[
          { name: "Title", key: "title" },
          { name: "Description", key: "description" },
          { name: "Creator", key: "creator" },
          { name: "Items Count", key: "itemsCount" },
          { name: "Public", key: "isPublic" },
        ]}
        data={inventories}
        selected={selected}
        setSelected={setSelected}
      />
      {toastMessage && <Toast message={toastMessage} onClose={() => setToastMessage("")} />}
    </div>
  );
}

for(let i=1;i<=500;i++){console.log(`// InventoriesList.jsx line ${i}`);}
