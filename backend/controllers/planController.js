import Plan from '../models/Plan.js';
import stripe from '../config/stripe.js';

export const createPlan = async (req, res) => {
    try {
        const { name, description, price, features, maxUsers, billingCycle } = req.body;

        // Create Stripe product and price
        const product = await stripe.products.create({
            name,
            description,
        });

        const stripePrice = await stripe.prices.create({
            product: product.id,
            unit_amount: price * 100, // Stripe uses cents
            currency: 'usd',
            recurring: {
                interval: billingCycle,
            },
        });

        const plan = await Plan.create({
            name,
            description,
            price,
            features,
            maxUsers,
            billingCycle,
            stripeProductId: product.id,
            stripePriceId: stripePrice.id,
        });

        res.status(201).json(plan);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getPlans = async (req, res) => {
    try {
        const plans = await Plan.find({ active: true });
        res.json(plans);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updatePlan = async (req, res) => {
    try {
        const plan = await Plan.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!plan) {
            return res.status(404).json({ message: 'Plan not found' });
        }
        res.json(plan);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deletePlan = async (req, res) => {
    try {
        const plan = await Plan.findByIdAndUpdate(
            req.params.id,
            { active: false },
            { new: true }
        );
        if (!plan) {
            return res.status(404).json({ message: 'Plan not found' });
        }
        res.json({ message: 'Plan deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};