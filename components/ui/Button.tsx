
import React, { ReactNode } from 'react';
import { useCvStore } from '../../hooks/useCvStore';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'danger';
  size?: 'sm' | 'md';
}

const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', size = 'md', className = '', ...props }) => {
    const { language } = useCvStore();
    const langClass = language === 'km' ? 'font-khmer' : 'font-sans';

    const baseClasses = 'font-bold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-800';

    const variantClasses = {
        primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
        danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
    };

    const sizeClasses = {
        sm: 'py-1 px-2 text-xs',
        md: 'py-2 px-4 text-sm',
    };

  return (
    <button
      {...props}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${langClass} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
