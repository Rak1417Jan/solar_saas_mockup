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
            {isOpen && (
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
                    <div className="flex-1 flex items-center justify-center relative p-4 bg-gray-900/40">
                        <div className="w-full h-full max-h-[75vh] flex items-center justify-center relative overflow-hidden">
                            <img
                                src={`/images/install_1.png`} // Simplified fallback to 1 for demo
                                alt="Site evidence"
                                className="max-w-full max-h-full object-contain shadow-2xl rounded-lg"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).src = 'https://placehold.co/800x600/1e293b/94a3b8?text=Installation+Evidence';
                                }}
                            />

                            <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-4 backdrop-blur-md">
                                <div className="flex items-center gap-2 text-white text-sm">
                                    <MapPin size={18} className="text-solar-400" />
                                    <span className="font-medium">GPS Validated: 23.0225° N, 72.5714° E</span>
                                </div>
                                <div className="text-[10px] text-gray-400 mt-1 pl-7 font-mono uppercase tracking-widest">
                                    Security Hash: 8A2F9B...0E1
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="p-6 bg-black flex justify-between items-center gap-4 border-t border-white/5">
                        <button className="p-3 rounded-full bg-white/5 text-gray-400 hover:text-white transition-colors">
                            <ArrowLeft size={24} />
                        </button>

                        <button
                            onClick={() => onDelete && onDelete(photoId)}
                            className="p-3 rounded-full bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-colors flex items-center gap-2 px-8"
                        >
                            <Trash2 size={20} />
                            <span className="text-sm font-bold uppercase tracking-wide">Discard</span>
                        </button>

                        <button className="p-3 rounded-full bg-white/5 text-gray-400 hover:text-white transition-colors">
                            <ArrowRight size={24} />
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
