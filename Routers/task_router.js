import { Router } from 'express';
import { AddAsync, DeleteAsync, GetAllAsync, GetByIdAsync, UpdatedAsync } from '../controllers/task_controller';
const router = new Router();

// GET one task by id.
router.get(`/projects/:projectId/tasks/:taskId`, GetByIdAsync)

// GET all task.
router.get(`/projects/:projectId/tasks`, GetAllAsync)

// POST create one task.
router.post(`/projects/:projectId/tasks`, AddAsync)

// PUT update one task by id.
router.put(`/projects/:projectId/tasks/:taskId`, UpdatedAsync)

// DELETE delete one task by id.
router.delete(`/projects/:projectId/tasks/:taskId`, DeleteAsync)

export default router;