import React, { useRef, useEffect, useState } from 'react';
import { useCvStore } from '../hooks/useCvStore';
import ClassicTemplate from './templates/ClassicTemplate';
import ModernTemplate from './templates/ModernTemplate';

// A4 dimensions in pixels at 96 DPI, which is the standard for CSS.
const A4_WIDTH_PX = 210 * 96 / 25.4; // ~793.7
const A4_HEIGHT_PX = 297 * 96 / 25.4; // ~1122.5

const CvPreview: React.FC = () => {
    const { cvData, template, accentColor, language } = useCvStore();
    const previewWrapperRef = useRef<HTMLDivElement>(null);
    const [scale, setScale] = useState(0.5); // Default scale

    useEffect(() => {
        const calculateScale = () => {
            if (!previewWrapperRef.current) return;

            const wrapper = previewWrapperRef.current;
            const style = window.getComputedStyle(wrapper);
            // Calculate available space inside the wrapper, accounting for padding.
            const paddingX = parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
            const paddingY = parseFloat(style.paddingTop) + parseFloat(style.paddingBottom);

            const availableWidth = wrapper.clientWidth - paddingX;
            
            // The preview is sticky with a top offset of 88px. This means the available
            // vertical space should be calculated relative to the viewport height,
            // minus this offset. This provides a stable height reference, fixing
            // the scaling issue on mobile where the container height is not constrained.
            const stickyOffset = 88; // from `top-[88px]` class
            const availableHeight = window.innerHeight - stickyOffset - paddingY;


            // Calculate scale to fit both width and height
            const scaleX = availableWidth / A4_WIDTH_PX;
            const scaleY = availableHeight / A4_HEIGHT_PX;
            
            // Use the smaller scale factor to ensure the entire preview fits, with a small margin.
            const newScale = Math.min(scaleX, scaleY) * 0.95;

            // Don't scale up beyond 100%
            setScale(newScale > 1 ? 1 : newScale);
        };

        // Calculate on initial render and whenever the window is resized.
        calculateScale();
        window.addEventListener('resize', calculateScale);

        // Cleanup listener on component unmount.
        return () => {
            window.removeEventListener('resize', calculateScale);
        };
    }, []); // Empty dependency array is correct, as we don't want this to re-run on scale change.

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
            className="bg-gray-200 dark:bg-gray-800 p-4 sm:p-8 rounded-lg flex items-center justify-center sticky top-[88px] h-[calc(100vh-88px)] lg:h-full"
        >
            <div 
                className="w-a4 h-a4 bg-white shadow-2xl origin-top transition-transform duration-300"
                id="cv-preview-container"
                style={{ transform: `scale(${scale})` }}
            >
                <div id="cv-preview-content">
                    {renderTemplate()}
                </div>
            </div>
        </div>
    );
};

export default CvPreview;