import { ERROR_CLIENT, ERROR_SERVER, OK } from '../http/status'
import { ModelService } from '../services/modelService'
import Task from '../models/task'
import Project from '../models/project'
import User from '../models/user'
const taskService = new ModelService(Task)
const projectService = new ModelService(Project)

export const GetByIdAsync = async (req, res) => {
    let project = await projectService.verify(req.params.projectId)
    if (project.exists) {
        const task = await taskService.verify(req.params.taskId)
        if (task.exists) {
            res.status(OK.Status200).send(task.data)
        } else {
            res.status(ERROR_CLIENT.Status404).send({ error: task.message });
        }
    } else {
        res.status(ERROR_SERVER.Status500).send({ error: project.message })
    }
}

export const GetAllAsync = async (req, res) => {
    let project = await projectService.verify(req.params.projectId)
    if (project.exists) {
        const all = await Task.findAll({ where: { isDeleted: false, ProjectId: project.data.id }, include: User });
        if (all) {
            return res.status(OK.Status200).send(all)
        } else {
            res.status(ERROR_CLIENT.Status404).send({ message: `${Task.toString()} not found` });
        }
    } else {
        res.status(ERROR_SERVER.Status500).send({ error: project.message })
    }
}

export const AddAsync = async (req, res) => {
    let project = await projectService.verify((req.params.projectId))
    if (project.exists) {
        const task = await taskService.verify(req.body.id)
        if (!task.exists) {
            const newTask = await taskService.AddAsync(req.body)
            if (newTask.isAdded) {
                res.status(OK.Status201).send(newTask.data)
            } else {
                res.status(ERROR_CLIENT.Status400).send({ error: newTask.message })
            }
        } else {
            res.status(ERROR_CLIENT.Status409).send({ conflict: task.message })
        }
    } else {
        res.status(ERROR_SERVER.Status500).send({ error: project.message })
    }
}

export const UpdatedAsync = async (req, res) => {

    let project = await projectService.verify(req.params.projectId)
    if (project.exists) {
        const task = await taskService.verify(req.params.taskId)
        if (task.exists) {
            let taskToUpdate = await taskService.updateAsync(task.data.id, req.body)
            if (taskToUpdate.isUpdated) {
                res.status(OK.Status204).send();
            } else {
                res.status(ERROR_CLIENT.Status400).send({ error: taskToUpdate.message })
            }
        } else {
            res.status(ERROR_CLIENT.Status409).send({ error: task.message });
        }
    } else {
        res.status(ERROR_SERVER.Status500).send({ error: project.message })
    }
}


export const DeleteAsync = async (req, res) => {
    let project = await projectService.verify(req.params.projectId)
    if (project.exists) {
        const task = await taskService.verify(req.params.id)
        if (task.exists) {
            if (req.params.workspaceId === task.data.workspaceId) {

                let taskToDelete = await taskService.deleteAsync(task.data.id)
                if (taskToDelete.isDelete) {
                    res.status(OK.Status204).send();
                } else {
                    res.status(ERROR_CLIENT.Status400).send({ error: taskToDelete.message })
                }
            }
        } else {
            res.status(ERROR_CLIENT.Status409).send({ error: task.message });
        }
    } else {
        res.status(ERROR_SERVER.Status500).send({ error: project.message })
    }
}



