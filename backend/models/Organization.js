import mongoose from 'mongoose';

const organizationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    plan: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Plan',
        required: true,
    },
    stripeCustomerId: String,
    subscriptionId: String,
    userCount: {
        type: Number,
        default: 0,
    },
    active: {
        type: Boolean,
        default: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    billingEmail: String,
    address: {
        street: String,
        city: String,
        state: String,
        country: String,
        zipCode: String,
    },
});

const Organization = mongoose.model('Organization', organizationSchema);
export default Organization;