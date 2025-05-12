export function Button({ children, className = '', ...rest }) {
  return (
    <button
      {...rest}
      className={
        'bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded ' +
        className
      }
    >
      {children}
    </button>
  );
}
