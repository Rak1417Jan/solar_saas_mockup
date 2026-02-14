'use client';

import { UnifiedDemoView } from '@/components/demo/UnifiedDemoView';
import { DemoHeader } from '@/components/demo/DemoHeader';
import { GuidanceSystem } from '@/components/demo/GuidanceSystem';

export default function DemoPage() {
    return (
        <div className="flex flex-col h-screen overflow-hidden bg-gray-950 text-white">
            {/* Header with Controls */}
            <DemoHeader />

            {/* Main Content Area */}
            <div className="flex-1 relative overflow-hidden bg-gray-950 text-gray-900">
                <UnifiedDemoView />

                {/* Overlay System - rendered last to be on top */}
                <GuidanceSystem />
            </div>
        </div>
    );
}
