import React from 'react';
import { usePlans } from '../hooks/usePlans';
import { useSubscription } from '../hooks/useSubscription';
import { useAuth } from '../contexts/AuthContext';
import { Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Plans = () => {
    const { data: plans, isLoading, error } = usePlans();
    const { user } = useAuth();
    const { subscribe } = useSubscription();
    const navigate = useNavigate()

    const handleSubscribe = async (plan) => {
        try {

            if (!user) {
                // Redirect to login if not authenticated
                navigate('/login')
                window.location.href = '/login?redirect=plans';
                return;
            }

            await subscribe(plan.stripePriceId);
        } catch (error) {
            console.error('Subscription error:', error);
            // Handle error (show notification, etc.)
        }
    };


    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-red-600">Error loading plans. Please try again later.</div>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center">
                    <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                        Pricing Plans
                    </h2>
                    <p className="mt-4 text-lg text-gray-600">
                        Choose the perfect plan for your business
                    </p>
                </div>

                <div className="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:grid-cols-3">
                    {plans?.map((plan) => (
                        <div
                            key={plan._id}
                            className="border border-gray-200 rounded-lg shadow-sm divide-y divide-gray-200 bg-white"
                        >
                            <div className="p-6">
                                <h3 className="text-lg font-medium text-gray-900">{plan.name}</h3>
                                <p className="mt-4 text-sm text-gray-500">{plan.description}</p>
                                <p className="mt-8">
                                    <span className="text-4xl font-extrabold text-gray-900">${plan.price}</span>
                                    <span className="text-base font-medium text-gray-500">/month</span>
                                </p>
                                <ul className="mt-6 space-y-4">
                                    {plan.features.map((feature, index) => (
                                        <li key={index} className="flex space-x-3">
                                            <Check className="flex-shrink-0 h-5 w-5 text-green-500" />
                                            <span className="text-sm text-gray-500">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                                <button
                                    className="mt-8 block w-full bg-indigo-600 text-white rounded-md py-2 text-sm font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    onClick={() => handleSubscribe(plan)}
                                >
                                    Subscribe
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Plans;