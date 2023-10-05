import React from 'react';

const Button = ({ children, onClick, className, type, disabled }) => {
  let btnClass;

  switch (type) {
    case 'primary':
      btnClass =
        'bg-pale-blue hover:bg-pale-yellow hover:border-2 hover:border-pale-blue';
      break;
    case 'secondary':
      btnClass =
        'bg-gray-200 text-black hover:bg-gray-300 hover:border-2 hover:border-gray-200';
      break;
    default:
      btnClass =
        'bg-pale-blue hover:bg-pale-yellow hover:border-2 hover:border-pale-blue'; // Default style (or you can set another style)
      break;
  }
  const btnDisabledClass = disabled
    ? 'opacity-50 cursor-not-allowed border-none'
    : '';

  return (
    <button
      className={`rounded p-1 mt-2 transition duration-300 ${btnClass} ${btnDisabledClass} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
