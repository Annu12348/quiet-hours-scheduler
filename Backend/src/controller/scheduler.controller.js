import cron from "node-cron"
import nodemailer from "nodemailer"

export const transporter = nodemailer.createTransport({
    service: "gmail", 
    auth: {
        
    }
})