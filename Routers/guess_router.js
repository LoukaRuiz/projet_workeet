import  { Router } from 'express'
import { AddAsync, DeleteAsync, GetByIdAsync } from '../controllers/guess_controller';
const router = new Router();

// GET Guess
router.get('/guess/:email/projects/:projectId', GetByIdAsync)
// CREATE guess
router.post('/guess', AddAsync)

router.delete('/guess/:guessId/projects/:projectId', DeleteAsync)

export default router;