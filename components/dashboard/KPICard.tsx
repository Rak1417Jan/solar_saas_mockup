import React from 'react';
import { clsx } from 'clsx';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface KPICardProps {
    title: string;
    value: string | number;
    change?: string;
    trend?: 'up' | 'down' | 'neutral';
    icon: React.ReactNode;
    iconBgColor: string;
}

export const KPICard: React.FC<KPICardProps> = ({ title, value, change, trend = 'neutral', icon, iconBgColor }) => {
    return (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex items-start justify-between min-w-[240px]">
            <div>
                <p className="text-gray-500 text-sm font-medium mb-1">{title}</p>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">{value}</h3>

                {change && (
                    <div className={clsx("flex items-center text-xs font-semibold",
                        trend === 'up' ? "text-green-600" : trend === 'down' ? "text-red-500" : "text-gray-500"
                    )}>
                        {trend === 'up' && <TrendingUp size={14} className="mr-1" />}
                        {trend === 'down' && <TrendingDown size={14} className="mr-1" />}
                        <span>{change}</span>
                        <span className="text-gray-400 font-normal ml-1">vs last month</span>
                    </div>
                )}
            </div>

            <div className={clsx("p-3 rounded-xl", iconBgColor)}>
                {icon}
            </div>
        </div>
    );
};
