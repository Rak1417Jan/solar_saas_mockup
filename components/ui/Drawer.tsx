'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { clsx } from 'clsx';

interface DrawerProps {
    isOpen: boolean;
    onClose: () => void;
    side?: 'left' | 'right' | 'bottom';
    children: React.ReactNode;
    className?: string;
    title?: string;
}

export const Drawer: React.FC<DrawerProps> = ({
    isOpen,
    onClose,
    side = 'right',
    children,
    className,
    title
}) => {
    const variants = {
        left: { x: '-100%' },
        right: { x: '100%' },
        bottom: { y: '100%' }
    };

    const initial = variants[side];
    const animate = { x: 0, y: 0 };
    const exit = variants[side];

    const sideClasses = {
        left: 'left-0 top-0 bottom-0 h-full w-80 rounded-r-2xl',
        right: 'right-0 top-0 bottom-0 h-full w-80 rounded-l-2xl',
        bottom: 'bottom-0 left-0 right-0 w-full h-[80vh] rounded-t-2xl'
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
                    />
                    <motion.div
                        initial={initial}
                        animate={animate}
                        exit={exit}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className={clsx(
                            "fixed bg-white shadow-2xl z-50 flex flex-col overflow-hidden max-w-[90vw]",
                            sideClasses[side],
                            className
                        )}
                    >
                        {title && (
                            <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-white">
                                <h3 className="font-bold text-lg text-gray-900">{title}</h3>
                                <button
                                    onClick={onClose}
                                    className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
                                >
                                    <X size={20} />
                                </button>
                            </div>
                        )}
                        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                            {children}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
