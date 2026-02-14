export type WorkflowStage =
    | 'lead'
    | 'quotation'
    | 'booking'
    | 'dispatch'
    | 'installation'
    | 'closure'
    | 'maintenance';

export const STEPS = [
    { id: 'quotation', label: 'Quotation', icon: 'FileText' },
    { id: 'booking', label: 'Booking', icon: 'CreditCard' },
    { id: 'dispatch', label: 'Dispatch', icon: 'Truck' },
    { id: 'installation', label: 'Installation', icon: 'Wrench' },
    { id: 'closure', label: 'Closure', icon: 'CheckCircle' },
    { id: 'maintenance', label: 'Maintenance', icon: 'RefreshCw' },
];

export const MOCK_PROJECT = {
    id: 'SOLAR-789',
    customer: {
        name: 'Customer A',
        address: '123 Solar Street, Sun City',
        phone: '+91 98765 43210',
        email: 'customera@example.com'
    },
    system: {
        size: '5kW',
        price: 350000,
        panels: 12,
        inverter: 'Growatt 5kW Hybrid'
    },
    payments: {
        booking: { amount: 50000, status: 'pending' },
        dispatch: { amount: 200000, status: 'pending' },
        final: { amount: 100000, status: 'pending' }
    },
    documents: {
        quotation: '/docs/quote-v1.pdf',
        invoice: null,
        warranty: null
    },
    installation: {
        scheduled_date: '2024-03-15',
        team: 'Team Alpha',
        photos: []
    },
    history: [
        { date: '2024-02-12', action: 'Lead Created', user: 'System' },
        { date: '2024-02-13', action: 'Site Survey Completed', user: 'Vendor' },
        { date: '2024-02-14', action: 'Quotation Generated', user: 'Vendor' }
    ]
};

export const NOTIFICATIONS = {
    quotation: { title: 'Quote Ready', message: 'Your innovative solar quote is ready for review.' },
    booking: { title: 'Booking Confirmed', message: 'Payment received. Project SOLAR-789 is officially registered.' },
    dispatch: { title: 'Material Dispatched', message: 'Your solar panels are on the way!' },
    installation: { title: 'Installation Scheduled', message: 'Team Alpha will arrive on March 15th.' },
    closure: { title: 'Project Complete', message: 'System is live! Completion certificate available.' }
};
