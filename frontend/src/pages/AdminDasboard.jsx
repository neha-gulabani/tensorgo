import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useUsers, useCreateUser, useUpdateUser, useDeleteUser } from '../hooks/useUsers';
import UserModal from '../components/UserModal';
import { AlertTriangle } from 'lucide-react';

const AdminDashboard = () => {
    const { user } = useAuth();
    console.log(user.organizationId, user)
    const { data: users, isLoading, error } = useUsers(user?.organizationId);
    console.log(user.organizationId)
    const createUser = useCreateUser();
    const updateUser = useUpdateUser();
    const deleteUser = useDeleteUser();

    const [showModal, setShowModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [deleteConfirm, setDeleteConfirm] = useState(null);

    const handleCreateUser = async (userData) => {
        try {
            await createUser.mutateAsync({
                ...userData,
                organizationId: user.organizationId,
            });
            setShowModal(false);
        } catch (error) {
            console.error('Error creating user:', error);
        }
    };

    const handleUpdateUser = async (userData) => {
        try {
            await updateUser.mutateAsync({
                id: selectedUser._id,
                ...userData,
            });
            setShowModal(false);
            setSelectedUser(null);
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    const handleDeleteUser = async (id) => {
        try {
            await deleteUser.mutateAsync(id);
            setDeleteConfirm(null);
        } catch (error) {
            console.error('Error deleting user:', error);
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
                <div className="text-red-600">Error loading users. Please try again later.</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold">User Management</h2>
                        <button
                            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                            onClick={() => {
                                setSelectedUser(null);
                                setShowModal(true);
                            }}
                        >
                            Add User
                        </button>
                    </div>

                    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                        {users && users.length > 0 ? (
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Name
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Email
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Role
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {users.map((user) => (
                                        <tr key={user._id}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-500">{user.email}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-500">{user.role}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <button
                                                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                                                    onClick={() => {
                                                        setSelectedUser(user);
                                                        setShowModal(true);
                                                    }}
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    className="text-red-600 hover:text-red-900"
                                                    onClick={() => setDeleteConfirm(user)}
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <div className="px-6 py-4 text-center text-gray-500">
                                No user information available.
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {showModal && (
                <UserModal
                    user={selectedUser}
                    onClose={() => {
                        setShowModal(false);
                        setSelectedUser(null);
                    }}
                    onSubmit={selectedUser ? handleUpdateUser : handleCreateUser}
                />
            )}

            {deleteConfirm && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
                    <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                        <div className="mt-3 text-center">
                            <AlertTriangle className="mx-auto h-12 w-12 text-red-500" />
                            <h3 className="text-lg font-medium text-gray-900">
                                Confirm Delete
                            </h3>
                            <div className="mt-2 px-7 py-3">
                                <p className="text-sm text-gray-500">
                                    Are you sure you want to delete {deleteConfirm.name}? This action cannot be undone.
                                </p>
                            </div>
                            <div className="flex justify-center space-x-4 mt-4">
                                <button
                                    onClick={() => setDeleteConfirm(null)}
                                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => handleDeleteUser(deleteConfirm._id)}
                                    className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
