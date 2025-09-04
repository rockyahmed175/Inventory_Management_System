import React, { createContext, useState, useEffect } from "react";

export const UIContext = createContext();

export const UIProvider = ({ children }) => {
  const [theme, setTheme] = useState("light"); // light / dark
  const [language, setLanguage] = useState("en"); // en / ru

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const savedLang = localStorage.getItem("lang");
    if (savedTheme) setTheme(savedTheme);
    if (savedLang) setLanguage(savedLang);
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.className = theme;
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("lang", language);
  }, [language]);

  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

  const switchLanguage = (lang) => setLanguage(lang);

  return (
    <UIContext.Provider value={{ theme, toggleTheme, language, switchLanguage }}>
      {children}
    </UIContext.Provider>
  );
};
