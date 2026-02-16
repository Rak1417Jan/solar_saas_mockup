import { useState, useEffect } from 'react';
import { useDemo } from '@/contexts/DemoContext';
import { DEMO_FLOW, DemoStep } from '@/lib/demoFlow';

export const useDemoFlow = () => {
    const {
        isAutoPlaying,
        setFocusMode,
        setStage,
        currentStage,
        setAutoPlaying
    } = useDemo();

    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [narrative, setNarrative] = useState<DemoStep | null>(null);

    useEffect(() => {
        if (!isAutoPlaying) {
            setNarrative(null);
            setFocusMode('none');
            return;
        }

        const step = DEMO_FLOW[currentStepIndex];

        if (!step) {
            // End of demo flow loops or stops
            setAutoPlaying(false);
            return;
        }

        // 1. Update State based on step
        setNarrative(step);
        setFocusMode(step.focus);

        // Only set stage if it's different (avoids re-triggering component mounts unnecessarily)
        // But we need to ensure the app is in the right stage for the story
        // We sync stage with the step's stage requirement
        /* 
           Note: We need to be careful not to conflict with the internal VendorApp auto-play logic 
           which relies on the stage being 'installation'. 
           Our script says 'stage: installation', so it should align.
        */
        // setStage(step.stage as any); // Potentially risky to force setStage if it resets local state
        // Improved: logic to check if we are significantly off-stage or just let manual flow work?
        // Ideally, the script drives the stage.

        // Let's assume the script drives the stage transitions at step boundaries
        // if (step.stage !== currentStage) {
        //     setStage(step.stage as any);
        // }

        // 2. Schedule Next Step
        const timer = setTimeout(() => {
            if (currentStepIndex < DEMO_FLOW.length - 1) {
                setCurrentStepIndex(prev => prev + 1);
            } else {
                setAutoPlaying(false); // Finished
            }
        }, step.duration);

        return () => clearTimeout(timer);

    }, [isAutoPlaying, currentStepIndex, setFocusMode, setAutoPlaying]);

    // Cleanup when stopping
    useEffect(() => {
        if (!isAutoPlaying) {
            setCurrentStepIndex(0);
        }
    }, [isAutoPlaying]);

    // Sync stage roughly with flow to ensure visuals match
    useEffect(() => {
        if (isAutoPlaying && narrative) {
            if (narrative.stage !== currentStage) {
                setStage(narrative.stage as any);
            }
        }
    }, [narrative, isAutoPlaying, setStage, currentStage]);

    return {
        narrative,
        currentStepIndex
    };
};
