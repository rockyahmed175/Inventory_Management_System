import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
import InventoryPage from "./pages/Inventories/InventoryPage";
import ItemPage from "./pages/Items/ItemPage";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import { AuthProvider } from "./context/AuthContext";
import { UIProvider } from "./context/UIContext";

export default function App() {
  return (
    <AuthProvider>
      <UIProvider>
        <Router>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1 p-4 bg-gray-50 dark:bg-gray-900">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/search" element={<Search />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/inventory/:inventoryId" element={<InventoryPage />} />
                <Route path="/item/:itemId" element={<ItemPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </UIProvider>
    </AuthProvider>
  );
}
