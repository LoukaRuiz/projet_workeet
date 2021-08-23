import dotenv from "dotenv";
import nodemailer from 'nodemailer';
dotenv.config()

export const transporter = nodemailer.createTransport({
    service: "gmail", // hostname
    secure: false, // use SSL
    port: 25, // port for secure SMTP
    auth: {
        user: `${process.env.EMAIL}`,
        pass: `${process.env.EMAIL_ACCESS}`
    },
    tls: {
        rejectUnauthorized: false
    }
});

export const mailOptions = (to, username, message) => {
    return {
        from: `${process.env.EMAIL}`,
        to: `${to}`,
        subject: "Email d'invitation - Workeet",
        text: "mail depuis nodejs",
        html: `
      <h1>Bienvenue ${username} à Workeet</h1>  
      <div style="width: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center;">
        ${message}
      </div>
    `
    }
};

export const mailOptionsConfirmation = (to, username, link, uuid) => {

    return {
        from: `${process.env.EMAIL}`,
        to: `${to}`,
        subject: "Email de confirmation - Eat delivery",
        text: "mail depuis nodejs",
        html: `
      <h1>Hello ${username}!!</h1>
      <h2>Votre commande ${uuid} va arriver bientôt</h2>  
      <h3>Voici le panier en details...</h3>
      <div style="width: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center;">
        <img src="${link}" style="width: 500px"/>
      </div>
    `
    }
};

export const mailOptionsConfirmationResto = (to, username, link, uuid) => {

    return {
        from: `${process.env.EMAIL}`,
        to: `${to}`,
        subject: "Email de confirmation - Eat delivery",
        text: "mail depuis nodejs",
        html: `
      <h1>Hello ${username}!!</h1>
      <h2>La commande ${uuid} viens d'arriver..</h2>  
      <h3>Voici le panier en details...</h3>
      <div style="width: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center;">
        <img src="${link}" style="width: 500px"/>
      </div>
    `
    }
};