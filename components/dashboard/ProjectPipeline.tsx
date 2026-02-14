'use client';

import React from 'react';
import { MoreHorizontal } from 'lucide-react';
import { MOCK_PROJECT } from '@/lib/mockData';
import { WorkflowStage } from '@/contexts/DemoContext';
import { motion, AnimatePresence } from 'framer-motion';

interface ProjectPipelineProps {
    stageCounts: {
        leads: number;
        proposals: number;
        negotiation: number;
        booking: number;
        dispatch: number;
        installation: number;
        closure: number;
    };
    currentDemoStage?: WorkflowStage;
}

export const ProjectPipeline: React.FC<ProjectPipelineProps> = ({ stageCounts, currentDemoStage }) => {

    // Map workflow stages to pipeline columns
    const stageToColumnMap: Record<string, string> = {
        'quotation': 'proposals',
        'booking': 'booking',
        'dispatch': 'dispatch',
        'installation': 'installation',
        'closure': 'closure',
        'maintenance': 'closure' // Keeps it in closure for now
    };

    const activeColumn = currentDemoStage ? stageToColumnMap[currentDemoStage] : '';

    return (
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm h-full flex flex-col">
            <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-gray-900">Project Pipeline</h3>
                <button className="p-2 hover:bg-gray-50 rounded-lg text-gray-400">
                    <MoreHorizontal size={20} />
                </button>
            </div>

            <div className="flex-1 overflow-x-auto">
                <div className="flex gap-4 min-w-[800px] h-full pb-4">
                    <PipelineColumn title="Leads" count={stageCounts.leads} color="bg-gray-100" />
                    <PipelineColumn
                        title="Proposals"
                        count={stageCounts.proposals}
                        color="bg-blue-50"
                        isActive={activeColumn === 'proposals'}
                    />
                    <PipelineColumn
                        title="Booking"
                        count={stageCounts.booking}
                        color="bg-purple-50"
                        isActive={activeColumn === 'booking'}
                    />
                    <PipelineColumn
                        title="Dispatch"
                        count={stageCounts.dispatch}
                        color="bg-orange-50"
                        isActive={activeColumn === 'dispatch'}
                    />
                    <PipelineColumn
                        title="Installation"
                        count={stageCounts.installation}
                        color="bg-yellow-50"
                        isActive={activeColumn === 'installation'}
                    />
                    <PipelineColumn
                        title="Closure"
                        count={stageCounts.closure}
                        color="bg-green-50"
                        isActive={activeColumn === 'closure'}
                    />
                </div>
            </div>
        </div>
    );
};

const PipelineColumn = ({ title, count, color, isActive }: { title: string, count: number, color: string, isActive?: boolean }) => (
    <div className={`flex-1 min-w-[140px] rounded-xl p-3 flex flex-col gap-3 transition-colors duration-500 ${isActive ? 'bg-solar-50 ring-2 ring-solar-200' : 'bg-gray-50'}`}>
        <div className="flex justify-between items-center">
            <span className={`text-xs font-bold uppercase tracking-wider ${isActive ? 'text-solar-700' : 'text-gray-500'}`}>{title}</span>
            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${isActive ? 'bg-solar-200 text-solar-800' : 'bg-gray-200 text-gray-600'}`}>{count}</span>
        </div>

        {/* Placeholder cards */}
        <div className="space-y-2">
            <div className="h-16 bg-white rounded-lg shadow-sm border border-gray-100 p-2 opacity-50" />
            <div className="h-16 bg-white rounded-lg shadow-sm border border-gray-100 p-2 opacity-50" />
        </div>

        {/* Active Demo Card */}
        <AnimatePresence>
            {isActive && (
                <motion.div
                    layoutId="active-project-card"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="bg-white rounded-lg p-3 shadow-md border-l-4 border-solar-500 cursor-pointer hover:shadow-lg transition-shadow"
                >
                    <p className="text-xs font-bold text-gray-900 truncate">{MOCK_PROJECT.customer.name}</p>
                    <p className="text-[10px] text-gray-500 mt-1">{MOCK_PROJECT.id}</p>
                    <div className="flex items-center gap-1 mt-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                        <span className="text-[10px] text-gray-400">Active</span>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    </div>
);
