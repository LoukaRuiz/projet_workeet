import { Router } from 'express';
import { AddAsync, GetByIdAsync, GetAllAsync, UpdatedAsync, DeleteAsync, GetByEmailAsync, AddToWorkspaceLikGuess   } from '../controllers/user_controller'
const router = new Router();

// GET One user by id.
router.get(`/users/:userId`, GetByIdAsync)

// GET one user by email
router.get('/users/email/:email', GetByEmailAsync)

// GET All users by projectId.
router.get(`/users/projects/:projectId`, GetAllAsync)

// POST create one user.
router.post(`/users`, AddAsync)

// PUT Update one user by id.
router.put(`/users/:userId`, UpdatedAsync)

// DELETE one user by id.
router.delete(`/users/:userId`, DeleteAsync)

export default router;