import React from 'react';
import { usePlans } from '../hooks/usePlans';

const SuperAdminDashboard = () => {
    const { data: plans } = usePlans();
    const [showCreateModal, setShowCreateModal] = React.useState(false);

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold">Plans Management</h2>
                        <button
                            onClick={() => setShowCreateModal(true)}
                            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                        >
                            Create New Plan
                        </button>
                    </div>

                    <div className="bg-white shadow overflow-hidden sm:rounded-md">
                        <ul className="divide-y divide-gray-200">
                            {plans?.map((plan) => (
                                <li key={plan._id}>
                                    <div className="px-4 py-4 sm:px-6">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h3 className="text-lg font-medium text-gray-900">{plan.name}</h3>
                                                <p className="mt-1 text-sm text-gray-500">{plan.description}</p>
                                            </div>
                                            <div className="flex space-x-2">
                                                <button
                                                    className="text-indigo-600 hover:text-indigo-900"
                                                    onClick={() => {/* Handle edit */ }}
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    className="text-red-600 hover:text-red-900"
                                                    onClick={() => {/* Handle delete */ }}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SuperAdminDashboard;