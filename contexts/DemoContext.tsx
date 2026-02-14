'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { MOCK_PROJECT } from '@/lib/mockData';

export type WorkflowStage = 'quotation' | 'booking' | 'dispatch' | 'installation' | 'closure' | 'maintenance';

interface DemoContextType {
    currentStage: WorkflowStage;
    project: typeof MOCK_PROJECT;
    setStage: (stage: WorkflowStage) => void;
    notifications: Array<{ title: string; message: string }>;
    addNotification: (title: string, message: string) => void;
    // Demo Mode Additions
    demoMode: 'dual' | 'dashboard';
    setDemoMode: (mode: 'dual' | 'dashboard') => void;
    isAutoPlaying: boolean;
    setAutoPlaying: (playing: boolean) => void;
    toggleAutoPlay: () => void;
    playbackSpeed: number;
    setPlaybackSpeed: (speed: number) => void;
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
    const [isAutoPlaying, setIsAutoPlaying] = useState(false);
    const [playbackSpeed, setPlaybackSpeed] = useState(1);

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

    // Auto-play logic
    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (isAutoPlaying) {
            // Different delays for different stages to allow reading/seeing animations
            // Installation needs more time IF we rely on outside auto-completion, 
            // but VendorApp handles its own timing for installation tasks.
            // So we pause context auto-progression for installation and let app handle it.
            let delay = 3500;
            if (currentStage === 'quotation') delay = 4000;
            if (currentStage === 'installation') delay = 999999; // Effectively pause, VendorApp emits event to progress

            timer = setTimeout(() => {
                if (currentStage !== 'installation') {
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
            isAutoPlaying,
            setAutoPlaying: setIsAutoPlaying,
            toggleAutoPlay,
            playbackSpeed,
            setPlaybackSpeed,
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
