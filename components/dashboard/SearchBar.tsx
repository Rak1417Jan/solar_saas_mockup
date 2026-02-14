'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Clock, ChevronRight } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

export const SearchBar: React.FC = () => {
    const [query, setQuery] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Mock results
    const results = [
        { type: 'project', title: 'Solar Installation - #789', subtitle: 'Vikram Gupta • Quotation' },
        { type: 'customer', title: 'Anjali Sharma', subtitle: 'New Lead • South City' },
        { type: 'task', title: 'Verify Panel Mounting', subtitle: 'Field Task • Pending' },
    ].filter(item => item.title.toLowerCase().includes(query.toLowerCase()));

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={containerRef}>
            <div className="relative">
                <input
                    type="text"
                    placeholder="Search projects, customers..."
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value);
                        setIsOpen(true);
                    }}
                    onFocus={() => setIsOpen(true)}
                    className="pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm w-64 md:w-80 focus:outline-none focus:border-solar-400 focus:ring-4 focus:ring-solar-100 transition-all shadow-sm text-gray-900"
                />
                <Search size={18} className="absolute left-3 top-2.5 text-gray-400 pointer-events-none" />
                {query && (
                    <button
                        onClick={() => {
                            setQuery('');
                            setIsOpen(false);
                        }}
                        className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                    >
                        <X size={16} />
                    </button>
                )}
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50"
                    >
                        {query.length === 0 ? (
                            <div className="p-2">
                                <p className="px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">Recent Searches</p>
                                <div className="space-y-1">
                                    {['Ramesh Gupta', 'Project #442', 'Inverter Stock'].map((term) => (
                                        <button key={term} className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg flex items-center gap-2">
                                            <Clock size={14} className="text-gray-400" />
                                            {term}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="p-2">
                                {results.length > 0 ? (
                                    <>
                                        <p className="px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">Results</p>
                                        <div className="space-y-1">
                                            {results.map((item, idx) => (
                                                <button key={idx} className="w-full text-left px-3 py-2 hover:bg-gray-50 rounded-lg group flex items-center justify-between">
                                                    <div>
                                                        <p className="text-sm font-medium text-gray-900">{item.title}</p>
                                                        <p className="text-xs text-gray-500">{item.subtitle}</p>
                                                    </div>
                                                    <ChevronRight size={16} className="text-gray-300 group-hover:text-gray-500" />
                                                </button>
                                            ))}
                                        </div>
                                    </>
                                ) : (
                                    <div className="p-8 text-center text-gray-500">
                                        <p className="text-sm">No results found for &quot;{query}&quot;</p>
                                    </div>
                                )}
                            </div>
                        )}

                        <div className="bg-gray-50 p-2 border-t border-gray-100 text-center">
                            <button className="text-xs font-medium text-solar-600 hover:text-solar-700">Advanced Search</button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
