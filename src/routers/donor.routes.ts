import { Router } from 'express';
import {
    handleGetAllDonors,
    handleCreateDonor,
    handleUpdateDonor,
    handleDeleteDonor,
    handleGetADonor,
} from '../controllers/donor.controller';

const router = Router();

// GET /api/v1/donors
router.get('/', handleGetAllDonors);

//POST /api/v1/donors
router.post('/createdonor', handleCreateDonor);

//POST /api/v1/donors
router.post('/:user_id', handleUpdateDonor)

//DELETE 
router.delete("/:user_id", handleDeleteDonor)

//GET 
router.get('/getdonor/:user_id', handleGetADonor)

export default router;