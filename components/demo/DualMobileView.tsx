'use client';

import React from 'react';
import CustomerApp from '@/app/customer/page';
import VendorApp from '@/app/vendor/page';
import { motion } from 'framer-motion';
import { useDemo } from '@/contexts/DemoContext';
import { ConnectingLines } from '@/components/demo/ConnectingLines';

const MobileFrameWrapper = ({ children, title }: { children: React.ReactNode, title: string }) => (
    <div className="flex flex-col items-center h-full relative group">
        <h3 className="mb-4 text-gray-400 font-bold uppercase tracking-widest text-xs">{title}</h3>
        <div className="relative w-[375px] h-[812px] bg-black rounded-[3rem] shadow-2xl border-8 border-gray-800 overflow-hidden shrink-0 transform transition-transform hover:scale-[1.02]">
            {/* Notch */}
            <div className="absolute top-0 left-0 right-0 h-6 bg-black z-50 flex justify-center">
                <div className="w-32 h-4 bg-black rounded-b-lg" />
            </div>

            {/* Screen Content */}
            <div className="w-full h-full bg-white overflow-hidden overflow-y-auto scrollbar-hide">
                {children}
            </div>

            {/* Home Indicator */}
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gray-800 rounded-full z-50" />
        </div>
    </div>
);

export const DualMobileView: React.FC = () => {
    const { currentStage } = useDemo();

    return (
        <div className="relative flex items-center justify-center gap-16 p-8 h-full overflow-hidden bg-gray-950">

            {/* Background elements to show connection */}
            <ConnectingLines />

            {/* Left: Customer App */}
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="z-10"
            >
                <MobileFrameWrapper title="Customer App">
                    <CustomerApp />
                </MobileFrameWrapper>
            </motion.div>

            {/* Right: Vendor App */}
            <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="z-10"
            >
                <MobileFrameWrapper title="Vendor Field App">
                    <VendorApp />
                </MobileFrameWrapper>
            </motion.div>
        </div>
    );
};
