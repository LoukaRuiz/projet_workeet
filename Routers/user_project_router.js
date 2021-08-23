import { Router } from 'express';
import { AddAsync, DeleteAsync } from '../controllers/user_project_controller'
const router = new Router();

// POST create one project
router.post('/relations/users/:userId/projects', AddAsync)

// DELETE delete one project
router.delete('/relations/users/:userId/projects/:projectId', DeleteAsync)

export default router;
