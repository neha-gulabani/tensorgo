import { useQuery, useMutation, useQueryClient } from 'react-query';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const usePlans = () => {
    return useQuery('plans', async () => {
        const { data } = await axios.get(`${API_URL}/plans`);
        return data;
    });
};

export const useCreatePlan = () => {
    const queryClient = useQueryClient();
    return useMutation(
        async (planData) => {
            const { data } = await axios.post(`${API_URL}/plans`, planData);
            return data;
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries('plans');
            },
        }
    );
};

export const useUpdatePlan = () => {
    const queryClient = useQueryClient();
    return useMutation(
        async ({ id, ...planData }) => {
            const { data } = await axios.put(`${API_URL}/plans/${id}`, planData);
            return data;
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries('plans');
            },
        }
    );
};