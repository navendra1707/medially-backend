import express from 'express'
import { verifyToken } from '../middlewares/auth.js';
import { bookAppointment, fetchUpdate, getAllAppointmentBookings, getAllBookingsOfUser, markCompleted } from '../controllers/Appointment.js';

const router = express.Router();

router.post('/book', verifyToken, bookAppointment);
router.get('/user-bookings', getAllBookingsOfUser);
router.post('/get-appointment', getAllAppointmentBookings);
router.get('/mark-complete', markCompleted);
router.get('/get-update', fetchUpdate);

export default router;