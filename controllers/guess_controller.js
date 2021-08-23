import { ERROR_CLIENT, OK } from "../http/status";
import Guess from "../models/guess";
import Project from "../models/project";
import { ModelService } from '../services/modelService'
const guessService = new ModelService(Guess)
const projectService = new ModelService(Project)

export const GetByIdAsync = async (req, res) => {
    const guess = await guessService.verifyByEmail(req.params.email)
    if (guess.exists) {
        let projectGuess = await Guess.findOne({ where: { isDeleted: false, email: req.params.email, projectId: req.params.projectId }})
        if(projectGuess.id) {
            res.status(OK.Status200).send(projectGuess)
        }
    } else {
        res.status(ERROR_CLIENT.Status404).send({ error: guess.message });
    }
}

export const AddAsync = async (req, res) => {
    const user = await guessService.verifyByEmail(req.body.email)
    if (!user.exists) {
        const newUser = await guessService.AddAsync(req.body)
        if (newUser.isAdded) {
            res.status(OK.Status201).send(newUser.data)
        } else {
            res.status(ERROR_CLIENT.Status400).send({ error: newUser.message })
        }
    } else {
        res.status(ERROR_CLIENT.Status409).send({ conflict: user.message })
    }
}

export const DeleteAsync = async (req, res) => {
    const guess = await guessService.verify(req.params.guessId)
    if (guess.exists) {
        let projects = await projectService.verify(req.params.projectId)
        if (projects.exists) {
            let guessToDelete = await guessService.deleteAsync(guess.data.id)
            if (guessToDelete.isDelete) {
                res.status(OK.Status204).send();
            }else{
                res.status(ERROR_CLIENT.Status409).send({ error: guessToDelete.message })
            }
        } else {
            res.status(ERROR_CLIENT.Status400).send({ error: projects.message })
        }
    } else {
        res.status(ERROR_CLIENT.Status409).send({ error: guess.message });
    }
}