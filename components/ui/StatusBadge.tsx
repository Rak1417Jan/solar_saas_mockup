import React from 'react';
import { clsx } from 'clsx';
import { Check, Clock, AlertCircle, RefreshCw } from 'lucide-react';

type StatusType = 'success' | 'warning' | 'error' | 'info' | 'pending';

interface StatusBadgeProps {
    status: StatusType;
    label?: string;
    className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, label, className }) => {
    const styles = {
        success: 'bg-green-100 text-green-700 border-green-200',
        warning: 'bg-yellow-100 text-yellow-700 border-yellow-200',
        error: 'bg-red-100 text-red-700 border-red-200',
        info: 'bg-blue-100 text-blue-700 border-blue-200',
        pending: 'bg-gray-100 text-gray-700 border-gray-200',
    };

    const icons = {
        success: <Check size={12} />,
        warning: <AlertCircle size={12} />,
        error: <AlertCircle size={12} />,
        info: <RefreshCw size={12} />,
        pending: <Clock size={12} />,
    };

    return (
        <span className={clsx(
            "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border",
            styles[status],
            className
        )}>
            {icons[status]}
            {label || status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
    );
};
