
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
const app = express();

app.use(cors());
app.use(helmet());
app.use(express.urlencoded({ extended: true }))
app.use(express.json({ limit: '50MB' }));

import emailRoutes from './Routers/mail_router';
app.use('/api', emailRoutes)

import userRoutes from './Routers/user_router';
app.use('/api', userRoutes)

import workspaceRoutes from './Routers/workspace_router';
app.use('/api', workspaceRoutes)

import projectRoutes from './Routers/project_router';
app.use('/api', projectRoutes)

import taskRoutes from './Routers/task_router';
app.use('/api', taskRoutes)

import guessRoutes from './Routers/guess_router';
app.use('/api', guessRoutes)

import relationUserProjectsRoutes from './Routers/user_project_router'
app.use('/api', relationUserProjectsRoutes)

import userTaskRoutes from './Routers/user_task_router'
app.use('/api', userTaskRoutes)

export default app;