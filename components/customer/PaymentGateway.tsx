import React, { useState } from 'react';
import { CreditCard, QrCode, Smartphone } from 'lucide-react';
import { clsx } from 'clsx';

interface PaymentGatewayProps {
    amount: number;
    stageName: string;
    onSuccess: () => void;
}

export const PaymentGateway: React.FC<PaymentGatewayProps> = ({ amount, stageName, onSuccess }) => {
    const [method, setMethod] = useState<'upi' | 'card' | 'qr'>('upi');
    const [processing, setProcessing] = useState(false);

    const handlePay = () => {
        setProcessing(true);
        setTimeout(() => {
            setProcessing(false);
            console.log(`Payment processed for ${stageName}`);
            onSuccess();
        }, 2000);
    };

    return (
        <div className="space-y-4">
            <div className="bg-gray-50 p-3 rounded-lg flex justify-between items-center">
                <span className="text-sm text-gray-600">Total Payable</span>
                <span className="text-lg font-bold text-gray-900">₹{amount.toLocaleString()}</span>
            </div>

            <div className="grid grid-cols-3 gap-2">
                <button
                    onClick={() => setMethod('upi')}
                    className={clsx("p-3 rounded-lg border flex flex-col items-center gap-1 text-xs font-medium transition-colors",
                        method === 'upi' ? "border-solar-500 bg-solar-50 text-solar-700" : "border-gray-200 bg-white hover:bg-gray-50"
                    )}
                >
                    <Smartphone size={18} />
                    UPI
                </button>
                <button
                    onClick={() => setMethod('card')}
                    className={clsx("p-3 rounded-lg border flex flex-col items-center gap-1 text-xs font-medium transition-colors",
                        method === 'card' ? "border-solar-500 bg-solar-50 text-solar-700" : "border-gray-200 bg-white hover:bg-gray-50"
                    )}
                >
                    <CreditCard size={18} />
                    Card
                </button>
                <button
                    onClick={() => setMethod('qr')}
                    className={clsx("p-3 rounded-lg border flex flex-col items-center gap-1 text-xs font-medium transition-colors",
                        method === 'qr' ? "border-solar-500 bg-solar-50 text-solar-700" : "border-gray-200 bg-white hover:bg-gray-50"
                    )}
                >
                    <QrCode size={18} />
                    QR
                </button>
            </div>

            <button
                onClick={handlePay}
                disabled={processing}
                className="w-full bg-solar-600 hover:bg-solar-700 text-white font-semibold py-3 rounded-lg transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
            >
                {processing ? (
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                    `Pay ₹${amount.toLocaleString()}`
                )}
            </button>
        </div>
    );
};
