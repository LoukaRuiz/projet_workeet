import { Router } from 'express';
import { sendMail } from '../controllers/email_controller';
const router = new Router();

// GET send email
router.post('/services/email/:username/:email', sendMail)

export default router;
