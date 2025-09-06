
import React, { useState, useRef } from 'react';
import ReactCrop, { type Crop, centerCrop, makeAspectCrop } from 'react-image-crop';
import { useCvStore, useTranslations } from '../../hooks/useCvStore';
import Button from './Button';

// Utility function to generate a cropped image from a source image and crop data.
function getCroppedImg(image: HTMLImageElement, crop: Crop): Promise<string> {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    
    const outputWidth = crop.width * scaleX;
    const outputHeight = crop.height * scaleY;
    
    const pixelRatio = window.devicePixelRatio || 1;
    canvas.width = outputWidth * pixelRatio;
    canvas.height = outputHeight * pixelRatio;

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      reject(new Error('Failed to get 2D context'));
      return;
    }

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = 'high';

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      outputWidth,
      outputHeight,
      0,
      0,
      outputWidth,
      outputHeight
    );

    resolve(canvas.toDataURL('image/png'));
  });
}


interface ImageCropperProps {
  imageSrc: string;
  onCropComplete: (croppedImageUrl: string) => void;
  onCancel: () => void;
}

const ImageCropper: React.FC<ImageCropperProps> = ({ imageSrc, onCropComplete, onCancel }) => {
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<Crop>();
  const imgRef = useRef<HTMLImageElement>(null);
  const t = useTranslations();
  const langClass = useCvStore(s => s.language === 'km' ? 'font-khmer' : 'font-sans');

  // Center the crop selection on the image when it loads.
  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    const { width, height } = e.currentTarget;
    const initialCrop = centerCrop(
      makeAspectCrop({ unit: '%', width: 90 }, 1, width, height),
      width,
      height
    );
    setCrop(initialCrop);
    setCompletedCrop(initialCrop);
  }

  // Handle the "Crop" button click.
  const handleCrop = async () => {
    if (completedCrop && imgRef.current) {
      try {
        const croppedImageUrl = await getCroppedImg(imgRef.current, completedCrop);
        onCropComplete(croppedImageUrl);
      } catch (e) {
        console.error("Error while cropping image:", e);
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4" role="dialog" aria-modal="true" aria-labelledby="crop-dialog-title">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-4 sm:p-6 max-w-md w-full">
        <h3 id="crop-dialog-title" className={`text-xl font-bold mb-4 text-gray-900 dark:text-white ${langClass}`}>{t('crop_image_title')}</h3>
        
        <div className="flex justify-center bg-gray-100 dark:bg-gray-900 p-2 rounded max-h-[60vh] overflow-hidden">
            <ReactCrop
              crop={crop}
              onChange={c => setCrop(c)}
              onComplete={c => setCompletedCrop(c)}
              aspect={1}
              circularCrop
              keepSelection
            >
              <img 
                ref={imgRef} 
                src={imageSrc} 
                onLoad={onImageLoad} 
                alt="Image to crop" 
                style={{ maxHeight: 'calc(60vh - 1rem)' }}
                crossOrigin="anonymous" 
              />
            </ReactCrop>
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <Button onClick={onCancel} variant="danger">{t('cancel_button')}</Button>
          <Button onClick={handleCrop} disabled={!completedCrop?.width}>{t('crop_button')}</Button>
        </div>
      </div>
    </div>
  );
};

export default ImageCropper;
