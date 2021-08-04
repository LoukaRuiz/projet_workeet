import { EmailClient } from './clients/emailClient';
let token;
const emailClient = new EmailClient(process.env.REACT_APP_ApiBaseUrl, token);

// SEND EMAIL
export const sendEmail = async (username, email, projectId) => {
    return await emailClient.send(username, email, projectId)
}