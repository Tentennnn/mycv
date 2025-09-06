
import React, { useRef, useEffect, useState } from 'react';
import { useCvStore } from '../hooks/useCvStore';
import ClassicTemplate from './templates/ClassicTemplate';
import ModernTemplate from './templates/ModernTemplate';
import { A4_WIDTH_PX, A4_HEIGHT_PX } from '../constants';

const CvPreview: React.FC = () => {
    const { cvData, template, accentColor, language } = useCvStore();
    const previewWrapperRef = useRef<HTMLDivElement>(null);
    const [scale, setScale] = useState(1);
    const [fitScale, setFitScale] = useState(1);

    useEffect(() => {
        const calculateScale = () => {
            if (!previewWrapperRef.current) return;

            const wrapper = previewWrapperRef.current;
            const style = window.getComputedStyle(wrapper);
            const paddingX = parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
            const paddingY = parseFloat(style.paddingTop) + parseFloat(style.paddingBottom);

            const availableWidth = wrapper.clientWidth - paddingX;
            const availableHeight = wrapper.clientHeight - paddingY;

            const scaleX = availableWidth / A4_WIDTH_PX;
            const scaleY = availableHeight / A4_HEIGHT_PX;
            
            const newScale = Math.min(scaleX, scaleY);
            // Don't scale up beyond 100% when fitting
            const finalScale = newScale > 1 ? 1 : newScale;

            setFitScale(finalScale);
            setScale(finalScale); // Reset scale on resize
        };

        // Calculate on initial render and whenever the window is resized.
        calculateScale();
        window.addEventListener('resize', calculateScale);

        // Cleanup listener on component unmount.
        return () => {
            window.removeEventListener('resize', calculateScale);
        };
    }, []); // Empty dependency array is correct, as this effect manages its own lifecycle.

    const handleZoomIn = () => {
        setScale(prev => Math.min(prev + 0.1, 2)); // Max zoom 200%
    };

    const handleZoomOut = () => {
        setScale(prev => Math.max(prev - 0.1, 0.2)); // Min zoom 20%
    };
    
    const handleResetZoom = () => {
        setScale(fitScale);
    };

    const renderTemplate = () => {
        const props = { data: cvData, accentColor, language };
        switch (template) {
            case 'classic':
                return <ClassicTemplate {...props} />;
            case 'modern':
                return <ModernTemplate {...props} />;
            default:
                return <ClassicTemplate {...props} />;
        }
    };

    return (
        <div 
            ref={previewWrapperRef}
            className="relative bg-gray-200 dark:bg-gray-800 p-4 sm:p-8 rounded-lg flex items-center justify-center sticky top-[88px] h-[calc(100vh-88px)] lg:h-full overflow-auto"
        >
            <div 
                className="w-a4 h-a4 bg-white shadow-2xl transition-transform duration-300 origin-center"
                id="cv-preview-container"
                style={{ transform: `scale(${scale})` }}
            >
                <div id="cv-preview-content">
                    {renderTemplate()}
                </div>
            </div>

            {/* Zoom Controls */}
            <div className="absolute bottom-4 right-4 z-10 bg-white dark:bg-gray-700 shadow-lg rounded-full flex items-center p-1 space-x-1 text-gray-700 dark:text-gray-200">
                <button onClick={handleZoomOut} title="Zoom Out" className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors" aria-label="Zoom out">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                    </svg>
                </button>
                <span className="text-sm font-semibold w-12 text-center select-none" role="status" aria-live="polite">
                    {Math.round(scale * 100)}%
                </span>
                <button onClick={handleZoomIn} title="Zoom In" className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors" aria-label="Zoom in">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                    </svg>
                </button>
                <div className="w-px h-5 bg-gray-200 dark:bg-gray-600 mx-1"></div>
                <button onClick={handleResetZoom} title="Fit to Screen" className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors" aria-label="Reset zoom to fit screen">
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 0h-4m4 0l-5-5" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default CvPreview;
