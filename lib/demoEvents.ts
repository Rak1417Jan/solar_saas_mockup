export type DemoEventType =
    | 'QUOTE_APPROVED'
    | 'BOOKING_PAID'
    | 'DISPATCH_PAID'
    | 'INSTALLATION_STARTED'
    | 'TASK_COMPLETED'
    | 'TASKS_COMPLETED';

export const emitDemoEvent = (event: DemoEventType) => {
    // Dispatch a custom event that other components can listen to
    if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('demo-event', { detail: { type: event, timestamp: Date.now() } }));
    }
};

export const useDemoEvents = (callback: (event: DemoEventType) => void) => {
    // Hook to listen for events
    // logic to add event listener
};
