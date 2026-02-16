'use client';

import React, { useState, useEffect } from 'react';
import { useDemo } from '@/contexts/DemoContext';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Clock, CheckCircle, MapPin, Package, Truck,
    AlertCircle, User, Calendar, FileText, ChevronRight,
    Smartphone, Camera, ShieldCheck, Zap, Activity, TrendingUp
} from 'lucide-react';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid,
    Tooltip, ResponsiveContainer, BarChart, Bar
} from 'recharts';

const GENERATION_DATA = [
    { time: '06:00', yield: 0 },
    { time: '08:00', yield: 1.2 },
    { time: '10:00', yield: 3.8 },
    { time: '12:00', yield: 5.2 },
    { time: '14:00', yield: 4.9 },
    { time: '16:00', yield: 2.5 },
    { time: '18:00', yield: 0.2 },
];

// Mock Data for the Timeline
const TIMELINE_EVENTS = {
    'quotation': [
        { time: '10:00 AM', title: 'Site Survey Completed', desc: 'Drone analysis & roof measurements verified', type: 'system' },
        { time: '10:05 AM', title: 'Proposal Generated', desc: 'AI created 5kW system quote', type: 'system' },
        { time: '10:15 AM', title: 'Quote Viewed', desc: 'Customer opened the proposal', type: 'user' }
    ],
    'booking': [
        { time: '10:30 AM', title: 'Quote Approved', desc: 'Customer accepted the proposal', type: 'action' },
        { time: '10:32 AM', title: 'Booking Payment', desc: '₹50,000 via UPI (Success)', type: 'payment' },
        { time: '10:33 AM', title: 'Project Created', desc: 'ID: #SOL-24-892', type: 'system' }
    ],
    'dispatch': [
        { time: '11:00 AM', title: 'Inventory Allocated', desc: 'Panels (12) & Inverter reserved', type: 'system' },
        { time: '11:15 AM', title: 'Dispatch Fee Paid', desc: '₹2,00,000 received', type: 'payment' },
        { time: '11:30 AM', title: 'Vehicle Assigned', desc: 'Truck WB-02-AK-9281', type: 'action' }
    ],
    'installation': [
        { time: '09:00 AM', title: 'Field Team Arrived', desc: 'Rajesh & Team at site', type: 'action' },
        { time: '09:30 AM', title: 'Safety Check Passed', desc: 'Harness & Gear verification', type: 'system' },
        { time: '11:00 AM', title: 'Structure Mounted', desc: 'Photo uploaded & verified', type: 'action' },
        { time: '02:00 PM', title: 'Panels Installed', desc: '12/12 Panels fixed', type: 'action' }
    ],
    'closure': [
        { time: '04:00 PM', title: 'Installation Complete', desc: 'System ready for testing', type: 'system' },
        { time: '04:30 PM', title: 'Net Metering Apply', desc: 'Application filed with DISCOM', type: 'system' },
        { time: '05:00 PM', title: 'Project Handover', desc: 'Customer accepted handover', type: 'finish' }
    ],
    'maintenance': [
        { time: '05:00 PM', title: 'Monitoring Active', desc: 'Real-time generation tracking', type: 'system' }
    ]
};

// Mock Data for Field Team
const FIELD_TEAM_STATUS = {
    'quotation': { status: 'Available', location: 'Office', task: 'Waiting for assignment' },
    'booking': { status: 'Assigned', location: 'Preparing', task: 'Reviewing job card' },
    'dispatch': { status: 'In-Transit', location: 'Warehouse', task: 'Loading materials' },
    'installation': { status: 'On-Site', location: 'Customer Site', task: 'Mounting Structure' },
    'closure': { status: 'Wrapping Up', location: 'Customer Site', task: 'Final Testing' },
    'maintenance': { status: 'Available', location: 'Office', task: 'Monitoring' }
};

