import { ERROR_SERVER, OK } from "../http/status";
import { mailOptions, transporter } from "../services/email";


export function sendMail(req, res) {
    transporter.sendMail(mailOptions(req.params.email, req.params.username, req.body.message), function (error, info) {
        if (error) {
            res.status(ERROR_SERVER.Status500).json({ message: "mail non envoyé" });
        }
    });
    transporter.close();
    res.status(OK.Status200).json({ message: "mail envoyé" });

}