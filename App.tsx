
import React, { useEffect } from 'react';
import Header from './components/Header';
import ControlPanel from './components/ControlPanel';
import CvForm from './components/CvForm';
import CvPreview from './components/CvPreview';
import { useCvStore } from './hooks/useCvStore';

const App: React.FC = () => {
  const theme = useCvStore((state) => state.theme);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 font-sans transition-colors duration-300">
      <Header />
      <main className="flex flex-col lg:flex-row gap-8 p-4 sm:p-8 max-w-screen-2xl mx-auto">
        <div className="w-full lg:w-1/3 xl:w-1/4 flex flex-col gap-8">
          <ControlPanel />
          <CvForm />
        </div>
        <div className="w-full lg:w-2/3 xl:w-3/4">
          <CvPreview />
        </div>
      </main>
    </div>
  );
};

export default App;
