'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDemo } from '@/contexts/DemoContext';
import { MousePointer2, Play, Pause, ChevronUp, ChevronDown } from 'lucide-react';
import { ActionPointer } from './ActionPointer';

// Define the steps and their metadata
interface GuidanceStep {
    stage: string;
    screen: 'customer' | 'vendor' | 'dashboard';
    title: string;
    description: string;
    targetElementId?: string; // ID to highlight
    nextAction: string;
    subSteps?: string[]; // For multi-action stages like installation
    expectedImpact?: {
        screen: string;
        description: string;
    }[];
}

const WORKFLOW_STEPS: Record<string, GuidanceStep> = {
    'quotation': {
        stage: 'quotation',
        screen: 'customer',
        title: 'Review Proposal',
        description: 'Customer receives an AI-generated solar proposal.',
        targetElementId: 'approve-quote-btn', // Matches button in CustomerApp
        nextAction: 'Click "Approve Quote" to proceed.',
        expectedImpact: [
            { screen: 'Dashboard', description: 'Status updates to "Booking"' },
            { screen: 'Dashboard', description: 'New Timeline Entry: "Quote Approved"' }
        ]
    },
    'booking': {
        stage: 'booking',
        screen: 'customer',
        title: 'Secure Booking',
        description: 'Customer pays a token amount to confirm the order.',
        targetElementId: 'pay-booking-btn',
        nextAction: 'Click "Pay ₹50,000" to book.',
        expectedImpact: [
            { screen: 'Dashboard', description: 'Revenue updated, Project ID generated' },
            { screen: 'Dashboard', description: 'Inventory allocation triggered' }
        ]
    },
    'dispatch': {
        stage: 'dispatch',
        screen: 'vendor',
        title: 'Dispatch Materials',
        description: 'Warehouse team scans items as they are loaded.',
        targetElementId: 'scan-inventory-btn', // Matches button in VendorApp
        nextAction: 'Click "Scan Inventory" to verify load.',
        expectedImpact: [
            { screen: 'Dashboard', description: 'Field Team status: "In-Transit"' },
            { screen: 'Vendor App', description: 'Unlocks installation tasks' }
        ]
    },
    'installation': {
        stage: 'installation',
        screen: 'vendor',
        title: 'Field Installation',
        description: 'Technician completes on-site installation tasks.',
        // targetElementId: 'vendor-task-1', // Could target first task
        nextAction: 'Check off all installation tasks.',
        subSteps: [
            'Verify Roof Structure',
            'Install Mounting Rails',
            'Mount Solar Panels',
            'Connect DC Cabling',
            'Inverter Installation'
        ],
        expectedImpact: [
            { screen: 'Dashboard', description: 'Real-time progress tracking' },
            { screen: 'Dashboard', description: 'Field Team status: "On-Site"' }
        ]
    },
    'closure': {
        stage: 'closure',
        screen: 'customer', // Or Dashboard? Usually closure is admin or customer signoff. Let's say Customer pays final.
        title: 'Project Closure',
        description: 'Review final system performance and handover.',
        targetElementId: 'final-handover-btn',
        nextAction: 'Review details (End of Demo)',
        expectedImpact: [
            { screen: 'Dashboard', description: 'Project marked as "monitoring"' }
        ]
    },
    'maintenance': {
        stage: 'maintenance',
        screen: 'dashboard',
        title: 'Monitoring & Maintenance',
        description: 'System is live and being monitored.',
        nextAction: 'Explore the dashboard.',
        targetElementId: 'maintenance-panel'
    }
};

