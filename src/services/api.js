import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

// ------------------ Auth ------------------
export async function loginUser(credentials) {
  const { data } = await api.post("/auth/login", credentials);
  return data;
}

export async function socialLogin(provider, token) {
  const { data } = await api.post("/auth/social-login", { provider, token });
  return data;
}

export async function registerUser(userData) {
  const { data } = await api.post("/auth/register", userData);
  return data;
}

export async function logoutUser() {
  const { data } = await api.post("/auth/logout");
  return data;
}

// ------------------ Users ------------------
export async function fetchAllUsers() {
  const { data } = await api.get("/users");
  return data;
}

export async function toggleAdminRole(userId) {
  const { data } = await api.patch(`/users/${userId}/toggle-admin`);
  return data;
}

// ------------------ Inventories ------------------
export async function fetchUserInventories() {
  const { data } = await api.get("/inventories/my");
  return data;
}

export async function fetchUserWriteAccessInventories() {
  const { data } = await api.get("/inventories/my-write-access");
  return data;
}

export async function fetchInventoryById(id) {
  const { data } = await api.get(`/inventories/${id}`);
  return data;
}

export async function createInventory(inventory) {
  const { data } = await api.post("/inventories", inventory);
  return data;
}

export async function updateInventory(id, updates) {
  const { data } = await api.put(`/inventories/${id}`, updates);
  return data;
}

export async function deleteInventory(id) {
  const { data } = await api.delete(`/inventories/${id}`);
  return data;
}

// ------------------ Export all together ------------------
export {
  api, // axios instance
  loginUser,
  socialLogin,
  registerUser,
  logoutUser,
  fetchAllUsers,
  toggleAdminRole,
  fetchUserInventories,
  fetchUserWriteAccessInventories,
  fetchInventoryById,
  createInventory,
  updateInventory,
  deleteInventory,
};
