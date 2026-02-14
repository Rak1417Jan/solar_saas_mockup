'use client';

import React, { useState, useEffect } from 'react';
import { Modal } from '@/components/ui/Modal';
import { ScanLine, CheckCircle2, XCircle } from 'lucide-react';

interface ScannerModalProps {
    isOpen: boolean;
    onClose: () => void;
    onScan: (result: string) => void;
}

export const ScannerModal: React.FC<ScannerModalProps> = ({ isOpen, onClose, onScan }) => {
    // Use initial state to control scanning logic
    const [scanning, setScanning] = useState(true);
    const [result, setResult] = useState<'success' | 'error' | null>(null);

    useEffect(() => {
        // Only set up the timer on mount. NO synchronized setState calls here.
        // The component is unmounted when closed, so state resets naturally on next open.

        const timer = setTimeout(() => {
            setScanning(false);
            setResult('success');
            setTimeout(() => {
                onScan('MAT-8842-INV');
                onClose();
            }, 1500);
        }, 2000);

        return () => clearTimeout(timer);
    }, [onScan, onClose]);

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Scan Barcode">
            <div className="flex flex-col items-center justify-center p-6 space-y-6">
                <div className="relative w-64 h-64 bg-gray-900 rounded-2xl overflow-hidden flex items-center justify-center border-4 border-gray-800">
                    {scanning && (
                        <>
                            <div className="absolute inset-0 bg-[linear-gradient(transparent,rgba(0,255,0,0.2),transparent)] animate-scan-y" />
                            <ScanLine className="text-white/50 w-32 h-32 animate-pulse" strokeWidth={1} />
                            <p className="absolute bottom-4 text-white/70 text-sm font-medium">Align code within frame</p>
                        </>
                    )}

                    {result === 'success' && (
                        <div className="flex flex-col items-center animate-in fade-in zoom-in duration-300">
                            <CheckCircle2 className="text-green-500 w-20 h-20 mb-2" />
                            <p className="text-green-400 font-bold">Verified</p>
                        </div>
                    )}

                    {result === 'error' && (
                        <div className="flex flex-col items-center animate-in fade-in zoom-in duration-300">
                            <XCircle className="text-red-500 w-20 h-20 mb-2" />
                            <p className="text-red-400 font-bold">Invalid Code</p>
                        </div>
                    )}
                </div>

                <p className="text-center text-sm text-gray-500">
                    Scanning for dispatch slip barcodes...
                </p>

                <button
                    onClick={onClose}
                    className="text-gray-500 hover:text-gray-700 font-medium text-sm underline"
                >
                    Cancel Scan
                </button>
            </div>
        </Modal>
    );
};
