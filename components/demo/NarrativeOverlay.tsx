'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Play, Pause } from 'lucide-react';

export type NarrativePosition = 'left' | 'right' | 'center';

interface NarrativeOverlayProps {
    isVisible: boolean;
    title: string;
    description: string;
    position: NarrativePosition;
    onContinue?: () => void;
    autoAdvanceMs?: number;
    isAutoPlaying?: boolean;
}

export const NarrativeOverlay: React.FC<NarrativeOverlayProps> = ({
    isVisible,
    title,
    description,
    position,
    onContinue,
    autoAdvanceMs,
    isAutoPlaying
}) => {
    const [progress, setProgress] = useState(0);

    // Reset progress when visibility or content changes
    useEffect(() => {
        if (!isVisible) {
            setProgress(0);
            return;
        }

        setProgress(0);

        if (isAutoPlaying && autoAdvanceMs && autoAdvanceMs > 0) {
            const startTime = Date.now();
            const interval = setInterval(() => {
                const elapsed = Date.now() - startTime;
                const newProgress = Math.min((elapsed / autoAdvanceMs) * 100, 100);
                setProgress(newProgress);

                if (elapsed >= autoAdvanceMs) {
                    clearInterval(interval);
                    if (onContinue) onContinue();
                }
            }, 50);

            return () => clearInterval(interval);
        }
    }, [isVisible, title, description, isAutoPlaying, autoAdvanceMs, onContinue]);

    // Dynamic Positioning Logic
    const getPositionClasses = (pos: NarrativePosition) => {
        switch (pos) {
            case 'left':
                return 'left-[5%] top-1/2 -translate-y-1/2 w-[400px] text-left';
            case 'right':
                return 'right-[5%] top-1/2 -translate-y-1/2 w-[400px] text-left';
            case 'center':
                return 'left-1/2 -translate-x-1/2 bottom-32 w-[90%] max-w-3xl text-center';
        }
    };

    const getTextSize = (pos: NarrativePosition) => {
        if (pos === 'center') {
            return {
                title: 'text-5xl',
                description: 'text-2xl'
            };
        }
        return {
            title: 'text-6xl', // Larger for side placement
            description: 'text-2xl'
        };
    };

    const positionClasses = getPositionClasses(position);
    const textSizes = getTextSize(position);

    // Animation entrance direction
    const initialX = position === 'left' ? -100 : (position === 'right' ? 100 : 0);
    const initialY = position === 'center' ? 50 : 0;

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, x: initialX, y: initialY, scale: 0.95 }}
                    animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 200, damping: 25 }}
                    className={`fixed z-[100] ${positionClasses}`}
                >
                    {/* Background Styles based on position */}
                    {/* Center Position: Boxed background for better visibility */}
                    {position === 'center' && (
                        <div className="absolute inset-0 bg-gray-900/90 backdrop-blur-md rounded-3xl border border-gray-700 shadow-2xl -z-10" />
                    )}

                    {/* Side Position: Subtle Radial Gradient */}
                    {position !== 'center' && (
                        <div className="absolute inset-0 bg-gradient-radial from-black/60 to-transparent -z-10 blur-3xl scale-150" />
                    )}

                    <div className={`relative z-10 space-y-6 ${position === 'center' ? 'p-8' : ''}`}>
                        {/* Progress Bar */}
                        {isAutoPlaying && (
                            <div className={`h-1.5 bg-white/20 rounded-full overflow-hidden mb-4 ${position === 'center' ? 'mx-auto w-1/2' : 'w-full'}`}>
                                <motion.div
                                    className="h-full bg-solar-500 shadow-[0_0_10px_rgba(234,179,8,0.8)]"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                        )}

                        <div className="space-y-4">
                            <motion.h2
                                key={title}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`${textSizes.title} font-extrabold tracking-tight text-white drop-shadow-2xl leading-[1.1]`}
                            >
                                {title}
                            </motion.h2>

                            <motion.p
                                key={description}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.1 }}
                                className={`${textSizes.description} font-medium text-white/90 leading-relaxed drop-shadow-lg`}
                            >
                                {description}
                            </motion.p>
                        </div>

                        {!isAutoPlaying && onContinue && (
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={onContinue}
                                className={`mt-6 inline-flex items-center gap-2 px-8 py-3 bg-white text-black text-lg font-bold rounded-full hover:bg-gray-100 transition-colors shadow-lg ${position === 'center' ? 'mx-auto' : ''}`}
                            >
                                Continue <ArrowRight size={20} />
                            </motion.button>
                        )}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
