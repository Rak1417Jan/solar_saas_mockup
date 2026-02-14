'use client';

import React, { useState, useEffect } from 'react';
import { MobileFrame } from '@/components/ui/MobileFrame';
import { TaskChecklist } from '@/components/vendor/TaskChecklist';
import { PhotoUpload } from '@/components/vendor/PhotoUpload';
import { ScannerModal } from '@/components/vendor/ScannerModal';
import { useDemo } from '@/contexts/DemoContext';
import { ActionHighlight } from '@/components/demo/ActionHighlight';
import { ArrowLeft, MapPin, Phone, ChevronRight, Truck, Scan, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { emitDemoEvent } from '@/lib/demoEvents';

export default function VendorApp() {
    const { project, currentStage, setStage, isAutoPlaying, goToNextStage } = useDemo();
    const [activeTab, setActiveTab] = useState<'tasks' | 'details'>('tasks');
    const [isScannerOpen, setIsScannerOpen] = useState(false);
    const [scannedItem, setScannedItem] = useState<string | null>(null);

    // Initial tasks - will be filtered based on stage
    const initialTasks = [
        { id: '1', label: 'Verify Roof Structure integrity', completed: false, stage: 'installation' },
        { id: '2', label: 'Install Mounting Rails', completed: false, stage: 'installation' },
        { id: '3', label: 'Mount Solar Panels (12x)', completed: false, stage: 'installation' },
        { id: '4', label: 'Connect DC Cabling', completed: false, stage: 'installation' },
        { id: '5', label: 'Inverter Installation', completed: false, stage: 'installation' },
        { id: '6', label: 'System Testing', completed: false, stage: 'closure' },
        { id: '7', label: 'Final Inspection', completed: false, stage: 'closure' }
    ];

    const [tasks, setTasks] = useState(initialTasks);

    // Effect to reset tasks on quotation (start) or handle stage transitions
    useEffect(() => {
        if (currentStage === 'quotation') {
            setTasks(initialTasks);
            setScannedItem(null);
        }
    }, [currentStage]);

    // Filter tasks based on current Demo Stage
    const visibleTasks = tasks.filter(t => {
        if (currentStage === 'installation') return t.stage === 'installation';
        if (currentStage === 'closure') return t.stage === 'installation' || t.stage === 'closure';
        return false;
    });

    const handleTaskComplete = (id: string) => {
        const newTasks = tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
        setTasks(newTasks);

        // Find the task to emit specific event if needed
        const task = newTasks.find(t => t.id === id);
        if (task?.completed) {
            emitDemoEvent('TASK_COMPLETED'); // Generic event for progress
        }

        // Check if all installation tasks are done
        const installTasks = newTasks.filter(t => t.stage === 'installation');
        if (installTasks.every(t => t.completed) && currentStage === 'installation') {
            // Slight delay for effect
            setTimeout(() => {
                emitDemoEvent('TASKS_COMPLETED');
                if (isAutoPlaying) goToNextStage();
            }, 800);
        }
    };

    // Auto-play tasks effect
    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (isAutoPlaying && currentStage === 'installation') {
            const nextTask = visibleTasks.find(t => !t.completed);
            if (nextTask) {
                timer = setTimeout(() => {
                    handleTaskComplete(nextTask.id);
                }, 2000); // 2 second gap
            }
        }
        return () => clearTimeout(timer);
    }, [isAutoPlaying, currentStage, tasks, visibleTasks]);

    const handleScanComplete = (code: string) => {
        setScannedItem(code);
        setIsScannerOpen(false);
        emitDemoEvent('DISPATCH_PAID'); // Reusing this event type implies "Material Verified" in this context
        if (isAutoPlaying) goToNextStage();
    }

    const handlePhotoUpload = () => {
        emitDemoEvent('INSTALLATION_STARTED'); // Visual feedback for "Evidence Uploaded"
    }

    const completedCount = tasks.filter(t => t.completed).length;
    const progress = Math.min(100, Math.round((completedCount / initialTasks.length) * 100));

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <MobileFrame className="bg-white">
                {/* Header */}
                <div className="bg-gray-900 text-white p-5 pb-8 rounded-b-[2rem] shadow-lg relative z-10">
                    <div className="flex justify-between items-center mb-6">
                        <Link href="/" className="p-2 hover:bg-white/10 rounded-full transition-colors">
                            <ArrowLeft size={20} className="text-white" />
                        </Link>
                        <h1 className="font-bold text-lg">Field Job</h1>
                        <div className="w-8 h-8 bg-solar-500 rounded-full flex items-center justify-center font-bold text-sm shadow-lg shadow-solar-500/20">
                            VJ
                        </div>
                    </div>

                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-solar-400 text-xs font-bold uppercase tracking-wider mb-1">Active Installation</p>
                            <h2 className="text-2xl font-bold">{project.id}</h2>
                            <div className="flex items-center gap-1 text-gray-400 text-xs mt-1">
                                <MapPin size={12} />
                                <span className="text-gray-400">Sun City, Sector 4</span>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-3xl font-bold text-solar-500">{progress}%</p>
                            <p className="text-xs text-gray-400">Completed</p>
                        </div>
                    </div>
                </div>

                {/* Tab Navigation */}
                <div className="flex border-b border-gray-100 mx-5 mt-4">
                    <button
                        onClick={() => setActiveTab('tasks')}
                        className={`flex-1 pb-3 text-sm font-semibold transition-colors ${activeTab === 'tasks' ? 'text-solar-600 border-b-2 border-solar-600' : 'text-gray-400'}`}
                    >
                        Tasks
                    </button>
                    <button
                        onClick={() => setActiveTab('details')}
                        className={`flex-1 pb-3 text-sm font-semibold transition-colors ${activeTab === 'details' ? 'text-solar-600 border-b-2 border-solar-600' : 'text-gray-400'}`}
                    >
                        Project Details
                    </button>
                </div>

                <div className="p-5 pb-20 space-y-6 overflow-y-auto h-[calc(100%-250px)] scrollbar-hide">
                    {activeTab === 'tasks' ? (
                        <>
                            {currentStage === 'dispatch' && (
                                <div className="bg-orange-50 p-4 rounded-lg border border-orange-200 animate-in fade-in slide-in-from-bottom-4">
                                    <h3 className="font-bold text-orange-800 mb-2 flex items-center gap-2">
                                        <Truck size={16} /> Material Dispatch
                                    </h3>
                                    <p className="text-xs text-orange-700 mb-4">Scan items as they are loaded onto the vehicle.</p>

                                    <ActionHighlight isActive={true} label="Scan Barcodes">
                                        <button
                                            onClick={() => setIsScannerOpen(true)}
                                            className="w-full bg-orange-600 text-white py-3 rounded-lg font-semibold shadow-lg shadow-orange-200 hover:bg-orange-700 transition-colors flex items-center justify-center gap-2 active:scale-95 transform"
                                        >
                                            <Scan size={18} />
                                            Scan Inventory
                                        </button>
                                    </ActionHighlight>
                                </div>
                            )}

                            {/* Task Section */}
                            {(currentStage === 'installation' || currentStage === 'closure') && (
                                <div className="animate-in fade-in slide-in-from-bottom-8 duration-500">
                                    <h3 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wider flex justify-between items-center">
                                        Installation Checklist
                                        <span className="text-xs font-normal text-gray-500 normal-case bg-gray-100 px-2 py-0.5 rounded-full">
                                            {visibleTasks.filter(t => t.completed).length}/{visibleTasks.length} Done
                                        </span>
                                    </h3>

                                    <ActionHighlight isActive={currentStage === 'installation'} label="Complete Tasks" position="bottom">
                                        <TaskChecklist tasks={visibleTasks} onComplete={handleTaskComplete} />
                                    </ActionHighlight>
                                </div>
                            )}

                            {/* Photo Upload Section */}
                            {currentStage === 'installation' && (
                                <div className="animate-in fade-in slide-in-from-bottom-10 delay-100 duration-500">
                                    <h3 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wider">Site Validation</h3>
                                    <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                                        <p className="text-xs text-gray-500 mb-4">Upload 3 photos of the installed panels with GPS data for remote verification.</p>
                                        <ActionHighlight isActive={visibleTasks.every(t => t.completed)} label="Upload Evidence">
                                            <PhotoUpload onUploadComplete={handlePhotoUpload} />
                                        </ActionHighlight>
                                    </div>
                                </div>
                            )}

                            {!['dispatch', 'installation', 'closure'].includes(currentStage) && (
                                <div className="text-center py-10 text-gray-400">
                                    <p className="text-sm">No active field tasks for this stage.</p>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="space-y-4">
                            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                                <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-2">Customer Info</p>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="font-bold text-gray-900 text-lg mb-1">{project.customer.name}</p>
                                        <div className="flex items-start gap-2 text-gray-600 text-sm mb-2">
                                            <MapPin size={16} className="mt-0.5 shrink-0" />
                                            <p>{project.customer.address}</p>
                                        </div>
                                    </div>
                                    <button className="p-2 bg-green-100 text-green-600 rounded-full hover:bg-green-200">
                                        <Phone size={18} />
                                    </button>
                                </div>
                            </div>

                            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                                <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-2">System Specs</p>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-xs text-gray-500">Capacity</p>
                                        <p className="font-bold text-gray-900">{project.system.size}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">Panels</p>
                                        <p className="font-bold text-gray-900">{project.system.panels}x Monocrystalline</p>
                                    </div>
                                    <div className="col-span-2">
                                        <p className="text-xs text-gray-500">Inverter</p>
                                        <p className="font-bold text-gray-900">{project.system.inverter}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Modals */}
                {isScannerOpen && (
                    <ScannerModal
                        isOpen={isScannerOpen}
                        onClose={() => setIsScannerOpen(false)}
                        onScan={handleScanComplete}
                    />
                )}
            </MobileFrame>
        </div>
    );
}
