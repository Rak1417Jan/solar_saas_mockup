'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { MOCK_PROJECT } from '@/lib/mockData';

export type WorkflowStage = 'quotation' | 'booking' | 'dispatch' | 'installation' | 'closure' | 'maintenance';
export type FocusMode = 'customer' | 'vendor' | 'dashboard' | 'dual-mobile' | 'none';

interface DemoTiming {
    narrativeDuration: number;      // How long to show text before action
    actionDelay: number;            // Delay before performing the action
    impactShowDuration: number;     // How long to linger on the result
    transitionDuration: number;     // Time to switch focus
    vendorTaskInterval: number;     // Gap between vendor tasks
}

// Default slower timing (Total demo time ~60-90s)
const DEFAULT_TIMING: DemoTiming = {
    narrativeDuration: 4000,
    actionDelay: 2000,
    impactShowDuration: 3000,
    transitionDuration: 1500,
    vendorTaskInterval: 3000, // Slower than 2s for better readability
};

interface DemoContextType {
    currentStage: WorkflowStage;
    project: typeof MOCK_PROJECT;
    setStage: (stage: WorkflowStage) => void;
    notifications: Array<{ title: string; message: string }>;
    addNotification: (title: string, message: string) => void;

    // Demo Mode State
    demoMode: 'dual' | 'dashboard';
    focusMode: FocusMode; // New: Controls which screen is highlighted
    setFocusMode: (mode: FocusMode) => void;

    isAutoPlaying: boolean;
    setAutoPlaying: (playing: boolean) => void;
    toggleAutoPlay: () => void;

    playbackSpeed: number;
    setPlaybackSpeed: (speed: number) => void;
    timing: DemoTiming; // New: Centralized timing config

    goToNextStage: () => void;
    goToPreviousStage: () => void;
}

const STAGES: WorkflowStage[] = ['quotation', 'booking', 'dispatch', 'installation', 'closure', 'maintenance'];

const DemoContext = createContext<DemoContextType | object>({});

export function DemoProvider({ children }: { children: ReactNode }) {
    const [currentStage, setCurrentStage] = useState<WorkflowStage>('quotation');
    const [project, setProject] = useState(MOCK_PROJECT);
    const [notifications, setNotifications] = useState<Array<{ title: string; message: string }>>([]);

    // Demo Mode State
    const [demoMode, setDemoMode] = useState<'dual' | 'dashboard'>('dual');
    const [focusMode, setFocusMode] = useState<FocusMode>('none');
    const [isAutoPlaying, setIsAutoPlaying] = useState(false);
    const [playbackSpeed, setPlaybackSpeed] = useState(1);

    // Derived timing based on playback speed
    const timing: DemoTiming = {
        narrativeDuration: DEFAULT_TIMING.narrativeDuration / playbackSpeed,
        actionDelay: DEFAULT_TIMING.actionDelay / playbackSpeed,
        impactShowDuration: DEFAULT_TIMING.impactShowDuration / playbackSpeed,
        transitionDuration: DEFAULT_TIMING.transitionDuration / playbackSpeed,
        vendorTaskInterval: DEFAULT_TIMING.vendorTaskInterval / playbackSpeed,
    };

    const addNotification = (title: string, message: string) => {
        setNotifications(prev => [...prev, { title, message }]);
        setTimeout(() => {
            setNotifications(prev => prev.filter(n => n.title !== title));
        }, 5000);
    };

    const goToNextStage = () => {
        const currentIndex = STAGES.indexOf(currentStage);
        if (currentIndex < STAGES.length - 1) {
            setCurrentStage(STAGES[currentIndex + 1]);
        } else {
            setIsAutoPlaying(false); // Stop when done
        }
    };

    const goToPreviousStage = () => {
        const currentIndex = STAGES.indexOf(currentStage);
        if (currentIndex > 0) {
            setCurrentStage(STAGES[currentIndex - 1]);
        }
    };

    const toggleAutoPlay = () => setIsAutoPlaying(prev => !prev);

    // Auto-play logic - Simplified here, detailed choreography will be in a separate hook/manager
    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (isAutoPlaying) {
            // Basic stage progression fallback if no specific choreography overrides it
            // We pause this basic timer for 'installation' to let vendor app handle it
            // We also might want to pause it if a Narrative is showing (to be implemented)

            let delay = 3500;
            if (currentStage === 'quotation') delay = 5000;
            if (currentStage === 'installation') delay = 999999; // Effectively pause, VendorApp emits event

            timer = setTimeout(() => {
                if (currentStage !== 'installation') {
                    // In the new system, we might want to wait for Focus changes
                    // For now, keep legacy behavior working until Choreographer is ready
                    goToNextStage();
                }
            }, delay / playbackSpeed);
        }
        return () => clearTimeout(timer);
    }, [isAutoPlaying, currentStage, playbackSpeed]);

    return (
        <DemoContext.Provider value={{
            currentStage,
            project,
            setStage: setCurrentStage,
            notifications,
            addNotification,

            demoMode,
            setDemoMode,
            focusMode,
            setFocusMode,

            isAutoPlaying,
            setAutoPlaying: setIsAutoPlaying,
            toggleAutoPlay,

            playbackSpeed,
            setPlaybackSpeed,
            timing, // Expose timing

            goToNextStage,
            goToPreviousStage
        }}>
            {children}
        </DemoContext.Provider>
    );
}

export const useDemo = () => {
    const context = useContext(DemoContext);
    if (Object.keys(context).length === 0) {
        throw new Error('useDemo must be used within a DemoProvider');
    }
    return context as DemoContextType;
};
