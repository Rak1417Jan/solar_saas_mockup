'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ActionPointerProps {
    targetElementId: string; // ID of the element to point to
    isActive: boolean;
    message?: string;
    position?: 'top' | 'bottom' | 'left' | 'right';
}

export const ActionPointer: React.FC<ActionPointerProps> = ({
    targetElementId,
    isActive,
    message,
    position = 'top'
}) => {
    const [coords, setCoords] = useState<{ x: number, y: number, width: number, height: number } | null>(null);

    useEffect(() => {
        if (!isActive || !targetElementId) return;

        const updatePosition = () => {
            const element = document.getElementById(targetElementId);
            if (element) {
                const rect = element.getBoundingClientRect();
                // We need to account for the fact that these elements are inside scaled iframes/divs
                // But since this component will likely be mounted at the root or near it, we can use absolute page coords?
                // Actually, for simplicity, let's assume this component is rendered NEAR the target or we use fixed overlay.
                // Better approach: This component renders a portal or fixed overlay.
                setCoords({
                    x: rect.left + window.scrollX,
                    y: rect.top + window.scrollY,
                    width: rect.width,
                    height: rect.height
                });
            }
        };

        updatePosition();
        window.addEventListener('scroll', updatePosition);
        window.addEventListener('resize', updatePosition);

        // Also interval to catch animation/layout shifts
        const interval = setInterval(updatePosition, 500);

        return () => {
            window.removeEventListener('scroll', updatePosition);
            window.removeEventListener('resize', updatePosition);
            clearInterval(interval);
        };
    }, [isActive, targetElementId]);

    if (!isActive || !coords) return null;

    // Calculate pointer position based on target coords and desired relative position
    const getPointerStyle = () => {
        const gap = 12;
        switch (position) {
            case 'top': return { top: coords.y - gap, left: coords.x + coords.width / 2, transform: 'translate(-50%, -100%)' };
            case 'bottom': return { top: coords.y + coords.height + gap, left: coords.x + coords.width / 2, transform: 'translate(-50%, 0)' };
            case 'left': return { top: coords.y + coords.height / 2, left: coords.x - gap, transform: 'translate(-100%, -50%)' };
            case 'right': return { top: coords.y + coords.height / 2, left: coords.x + coords.width + gap, transform: 'translate(0%, -50%)' };
        }
    };

    return (
        <div className="fixed inset-0 pointer-events-none z-[100]">
            {/* Spotlight / Highlight Box Effect */}
            <motion.div
                layoutId="highlight-box"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{
                    top: coords.y - 4,
                    left: coords.x - 4,
                    width: coords.width + 8,
                    height: coords.height + 8,
                }}
                className="absolute rounded-lg border-2 border-solar-500 shadow-[0_0_20px_rgba(249,115,22,0.5)] animate-pulse bg-solar-500/10"
            />

            {/* The Pointer Arrow/Label */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                style={getPointerStyle() as any}
                className="absolute flex flex-col items-center"
            >
                {message && (
                    <div className="bg-gray-900 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-xl whitespace-nowrap mb-2 border border-gray-700">
                        {message}
                    </div>
                )}

                {/* Arrow Icon */}
                <div className={`w-0 h-0 border-[6px] border-transparent 
                ${position === 'top' ? 'border-t-solar-500 mb-[-1px]' : ''}
                ${position === 'bottom' ? 'border-b-solar-500 mt-[-1px]' : ''}
                ${position === 'left' ? 'border-l-solar-500 mr-[-1px]' : ''}
                ${position === 'right' ? 'border-r-solar-500 ml-[-1px]' : ''}
            `} />
            </motion.div>
        </div>
    );
};
