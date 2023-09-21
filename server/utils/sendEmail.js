import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";
import { hashString } from "./index.js";
import Verification from "../models/emailVerification.js";

dotenv.config();

const {
    AUTH_EMAIL,
    AUTH_PASSWORD,
    APP_URL

} = PROCESS.env;

let transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    auth: {
        user: AUTH_EMAIL,
        pass: AUTH_PASSWORD,
    }


})

export const sendVerificationEmail = async (user, res) => {

    const { _id, email, firstName } = user;

    const token = _id + uuidv4();

    const link = APP_URL + "users/verify/" + _id + "/" + token;

    //mail options

    const mailOptions = {
        from: AUTH_EMAIL,
        to: email,
        subject: `Verify your account`,
        html: `<div style="font-family: Arial, Helvetica, sans-serif; font-size: 20px; color: #333; background-color: white;">
        <h1 style="color:rgb(8,56,188)">Please Verify Your Email Address</h1>
        <hr>
        <h4>Hi ${firstName},</h4>
        <p>Please verify your email address so we can know that it's really you.
            <br>
        <p>This link <b>expires in 1 hour</b></p>
        <br>
        <a href="${link}" style="color:#fff;padding:14px; text-decoration:none; background-color: #000;">Verify Now!</a>
        </p>
        <div style="margin-top: 20px;">
            <h5>Best Regards</h5>
            <h5>Connectify Team</h5>
    
        </div>
    
    </div>`,
    };

    try {
        const hashedToken = await hashString(token);

        const newVerifiedEmail = await Verification.create({
            userId: _id,
            token: hashedToken,
            createdAt: Date.now(),
            expiresAt: Date.now() + 3600000,
        });

        if(newVerifiedEmail){
            transporter.sendMail(mailOptions).then(()=>{
                res.status(201).send({
                    success: "PENDING",
                    message: "Verification email has been sent to your account. Check you mail for further instructions"
                })

            }).catch((err)=>{
                console.log(err);
                res.status(404).json({message: "Something went wrong"});
            })

        }

    }
    catch (error) {
        console.log(error);
        res.status(404).json({ message: "Something went wrong" })
    }

};

