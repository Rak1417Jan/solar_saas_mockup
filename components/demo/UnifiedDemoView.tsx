'use client';

import React, { useEffect, useState } from 'react';
import CustomerApp from '@/app/customer/page';
import VendorApp from '@/app/vendor/page';
import Dashboard from '@/app/dashboard/page';
import { motion, AnimatePresence } from 'framer-motion';
import { useDemo, FocusMode } from '@/contexts/DemoContext';
import { ConnectingLines } from '@/components/demo/ConnectingLines';
import { ScreenUpdateIndicator } from '@/components/demo/ScreenUpdateIndicator';
import { useDemoFlow } from '@/components/demo/useDemoFlow';
import { NarrativeOverlay, NarrativePosition } from '@/components/demo/NarrativeOverlay';

// Layout configuration for Focus Mode
const FOCUS_SCALE = 1.1; // Scale up the focused item
const BLUR_SCALE = 0.85;  // Scale down background items
const BLUR_OPACITY = 0.4;
const BLUR_AMOUNT = '4px';

// Wrapper for Mobile Frames (Customer/Vendor)
const MobileFrameWrapper = ({
    children,
    title,
    isUpdated,
    isFocused,
    isBlurred
}: {
    children: React.ReactNode,
    title: string,
    isUpdated?: boolean,
    isFocused?: boolean,
    isBlurred?: boolean
}) => (
    <div className={`flex flex-col items-center h-full relative group transition-all duration-700 ease-in-out`}>
        <motion.h3
            animate={{ opacity: isBlurred ? 0.3 : 1 }}
            className="mb-3 text-gray-400 font-bold uppercase tracking-widest text-[10px]"
        >
            {title}
        </motion.h3>

        <motion.div
            layout
            animate={{
                scale: isFocused ? FOCUS_SCALE : (isBlurred ? BLUR_SCALE : 1),
                opacity: isBlurred ? BLUR_OPACITY : 1,
                filter: isBlurred ? `blur(${BLUR_AMOUNT})` : 'blur(0px)',
                zIndex: isFocused ? 50 : 10,
                y: isFocused ? 0 : (isBlurred ? 20 : 0)
            }}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
            className={`relative w-[320px] h-[680px] bg-black rounded-[2.5rem] shadow-2xl border-4 overflow-hidden shrink-0 origin-center
                ${isUpdated ? 'border-solar-500 shadow-solar-500/30' : 'border-gray-800'}
            `}
        >
            <ScreenUpdateIndicator isActive={!!isUpdated} />

            <div className="absolute top-0 left-0 right-0 h-6 bg-black z-50 flex justify-center">
                <div className="w-24 h-4 bg-black rounded-b-lg" />
            </div>

            <div className="w-full h-full bg-white overflow-hidden overflow-y-auto scrollbar-hide">
                <div className="origin-top-left transform scale-[0.85] w-[117.6%] h-[117.6%] [&>div]:min-h-0 [&>div]:p-0 [&>div]:bg-transparent">
                    {children}
                </div>
            </div>

            {/* Glass Overlay for blurred state to prevent interaction */}
            {isBlurred && <div className="absolute inset-0 z-[60] bg-gray-900/10" />}

            <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gray-800 rounded-full z-50" />
        </motion.div>
    </div>
);

// Wrapper for Desktop Frame (Dashboard)
const DesktopFrameWrapper = ({
    children,
    title,
    isUpdated,
    isFocused,
    isBlurred
}: {
    children: React.ReactNode,
    title: string,
    isUpdated?: boolean,
    isFocused?: boolean,
    isBlurred?: boolean
}) => (
    <div className={`flex flex-col items-center h-full w-full relative group transition-all duration-700`}>
        <motion.h3
            animate={{ opacity: isBlurred ? 0.3 : 1 }}
            className="mb-3 text-gray-400 font-bold uppercase tracking-widest text-[10px]"
        >
            {title}
        </motion.h3>

        <motion.div
            layout
            animate={{
                scale: isFocused ? FOCUS_SCALE : (isBlurred ? BLUR_SCALE : 1),
                opacity: isBlurred ? BLUR_OPACITY : 1,
                filter: isBlurred ? `blur(${BLUR_AMOUNT})` : 'blur(0px)',
                zIndex: isFocused ? 50 : 10,
                y: isFocused ? 0 : (isBlurred ? 20 : 0)
            }}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
            className={`relative w-full h-[680px] bg-gray-900 rounded-xl shadow-2xl border overflow-hidden shrink-0 flex flex-col origin-center
                 ${isUpdated ? 'border-solar-500 shadow-solar-500/30' : 'border-gray-800 hover:shadow-solar-500/10'}
            `}
        >
            <ScreenUpdateIndicator isActive={!!isUpdated} />

            {/* Glass Overlay for blurred state */}
            {isBlurred && <div className="absolute inset-0 z-[60] bg-gray-900/10" />}

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
                <div className="transform origin-top-left w-full h-full">
                    {children}
                </div>
            </div>
        </motion.div>
    </div>
);

