import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { LogOut } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useAuth();

    return (
        <nav className="bg-white shadow-lg">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <Link to="/" className="flex items-center">
                            <span className="text-xl font-bold text-gray-800">SaaS Platform</span>
                        </Link>
                        <div className="hidden md:ml-6 md:flex md:space-x-8">
                            <Link to="/plans" className="inline-flex items-center px-1 pt-1 text-gray-500 hover:text-gray-700">
                                Plans
                            </Link>
                            {user && (
                                <Link to="/dashboard" className="inline-flex items-center px-1 pt-1 text-gray-500 hover:text-gray-700">
                                    Dashboard
                                </Link>
                            )}
                        </div>
                    </div>
                    <div className="flex items-center">
                        {user ? (
                            <button
                                onClick={logout}
                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                            >
                                <LogOut className="h-4 w-4 mr-2" />
                                Logout
                            </button>
                        ) : (

                            <div className="flex space-x-4">
                                <Link
                                    to="/login"
                                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50"
                                >
                                    Login
                                </Link>



                                <Link
                                    to="/register"
                                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50"
                                >
                                    Register
                                </Link>



                            </div>

                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};
export default Navbar;