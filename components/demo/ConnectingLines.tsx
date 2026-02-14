'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDemo } from '@/contexts/DemoContext';

export const ConnectingLines: React.FC = () => {
    const { currentStage } = useDemo();
    const [lines, setLines] = useState<Array<{ id: string, start: { x: number, y: number }, end: { x: number, y: number } }>>([]);

    // Temporary mock logic for demo purposes
    // In a real implementation, this would read coordinates from data-demo-element attributes
    useEffect(() => {
        // Clear previous lines
        setLines([]);

        const updateLines = () => {
            // Example: Draw line from Customer App to Dashboard on 'booking'
            if (currentStage === 'booking') {
                // Mock coordinates based on likely positions in 1920x1080 layout
                setLines([{
                    id: 'booking-flow',
                    start: { x: 400, y: 500 }, // Customer App area
                    end: { x: 1200, y: 300 }   // Dashboard Area
                }]);
            } else if (currentStage === 'dispatch') {
                setLines([{
                    id: 'dispatch-flow',
                    start: { x: 1200, y: 300 }, // Dashboard
                    end: { x: 800, y: 500 }     // Vendor App
                }]);
            }
        };

        // Delay slightly to allow layout to settle
        const timer = setTimeout(updateLines, 500);
        return () => clearTimeout(timer);

    }, [currentStage]);

    return (
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-50 overflow-visible">
            <AnimatePresence>
                {lines.map(line => (
                    <motion.path
                        key={line.id}
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1, ease: "easeInOut" }}
                        d={`M${line.start.x},${line.start.y} C${line.start.x + 200},${line.start.y} ${line.end.x - 200},${line.end.y} ${line.end.x},${line.end.y}`}
                        fill="none"
                        stroke="#F97316" // solar-500
                        strokeWidth="3"
                        strokeDasharray="10,10"
                    />
                ))}
            </AnimatePresence>
            {/* Animated pulsing dots at ends */}
            {lines.map(line => (
                <motion.circle
                    key={`dot-${line.id}`}
                    initial={{ cx: line.start.x, cy: line.start.y, opacity: 0 }}
                    animate={{
                        cx: [line.start.x, line.end.x],
                        opacity: [0, 1, 0]
                    }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    r="6"
                    fill="#F97316"
                />
            ))}
        </svg>
    );
};
