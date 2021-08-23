import { Router } from 'express';
import { AddAsync, DeleteAsync, GetAllAsync, GetByIdAsync, UpdatedAsync } from '../controllers/project_controller'
const router = new Router();

// GET one project
router.get('/users/:userId/projects/:projectId', GetByIdAsync)

// GET all projects
router.get('/users/:userId/projects', GetAllAsync)

// POST create one project
router.post('/users/:userId/projects', AddAsync)

// PUT update one project
router.put('/users/:userId/projects/:projectId', UpdatedAsync)

// DELETE delete one project
router.delete('/users/:userId/projects/:projectId', DeleteAsync)

export default router;
