import { ERROR_CLIENT, OK } from '../http/status'
import { ModelService } from '../services/modelService'
import User from '../models/user'
import Task from '../models/task'
import User_Task from '../models/user_task'
const userService = new ModelService(User)
const taskService = new ModelService(Task)
const userTaskService = new ModelService(User_Task)

export const GetAllTaskByUserAsync = async (req, res) => {
    const user = await userService.verify(req.params.userId)
    if (user.exists) {
        let tasks = await Task.findAll({ where: { isDeleted: false, UserId: req.params.userId }, include: Task })
        if (tasks.length) {
            res.status(OK.Status200).send(tasks)
        } else {
            res.status(ERROR_CLIENT.Status404).send({ error: "Not task for user" })
        }
    } else {
        res.status(ERROR_CLIENT.Status404).send({ error: user.message });
    }
}

export const GetAllUserByTaskAsync = async (req, res) => {
    const task = await taskService.verify(req.params.taskId)
    if (task.exists) {
        let users = await User.findAll({ where: { isDeleted: false, UserId: req.params.taskId }, include: User })
        if (users.length) {
            res.status(OK.Status200).send(tasks)
        } else {
            res.status(ERROR_CLIENT.Status404).send({ error: "Not task for user" })
        }
    } else {
        res.status(ERROR_CLIENT.Status404).send({ error: task.message });
    }
}

export const AddAsync = async (req,  res) => {
    const user = await userService.verify(req.body.UserId)
    if (user.exists) {
        const task = await taskService.verify(req.body.TaskId)
        if (task.exists) {
            let new_user_task = User_Task.build({ UserId: req.body.UserId, TaskId: req.body.TaskId, isDeleted: false })
            new_user_task.save()
            res.status(OK.Status201).send(new_user_task)
        } else {
            res.status(ERROR_CLIENT.Status400).send({ error: task.message })
        }
    } else {
        res.status(ERROR_CLIENT.Status409).send({ conflict: user.message })
    }
}

export const DeleteAsync = async (req, res) => {
    const user_task = await userTaskService.verify(req.params.userTaskId)
    if (user_task.exists) {
        let userTaskToDelete = await userTaskService.deleteAsync(user_task.data.id)
        if (userTaskToDelete.isDelete) {
            res.status(OK.Status204).send();
        } else {
            res.status(ERROR_CLIENT.Status400).send({ error: userToDelete.message })
        }
    } else {
        res.status(ERROR_CLIENT.Status409).send({ error: user.message });
    }
}