export const GuidanceSystem: React.FC = () => {
    const { currentStage, isAutoPlaying } = useDemo();
    const [currentStep, setCurrentStep] = useState<GuidanceStep | null>(null);
    const [isExpanded, setIsExpanded] = useState(false);

    useEffect(() => {
        const step = WORKFLOW_STEPS[currentStage];
        setCurrentStep(step || null);
        // Optional: Auto-expand on stage change if desired, or keep user preference
        // setIsExpanded(true); 
    }, [currentStage]);

    if (!currentStep) return null;

    return (
        <>
            {/* The Pointer on the specific element - Only show if single target */}
            {currentStep.targetElementId && !currentStep.subSteps && (
                <ActionPointer
                    targetElementId={currentStep.targetElementId}
                    isActive={true}
                    message="Click Here"
                    position="top"
                />
            )}

            {/* Bottom Guidance Bar */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentStep.stage}
                    layout
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-900/95 backdrop-blur-md text-white rounded-2xl shadow-2xl border border-gray-700 z-50 overflow-hidden"
                    style={{ width: isExpanded ? 'auto' : 'auto', minWidth: isExpanded ? '600px' : '300px' }}
                >
                    <div className="px-6 py-4">
                        {/* Always Visible Header Area */}
                        <div className="flex items-center justify-between gap-4 cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
                            <div className="flex items-center gap-3">
                                {/* Compact Icon */}
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm border-2 
                                    ${currentStep.screen === 'customer' ? 'bg-blue-600 border-blue-400' : ''}
                                    ${currentStep.screen === 'vendor' ? 'bg-orange-600 border-orange-400' : ''}
                                    ${currentStep.screen === 'dashboard' ? 'bg-purple-600 border-purple-400' : ''}
                                `}>
                                    {currentStep.screen === 'customer' && '👤'}
                                    {currentStep.screen === 'vendor' && '👷'}
                                    {currentStep.screen === 'dashboard' && '📊'}
                                </div>

                                <div className="flex flex-col">
                                    <h3 className="font-bold text-sm bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                                        {currentStep.title}
                                    </h3>
                                    {!isExpanded && (
                                        <div className="flex items-center gap-2 text-[10px] text-solar-400 font-semibold animate-pulse">
                                            <MousePointer2 size={12} />
                                            <span>{currentStep.nextAction}</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                {isAutoPlaying && !isExpanded && (
                                    <div className="w-6 h-6 rounded-full border border-green-500/30 flex items-center justify-center text-green-500 animate-[spin_3s_linear_infinite]">
                                        <Play size={10} fill="currentColor" />
                                    </div>
                                )}
                                <button className="text-gray-400 hover:text-white transition-colors">
                                    {isExpanded ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
                                </button>
                            </div>
                        </div>

                        {/* Collapsible Content */}
                        <AnimatePresence>
                            {isExpanded && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0, marginTop: 0 }}
                                    animate={{ height: 'auto', opacity: 1, marginTop: 16 }}
                                    exit={{ height: 0, opacity: 0, marginTop: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="border-t border-gray-800 pt-4"
                                >
                                    <div className="flex items-start gap-8">
                                        {/* Step Content */}
                                        <div className="flex-1">
                                            <p className="text-gray-300 text-sm leading-relaxed mb-3">
                                                {currentStep.description}
                                            </p>

                                            {/* Sub-steps */}
                                            {currentStep.subSteps && (
                                                <div className="grid grid-cols-2 gap-2 mb-3">
                                                    {currentStep.subSteps.map((sub, idx) => (
                                                        <div key={idx} className="flex items-center gap-2 text-xs text-gray-400">
                                                            <div className="w-1.5 h-1.5 rounded-full bg-gray-600" />
                                                            {sub}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}

                                            {/* Impact tags */}
                                            {currentStep.expectedImpact && (
                                                <div className="flex flex-col gap-2 mb-3">
                                                    <span className="text-[10px] uppercase text-gray-500 font-bold tracking-wider">Expected Impact</span>
                                                    <div className="flex flex-wrap gap-2">
                                                        {currentStep.expectedImpact.map((impact, idx) => (
                                                            <div key={idx} className="bg-gray-800 border border-gray-700 rounded px-2 py-1 text-[10px] text-gray-400 flex items-center gap-1">
                                                                <span className="w-1 h-1 rounded-full bg-solar-500" />
                                                                <span className="font-bold text-gray-300">{impact.screen}:</span> {impact.description}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            <div className="flex items-center gap-2 text-solar-400 text-sm font-semibold mt-4">
                                                <MousePointer2 size={16} />
                                                <span>{currentStep.nextAction}</span>
                                            </div>
                                        </div>

                                        {/* Status / AutoPlay */}
                                        <div className="shrink-0 flex flex-col items-center justify-center gap-3 pl-6 border-l border-gray-800">
                                            {isAutoPlaying ? (
                                                <div className="flex flex-col items-center gap-1">
                                                    <div className="w-10 h-10 rounded-full border-2 border-green-500/30 flex items-center justify-center text-green-500 animate-[spin_3s_linear_infinite]">
                                                        <Play size={16} fill="currentColor" />
                                                    </div>
                                                    <span className="text-[10px] font-bold text-green-500 uppercase tracking-wider">Auto-Play On</span>
                                                </div>
                                            ) : (
                                                <div className="flex flex-col items-center gap-1 opacity-50">
                                                    <div className="w-10 h-10 rounded-full border-2 border-gray-600 flex items-center justify-center text-gray-600">
                                                        <Pause size={16} fill="currentColor" />
                                                    </div>
                                                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Manual Mode</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>
            </AnimatePresence>
        </>
    );
};
