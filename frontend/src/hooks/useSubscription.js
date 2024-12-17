import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';

const stripePromise = loadStripe(process.env.STRIPE_PUBLIC_KEY);

export const useSubscription = () => {
    const subscribe = async (priceId) => {
        try {
            const stripe = await stripePromise;

            // Create a checkout session
            const { data: session } = await axios.post('/api/create-checkout-session', {
                priceId,
            });

            // Redirect to checkout
            const result = await stripe.redirectToCheckout({
                sessionId: session.id,
            });

            if (result.error) {
                throw new Error(result.error.message);
            }
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    };

    return { subscribe };
};