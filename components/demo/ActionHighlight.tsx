'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface ActionHighlightProps {
    children: React.ReactNode;
    isActive: boolean;
    label?: string;
    position?: 'top' | 'bottom' | 'left' | 'right';
}

export const ActionHighlight: React.FC<ActionHighlightProps> = ({
    children,
    isActive,
    label = "Click Here",
    position = 'top'
}) => {
    if (!isActive) return <>{children}</>;

    return (
        <div className="relative inline-block w-full">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="relative z-10"
            >
                {children}

                {/* Pulsing Border */}
                <div className="absolute inset-0 border-2 border-solar-500 rounded-lg pointer-events-none animate-pulse shadow-[0_0_15px_rgba(249,115,22,0.5)]" />

                {/* Tooltip Label */}
                {label && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`
              absolute z-20 bg-solar-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg whitespace-nowrap pointer-events-none
              ${position === 'top' ? '-top-10 left-1/2 -translate-x-1/2' : ''}
              ${position === 'bottom' ? '-bottom-10 left-1/2 -translate-x-1/2' : ''}
              ${position === 'left' ? 'top-1/2 -right-full ml-4 -translate-y-1/2' : ''} 
              ${position === 'right' ? 'top-1/2 -left-full mr-4 -translate-y-1/2' : ''}
            `}
                    >
                        {label}
                        {/* Arrow */}
                        <div className={`
              absolute w-2 h-2 bg-solar-600 transform rotate-45
              ${position === 'top' ? 'bottom-[-4px] left-1/2 -translate-x-1/2' : ''}
              ${position === 'bottom' ? 'top-[-4px] left-1/2 -translate-x-1/2' : ''}
            `} />
                    </motion.div>
                )}
            </motion.div>
        </div>
    );
};
