'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ScreenUpdateIndicatorProps {
    isActive: boolean;
    label?: string;
}

export const ScreenUpdateIndicator: React.FC<ScreenUpdateIndicatorProps> = ({ isActive, label = 'Updated' }) => {
    return (
        <AnimatePresence>
            {isActive && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3 }}
                    className="absolute top-4 right-4 z-[60] pointer-events-none"
                >
                    <div className="relative">
                        <div className="bg-solar-500 text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-lg border-2 border-white flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                            {label}
                        </div>
                        {/* Ripple effect */}
                        <motion.div
                            initial={{ scale: 1, opacity: 0.8 }}
                            animate={{ scale: 1.5, opacity: 0 }}
                            transition={{ duration: 1, repeat: Infinity }}
                            className="absolute inset-0 bg-solar-500 rounded-full -z-10"
                        />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
