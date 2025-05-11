import React from 'react';

export function Card({ children, className = '', ...props }) {
  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden ${className}`} {...props}>
      {children}
    </div>
  );
}
export function CardHeader({ children, className = '', ...props }) {
  return <div className={`px-4 py-2 border-b ${className}`} {...props}>{children}</div>;
}
export function CardTitle({ children, className = '', ...props }) {
  return <h3 className={`text-lg font-semibold ${className}`} {...props}>{children}</h3>;
}
export function CardContent({ children, className = '', ...props }) {
  return <div className={`p-4 ${className}`} {...props}>{children}</div>;
}
export function CardFooter({ children, className = '', ...props }) {
  return <div className={`px-4 py-2 border-t flex justify-between items-center ${className}`} {...props}>{children}</div>;
}
