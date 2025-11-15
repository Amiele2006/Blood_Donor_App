import { Router } from 'express';
import {
    handleGetAllDonors,
    handleCreateDonor
} from '../controllers/donor.controller';

const router = Router();

// GET /api/v1/donors
router.get('/', handleGetAllDonors);

//POST /api/v1/donors
router.post('/createdonor', handleCreateDonor);

export default router;