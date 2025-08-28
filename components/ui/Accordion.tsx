
import React, { useState, ReactNode } from 'react';
import { useCvStore } from '../../hooks/useCvStore';

interface AccordionProps {
  children: ReactNode;
}

const Accordion: React.FC<AccordionProps> = ({ children }) => {
  return <div className="space-y-2">{children}</div>;
};

interface AccordionItemProps {
  title: string;
  children: ReactNode;
}

export const AccordionItem: React.FC<AccordionItemProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const { language } = useCvStore();
  const langClass = language === 'km' ? 'font-khmer' : 'font-sans';


  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-md">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-4 text-left bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
      >
        <span className={`font-semibold ${langClass}`}>{title}</span>
        <svg
          className={`w-5 h-5 transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>
      {isOpen && <div className="p-4">{children}</div>}
    </div>
  );
};

export default Accordion;
