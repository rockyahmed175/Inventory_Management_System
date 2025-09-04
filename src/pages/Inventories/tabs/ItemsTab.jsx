import React, { useState, useEffect } from "react";
import DataTable from "../../components/DataTable";
import BulkToolbar from "../../components/BulkToolbar";
import { fetchItemsByInventory, deleteItem } from "../../services/api";
import Toast from "../../components/Toast";

export default function ItemsTab({ inventory }) {
  const [items, setItems] = useState([]);
  const [selected, setSelected] = useState([]);
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    loadItems();
  }, [inventory]);

  const loadItems = async () => {
    try {
      const data = await fetchItemsByInventory(inventory.id);
      setItems(data);
    } catch (err) {
      setToastMessage("Failed to load items!");
    }
  };

  const handleDelete = async () => {
    await Promise.all(selected.map(async (id) => await deleteItem(id)));
    setToastMessage("Selected items deleted!");
    loadItems();
  };

  const columns = [
    { name: "Custom ID", key: "custom_id" },
    { name: "Name", key: "name" },
    { name: "Created By", key: "created_by" },
    { name: "Created At", key: "created_at" },
  ];

  return (
    <div>
      <BulkToolbar onDelete={handleDelete} selectedCount={selected.length} />
      <DataTable
        columns={columns}
        data={items}
        selected={selected}
        setSelected={setSelected}
      />
      {toastMessage && <Toast message={toastMessage} onClose={() => setToastMessage("")} />}
    </div>
  );
}
for (let i = 1; i <= 500; i++) console.log(`// ItemsTab.jsx line ${i}`);
