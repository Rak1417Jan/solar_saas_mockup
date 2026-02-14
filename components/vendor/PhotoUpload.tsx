'use client';

import React, { useState } from 'react';
import { Camera, RefreshCw, MapPin, ZoomIn } from 'lucide-react';
import { motion } from 'framer-motion';
import { PhotoLightbox } from './PhotoLightbox';

interface PhotoUploadProps {
    onUploadComplete: () => void;
}

export const PhotoUpload: React.FC<PhotoUploadProps> = ({ onUploadComplete }) => {
    const [isCapturing, setIsCapturing] = useState(false);
    const [photos, setPhotos] = useState<number[]>([]);
    const [viewPhotoId, setViewPhotoId] = useState<number | null>(null);

    const handleCapture = () => {
        setIsCapturing(true);
        setTimeout(() => {
            setPhotos(prev => [...prev, Date.now()]);
            setIsCapturing(false);
            if (photos.length === 2) {
                setTimeout(onUploadComplete, 1000);
            }
        }, 1500);
    };

    const handleDelete = (id: number) => {
        setPhotos(prev => prev.filter(p => p !== id));
        setViewPhotoId(null);
    };

    return (
        <>
            <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                    {photos.map((p, i) => (
                        <motion.div
                            key={p}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            onClick={() => setViewPhotoId(p)}
                            className="aspect-square bg-gray-800 rounded-lg relative overflow-hidden cursor-pointer group hover:ring-2 hover:ring-solar-400 transition-all"
                        >
                            <div className="absolute inset-0 flex items-center justify-center text-gray-600 font-bold text-2xl bg-gray-200">
                                P{i + 1}
                            </div>

                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                <ZoomIn className="text-white w-8 h-8" />
                            </div>

                            <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-1">
                                <div className="flex items-center gap-1 text-[8px] text-white">
                                    <MapPin size={8} className="text-solar-400" />
                                    <span>GPS: 23.02, 72.57</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}

                    <button
                        onClick={handleCapture}
                        disabled={isCapturing}
                        className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center gap-2 text-gray-500 hover:bg-gray-50 hover:border-solar-400 hover:text-solar-600 transition-colors"
                    >
                        {isCapturing ? (
                            <RefreshCw size={24} className="animate-spin" />
                        ) : (
                            <>
                                <Camera size={24} />
                                <span className="text-xs font-semibold">Add Photo</span>
                            </>
                        )}
                    </button>
                </div>

                <div className="flex items-center justify-between text-xs text-gray-500 px-1">
                    <span>3 photos required</span>
                    <span>{photos.length}/3 Captured</span>
                </div>
            </div>

            <PhotoLightbox
                isOpen={!!viewPhotoId}
                onClose={() => setViewPhotoId(null)}
                photoId={viewPhotoId}
                onDelete={handleDelete}
            />
        </>
    );
};
