import React from 'react';
import { clsx } from 'clsx';
import { CheckCircle2 } from 'lucide-react';
import { STEPS, WorkflowStage } from '@/lib/mockData';

interface ProjectTimelineProps {
    currentStage: WorkflowStage;
}

export const ProjectTimeline: React.FC<ProjectTimelineProps> = ({ currentStage }) => {
    const currentStepIndex = STEPS.findIndex(s => s.id === currentStage);

    return (
        <div className="relative pl-4 space-y-6">
            {/* Connector Line */}
            <div className="absolute left-[22px] top-2 bottom-4 w-0.5 bg-gray-200" />

            {/* Progress Line */}
            <div
                className="absolute left-[22px] top-2 w-0.5 bg-solar-500 transition-all duration-700 ease-in-out"
                style={{ height: `${(currentStepIndex / (STEPS.length - 1)) * 100}%` }}
            />

            {STEPS.map((step, index) => {
                const isCompleted = index < currentStepIndex;
                const isCurrent = index === currentStepIndex;

                return (
                    <div key={step.id} className="relative flex items-center gap-4 z-10">
                        <div className={clsx(
                            "w-4 h-4 rounded-full border-2 transition-colors duration-300 bg-gray-50",
                            isCompleted ? "bg-solar-500 border-solar-500" :
                                isCurrent ? "border-solar-500 animate-pulse bg-white" : "border-gray-300"
                        )}>
                            {isCompleted && <CheckCircle2 size={16} className="text-white -ml-[2px] -mt-[2px]" />}
                        </div>

                        <div className={clsx("flex-1", isCurrent || isCompleted ? "opacity-100" : "opacity-50")}>
                            <p className={clsx("text-sm font-medium", isCurrent ? "text-solar-700" : "text-gray-900")}>
                                {step.label}
                            </p>
                            {isCurrent && <span className="text-xs text-solar-600 font-medium">In Progress</span>}
                            {isCompleted && <span className="text-xs text-green-600 font-medium">Completed</span>}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
