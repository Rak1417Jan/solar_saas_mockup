'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Square, CheckSquare } from 'lucide-react';
import { clsx } from 'clsx';

interface Task {
    id: string;
    label: string;
    completed: boolean;
}

interface TaskChecklistProps {
    tasks: Task[];
    onComplete: (taskId: string) => void;
}

export const TaskChecklist: React.FC<TaskChecklistProps> = ({ tasks, onComplete }) => {
    return (
        <div className="space-y-3">
            <AnimatePresence>
                {tasks.map((task) => (
                    <motion.div
                        key={task.id}
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => onComplete(task.id)}
                        data-demo-element={`vendor-task-${task.id}`}
                        className={clsx(
                            "flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all shadow-sm group select-none",
                            task.completed
                                ? "bg-green-50 border-green-200"
                                : "bg-white border-gray-200 hover:border-solar-300 hover:shadow-md"
                        )}
                    >
                        <div className="relative">
                            <motion.div
                                animate={{
                                    scale: task.completed ? [1, 1.2, 1] : 1,
                                    backgroundColor: task.completed ? '#22c55e' : '#f3f4f6',
                                    borderColor: task.completed ? '#22c55e' : '#d1d5db'
                                }}
                                transition={{ duration: 0.3 }}
                                className={clsx(
                                    "w-6 h-6 rounded-md border-2 flex items-center justify-center transition-colors overflow-hidden"
                                )}
                            >
                                {task.completed && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.5 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                    >
                                        <Check size={14} className="text-white stroke-[3px]" />
                                    </motion.div>
                                )}
                            </motion.div>
                        </div>

                        <div className="flex-1">
                            <span
                                className={clsx(
                                    "text-sm font-medium transition-all duration-300 block",
                                    task.completed ? "text-gray-500 line-through decoration-green-500/50" : "text-gray-900"
                                )}
                            >
                                {task.label}
                            </span>
                        </div>

                        {/* Ripple/Pulse effect on hover when not completed */}
                        {!task.completed && (
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                                <div className="w-2 h-2 rounded-full bg-solar-400/50 animate-pulse" />
                            </div>
                        )}
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
};
