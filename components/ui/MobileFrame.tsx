import React from 'react';
import { clsx } from 'clsx';
import { Battery, Wifi, Signal } from 'lucide-react';

interface MobileFrameProps {
    children: React.ReactNode;
    className?: string;
    title?: string; // Kept for interface compatibility but optional
}

export const MobileFrame: React.FC<MobileFrameProps> = ({ children, className }) => {
    return (
        <div className={clsx("relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[800px] w-[375px] shadow-xl overflow-hidden", className)}>
            <div className="h-[32px] w-[3px] bg-gray-800 absolute -start-[17px] top-[72px] rounded-s-lg"></div>
            <div className="h-[46px] w-[3px] bg-gray-800 absolute -start-[17px] top-[124px] rounded-s-lg"></div>
            <div className="h-[46px] w-[3px] bg-gray-800 absolute -start-[17px] top-[178px] rounded-s-lg"></div>
            <div className="h-[64px] w-[3px] bg-gray-800 absolute -end-[17px] top-[142px] rounded-e-lg"></div>

            <div className="rounded-[2rem] overflow-hidden w-full h-full bg-slate-50 relative flex flex-col">
                {/* Status Bar */}
                <div className="bg-white/90 backdrop-blur-sm h-12 flex justify-between items-center px-6 text-xs font-semibold z-20 shrink-0 border-b border-gray-100">
                    <span>9:41</span>
                    <div className="flex gap-2">
                        <Signal size={14} />
                        <Wifi size={14} />
                        <Battery size={14} />
                    </div>
                </div>

                {/* Content Area */}
                <div className="flex-1 overflow-y-auto overflow-x-hidden relative scrollbar-hide">
                    {children}
                </div>

                {/* Home Indicator */}
                <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-32 h-1 bg-gray-900 rounded-full z-20 pointer-events-none"></div>
            </div>
        </div>
    );
};
