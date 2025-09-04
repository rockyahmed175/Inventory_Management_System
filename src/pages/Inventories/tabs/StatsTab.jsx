import React, { useState, useEffect } from "react";
import { fetchInventoryStats } from "../../services/api";

export default function StatsTab({ inventory }) {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    loadStats();
  }, [inventory]);

  const loadStats = async () => {
    const data = await fetchInventoryStats(inventory.id);
    setStats(data);
  };

  if (!stats) return <div>Loading statistics...</div>;

  return (
    <div className="space-y-4">
      <h4 className="font-semibold text-xl">Inventory Statistics</h4>
      <div>
        <strong>Total Items:</strong> {stats.totalItems}
      </div>
      <div>
        <strong>Numeric Fields:</strong>
        {Object.keys(stats.numericFields).map((key) => (
          <div key={key}>
            {key}: Min: {stats.numericFields[key].min}, Max: {stats.numericFields[key].max}, Avg: {stats.numericFields[key].avg}
          </div>
        ))}
      </div>
      <div>
        <strong>String Fields Most Used Values:</strong>
        {Object.keys(stats.stringFields).map((key) => (
          <div key={key}>
            {key}: {stats.stringFields[key].join(", ")}
          </div>
        ))}
      </div>
    </div>
  );
}
