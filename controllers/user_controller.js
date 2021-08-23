import { ERROR_CLIENT, ERROR_SERVER, OK } from '../http/status'
import { ModelService } from '../services/modelService'
import User from '../models/user'
import Workspace from '../models/workspace'
import Project from '../models/project'
const userService = new ModelService(User)
const projectService = new ModelService(Project)

export const GetByIdAsync = async (req, res) => {
    const user = await userService.verify(req.params.userId)
    if (user.exists) {
        res.status(OK.Status200).send(user.data)
    } else {
        res.status(ERROR_CLIENT.Status404).send({ error: user.message });
    }
}

export const GetByEmailAsync = async (req, res) => {
    const user = await userService.verifyByEmail(req.params.email, Workspace)
    if (user.exists) {
        res.status(OK.Status200).send(user.data)
    } else {
        res.status(ERROR_CLIENT.Status404).send({ error: user.message });
    }
}

export const GetAllAsync = async (req, res) => {
    let project = await projectService.verify(req.params.projectId)
    if (project.exists) {
        const all = await Project.findOne({ where: { id: req.params.projectId, isDeleted: false }, include: User });
        if (all) {
            return res.status(OK.Status200).send(all)
        } else {
            res.status(ERROR_CLIENT.Status404).send({ message: `${Project.toString()} not found` });
        }
    } else {
        res.status(ERROR_SERVER.Status500).send({ error: project.message })
    }
}


export const AddAsync = async (req,  res) => {
    const user = await userService.verify(req.params.userId)
    if (!user.exists) {
        let user_ = {}
        for (let key of Object.keys(req.body)) {
            if (key !== "id") {
                user_[key] = req.body[key];
            }
        }

        const newUser = await userService.AddAsync(user_)
        if (newUser.isAdded) {
            res.status(OK.Status201).send(newUser.data)
        } else {
            res.status(ERROR_CLIENT.Status400).send({ error: newUser.message })
        }
    } else {
        res.status(ERROR_CLIENT.Status409).send({ conflict: user.message })
    }
}

export const UpdatedAsync = async (req, res) => {
    const user = await userService.verify(req.params.userId)
    if (user.exists) {
        let userToUpdate = await userService.updateAsync(user.data.id, req.body)
        if (userToUpdate.isUpdated) {
            res.status(OK.Status204).send();
        } else {
            res.status(ERROR_CLIENT.Status400).send({ error: userToUpdate.message })
        }
    } else {
        res.status(ERROR_CLIENT.Status409).send({ error: user.message });
    }
}

export const DeleteAsync = async (req, res) => {
    const user = await userService.verify(req.params.userId)
    if (user.exists) {
        let userToDelete = await userService.deleteAsync(user.data.id)
        if (userToDelete.isDelete) {
            res.status(OK.Status204).send();
        } else {
            res.status(ERROR_CLIENT.Status400).send({ error: userToDelete.message })
        }
    } else {
        res.status(ERROR_CLIENT.Status409).send({ error: user.message });
    }
}



