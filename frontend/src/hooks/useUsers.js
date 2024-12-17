import { useQuery, useMutation, useQueryClient } from 'react-query';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const useUsers = (organizationId) => {
    return useQuery(['users', organizationId], async () => {
        const { data } = await axios.get(`${API_URL}/auth/users?organizationId=${organizationId}`);
        console.log(data)
        return data;
    });
};

export const useCreateUser = () => {
    const queryClient = useQueryClient();
    return useMutation(
        async (userData) => {
            console.log('user data:', userData)
            const { data } = await axios.post(`${API_URL}/auth/register`, userData);
            return data;
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries('users');
            },
        }
    );
};

export const useUpdateUser = () => {
    const queryClient = useQueryClient();
    return useMutation(
        async ({ id, ...userData }) => {
            const { data } = await axios.put(`${API_URL}/users/${id}`, userData);
            return data;
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries('users');
            },
        }
    );
};

export const useDeleteUser = () => {
    const queryClient = useQueryClient();
    return useMutation(
        async (id) => {
            await axios.delete(`${API_URL}/users/${id}`);
            return id;
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries('users');
            },
        }
    );
};