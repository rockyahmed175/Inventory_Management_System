import React, { useEffect, useState } from "react";
import { fetchUserInventories, fetchUserWriteAccessInventories } from "../services/api";
import { Link } from "react-router-dom";

export default function Profile() {
  const [ownedInventories, setOwnedInventories] = useState([]);
  const [writeAccessInventories, setWriteAccessInventories] = useState([]);
  const [sortKey, setSortKey] = useState("title");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    loadOwnedInventories();
    loadWriteAccessInventories();
  }, []);

  const loadOwnedInventories = async () => {
    const data = await fetchUserInventories();
    setOwnedInventories(data);
  };

  const loadWriteAccessInventories = async () => {
    const data = await fetchUserWriteAccessInventories();
    setWriteAccessInventories(data);
  };

  const handleSort = (table, key) => {
    const order = sortOrder === "asc" ? "desc" : "asc";
    setSortKey(key);
    setSortOrder(order);

    const sortFn = (a, b) => {
      if (a[key] < b[key]) return order === "asc" ? -1 : 1;
      if (a[key] > b[key]) return order === "asc" ? 1 : -1;
      return 0;
    };

    if (table === "owned") {
      setOwnedInventories([...ownedInventories].sort(sortFn));
    } else {
      setWriteAccessInventories([...writeAccessInventories].sort(sortFn));
    }
  };

  const renderTable = (inventories, tableName) => (
    <table className="w-full border rounded-md mb-6">
      <thead className="bg-gray-100 dark:bg-gray-700">
        <tr>
          <th className="p-2 cursor-pointer" onClick={() => handleSort(tableName, "title")}>Title</th>
          <th className="p-2 cursor-pointer" onClick={() => handleSort(tableName, "description")}>Description</th>
          <th className="p-2 cursor-pointer" onClick={() => handleSort(tableName, "itemsCount")}>Items</th>
          <th className="p-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {inventories.map((inv) => (
          <tr key={inv.id} className="border-t hover:bg-gray-50 dark:hover:bg-gray-800">
            <td className="p-2">{inv.title}</td>
            <td className="p-2">{inv.description}</td>
            <td className="p-2">{inv.itemsCount}</td>
            <td className="p-2 space-x-2">
              <Link
                to={`/inventories/${inv.id}`}
                className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-500"
              >
                Open
              </Link>
              {tableName === "owned" && (
                <button className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-500">
                  Delete
                </button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Your Inventories</h2>
      {renderTable(ownedInventories, "owned")}

      <h2 className="text-xl font-bold mb-4">Inventories You Can Edit</h2>
      {renderTable(writeAccessInventories, "writeAccess")}
    </div>
  );
}
