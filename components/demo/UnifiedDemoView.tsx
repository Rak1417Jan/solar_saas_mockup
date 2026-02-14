'use client';

import React, { useEffect, useState } from 'react';
import CustomerApp from '@/app/customer/page';
import VendorApp from '@/app/vendor/page';
import Dashboard from '@/app/dashboard/page';
import { motion } from 'framer-motion';
import { useDemo } from '@/contexts/DemoContext';
import { ConnectingLines } from '@/components/demo/ConnectingLines';
import { ScreenUpdateIndicator } from '@/components/demo/ScreenUpdateIndicator';

// Reusing MobileFrameWrapper from DualMobileView but adapting for 3-column
const MobileFrameWrapper = ({ children, title, isUpdated }: { children: React.ReactNode, title: string, isUpdated?: boolean }) => (
    <div className="flex flex-col items-center h-full relative group">
        <h3 className="mb-3 text-gray-400 font-bold uppercase tracking-widest text-[10px]">{title}</h3>
        <div className={`relative w-[320px] h-[680px] bg-black rounded-[2.5rem] shadow-2xl border-4 overflow-hidden shrink-0 transform transition-all duration-300 origin-top hover:scale-[1.02]
            ${isUpdated ? 'border-solar-500 shadow-solar-500/30' : 'border-gray-800'}
        `}>
            <ScreenUpdateIndicator isActive={!!isUpdated} />

            <div className="absolute top-0 left-0 right-0 h-6 bg-black z-50 flex justify-center">
                <div className="w-24 h-4 bg-black rounded-b-lg" />
            </div>

            <div className="w-full h-full bg-white overflow-hidden overflow-y-auto scrollbar-hide">
                <div className="origin-top-left transform scale-[0.85] w-[117.6%] h-[117.6%] [&>div]:min-h-0 [&>div]:p-0 [&>div]:bg-transparent">
                    {children}
                </div>
            </div>

            <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gray-800 rounded-full z-50" />
        </div>
    </div>
);

const DesktopFrameWrapper = ({ children, title, isUpdated }: { children: React.ReactNode, title: string, isUpdated?: boolean }) => (
    <div className="flex flex-col items-center h-full w-full relative group">
        <h3 className="mb-3 text-gray-400 font-bold uppercase tracking-widest text-[10px]">{title}</h3>
        <div className={`relative w-full h-[680px] bg-gray-900 rounded-xl shadow-2xl border overflow-hidden shrink-0 flex flex-col transition-all duration-300
             ${isUpdated ? 'border-solar-500 shadow-solar-500/30' : 'border-gray-800 hover:shadow-solar-500/10'}
        `}>
            <ScreenUpdateIndicator isActive={!!isUpdated} />

            {/* Browser Chrome */}
            <div className="h-8 bg-gray-800 flex items-center px-4 gap-2 border-b border-gray-700">
                <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                </div>
                <div className="flex-1 ml-4">
                    <div className="bg-gray-900 rounded text-[10px] text-gray-400 px-3 py-0.5 w-full max-w-sm mx-auto text-center truncate">
                        admin.solarsaas.com/dashboard
                    </div>
                </div>
            </div>

            <div className="w-full h-full bg-gray-50 overflow-hidden overflow-y-auto relative">
                {/* Scale down content slightly to fit more in view if needed, or keep 1:1 */}
                <div className="transform origin-top-left w-full h-full">
                    {children}
                </div>
            </div>
        </div>
    </div>
);

export const UnifiedDemoView: React.FC = () => {
    const { currentStage } = useDemo();
    const [updates, setUpdates] = useState({ customer: false, vendor: false, dashboard: false });

    useEffect(() => {
        const handleDemoEvent = (e: any) => {
            const { type } = e.detail;

            // Logic to trigger updates on specific screens based on event
            // e.g. Customer action -> Dashboard update
            if (['QUOTE_APPROVED', 'BOOKING_PAID'].includes(type)) {
                triggerUpdate('dashboard');
            }
            if (['DISPATCH_PAID'].includes(type)) {
                triggerUpdate('vendor');
                triggerUpdate('dashboard');
            }
            if (['INSTALLATION_STARTED', 'TASKS_COMPLETED'].includes(type)) {
                triggerUpdate('dashboard');
            }
        };

        const triggerUpdate = (screen: 'customer' | 'vendor' | 'dashboard') => {
            setUpdates(prev => ({ ...prev, [screen]: true }));
            setTimeout(() => setUpdates(prev => ({ ...prev, [screen]: false })), 2000);
        };

        window.addEventListener('demo-event', handleDemoEvent);
        return () => window.removeEventListener('demo-event', handleDemoEvent);
    }, []);

    return (
        <div className="relative flex flex-col lg:flex-row items-start justify-center gap-6 p-6 h-full overflow-x-auto bg-gray-950 min-w-[1400px]">

            {/* Connecting Lines Overlay */}
            <ConnectingLines />

            {/* Left: Customer App */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="shrink-0 z-10"
            >
                <MobileFrameWrapper title="Customer App" isUpdated={updates.customer}>
                    <CustomerApp />
                </MobileFrameWrapper>
            </motion.div>

            {/* Center: Vendor App */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="shrink-0 z-10"
            >
                <MobileFrameWrapper title="Vendor Field App" isUpdated={updates.vendor}>
                    <VendorApp />
                </MobileFrameWrapper>
            </motion.div>

            {/* Right: Operations Dashboard */}
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="flex-1 min-w-[600px] h-full z-10"
            >
                <DesktopFrameWrapper title="Operations Center" isUpdated={updates.dashboard}>
                    <Dashboard />
                </DesktopFrameWrapper>
            </motion.div>
        </div>
    );
};
