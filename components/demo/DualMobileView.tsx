'use client';

import React from 'react';
import CustomerApp from '@/app/customer/page';
import VendorApp from '@/app/vendor/page';
import { motion } from 'framer-motion';
import { NarrativeOverlay } from '@/components/demo/NarrativeOverlay';
import { useDemo } from '@/contexts/DemoContext';

// Wrappers to constrain the pages to "mobile phone" visuals
const MobileFrameWrapper = ({ children, title }: { children: React.ReactNode, title: string }) => (
    <div className="flex flex-col items-center h-full">
        <h3 className="mb-4 text-gray-500 font-semibold uppercase tracking-widest text-xs">{title}</h3>
        <div className="relative w-[375px] h-[812px] bg-black rounded-[3rem] shadow-2xl border-8 border-gray-900 overflow-hidden shrink-0 transform scale-90 sm:scale-75 md:scale-90 lg:scale-100 transition-transform origin-top">
            <div className="absolute top-0 left-0 right-0 h-7 bg-black z-50 flex justify-center">
                <div className="w-32 h-5 bg-black rounded-b-xl" />
            </div>

            {/* Content Container - we set overflow auto here to let the inner page scroll within the frame */}
            <div className="w-full h-full bg-white overflow-hidden overflow-y-auto scrollbar-hide">
                <div className="origin-top-left transform scale-[1] w-full h-full [&>div]:min-h-0 [&>div]:p-0 [&>div]:bg-transparent">
                    {children}
                </div>
            </div>

            {/* Home Indicator */}
            <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gray-900 rounded-full z-50" />
        </div>
    </div>
);

export const DualMobileView: React.FC = () => {
    const { currentStage } = useDemo();

    return (
        <div className="relative h-full">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col md:flex-row items-center justify-center gap-8 p-8 h-full overflow-y-auto bg-gray-100 pb-32" // Added padding bottom for overlay
            >
                <MobileFrameWrapper title="Customer App">
                    <CustomerApp />
                </MobileFrameWrapper>

                <div className="hidden md:flex flex-col gap-2 text-gray-300 items-center justify-center opacity-20">
                    <div className="w-px h-32 bg-current" />
                    <span className="text-xs font-mono uppercase rotate-90 py-4 tracking-widest">Sync</span>
                    <div className="w-px h-32 bg-current" />
                </div>

                <MobileFrameWrapper title="Vendor Field App">
                    <VendorApp />
                </MobileFrameWrapper>
            </motion.div>

            <NarrativeOverlay key={currentStage} />
        </div>
    );
};
