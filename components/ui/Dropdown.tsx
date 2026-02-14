'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';

interface DropdownProps {
    trigger: React.ReactNode;
    children: React.ReactNode;
    align?: 'left' | 'right';
    className?: string;
}

export const Dropdown: React.FC<DropdownProps> = ({ trigger, children, align = 'right', className }) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={containerRef}>
            <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
                {trigger}
            </div>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className={clsx(
                            "absolute top-full mt-2 bg-white rounded-xl shadow-xl border border-gray-100 z-50 overflow-hidden min-w-[200px]",
                            align === 'right' ? 'right-0' : 'left-0',
                            className
                        )}
                    >
                        {children}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export const DropdownItem: React.FC<{
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
    icon?: React.ReactNode;
    danger?: boolean;
}> = ({ children, onClick, className, icon, danger }) => (
    <button
        onClick={onClick}
        className={clsx(
            "w-full px-4 py-2.5 text-sm flex items-center gap-3 transition-colors hover:bg-gray-50 text-left",
            danger ? "text-red-600 hover:bg-red-50" : "text-gray-700",
            className
        )}
    >
        {icon && <span className={clsx("opacity-70", danger ? "text-red-500" : "text-gray-500")}>{icon}</span>}
        {children}
    </button>
);
