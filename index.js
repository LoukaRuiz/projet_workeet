import dotenv from "dotenv";
import app from './api'
dotenv.config()

const fs = require('fs');
const https = require('https');
const privateKey = fs.readFileSync('/etc/letsencrypt/live/workeet.api.nibaldonoso.fr/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/workeet.api.nibaldonoso.fr/fullchain.pem', 'utf8');
const credentials = { key: privateKey, cert: certificate };

let httpsServer = https.createServer(credentials, app);

httpsServer.listen(process.env.DB_PORT, () => {
  	console.log(`listening in http://localhost:` + process.env.DB_PORT)
})