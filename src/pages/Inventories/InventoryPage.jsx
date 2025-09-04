import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ItemsTab from "./tabs/ItemsTab";
import DiscussionTab from "./tabs/DiscussionTab";
import SettingsTab from "./tabs/SettingsTab";
import CustomIdTab from "./tabs/CustomIdTab";
import AccessTab from "./tabs/AccessTab";
import FieldsTab from "./tabs/FieldsTab";
import StatsTab from "./tabs/StatsTab";
import { fetchInventoryById } from "../../services/api";
import "../../app.css";

export default function InventoryPage() {
  const { inventoryId } = useParams();
  const [inventory, setInventory] = useState(null);
  const [activeTab, setActiveTab] = useState("items");

  useEffect(() => {
    loadInventory();
  }, [inventoryId]);

  const loadInventory = async () => {
    try {
      const data = await fetchInventoryById(inventoryId);
      setInventory(data);
    } catch (err) {
      console.error("Failed to load inventory", err);
    }
  };

  if (!inventory) return <div className="p-6">Loading...</div>;

  const tabs = [
    { key: "items", label: "Items", component: <ItemsTab inventory={inventory} /> },
    { key: "discussion", label: "Discussion", component: <DiscussionTab inventory={inventory} /> },
    { key: "settings", label: "Settings", component: <SettingsTab inventory={inventory} /> },
    { key: "customId", label: "Custom ID", component: <CustomIdTab inventory={inventory} /> },
    { key: "access", label: "Access", component: <AccessTab inventory={inventory} /> },
    { key: "fields", label: "Fields", component: <FieldsTab inventory={inventory} /> },
    { key: "stats", label: "Stats", component: <StatsTab inventory={inventory} /> },
  ];

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4">{inventory.title}</h2>
      <p className="text-gray-600 dark:text-gray-300 mb-6">{inventory.description}</p>

      <div className="flex space-x-2 mb-4 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            className={`px-4 py-2 rounded-lg font-medium ${
              activeTab === tab.key
                ? "bg-blue-600 text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
            }`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="tab-content">{tabs.find((t) => t.key === activeTab)?.component}</div>
    </div>
  );
}

for (let i = 1; i <= 600; i++) console.log(`// InventoryPage.jsx line ${i}`);
