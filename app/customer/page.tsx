'use client';

import React, { useState, useEffect } from 'react';
import { MobileFrame } from '@/components/ui/MobileFrame';
import { NotificationBadge } from '@/components/ui/NotificationBadge';
import { ProjectTimeline } from '@/components/customer/ProjectTimeline';
import { StageCard } from '@/components/customer/StageCard';
import { PaymentGateway } from '@/components/customer/PaymentGateway';
import { InstallationGallery } from '@/components/customer/InstallationGallery';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { MenuDrawer } from '@/components/customer/MenuDrawer';
import { NegotiationModal } from '@/components/customer/NegotiationModal';
import { useDemo } from '@/contexts/DemoContext';
import { ActionHighlight } from '@/components/demo/ActionHighlight'; // Import the highlighter
import { ArrowLeft, Menu, FileText, CheckCircle2, Activity } from 'lucide-react';
import Link from 'next/link';
import { WorkflowStage } from '@/contexts/DemoContext';
import { emitDemoEvent } from '@/lib/demoEvents';

export default function CustomerApp() {
    const { currentStage, project, setStage, addNotification, isAutoPlaying, goToNextStage } = useDemo();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isNegotiationOpen, setIsNegotiationOpen] = useState(false);

    // Auto-scroll to active stage
    useEffect(() => {
        const activeElement = document.getElementById(`stage-${currentStage}`);
        if (activeElement) {
            activeElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, [currentStage]);

    const handleApproveQuote = () => {
        emitDemoEvent('QUOTE_APPROVED');
        addNotification('Quote Approved', 'You have successfully approved the quotation for 5kW Solar System.');
        if (isAutoPlaying) {
            goToNextStage(); // Let auto-play handle distinct step delays if needed, or direct jump
        } else {
            setStage('booking');
        }
    };

    const handleBookingPayment = () => {
        emitDemoEvent('BOOKING_PAID');
        addNotification('Booking Confirmed', 'Payment received. Project registration initiated.');
        if (isAutoPlaying) goToNextStage(); else setStage('dispatch');
    };

    const handleDispatchPayment = () => {
        emitDemoEvent('DISPATCH_PAID');
        addNotification('Dispatch Initiated', 'Material is being prepared for dispatch.');
        if (isAutoPlaying) goToNextStage(); else setStage('installation');
    };

    const handleInstallationApproval = () => {
        emitDemoEvent('INSTALLATION_STARTED'); // Or verified
        addNotification('Installation Details', 'Installation approved. DISCOM process started.');
        if (isAutoPlaying) goToNextStage(); else setStage('closure');
    };

    const handleClosure = () => {
        emitDemoEvent('TASKS_COMPLETED'); // Project closed
        addNotification('Project Completed', 'Net metering active. Welcome to solar savings!');
        if (isAutoPlaying) goToNextStage(); else setStage('maintenance');
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <MobileFrame className="bg-white">
                {/* Header */}
                <div className="bg-white sticky top-0 z-10 border-b border-gray-100">
                    <div className="flex justify-between items-center p-4">
                        <Link href="/" className="p-2 hover:bg-gray-100 rounded-full">
                            <ArrowLeft size={20} className="text-gray-600" />
                        </Link>
                        <h1 className="text-lg font-bold text-gray-900">My Project</h1>
                        <div className="flex gap-2">
                            <NotificationBadge />
                            <button
                                onClick={() => setIsMenuOpen(true)}
                                className="p-2 hover:bg-gray-100 rounded-full"
                            >
                                <Menu size={20} className="text-gray-600" />
                            </button>
                        </div>
                    </div>

                    <div className="px-5 pb-4">
                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Project Code</p>
                                <p className="text-xl font-bold text-solar-600">{project.id}</p>
                            </div>
                            <StatusBadge status={currentStage === 'maintenance' ? 'success' : 'warning'} label={currentStage.toUpperCase()} />
                        </div>
                        <p className="text-sm text-gray-600">{project.system.size} Rooftop System</p>
                    </div>
                </div>

                <div className="p-5 pb-20 space-y-6">
                    {/* Main Stage Action Area */}
                    <div className="min-h-[200px]">
                        <div id="stage-quotation">
                            <StageCard
                                isActive={currentStage === 'quotation'}
                                title="Quotation Ready"
                                description="Please review and approve the proposal."
                            >
                                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-4 flex items-center gap-3 cursor-pointer hover:bg-gray-100 transition-colors">
                                    <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center text-red-500">
                                        <FileText size={20} />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-semibold text-gray-900">Proposal_v1.pdf</p>
                                        <p className="text-xs text-gray-500">2.4 MB • Generated Today</p>
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <button
                                        onClick={() => setIsNegotiationOpen(true)}
                                        className="flex-1 py-3 text-sm font-semibold text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                                    >
                                        Negotiate
                                    </button>
                                    <ActionHighlight isActive={currentStage === 'quotation'} label="Approve Quote">
                                        <button
                                            onClick={handleApproveQuote}
                                            className="w-full py-3 text-sm font-semibold text-white bg-solar-600 rounded-lg hover:bg-solar-700 shadow-lg shadow-solar-200 transition-all active:scale-95"
                                        >
                                            Approve
                                        </button>
                                    </ActionHighlight>
                                </div>
                            </StageCard>
                        </div>

                        <div id="stage-booking">
                            <StageCard
                                isActive={currentStage === 'booking'}
                                title="Booking Amount"
                                description="Pay the booking amount to initiate registration."
                            >
                                <ActionHighlight isActive={currentStage === 'booking'} label="Pay Application Fee">
                                    <PaymentGateway
                                        amount={project.payments.booking.amount}
                                        stageName="Booking"
                                        onSuccess={handleBookingPayment}
                                    />
                                </ActionHighlight>
                            </StageCard>
                        </div>

                        <div id="stage-dispatch">
                            <StageCard
                                isActive={currentStage === 'dispatch'}
                                title="Material Dispatch"
                                description="Material is ready. Pay the dispatch installment."
                            >
                                <div className="mb-4 space-y-2">
                                    {['Solar Panels (12x)', 'Mounting Structure', 'Inverter (1x)'].map((item) => (
                                        <div key={item} className="flex justify-between text-xs text-gray-600 p-2 bg-gray-50 rounded hover:bg-gray-100 cursor-pointer transition-colors">
                                            <span>{item}</span>
                                            <span className="text-green-600 font-medium">Ready</span>
                                        </div>
                                    ))}
                                </div>
                                <ActionHighlight isActive={currentStage === 'dispatch'} label="Pay Dispatch Fee">
                                    <PaymentGateway
                                        amount={project.payments.dispatch.amount}
                                        stageName="Dispatch"
                                        onSuccess={handleDispatchPayment}
                                    />
                                </ActionHighlight>
                            </StageCard>
                        </div>

                        <div id="stage-installation">
                            <StageCard
                                isActive={currentStage === 'installation'}
                                title="Installation Verification"
                                description="Verify the installation photos and GPS coordinates."
                            >
                                <ActionHighlight isActive={currentStage === 'installation'} label="Verify Installation">
                                    <InstallationGallery onApprove={handleInstallationApproval} />
                                </ActionHighlight>
                            </StageCard>
                        </div>

                        <div id="stage-closure">
                            <StageCard
                                isActive={currentStage === 'closure'}
                                title="Project Closure"
                                description="Final settlement and net metering."
                            >
                                <div className="bg-green-50 p-4 rounded-lg border border-green-200 mb-4 text-center">
                                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 mx-auto mb-2">
                                        <CheckCircle2 size={24} />
                                    </div>
                                    <h4 className="font-semibold text-green-900">DISCOM Approved</h4>
                                    <p className="text-xs text-green-700 mt-1">Net meter installed successfully.</p>
                                </div>
                                <ActionHighlight isActive={currentStage === 'closure'} label="Complete Project">
                                    <button
                                        onClick={handleClosure}
                                        className="w-full py-3 text-sm font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700 shadow-lg shadow-green-200 transition-all active:scale-95"
                                    >
                                        Complete Project
                                    </button>
                                </ActionHighlight>
                            </StageCard>
                        </div>

                        {currentStage === 'maintenance' && (
                            <div id="stage-maintenance" className="bg-white rounded-xl shadow-lg border-2 border-solar-500/20 p-5 animate-in fade-in zoom-in duration-700">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-lg font-bold text-gray-900">System Active</h3>
                                    <StatusBadge status="success" label="Generating" />
                                </div>
                                <div className="grid grid-cols-2 gap-3 mb-4">
                                    <div className="bg-solar-50 p-3 rounded-lg border border-solar-100">
                                        <p className="text-[10px] text-solar-600 font-bold uppercase">Now</p>
                                        <p className="text-xl font-black text-gray-900">4.8 kW</p>
                                    </div>
                                    <div className="bg-green-50 p-3 rounded-lg border border-green-100">
                                        <p className="text-[10px] text-green-600 font-bold uppercase">Savings</p>
                                        <p className="text-xl font-black text-gray-900">₹450</p>
                                    </div>
                                </div>
                                <div className="p-3 bg-gray-900 rounded-lg text-white text-center text-sm font-bold flex items-center justify-center gap-2 cursor-pointer hover:bg-black transition-colors">
                                    <Activity size={16} className="text-solar-400" />
                                    Detailed Analytics
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Timeline Section */}
                    <div>
                        <h3 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wider">Project Timeline</h3>
                        <ProjectTimeline currentStage={currentStage} />
                    </div>
                </div>

                {/* Portals / Modals */}
                <MenuDrawer isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
                <NegotiationModal
                    isOpen={isNegotiationOpen}
                    onClose={() => setIsNegotiationOpen(false)}
                    originalPrice={project.payments.booking.amount + project.payments.dispatch.amount} // Simulated total
                />
            </MobileFrame>
        </div>
    );
}
