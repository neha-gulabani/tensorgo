import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Users, Zap } from 'lucide-react';

const Home = () => {
    return (
        <div className="bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="text-center">
                    <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                        <span className="block">Modern SaaS Platform</span>
                        <span className="block text-indigo-600">for Your Business</span>
                    </h1>
                    <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                        Scale your business with our comprehensive SaaS solution. Manage users, handle subscriptions, and grow your organization effortlessly.
                    </p>
                    <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
                        <div className="rounded-md shadow">
                            <Link
                                to="/plans"
                                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
                            >
                                View Plans
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="mt-20">
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        <div className="pt-6">
                            <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8">
                                <div className="-mt-6">
                                    <div>
                                        <span className="inline-flex items-center justify-center p-3 bg-indigo-500 rounded-md shadow-lg">
                                            <Shield className="h-6 w-6 text-white" />
                                        </span>
                                    </div>
                                    <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">Secure by Design</h3>
                                    <p className="mt-5 text-base text-gray-500">
                                        Enterprise-grade security with role-based access control and data encryption.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="pt-6">
                            <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8">
                                <div className="-mt-6">
                                    <div>
                                        <span className="inline-flex items-center justify-center p-3 bg-indigo-500 rounded-md shadow-lg">
                                            <Users className="h-6 w-6 text-white" />
                                        </span>
                                    </div>
                                    <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">Team Management</h3>
                                    <p className="mt-5 text-base text-gray-500">
                                        Easily manage users and roles within your organization.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="pt-6">
                            <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8">
                                <div className="-mt-6">
                                    <div>
                                        <span className="inline-flex items-center justify-center p-3 bg-indigo-500 rounded-md shadow-lg">
                                            <Zap className="h-6 w-6 text-white" />
                                        </span>
                                    </div>
                                    <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">Fast & Reliable</h3>
                                    <p className="mt-5 text-base text-gray-500">
                                        Built with modern technologies for optimal performance and reliability.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;