import { Dropdown } from '@/components/ui/Dropdown';
import { Bell, CheckCircle2, AlertTriangle, Info } from 'lucide-react';

export const NotificationDropdown: React.FC = () => {
    // Mock notifications for dashboard context, different from customer context
    const notifications = [
        { id: '1', title: 'Payment Received', desc: '₹50,000 from Vikram Gupta', type: 'success', time: '2m ago' },
        { id: '2', title: 'Low Inventory', desc: 'Solar Panel stock below 20 units', type: 'warning', time: '1h ago' },
        { id: '3', title: 'New Lead', desc: 'Anjali Sharma requested a quote', type: 'info', time: '3h ago' },
    ];

    const getIcon = (type: string) => {
        switch (type) {
            case 'success': return <div className="p-1 bg-green-100 rounded-full text-green-600"><CheckCircle2 size={12} /></div>;
            case 'warning': return <div className="p-1 bg-orange-100 rounded-full text-orange-600"><AlertTriangle size={12} /></div>;
            case 'info': return <div className="p-1 bg-blue-100 rounded-full text-blue-600"><Info size={12} /></div>;
            default: return <div className="p-1 bg-gray-100 rounded-full text-gray-600"><Bell size={12} /></div>;
        }
    };

    return (
        <Dropdown
            trigger={
                <button className="bg-white p-2.5 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 relative transition-colors shadow-sm">
                    <Bell size={20} />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white animate-pulse"></span>
                </button>
            }
            className="w-80"
        >
            <div className="p-3 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                <h4 className="text-sm font-bold text-gray-900">Notifications</h4>
                <button className="text-xs text-solar-600 font-medium hover:text-solar-700">Mark all read</button>
            </div>

            <div className="max-h-[300px] overflow-y-auto">
                {notifications.map((notif) => (
                    <div key={notif.id} className="p-3 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0 cursor-pointer flex gap-3">
                        <div className="mt-1 shrink-0">{getIcon(notif.type)}</div>
                        <div className="flex-1">
                            <p className="text-sm font-semibold text-gray-900">{notif.title}</p>
                            <p className="text-xs text-gray-500 line-clamp-2">{notif.desc}</p>
                            <p className="text-[10px] text-gray-400 mt-1">{notif.time}</p>
                        </div>
                        <div className="w-1.5 h-1.5 bg-solar-500 rounded-full mt-2 shrink-0"></div>
                    </div>
                ))}
            </div>

            <div className="p-2 border-t border-gray-100 text-center">
                <button className="text-xs font-medium text-gray-500 hover:text-gray-700 w-full py-1">View All History</button>
            </div>
        </Dropdown>
    );
};
