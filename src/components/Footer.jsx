import React, { useContext } from "react";
import { UIContext } from "../context/UIContext";

export default function Footer() {
  const { language } = useContext(UIContext);

  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 p-4 mt-auto">
      <div className="max-w-7xl mx-auto text-center text-sm">
        {language === "en" ? (
          <span>© 2025 InventoryApp. All rights reserved.</span>
        ) : (
          <span>© 2025 InventoryApp. Все права защищены.</span>
        )}
      </div>
    </footer>
  );
}
