import { Router } from 'express';
import { AddAsync, DeleteAsync, GetAllAsync, GetByIdAsync, UpdatedAsync } from '../controllers/workspace_controller';
const router = new Router();

// Get one Workspaces.
router.get('/users/:userId/workspaces/:workspaceId', GetByIdAsync)

// Get All Workspaces.
router.get('/users/:userId/workspaces', GetAllAsync)

// POST create Workspaces.
router.post('/users/:userId/workspaces', AddAsync)

// PUT update one Workspaces.
router.put('/users/:userId/workspaces/:workspaceId', UpdatedAsync)

// DELETE one Workspaces.
router.delete('/users/:userId/workspaces/:workspaceId', DeleteAsync)

export default router;
