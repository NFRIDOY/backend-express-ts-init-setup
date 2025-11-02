import config from "../config";
import AppError from "../errors/AppError";

const nodemailer = require("nodemailer");

// Create a test account or replace with real credentials.
const transporter = nodemailer.createTransport({
    host: config.email_host,
    port: config.email_port,
    secure: config.email_secure, // true for 465, false for other ports
    auth: {
        user: config.email_user,
        pass: config.email_app_password,
    },
});

export interface IEmail {
    from: string;
    to: string;
    subject: string;
    text?: string;
    html?: string;
}

// Wrap in an async IIFE so we can use await.
export const emailSender = async (emailObj: IEmail) => {
    try {
        const info = await transporter.sendMail({
            from: emailObj?.from,
            to: emailObj?.to,
            subject: emailObj?.subject,
            text: emailObj?.text,
            html: emailObj?.html,
        });
    
        console.log("Message sent:", info.messageId);
    } catch (err) {
        throw new AppError(500, 'Error on Email Sender')
    }
}