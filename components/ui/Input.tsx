
import React from 'react';
import { useCvStore } from '../../hooks/useCvStore';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Input: React.FC<InputProps> = ({ label, ...props }) => {
  const { language } = useCvStore();
  const langClass = language === 'km' ? 'font-khmer' : 'font-sans';
  return (
    <div className={props.className}>
      <label className={`block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 ${langClass}`}>
        {label}
      </label>
      <input
        {...props}
        className={`mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${langClass}`}
      />
    </div>
  );
};

export default Input;
