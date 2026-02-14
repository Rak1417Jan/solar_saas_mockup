'use client';

import React from 'react';
import { Bell } from 'lucide-react';
import { useDemo } from '@/contexts/DemoContext';
import { Dropdown } from '@/components/ui/Dropdown';

export const NotificationBadge: React.FC = () => {
    const { notifications } = useDemo();
    // Simple count of notifications since context doesn't track read state yet
    const unreadCount = notifications.length;

    return (
        <div className="relative">
            <Dropdown
                trigger={
                    <button
                        className="p-2 hover:bg-gray-100 rounded-full relative transition-colors"
                    >
                        <Bell size={20} className="text-gray-600" />
                        {unreadCount > 0 && (
                            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border border-white animate-pulse" />
                        )}
                    </button>
                }
                className="w-80 right-0"
            >
                <div className="p-3 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                    <h4 className="text-sm font-bold text-gray-900">Notifications</h4>
                    {unreadCount > 0 && (
                        <span className="text-xs bg-red-100 text-red-600 px-1.5 py-0.5 rounded-full font-medium">
                            {unreadCount} new
                        </span>
                    )}
                </div>

                <div className="max-h-[300px] overflow-y-auto">
                    {notifications.length > 0 ? (
                        notifications.map((notif, idx) => (
                            <div key={idx} className="p-3 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0 cursor-pointer">
                                <p className="text-sm font-semibold text-gray-900">{notif.title}</p>
                                <p className="text-xs text-gray-500 mt-0.5">{notif.message}</p>
                            </div>
                        ))
                    ) : (
                        <div className="p-6 text-center text-gray-400 text-xs">
                            No new notifications
                        </div>
                    )}
                </div>
            </Dropdown>
        </div>
    );
};