export default function OperationsCenter() {
    const { currentStage } = useDemo();

    // State for dynamic updates
    const [dynamicTimeline, setDynamicTimeline] = useState<any[]>([]);
    const [teamStatus, setTeamStatus] = useState(FIELD_TEAM_STATUS['quotation']);

    // Initialize/Reset on stage change
    useEffect(() => {
        // Safe access to data
        const initialEvents = TIMELINE_EVENTS[currentStage as keyof typeof TIMELINE_EVENTS] || TIMELINE_EVENTS['quotation'];
        const initialStatus = FIELD_TEAM_STATUS[currentStage as keyof typeof FIELD_TEAM_STATUS] || FIELD_TEAM_STATUS['quotation'];

        setDynamicTimeline(initialEvents);
        setTeamStatus(initialStatus);
    }, [currentStage]);

    // Listen for Demo Events
    useEffect(() => {
        const handleDemoEvent = (e: any) => {
            const { type, timestamp } = e.detail;
            const time = new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

            // Helper to add event if not duplicate (simple check)
            const addEvent = (newEvent: any) => {
                setDynamicTimeline(prev => {
                    // Prevent naive duplicates for demo feeling
                    if (prev.some(ev => ev.title === newEvent.title && ev.time === newEvent.time)) return prev;
                    return [...prev, newEvent];
                });
            };

            if (type === 'QUOTE_APPROVED') {
                addEvent({ time, title: 'Quote Approved', desc: 'Customer accepted proposal', type: 'action' });
            }
            if (type === 'BOOKING_PAID') {
                addEvent({ time, title: 'Booking Payment', desc: '₹50,000 received', type: 'payment' });
            }
            if (type === 'DISPATCH_PAID') {
                addEvent({ time, title: 'Dispatch Fee Paid', desc: 'Material dispatch authorized', type: 'payment' });
                setTeamStatus({ status: 'Loading', location: 'Warehouse', task: 'Scanning Materials' });
            }
            if (type === 'INSTALLATION_STARTED') {
                addEvent({ time, title: 'Installation Started', desc: 'Evidence Uploaded', type: 'system' });
                setTeamStatus({ status: 'On-Site', location: 'Customer Site', task: 'Mounting Structure' });
            }
            if (type === 'TASK_COMPLETED') {
                // specific task updates could go here if detail provided
                // e.g. "Mounting Rails Installed"
            }
            if (type === 'TASKS_COMPLETED') {
                addEvent({ time, title: 'Installation Complete', desc: 'All checks passed', type: 'finish' });
                setTeamStatus({ status: 'Wrapping Up', location: 'Customer Site', task: 'Final Testing' });
            }
        };

        window.addEventListener('demo-event', handleDemoEvent);
        return () => window.removeEventListener('demo-event', handleDemoEvent);
    }, []);

    return (
        <div className="flex flex-col h-full bg-gray-50 text-gray-900 font-sans">
            {/* Top Bar: Project Summary */}
            <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between sticky top-0 z-20">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-solar-100 rounded-lg flex items-center justify-center text-solar-600 font-bold">
                        #S
                    </div>
                    <div>
                        <h2 className="font-bold text-lg leading-tight">Project #SOL-24-892</h2>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                            <User size={12} /> Mr. Sharma
                            <span className="text-gray-300">|</span>
                            <MapPin size={12} /> Koramangala, Bangalore
                            <span className="text-gray-300">|</span>
                            <Zap size={12} /> 5kW On-Grid
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Status</span>
                    <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border
                        ${currentStage === 'quotation' ? 'bg-blue-50 text-blue-600 border-blue-200' : ''}
                        ${currentStage === 'booking' ? 'bg-indigo-50 text-indigo-600 border-indigo-200' : ''}
                        ${currentStage === 'dispatch' ? 'bg-orange-50 text-orange-600 border-orange-200' : ''}
                        ${currentStage === 'installation' ? 'bg-yellow-50 text-yellow-600 border-yellow-200 animate-pulse' : ''}
                        ${currentStage === 'closure' ? 'bg-green-50 text-green-600 border-green-200' : ''}
                     `}>
                        {currentStage}
                    </div>
                </div>
            </div>

            <div className="flex-1 overflow-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Left Col: Real-time Activity / Timeline */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Live Action Card */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <Zap size={100} className="text-solar-500" />
                        </div>
                        <h3 className="font-bold text-gray-900 mb-1">Live Project Activity</h3>
                        <p className="text-sm text-gray-500 mb-6">Real-time updates from customer and field team</p>

                        <div className="space-y-6 relative">
                            {/* Connector Line */}
                            <div className="absolute left-[19px] top-2 bottom-2 w-0.5 bg-gray-100" />

                            <AnimatePresence mode="popLayout" initial={false}>
                                {dynamicTimeline.map((event, idx) => (
                                    <motion.div
                                        key={`${event.title}-${event.time}-${idx}`}
                                        layout
                                        initial={{ opacity: 0, x: -20, height: 0 }}
                                        animate={{ opacity: 1, x: 0, height: 'auto' }}
                                        transition={{ duration: 0.3 }}
                                        className="relative flex gap-4 items-start"
                                    >
                                        <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center shrink-0 z-10 bg-white shadow-sm
                                            ${event.type === 'action' ? 'border-blue-500 text-blue-500' : ''}
                                            ${event.type === 'payment' ? 'border-green-500 text-green-500' : ''}
                                            ${event.type === 'system' ? 'border-gray-300 text-gray-400' : ''}
                                            ${event.type === 'finish' ? 'border-solar-500 text-solar-500' : ''}
                                            ${event.type === 'user' ? 'border-purple-500 text-purple-500' : ''}
                                        `}>
                                            {event.type === 'action' && <CheckCircle size={16} />}
                                            {event.type === 'payment' && <span className="text-xs font-bold">₹</span>}
                                            {event.type === 'system' && <AlertCircle size={16} />}
                                            {event.type === 'finish' && <ShieldCheck size={16} />}
                                            {event.type === 'user' && <User size={16} />}
                                        </div>
                                        <div className="bg-gray-50 rounded-lg p-3 flex-1 border border-gray-100 hover:border-gray-200 transition-colors mb-2">
                                            <div className="flex justify-between items-start mb-1">
                                                <h4 className="font-semibold text-sm">{event.title}</h4>
                                                <span className="text-[10px] text-gray-400 font-mono">{event.time}</span>
                                            </div>
                                            <p className="text-xs text-gray-500">{event.desc}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Automation Insights */}
                    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl border border-indigo-100 p-5">
                        <h3 className="font-bold text-indigo-900 mb-3 flex items-center gap-2">
                            <Zap size={16} className="text-indigo-600" />
                            Automation Insights
                        </h3>
                        <div className="space-y-3">
                            {currentStage === 'quotation' && (
                                <div className="text-xs text-indigo-800 bg-white/60 p-2 rounded border border-indigo-100">
                                    🤖 AI analyzed 150 sq.ft shadow-free area to recommend 5kW capacity.
                                </div>
                            )}
                            {currentStage === 'booking' && (
                                <div className="text-xs text-indigo-800 bg-white/60 p-2 rounded border border-indigo-100">
                                    🤖 Project ID generated & Inventory check initiated automatically.
                                </div>
                            )}
                            {currentStage === 'dispatch' && (
                                <div className="text-xs text-indigo-800 bg-white/60 p-2 rounded border border-indigo-100">
                                    🤖 Logistics partner API triggered for vehicle assignment.
                                </div>
                            )}
                            {currentStage === 'installation' && (
                                <div className="text-xs text-indigo-800 bg-white/60 p-2 rounded border border-indigo-100">
                                    🤖 Image recognition validating mounting structure angle.
                                </div>
                            )}
                            {currentStage === 'maintenance' && (
                                <div className="text-xs text-indigo-800 bg-white/60 p-2 rounded border border-indigo-100">
                                    🤖 System health optimal. Grid sync efficiency 99.8%.
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Live Generation Card - Only shown when System is Active */}
                    {(currentStage === 'closure' || currentStage === 'maintenance') && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white rounded-xl shadow-lg border-2 border-solar-500/30 p-5"
                        >
                            <div className="flex justify-between items-center mb-6">
                                <div>
                                    <h3 className="font-bold text-gray-900 flex items-center gap-2">
                                        <Activity size={18} className="text-solar-500" />
                                        View Live Generation
                                    </h3>
                                    <p className="text-xs text-gray-500">Real-time solar performance monitoring</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-2xl font-black text-solar-600">4.82 kW</p>
                                    <p className="text-[10px] text-green-600 font-bold flex items-center justify-end gap-1">
                                        <TrendingUp size={10} /> +12% from avg
                                    </p>
                                </div>
                            </div>

                            <div className="h-[250px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={GENERATION_DATA}>
                                        <defs>
                                            <linearGradient id="colorYield" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#eab308" stopOpacity={0.3} />
                                                <stop offset="95%" stopColor="#eab308" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                        <XAxis
                                            dataKey="time"
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{ fontSize: 10, fill: '#94a3b8' }}
                                            dy={10}
                                        />
                                        <YAxis
                                            hide
                                        />
                                        <Tooltip
                                            contentStyle={{
                                                borderRadius: '12px',
                                                border: 'none',
                                                boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'
                                            }}
                                        />
                                        <Area
                                            type="monotone"
                                            dataKey="yield"
                                            stroke="#eab308"
                                            strokeWidth={3}
                                            fillOpacity={1}
                                            fill="url(#colorYield)"
                                            animationDuration={2000}
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>

                            <div className="grid grid-cols-3 gap-4 mt-6">
                                <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                                    <p className="text-[10px] text-gray-500 uppercase font-bold">Today</p>
                                    <p className="text-lg font-bold">24.5 kWh</p>
                                </div>
                                <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                                    <p className="text-[10px] text-gray-500 uppercase font-bold">CO2 Saved</p>
                                    <p className="text-lg font-bold">12.2 kg</p>
                                </div>
                                <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                                    <p className="text-[10px] text-gray-500 uppercase font-bold">Savings</p>
                                    <p className="text-lg font-bold text-green-600">₹450</p>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </div>

                {/* Right Col: Team & Assets */}
                <div className="space-y-6">
                    {/* Field Team Card */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
                        <h3 className="font-bold text-gray-900 mb-4 flex items-center justify-between">
                            <span>Field Team</span>
                            <span className={`text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider
                                 ${teamStatus.status === 'Available' ? 'bg-gray-100 text-gray-500' : 'bg-green-100 text-green-600'}
                             `}>{teamStatus.status}</span>
                        </h3>

                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden">
                                <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-500 text-xs font-bold">RK</div>
                            </div>
                            <div>
                                <div className="text-sm font-bold">Rajesh Kumar</div>
                                <div className="text-xs text-gray-500">Lead Technician</div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div className="flex items-center gap-3 text-sm text-gray-600 bg-gray-50 p-2 rounded">
                                <MapPin size={16} className="text-gray-400" />
                                {teamStatus.location}
                            </div>
                            <div className="flex items-center gap-3 text-sm text-gray-600 bg-gray-50 p-2 rounded">
                                <CheckCircle size={16} className="text-gray-400" />
                                {teamStatus.task}
                            </div>
                        </div>
                    </div>

                    {/* Inventory Stats */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
                        <h3 className="font-bold text-gray-900 mb-4">Inventory Tracking</h3>
                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between text-xs mb-1">
                                    <span className="text-gray-500">Solar Panels (Mono Perc)</span>
                                    <span className="font-bold">12/12</span>
                                </div>
                                <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                    <div className={`h-full rounded-full transition-all duration-500 ${currentStage === 'quotation' ? 'w-0 bg-gray-300' : 'w-full bg-green-500'}`} />
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-xs mb-1">
                                    <span className="text-gray-500">Inverter (5kW)</span>
                                    <span className="font-bold">{currentStage === 'quotation' ? '0/1' : '1/1'}</span>
                                </div>
                                <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                    <div className={`h-full rounded-full transition-all duration-500 ${currentStage === 'quotation' ? 'w-0 bg-gray-300' : 'w-full bg-green-500'}`} />
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-xs mb-1">
                                    <span className="text-gray-500">Mounting Kit</span>
                                    <span className="font-bold">{currentStage === 'quotation' ? '0/1' : '1/1'}</span>
                                </div>
                                <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                    <div className={`h-full rounded-full transition-all duration-500 ${currentStage === 'quotation' ? 'w-0 bg-gray-300' : 'w-full bg-green-500'}`} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
