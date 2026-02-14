'use client';

import React, { useState } from 'react';
import { Modal } from '@/components/ui/Modal';

// Helper function mock since the previous write might have failed or not been imported yet in this context
const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
    }).format(amount);
};

interface NegotiationModalProps {
    isOpen: boolean;
    onClose: () => void;
    originalPrice: number;
}

export const NegotiationModal: React.FC<NegotiationModalProps> = ({ isOpen, onClose, originalPrice }) => {
    const [offerPrice, setOfferPrice] = useState(originalPrice);
    const [reason, setReason] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        setSubmitting(false);
        setSubmitted(true);
        setTimeout(() => {
            setSubmitted(false);
            setReason('');
            onClose();
        }, 2000);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Negotiate Quote">
            {submitted ? (
                <div className="text-center py-8">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600 text-3xl">
                        ✓
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Request Sent!</h3>
                    <p className="text-gray-500 text-sm">Our sales team will review your offer and get back to you shortly.</p>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Your Counter Offer
                        </label>
                        <div className="relative">
                            <span className="absolute left-3 top-3 text-gray-500 font-bold">₹</span>
                            <input
                                type="number"
                                value={offerPrice}
                                onChange={(e) => setOfferPrice(Number(e.target.value))}
                                className="w-full pl-8 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-solar-500 focus:border-solar-500 outline-none font-bold text-lg text-gray-900"
                            />
                        </div>
                        <p className="text-xs text-gray-500 mt-2 flex justify-between">
                            <span>Original Quote:</span>
                            <span className="line-through font-medium">{formatCurrency(originalPrice)}</span>
                        </p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Reason / Comments
                        </label>
                        <textarea
                            rows={4}
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            placeholder="e.g., Found a better quote elsewhere..."
                            className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-solar-500 focus:border-solar-500 outline-none text-sm resize-none text-gray-700"
                            required
                        />
                    </div>

                    <div className="flex gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 py-3 text-sm font-semibold text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={submitting}
                            className="flex-1 py-3 text-sm font-semibold text-white bg-black rounded-xl hover:bg-gray-800 transition-colors disabled:opacity-70 flex justify-center items-center"
                        >
                            {submitting ? (
                                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : 'Submit Offer'}
                        </button>
                    </div>
                </form>
            )}
        </Modal>
    );
};
