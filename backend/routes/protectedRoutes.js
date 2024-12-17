import express from 'express';
import {
    createPlan,
    getPlans,
    updatePlan,
    deletePlan,
} from '../controllers/planController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
    .get(getPlans)
    .post(protect, authorize('super_admin'), createPlan);

router.route('/:id')
    .put(protect, authorize('super_admin'), updatePlan)
    .delete(protect, authorize('super_admin'), deletePlan);

export default router;