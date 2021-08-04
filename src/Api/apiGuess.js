import { GuessClient } from './clients/guessClient';
let token;
const guessClient = new GuessClient(process.env.REACT_APP_ApiBaseUrl, token);

// GUESSSES
export const getGuess = async (email, projectId) => {
    return await guessClient.getByEmail(email, projectId)
}

export const createGuess = async (email, projectId) => {
    return await guessClient.post(email, projectId)
}

export const deleteGuess = async (guessId, projectId) => {
    return await guessClient.delete(guessId, projectId)
}
