import Link from 'next/link';
import { Smartphone, LayoutDashboard, HardHat } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 bg-gradient-to-br from-solar-50 to-solar-100">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
          Solar SaaS <span className="text-solar-600">Workflow</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Experience the complete end-to-end journey from lead generation to installation and maintenance.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl w-full">
        {/* Customer View */}
        <Link href="/customer" className="group">
          <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-white/50 hover:shadow-2xl hover:scale-105 transition-all duration-300 h-full flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <Smartphone size={32} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Customer App</h2>
            <p className="text-gray-500">
              Track project progress, make payments, and approve milestones in real-time.
            </p>
          </div>
        </Link>

        {/* Vendor Field App */}
        <Link href="/vendor" className="group">
          <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-white/50 hover:shadow-2xl hover:scale-105 transition-all duration-300 h-full flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-solar-100 rounded-2xl flex items-center justify-center mb-6 text-solar-600 group-hover:bg-solar-600 group-hover:text-white transition-colors">
              <HardHat size={32} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Field Team</h2>
            <p className="text-gray-500">
              Manage installations, upload proof-of-work, and complete site verification.
            </p>
          </div>
        </Link>

        {/* Dashboard */}
        <Link href="/dashboard" className="group">
          <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-white/50 hover:shadow-2xl hover:scale-105 transition-all duration-300 h-full flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-6 text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors">
              <LayoutDashboard size={32} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Vendor Dashboard</h2>
            <p className="text-gray-500">
              Monitor KPI metrics, track project pipeline, and manage inventory.
            </p>
          </div>
        </Link>
      </div>

      <div className="mt-16 text-center text-sm text-gray-500">
        <p>Interactive Prototype v1.0 • Built for Demonstration</p>
      </div>
    </main>
  );
}
