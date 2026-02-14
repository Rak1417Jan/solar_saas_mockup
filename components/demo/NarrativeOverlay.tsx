'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDemo } from '@/contexts/DemoContext';
import { X } from 'lucide-react';

export const NarrativeOverlay: React.FC = () => {
    const { currentStage, isAutoPlaying } = useDemo();
    const [isVisible, setIsVisible] = useState(true);

    // Auto-hide logic only
    useEffect(() => {
        if (isAutoPlaying) {
            const timer = setTimeout(() => setIsVisible(false), 4000);
            return () => clearTimeout(timer);
        }
    }, [isAutoPlaying]);

    // Don't show if manually closed
    if (!isVisible) return null;

    const getNarrative = (stage: string) => {
        switch (stage) {
            case 'quotation':
                return {
                    title: "Proposal & Negotiation",
                    desc: "The customer reviews the 5kW solar proposal. They can negotiate pricing or approve instantly. The AI backend generates this quote based on satellite roof analysis."
                };
            case 'booking':
                return {
                    title: "Secure Booking",
                    desc: "Once approved, the customer pays a booking amount via integrated gateway. This triggers the project creation in the Vendor Dashboard and assigns a field team."
                };
            case 'dispatch':
                return {
                    title: "Inventory & Logistics",
                    desc: "Materials are allocated from inventory. The dispatch team scans items, and the customer tracks delivery status in real-time."
                };
            case 'installation':
                return {
                    title: "Field Installation",
                    desc: "The field team uses the Vendor App to follow a standardized checklist. GPS-tagged photos are uploaded for remote quality verification."
                };
            case 'closure':
                return {
                    title: "Net Metering & Handover",
                    desc: "Final government approvals (DISCOM) are processed. The system is commissioned, and the customer receives the handover document."
                };
            case 'maintenance':
                return {
                    title: "Lifetime Support",
                    desc: "The system enters monitoring mode. Performance alerts and maintenance schedules are automated for optimal generation."
                };
            default:
                return { title: "", desc: "" };
        }
    };

    const content = getNarrative(currentStage);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: 50, x: '-50%' }}
                    animate={{ opacity: 1, y: 0, x: '-50%' }}
                    exit={{ opacity: 0, y: 20, x: '-50%' }}
                    className="fixed bottom-8 left-1/2 bg-gray-900/90 backdrop-blur-md text-white px-6 py-4 rounded-2xl shadow-2xl max-w-lg z-[100] border border-gray-700/50"
                >
                    <button
                        onClick={() => setIsVisible(false)}
                        className="absolute top-2 right-2 p-1 text-gray-400 hover:text-white rounded-full bg-white/5 hover:bg-white/10 transition-colors"
                    >
                        <X size={14} />
                    </button>
                    <h3 className="text-lg font-bold text-solar-400 mb-1 flex items-center gap-2">
                        {content.title}
                        {isAutoPlaying && <span className="text-[10px] bg-red-500/20 text-red-300 px-1.5 py-0.5 rounded uppercase tracking-wider">Live Demo</span>}
                    </h3>
                    <p className="text-sm text-gray-300 leading-relaxed">{content.desc}</p>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
