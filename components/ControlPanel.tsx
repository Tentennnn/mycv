import React, { useState } from 'react';
import { useCvStore, useTranslations } from '../hooks/useCvStore';
import { TEMPLATES, COLORS } from '../constants';
// @ts-ignore
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

const ControlPanel: React.FC = () => {
  const { template, setTemplate, accentColor, setAccentColor, language } = useCvStore();
  const t = useTranslations();
  const [isDownloading, setIsDownloading] = useState(false);
  const [isSavingImage, setIsSavingImage] = useState(false);

  const generateOutput = async (type: 'pdf' | 'image') => {
    // Target the element that has the A4 dimensions and styling, not just its content.
    const cvElement = document.getElementById('cv-preview-container');

    if (!cvElement) {
      console.error("CV preview container element not found for generation.");
      return;
    }

    if (type === 'pdf') setIsDownloading(true);
    else setIsSavingImage(true);

    // 1. Clone the node to capture its current state without altering the live preview.
    const clone = cvElement.cloneNode(true) as HTMLElement;

    // 2. Remove styles from the clone that could interfere with off-screen rendering,
    // like CSS transforms used for scaling the preview.
    clone.style.transform = 'none';
    clone.style.transition = 'none';
    
    // 3. Create a temporary container to render the clone off-screen.
    // We don't need to set dimensions here; the clone itself has the `w-a4 h-a4` classes.
    const printContainer = document.createElement('div');
    document.body.appendChild(printContainer);
    
    printContainer.style.position = 'absolute';
    printContainer.style.left = '-9999px';
    printContainer.style.top = '0px';
    printContainer.style.overflow = 'hidden'; // Hide scrollbars if any

    printContainer.appendChild(clone);
    
    // Allow a moment for the browser to render the clone and load fonts/images.
    await new Promise(resolve => setTimeout(resolve, 300));

    try {
      const canvas = await html2canvas(clone, {
        scale: 4, // Use a higher scale for better quality output.
        useCORS: true,
        logging: false,
        // Let html2canvas determine the width/height from the element's rendered size.
        backgroundColor: type === 'image' ? '#ffffff' : null,
      });

      const dataUrl = canvas.toDataURL('image/png', 1.0);

      if (type === 'pdf') {
        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'mm',
          format: 'a4',
        });
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        pdf.addImage(dataUrl, 'PNG', 0, 0, pdfWidth, pdfHeight, undefined, 'FAST');
        pdf.save("cv.pdf");
      } else {
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = 'cv.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (error) {
      console.error(`Error generating ${type}:`, error);
    } finally {
      // 4. Clean up the DOM by removing the temporary container.
      document.body.removeChild(printContainer);
      if (type === 'pdf') setIsDownloading(false);
      else setIsSavingImage(false);
    }
  };

  const handleDownloadPdf = () => generateOutput('pdf');
  const handleSaveImage = () => generateOutput('image');

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className={`text-xl font-bold mb-4 ${language === 'km' ? 'font-khmer' : 'font-sans'}`}>{t('controls')}</h2>
      
      <div className="mb-6">
        <h3 className={`text-lg font-semibold mb-2 ${language === 'km' ? 'font-khmer' : 'font-sans'}`}>{t('templates')}</h3>
        <div className="grid grid-cols-2 gap-2">
          {TEMPLATES.map(item => (
            <button
              key={item.id}
              onClick={() => setTemplate(item.id)}
              className={`p-2 border rounded-md text-center text-sm transition-all ${
                template === item.id 
                ? 'border-blue-500 bg-blue-100 dark:bg-blue-900 ring-2 ring-blue-500' 
                : 'border-gray-300 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500'
              }`}
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>
      
      <div className="mb-6">
        <h3 className={`text-lg font-semibold mb-2 ${language === 'km' ? 'font-khmer' : 'font-sans'}`}>{t('accent_color')}</h3>
        <div className="flex flex-wrap gap-3">
          {COLORS.map(color => (
            <button
              key={color}
              onClick={() => setAccentColor(color)}
              className={`w-8 h-8 rounded-full transition-transform transform hover:scale-110 ${accentColor === color ? 'ring-2 ring-offset-2 dark:ring-offset-gray-800 ring-blue-500' : ''}`}
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <button
          onClick={handleDownloadPdf}
          disabled={isDownloading || isSavingImage}
          className={`w-full flex items-center justify-center gap-2 bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed ${language === 'km' ? 'font-khmer' : 'font-sans'}`}
        >
          {isDownloading ? (
            <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {t('downloading')}
            </>
          ) : (
            <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                {t('download_pdf')}
            </>
          )}
        </button>
        <button
          onClick={handleSaveImage}
          disabled={isDownloading || isSavingImage}
          className={`w-full flex items-center justify-center gap-2 bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700 transition-colors disabled:bg-green-400 disabled:cursor-not-allowed ${language === 'km' ? 'font-khmer' : 'font-sans'}`}
        >
          {isSavingImage ? (
            <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {t('saving_image')}
            </>
          ) : (
            <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                </svg>
                {t('save_image')}
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ControlPanel;