import express from 'express';
import { login, register, getUsers } from '../controllers/authController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.get('/users', getUsers)

export default router;