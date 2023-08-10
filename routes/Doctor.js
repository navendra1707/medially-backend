import express from 'express';
import { findBySymptoms } from '../controllers/Doctor.js';

const router = express.Router();

router.post('/find-by-symptoms', findBySymptoms);

export default router;