import React, { useEffect, useState } from "react";
import {
  fetchAllUsers,
  blockUser,
  unblockUser,
  deleteUser,
  toggleAdminRole
} from "../services/api";

export default function Admin() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setLoading(true);
    const data = await fetchAllUsers();
    setUsers(data);
    setLoading(false);
  };

  const handleBlock = async (userId) => {
    await blockUser(userId);
    loadUsers();
  };

  const handleUnblock = async (userId) => {
    await unblockUser(userId);
    loadUsers();
  };

  const handleDelete = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      await deleteUser(userId);
      loadUsers();
    }
  };

  const handleToggleAdmin = async (userId) => {
    await toggleAdminRole(userId);
    loadUsers();
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Admin Dashboard - User Management</h2>
      {loading && <p className="text-gray-500">Loading users...</p>}

      {!loading && (
        <table className="w-full border rounded-md">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th className="p-2">Name</th>
              <th className="p-2">Email</th>
              <th className="p-2">Status</th>
              <th className="p-2">Role</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-t hover:bg-gray-50 dark:hover:bg-gray-800">
                <td className="p-2">{user.name}</td>
                <td className="p-2">{user.email}</td>
                <td className="p-2">
                  {user.isBlocked ? "Blocked" : "Active"}
                </td>
                <td className="p-2">
                  {user.isAdmin ? "Admin" : "User"}
                </td>
                <td className="p-2 space-x-2">
                  {user.isBlocked ? (
                    <button
                      onClick={() => handleUnblock(user.id)}
                      className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-500"
                    >
                      Unblock
                    </button>
                  ) : (
                    <button
                      onClick={() => handleBlock(user.id)}
                      className="px-3 py-1 bg-yellow-600 text-white rounded-md hover:bg-yellow-500"
                    >
                      Block
                    </button>
                  )}
                  <button
                    onClick={() => handleToggleAdmin(user.id)}
                    className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-500"
                  >
                    {user.isAdmin ? "Remove Admin" : "Make Admin"}
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-500"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
