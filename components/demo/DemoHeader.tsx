'use client';

import React from 'react';
import { useDemo } from '@/contexts/DemoContext';
import { Play, Pause, RotateCcw, ChevronLeft, ChevronRight, Smartphone, Monitor } from 'lucide-react';
import { motion } from 'framer-motion';

export const DemoHeader: React.FC = () => {
    const {
        currentStage,
        setStage,
        isAutoPlaying,
        toggleAutoPlay,
        playbackSpeed,
        setPlaybackSpeed,
        goToNextStage
    } = useDemo();

    const workflowOrder = ['quotation', 'booking', 'dispatch', 'installation', 'closure', 'maintenance'];
    const progress = ((workflowOrder.indexOf(currentStage) + 1) / workflowOrder.length) * 100;

    return (
        <div className="bg-gray-950 border-b border-gray-800 p-4 sticky top-0 z-50 shadow-lg">
            <div className="flex items-center justify-between max-w-[1800px] mx-auto">
                {/* Left: Brand & Stage */}
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-solar-500 rounded-lg flex items-center justify-center font-bold text-white shadow-[0_0_15px_rgba(249,115,22,0.5)]">
                            S
                        </div>
                        <span className="font-bold text-lg tracking-tight">SolarSaaS <span className="text-solar-500">Demo</span></span>
                    </div>

                    <div className="h-8 w-px bg-gray-800" />

                    <div className="flex flex-col gap-1 min-w-[200px]">
                        <div className="flex justify-between text-xs text-gray-400 uppercase tracking-wider font-semibold">
                            <span>Current Stage</span>
                            <span className="text-solar-500">{currentStage}</span>
                        </div>
                        <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-solar-500 shadow-[0_0_10px_rgba(249,115,22,0.5)]"
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                                transition={{ duration: 0.5 }}
                            />
                        </div>
                    </div>
                </div>

                {/* Center: Playback Controls */}
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 bg-gray-900 border border-gray-800 rounded-lg p-1">
                        <button
                            onClick={() => setStage(workflowOrder[Math.max(0, workflowOrder.indexOf(currentStage) - 1)] as any)}
                            className="p-1.5 hover:bg-gray-800 rounded-md text-gray-400 hover:text-white transition-colors"
                            title="Previous Stage"
                        >
                            <ChevronLeft size={16} />
                        </button>

                        <button
                            onClick={toggleAutoPlay}
                            className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-bold transition-all ${isAutoPlaying ? 'bg-red-500/10 text-red-400 border border-red-500/20 shadow-[0_0_10px_rgba(239,68,68,0.1)]' : 'bg-solar-600 text-white hover:bg-solar-500 shadow-[0_0_15px_rgba(249,115,22,0.3)]'}`}
                        >
                            {isAutoPlaying ? <Pause size={14} fill="currentColor" /> : <Play size={14} fill="currentColor" />}
                            <span>{isAutoPlaying ? 'PAUSE' : 'PLAY DEMO'}</span>
                        </button>

                        <button
                            onClick={goToNextStage}
                            className="p-1.5 hover:bg-gray-800 rounded-md text-gray-400 hover:text-white transition-colors"
                            title="Next Stage"
                        >
                            <ChevronRight size={16} />
                        </button>
                    </div>

                    <div className="h-8 w-px bg-gray-800" />

                    {/* Speed Control */}
                    <div className="flex items-center gap-2 bg-gray-900 border border-gray-800 rounded-lg px-3 py-1.5">
                        <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Speed</span>
                        <select
                            value={playbackSpeed}
                            onChange={(e) => setPlaybackSpeed(Number(e.target.value))}
                            className="bg-transparent text-xs font-bold text-gray-300 focus:outline-none cursor-pointer hover:text-white transition-colors"
                        >
                            <option value={1}>1x</option>
                            <option value={1.5}>1.5x</option>
                            <option value={2}>2x</option>
                        </select>
                    </div>
                </div>

                {/* Right: Reset */}
                <button
                    onClick={() => setStage('quotation')}
                    className="flex items-center gap-2 text-xs font-semibold text-gray-500 hover:text-white transition-colors px-3 py-2 hover:bg-gray-900 rounded-lg"
                >
                    <RotateCcw size={14} />
                    <span>Restart</span>
                </button>
            </div>
        </div>
    );
};
