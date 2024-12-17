import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import DashboardWidget from '../components/DashboardWidget';
import { CreditCard, Calendar, Clock, Users } from 'lucide-react';

const Dashboard = () => {
    const { user } = useAuth();
    const [stats, setStats] = React.useState({
        subscriptionStatus: 'Active',
        nextBillingDate: '2024-04-01',
        daysRemaining: 15,
        teamMembers: 5
    });

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    <h2 className="text-2xl font-bold mb-6">Dashboard</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <DashboardWidget
                            title="Subscription Status"
                            value={stats.subscriptionStatus}
                            icon={CreditCard}
                            color="green"
                        />
                        <DashboardWidget
                            title="Next Billing Date"
                            value={stats.nextBillingDate}
                            icon={Calendar}
                            color="blue"
                        />
                        <DashboardWidget
                            title="Days Remaining"
                            value={stats.daysRemaining}
                            icon={Clock}
                            color="yellow"
                        />
                        <DashboardWidget
                            title="Team Members"
                            value={stats.teamMembers}
                            icon={Users}
                            color="purple"
                        />
                    </div>

                    <div className="mt-8 bg-white shadow rounded-lg p-6">
                        <h3 className="text-lg font-medium mb-4">Recent Activity</h3>
                        {/* Add activity list or other relevant content */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;