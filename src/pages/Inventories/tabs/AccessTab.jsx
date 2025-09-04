import React, { useState, useEffect } from "react";
import { fetchInventoryAccess, updateInventoryAccess, fetchUsers } from "../../services/api";
import Toast from "../../components/Toast";

export default function AccessTab({ inventory }) {
  const [accessList, setAccessList] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [isPublic, setIsPublic] = useState(inventory.isPublic);

  useEffect(() => {
    loadAccess();
    loadAllUsers();
  }, [inventory]);

  const loadAccess = async () => {
    const data = await fetchInventoryAccess(inventory.id);
    setAccessList(data);
  };

  const loadAllUsers = async () => {
    const users = await fetchUsers();
    setAllUsers(users);
  };

  const handleAddUser = async () => {
    if (!selectedUser) return;
    await updateInventoryAccess(inventory.id, [...accessList, selectedUser]);
    setToastMessage("User added to access list!");
    setSelectedUser("");
    loadAccess();
  };

  const handleRemoveUser = async (user) => {
    const updated = accessList.filter((u) => u !== user);
    await updateInventoryAccess(inventory.id, updated);
    setToastMessage("User removed from access list!");
    loadAccess();
  };

  return (
    <div className="space-y-4">
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
      </div>

      <div>
        <h4 className="font-semibold mb-2">Access List</h4>
        {accessList.length === 0 && <p>No users assigned yet.</p>}
        {accessList.map((user) => (
          <div key={user} className="flex justify-between items-center bg-gray-100 dark:bg-gray-700 p-2 rounded mb-1">
            <span>{user}</span>
            <button
              onClick={() => handleRemoveUser(user)}
              className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="flex items-center space-x-2">
        <select
          value={selectedUser}
          onChange={(e) => setSelectedUser(e.target.value)}
          className="p-2 border rounded dark:bg-gray-800 dark:text-gray-100 flex-1"
        >
          <option value="">Select User</option>
          {allUsers.map((user) => (
            <option key={user.id} value={user.email}>
              {user.name} ({user.email})
            </option>
          ))}
        </select>
        <button
          onClick={handleAddUser}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Add User
        </button>
      </div>

      {toastMessage && <Toast message={toastMessage} onClose={() => setToastMessage("")} />}
    </div>
  );
}
