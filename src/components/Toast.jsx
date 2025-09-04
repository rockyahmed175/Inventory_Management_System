import React, { useState, useEffect } from "react";

export default function Toast({ toasts = [], duration = 3000, onRemove }) {
  const [visibleToasts, setVisibleToasts] = useState(toasts);

  useEffect(() => {
    setVisibleToasts(toasts);
  }, [toasts]);

  useEffect(() => {
    const timers = visibleToasts.map((toast) =>
      setTimeout(() => {
        handleRemove(toast.id);
      }, duration)
    );
    return () => timers.forEach((t) => clearTimeout(t));
  }, [visibleToasts, duration]);

  const handleRemove = (id) => {
    setVisibleToasts((prev) => prev.filter((t) => t.id !== id));
    onRemove && onRemove(id);
  };

  const getColor = (type) => {
    switch (type) {
      case "success":
        return "bg-green-500 text-white";
      case "error":
        return "bg-red-500 text-white";
      case "info":
        return "bg-blue-500 text-white";
      case "warning":
        return "bg-yellow-400 text-black";
      default:
        return "bg-gray-500 text-white";
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {visibleToasts.map((toast) => (
        <div
          key={toast.id}
          className={`px-4 py-2 rounded shadow-md ${getColor(toast.type)} flex justify-between items-center min-w-[250px]`}
        >
          <span>{toast.message}</span>
          <button onClick={() => handleRemove(toast.id)} className="ml-2 font-bold">
            ✕
          </button>
        </div>
      ))}
    </div>
  );
}
