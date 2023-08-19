import express from 'express';
import { findBySymptoms, getIndividualDoctor } from '../controllers/Doctor.js';

const router = express.Router();

//GET
router.get('/:id', getIndividualDoctor);

//POST
router.post('/find-by-symptoms', findBySymptoms);

export default router;