import { Router } from 'express';
import { AddAsync, DeleteAsync } from '../controllers/user_task_controller'
const router = new Router();

router.post('/relations/users/tasks', AddAsync)

router.delete('/relations/users/:userId/tasks/:taskId', DeleteAsync)

export default router;
