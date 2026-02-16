import React, { useState } from 'react';
import { Camera, MapPin, CheckCircle } from 'lucide-react';
import { clsx } from 'clsx';

interface InstallationGalleryProps {
    onApprove: () => void;
}

export const InstallationGallery: React.FC<InstallationGalleryProps> = ({ onApprove }) => {
    const [approved, setApproved] = useState(false);

    const handleApprove = () => {
        setApproved(true);
        setTimeout(onApprove, 1500);
    };

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden border border-gray-200 group">
                        <img
                            src={`/images/install_${i}.png`}
                            alt={`Installation ${i}`}
                            className="w-full h-full object-cover transition-transform group-hover:scale-110"
                            onError={(e) => {
                                (e.target as HTMLImageElement).src = 'https://placehold.co/400x400/e2e8f0/64748b?text=Evidence';
                            }}
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-1.5 backdrop-blur-[2px]">
                            <div className="flex items-center gap-1 text-[10px] text-white">
                                <MapPin size={10} className="text-solar-400" />
                                <span>23.0225° N, 72.5714° E</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                <h4 className="text-sm font-semibold text-blue-800 mb-1">Verification Required</h4>
                <p className="text-xs text-blue-600">Please review the installation photos and GPS coordinates before signing off.</p>
            </div>

            <button
                onClick={handleApprove}
                disabled={approved}
                className={clsx(
                    "w-full font-semibold py-3 rounded-lg transition-all active:scale-[0.98] flex justify-center items-center gap-2",
                    approved
                        ? "bg-green-500 text-white cursor-default"
                        : "bg-gray-900 hover:bg-black text-white"
                )}
            >
                {approved ? (
                    <>
                        <CheckCircle size={18} />
                        Approved & Signed
                    </>
                ) : (
                    "Approve Installation"
                )}
            </button>
        </div>
    );
};
