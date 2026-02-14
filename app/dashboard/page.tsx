'use client';

import React from 'react';
import { SearchBar } from '@/components/dashboard/SearchBar';
import { KPICard } from '@/components/dashboard/KPICard';
import { ProjectPipeline } from '@/components/dashboard/ProjectPipeline';
import { PerformanceCharts } from '@/components/dashboard/PerformanceCharts';
import { NotificationDropdown } from '@/components/dashboard/NotificationDropdown';
import { UserProfileMenu } from '@/components/dashboard/UserProfileMenu';
import { useDemo } from '@/contexts/DemoContext';
import { LayoutDashboard, Users, Zap, FileText, Settings, LogOut, Sun, Battery, ArrowUpRight } from 'lucide-react';
import OperationsCenter from '@/components/dashboard/OperationsCenter';

export default function Dashboard() {
    return (
        <OperationsCenter />
    );
}

const NavItem = ({ icon, label, active = false }: { icon: React.ReactNode, label: string, active?: boolean }) => (
    <button className={`flex items-center gap-3 w-full p-3 rounded-lg text-sm font-medium transition-colors ${active ? 'bg-solar-50 text-solar-600' : 'text-gray-600 hover:bg-gray-50'}`}>
        {icon}
        <span>{label}</span>
    </button>
);
