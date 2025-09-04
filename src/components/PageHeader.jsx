import React from "react";

export default function PageHeader({ title, subtitle, breadcrumbs = [] }) {
  return (
    <div className="mb-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{title}</h1>
          {subtitle && (
            <p className="mt-1 text-gray-600 dark:text-gray-300">{subtitle}</p>
          )}
        </div>
        {breadcrumbs.length > 0 && (
          <nav className="mt-3 sm:mt-0" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2 text-gray-500 dark:text-gray-400">
              {breadcrumbs.map((crumb, idx) => (
                <li key={idx} className="flex items-center">
                  {idx !== 0 && <span className="mx-2">/</span>}
                  {crumb.link ? (
                    <a
                      href={crumb.link}
                      className="hover:text-blue-600 dark:hover:text-blue-400"
                    >
                      {crumb.label}
                    </a>
                  ) : (
                    <span>{crumb.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}
      </div>
    </div>
  );
}
