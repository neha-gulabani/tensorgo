import mongoose from 'mongoose';

const planSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: String,
    price: {
        type: Number,
        required: true,
    },
    features: [{
        type: String,
    }],
    maxUsers: {
        type: Number,
        required: true,
    },
    stripeProductId: {
        type: String,
        required: true,
    },
    stripePriceId: {
        type: String,
        required: true,
    },
    active: {
        type: Boolean,
        default: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model('Plan', planSchema);