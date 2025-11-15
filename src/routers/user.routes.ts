import { Router } from 'express';
import { 
    handleGetAllUsers, 
    handleCreateUser,
    handleUpdateUser,
    handleDeleteUser
} from '../controllers/user.controller';

const router = Router();

// GET /api/v1/users
router.get('/allusers', handleGetAllUsers);

// POST /api/v1/users
router.post('/', handleCreateUser); 

//update user - patch
router.patch("/:user_id", handleUpdateUser );

//delete user by id - delete
router.delete("/:user_id", handleDeleteUser);

//find by id - get

export default router;