export const UnifiedDemoView: React.FC = () => {
    const { currentStage, focusMode, setFocusMode, isAutoPlaying } = useDemo();
    const { narrative } = useDemoFlow();
    const [updates, setUpdates] = useState({ customer: false, vendor: false, dashboard: false });

    useEffect(() => {
        const handleDemoEvent = (e: any) => {
            const { type } = e.detail;

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
    }, [setFocusMode]);

    // Manual focus logic fallback
    useEffect(() => {
        if (isAutoPlaying) return;

        if (currentStage === 'quotation' || currentStage === 'booking') {
            setFocusMode('customer');
        } else if (currentStage === 'dispatch' || currentStage === 'installation') {
            setFocusMode('vendor');
        } else if (currentStage === 'maintenance') {
            setFocusMode('dashboard');
        } else {
            setFocusMode('none');
        }
    }, [currentStage, setFocusMode, isAutoPlaying]);

    const getFocusState = (screen: 'customer' | 'vendor' | 'dashboard') => {
        if (focusMode === 'none') return { isFocused: false, isBlurred: false };
        if (focusMode === 'dual-mobile') {
            if (screen === 'customer' || screen === 'vendor') return { isFocused: true, isBlurred: false };
            return { isFocused: false, isBlurred: true };
        }
        return {
            isFocused: focusMode === screen,
            isBlurred: focusMode !== screen
        };
    };

    // Calculate Narrative Position based on Focus
    const getNarrativePosition = (focus: FocusMode): NarrativePosition => {
        switch (focus) {
            case 'customer':
                return 'right';
            case 'vendor':
                return 'right';
            case 'dashboard':
                return 'left';
            case 'dual-mobile':
                return 'center'; // Center for dual mobile view (e.g., Proof of Work) OR right if space allows? 
                // Dashboard is on right and blurred, Customer Left, Vendor Center.
                // Actually Dashboard is dimmed on right, so 'right' or 'left' (over customer? no).
                // Let's try 'right' (over dimmed dashboard) or 'center' (bottom overlay).
                // User requested box around start/end which are 'center'.
                // For dual mobile, let's put it on the right over the dashboard for now, or keep center.
                return 'right';
            case 'none':
            default:
                return 'center';
        }
    };

    return (
        <div className="relative flex flex-col lg:flex-row items-center justify-center gap-6 p-6 h-full overflow-hidden bg-gray-950 min-w-[1400px]">

            {/* Background Overlay when focused (extra dimming) */}
            <AnimatePresence>
                {focusMode !== 'none' && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.6 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black pointer-events-none z-0"
                    />
                )}
            </AnimatePresence>

            {/* Connecting Lines - Hidden when focused */}
            <motion.div animate={{ opacity: focusMode === 'none' ? 1 : 0 }}>
                <ConnectingLines />
            </motion.div>

            {/* Narrative Overlay */}
            {narrative && (
                <NarrativeOverlay
                    isVisible={!!narrative}
                    title={narrative.title}
                    description={narrative.description}
                    position={getNarrativePosition(focusMode)}
                    autoAdvanceMs={narrative.duration}
                    isAutoPlaying={isAutoPlaying}
                />
            )}

            {/* Left: Customer App */}
            <div className="shrink-0 z-10 transition-all duration-700">
                <MobileFrameWrapper
                    title="Customer App"
                    isUpdated={updates.customer}
                    {...getFocusState('customer')}
                >
                    <CustomerApp />
                </MobileFrameWrapper>
            </div>

            {/* Center: Vendor App */}
            <div className="shrink-0 z-10 transition-all duration-700">
                <MobileFrameWrapper
                    title="Vendor Field App"
                    isUpdated={updates.vendor}
                    {...getFocusState('vendor')}
                >
                    <VendorApp />
                </MobileFrameWrapper>
            </div>

            {/* Right: Operations Dashboard */}
            <div className="flex-1 min-w-[600px] h-full z-10 transition-all duration-700">
                <DesktopFrameWrapper
                    title="Operations Center"
                    isUpdated={updates.dashboard}
                    {...getFocusState('dashboard')}
                >
                    <Dashboard />
                </DesktopFrameWrapper>
            </div>
        </div>
    );
};
