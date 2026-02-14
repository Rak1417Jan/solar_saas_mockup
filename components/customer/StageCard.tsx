import React, { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface StageCardProps {
    title: string;
    description: string;
    isActive: boolean;
    children?: ReactNode;
}

export const StageCard: React.FC<StageCardProps> = ({ title, description, isActive, children }) => {
    if (!isActive) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white rounded-xl shadow-lg border border-solar-100 p-5 mt-4"
            >
                <div className="flex items-start justify-between mb-4">
                    <div>
                        <h3 className="text-lg font-bold text-gray-900">{title}</h3>
                        <p className="text-sm text-gray-500 mt-1">{description}</p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-solar-50 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-solar-500 animate-pulse" />
                    </div>
                </div>

                {children}
            </motion.div>
        </AnimatePresence>
    );
};
