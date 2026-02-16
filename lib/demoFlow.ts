import { FocusMode, WorkflowStage } from "@/contexts/DemoContext";

export interface DemoStep {
    id: string;
    stage: WorkflowStage; // The workflow stage this belongs to
    title: string;
    description: string;
    focus: FocusMode;
    duration: number; // Duration to show narrative before action
    actionDelay?: number; // Additional delay before action
    triggerAction?: string; // ID of action to trigger (handled by demo engine)
}

export const DEMO_FLOW: DemoStep[] = [
    // --- Quotation Stage ---
    {
        id: 'intro',
        stage: 'quotation',
        title: 'Welcome to SolarSaaS',
        description: 'Experience the fully synchronized workflow between Customer, Field Team, and Operations.',
        focus: 'none',
        duration: 5000
    },
    {
        id: 'customer_view',
        stage: 'quotation',
        title: 'Customer Proposal',
        description: 'The customer receives an intelligent AI-generated solar proposal directly on their app.',
        focus: 'customer',
        duration: 6000
    },
    {
        id: 'approve_quote',
        stage: 'quotation',
        title: 'Instant Approval',
        description: 'With one click, the customer approves the quote, triggering immediate downstream actions.',
        focus: 'customer',
        duration: 4000,
        triggerAction: 'approve-quote-btn' // Logic will map this to clicking the button
    },
    {
        id: 'dashboard_sync_1',
        stage: 'booking', // Transitioned
        title: 'Real-Time Sync',
        description: 'Watch the Operations Center instantly update with the new booking request.',
        focus: 'dashboard',
        duration: 5000
    },

    // --- Booking Stage ---
    {
        id: 'booking_payment',
        stage: 'booking',
        title: 'Secure Booking',
        description: 'The customer pays a token amount to secure the installation slot.',
        focus: 'customer',
        duration: 5000
    },
    {
        id: 'payment_action',
        stage: 'booking',
        title: 'Processing Payment',
        description: 'Payment is processed securely, and a Project ID is generated instantly.',
        focus: 'customer',
        duration: 3000,
        triggerAction: 'pay-booking-btn'
    },

    // --- Dispatch Stage ---
    {
        id: 'dispatch_intro',
        stage: 'dispatch',
        title: 'Warehouse Dispatch',
        description: 'The warehouse team receives the order and prepares the materials.',
        focus: 'vendor', // Using Vendor app to simulate warehouse scan for now
        duration: 5000
    },
    {
        id: 'scan_action',
        stage: 'dispatch',
        title: 'Inventory Scanning',
        description: 'Each item is scanned to ensure 100% accuracy before loading.',
        focus: 'vendor',
        duration: 4000,
        triggerAction: 'scan-inventory-btn'
    },
    {
        id: 'inventory_update',
        stage: 'dispatch',
        title: 'Inventory Tracking',
        description: 'The Dashboard tracks inventory levels in real-time as items are scanned out.',
        focus: 'dashboard',
        duration: 5000
    },

    // --- Installation Stage ---
    {
        id: 'install_start',
        stage: 'installation',
        title: 'Field Installation',
        description: 'The installation team arrives on-site. Their app guides them through every step.',
        focus: 'vendor',
        duration: 6000
    },
    {
        id: 'install_checklist',
        stage: 'installation',
        title: 'Digital Checklist',
        description: 'Technicians must verify each step. Watch the tasks complete automatically...',
        focus: 'vendor',
        // The VendorApp auto-play logic handles the task ticking. 
        // We just focus and watch here. It takes about 2s * 5 tasks = 10s
        duration: 12000
    },
    {
        id: 'install_evidence',
        stage: 'installation',
        title: 'Proof of Work',
        description: 'Photos and GPS coordinates are uploaded for remote verification. Syncs with Customer App.',
        focus: 'dual-mobile' as FocusMode,
        duration: 6000
    },
    {
        id: 'dashboard_monitoring',
        stage: 'installation',
        title: 'Live Monitoring',
        description: 'Operations command center sees progress updates as they happen on the field.',
        focus: 'dashboard',
        duration: 6000
    },

    // --- Closure / Maintenance ---
    {
        id: 'closure',
        stage: 'closure',
        title: 'Project Handover',
        description: 'System is live. The project moves to the maintenance & monitoring phase.',
        focus: 'dashboard',
        duration: 5000
    },
    {
        id: 'finish',
        stage: 'maintenance',
        title: 'Demo Complete',
        description: 'You have seen the complete lifecycle of a SolarSaaS project. Ready for the real thing?',
        focus: 'none',
        duration: 10000
    }
];
