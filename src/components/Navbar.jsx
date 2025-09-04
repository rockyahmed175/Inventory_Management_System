import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { UIContext } from "../context/UIContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const { theme, toggleTheme, language, switchLanguage } = useContext(UIContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex space-x-4">
            <Link to="/" className="text-xl font-bold text-blue-600 dark:text-blue-400">
              InventoryApp
            </Link>
            <Link to="/search" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-700">
              Search
            </Link>
            {user && (
              <Link to="/profile" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-700">
                Profile
              </Link>
            )}
            {user?.role === "admin" && (
              <Link to="/admin" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-700">
                Admin
              </Link>
            )}
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="px-3 py-2 bg-gray-200 dark:bg-gray-700 rounded-md text-sm"
            >
              {theme === "light" ? "Dark" : "Light"}
            </button>

            <select
              value={language}
              onChange={(e) => switchLanguage(e.target.value)}
              className="px-2 py-1 border rounded-md bg-white dark:bg-gray-700 text-sm"
            >
              <option value="en">English</option>
              <option value="ru">Русский</option>
            </select>

            {!user ? (
              <>
                <Link to="/login" className="px-3 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-500">
                  Login
                </Link>
                <Link to="/register" className="px-3 py-2 bg-green-600 text-white rounded-md text-sm hover:bg-green-500">
                  Register
                </Link>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="px-3 py-2 bg-red-600 text-white rounded-md text-sm hover:bg-red-500"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
