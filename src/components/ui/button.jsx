import React from 'react';

export function Button({ children, className = '', ...props }) {
  return (
    <button
      className={`inline-flex items-center px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
