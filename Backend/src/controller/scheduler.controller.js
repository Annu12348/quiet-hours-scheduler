import cron from "node-cron";
import nodemailer from "nodemailer";
import { config } from "../config/config.js";
import blockModel from "../models/blocks.model.js";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: config.EMAIL_USER,
    pass: config.EMAIL_SECRET_KEY,
  },
});

cron.schedule("* * * * *", async () => {
    console.log("Cron job running at:", new Date());
  try {
    const now = new Date();
    const tenMinutesLater = new Date(now.getTime() + 10 * 60000);

    const blocks = await blockModel
      .find({
        reminderSent: false,
        startTime: { $gte: now, $lte: tenMinutesLater },
      })
      .populate("userId"); 

      console.log("Blocks found for reminder:", blocks); 

    for (const block of blocks) {
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: block.userId.email, 
        subject: "Quiet Hours Reminder",
        text: `Hi ${block.userId.name || ""},\n\nYour block "${
          block.title
        }" will start at ${block.startTime.toLocaleTimeString()}.\nStay quiet and focused!`,
      };

      await transporter.sendMail(mailOptions);

     
      block.reminderSent = true;
      await block.save();
      console.log(`Reminder sent and updated for block: ${block._id}`);
    }
  } catch (err) {
    console.error("Error in sending reminders:", err);
  }
});
