import { Router } from 'express';
import {
    handleCreateRole,
    handleGetAllRoles,
    handleUpdateRole,
    handleDeleteRole
} from '../controllers/role.controller';

const router = Router();

//GET /api/v1/roles
router.get("/allroles", handleGetAllRoles);

//POST/api/v1/roles
router.post('/create-role', handleCreateRole);

//PATCH /api/v1/roles
router.patch("/:role_name", handleUpdateRole);

//DELETE /api/v1/roles
router.delete("/:role_name", handleDeleteRole);

export default router;