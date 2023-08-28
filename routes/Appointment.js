import express from 'express'
import { verifyToken } from '../middlewares/auth.js';
import { bookAppointment } from '../controllers/Appointment.js';

const router = express.Router();

router.post('/book', verifyToken, bookAppointment);

export default router;