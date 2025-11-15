import { Router } from 'express';
import {
    handleGetAllAdmins,
    handleCreateAdmin,
    handleUpdateAdmin,
    handleDeleteAdmin
} from '../controllers/admin.controller';

const router = Router();

//GET /api/v1/admins
router.get('/', handleGetAllAdmins);

// POST /api/v1/admins
router.post('/createadmin', handleCreateAdmin); 

//update admin - patch
router.patch("/:user_id", handleUpdateAdmin )

//delete admin - delete
router.delete("/:user_id", handleDeleteAdmin)


export default router;