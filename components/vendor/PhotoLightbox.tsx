'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Calendar, Trash2, ArrowLeft, ArrowRight } from 'lucide-react';

interface PhotoLightboxProps {
    isOpen: boolean;
    onClose: () => void;
    photoId: number | null; // Using timestamp as ID from mockData
    onDelete?: (id: number) => void;
}

export const PhotoLightbox: React.FC<PhotoLightboxProps> = ({ isOpen, onClose, photoId, onDelete }) => {
    if (!isOpen || !photoId) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black z-[60] flex flex-col"
            >
                {/* Header */}
                <div className="flex justify-between items-center p-4 text-white bg-gradient-to-b from-black/50 to-transparent">
                    <div className="flex flex-col">
                        <span className="font-bold text-lg">Site Photo</span>
                        <span className="text-xs text-gray-300 flex items-center gap-1">
                            <Calendar size={10} /> {new Date(photoId).toLocaleString()}
                        </span>
                    </div>
                    <button onClick={onClose} className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
                        <X size={24} />
                    </button>
                </div>

                {/* Main Content */}
                <div className="flex-1 flex items-center justify-center relative p-4">
                    {/* Mock Image Placeholder */}
                    <div className="w-full h-full max-h-[70vh] bg-gray-800 rounded-lg flex items-center justify-center text-gray-500 font-bold text-4xl relative overflow-hidden">
                        PHOTO PREVIEW
                        <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-3 backdrop-blur-md">
                            <div className="flex items-center gap-2 text-white text-sm">
                                <MapPin size={16} className="text-solar-400" />
                                <span>GPS: 23.0225° N, 72.5714° E</span>
                            </div>
                            <div className="text-xs text-gray-400 mt-1 pl-6">accuracy: ±5m</div>
                        </div>
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="p-6 bg-black flex justify-between items-center gap-4">
                    <button className="p-3 rounded-full bg-gray-800 text-gray-400 hover:text-white transition-colors">
                        <ArrowLeft size={24} />
                    </button>

                    <button
                        onClick={() => onDelete && onDelete(photoId)}
                        className="p-3 rounded-full bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-colors flex items-center gap-2 px-6"
                    >
                        <Trash2 size={20} />
                        <span className="text-sm font-medium">Delete</span>
                    </button>

                    <button className="p-3 rounded-full bg-gray-800 text-gray-400 hover:text-white transition-colors">
                        <ArrowRight size={24} />
                    </button>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};
