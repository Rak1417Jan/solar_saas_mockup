'use client';

import React from 'react';
import { Dropdown, DropdownItem } from '@/components/ui/Dropdown';
import { User, Settings, CreditCard, Users, LogOut } from 'lucide-react';

export const UserProfileMenu: React.FC = () => {
    return (
        <Dropdown
            trigger={
                <div className="w-10 h-10 bg-solar-100 rounded-full overflow-hidden border-2 border-white shadow-sm flex items-center justify-center text-solar-700 font-bold cursor-pointer hover:border-solar-200 transition-colors">
                    VG
                </div>
            }
            className="w-56"
        >
            <div className="p-4 border-b border-gray-100 bg-gray-50/50">
                <p className="text-sm font-bold text-gray-900">Vikram Gupta</p>
                <p className="text-xs text-gray-500">Admin • SolarSaaS</p>
            </div>

            <div className="p-2">
                <DropdownItem icon={<User size={16} />}>My Profile</DropdownItem>
                <DropdownItem icon={<Users size={16} />}>Team Management</DropdownItem>
                <DropdownItem icon={<Settings size={16} />}>Settings</DropdownItem>
                <DropdownItem icon={<CreditCard size={16} />}>Billing</DropdownItem>
            </div>

            <div className="p-2 border-t border-gray-100">
                <DropdownItem icon={<LogOut size={16} />} danger>Logout</DropdownItem>
            </div>
        </Dropdown>
    );
};
