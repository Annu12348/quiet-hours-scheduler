import mongoose from "mongoose";
import { config } from "../config/config.js";



import '../controller/scheduler.controller.js'


function databaseconnection() {
    mongoose.connect(config.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("mongoose connected successfully")
    })
    .catch((error) => {
        console.error("Mongoose connection error:", error)
    })
}

export default databaseconnection;