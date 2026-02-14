'use client';

import React from 'react';
import { Drawer } from '@/components/ui/Drawer';
import { User, FileText, CreditCard, HelpCircle, LogOut, ChevronRight, X } from 'lucide-react';
import Link from 'next/link';

interface MenuDrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

export const MenuDrawer: React.FC<MenuDrawerProps> = ({ isOpen, onClose }) => {
    const menuItems = [
        { icon: <User size={20} />, label: 'My Profile', href: '#' },
        { icon: <FileText size={20} />, label: 'Project History', href: '#' },
        { icon: <CreditCard size={20} />, label: 'Payments', href: '#' },
        { icon: <HelpCircle size={20} />, label: 'Help & Support', href: '#' },
    ];

    return (
        <Drawer isOpen={isOpen} onClose={onClose} side="right">
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
                <h3 className="font-bold text-lg text-gray-900">Menu</h3>
                <button
                    onClick={onClose}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
                >
                    <X size={20} />
                </button>
            </div>
            <div className="flex flex-col h-full p-4">
                <div className="mb-6 p-4 bg-solar-50 rounded-xl border border-solar-100 flex items-center gap-4">
                    <div className="w-12 h-12 bg-solar-100 rounded-full flex items-center justify-center text-solar-600 font-bold text-xl">
                        VG
                    </div>
                    <div>
                        <h4 className="font-bold text-gray-900">Vikram Gupta</h4>
                        <p className="text-xs text-gray-500">+91 98765 43210</p>
                    </div>
                </div>

                <div className="flex-1 space-y-1">
                    {menuItems.map((item, index) => (
                        <Link
                            key={index}
                            href={item.href}
                            className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                        >
                            <div className="flex items-center gap-3 text-gray-700 font-medium">
                                {item.icon}
                                <span>{item.label}</span>
                            </div>
                            <ChevronRight size={16} className="text-gray-400 group-hover:text-gray-600" />
                        </Link>
                    ))}
                </div>

                <div className="border-t border-gray-100 pt-4 mt-4">
                    <button className="flex items-center gap-3 p-3 w-full text-red-600 font-medium hover:bg-red-50 rounded-lg transition-colors">
                        <LogOut size={20} />
                        <span>Logout</span>
                    </button>
                    <p className="text-center text-xs text-gray-400 mt-4">Version 1.0.0 (Beta)</p>
                </div>
            </div>
        </Drawer>
    );
};
