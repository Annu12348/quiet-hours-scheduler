import dotenv from "dotenv"
dotenv.config()

export const config = {
    PORT:process.env.PORT,
    MONGODB_URL:process.env.MONGODB_URL,
    JWT_SECRET_KEY:process.env.JWT_SECRET_KEY,
    EMAIL_USER:process.env.EMAIL_USER,
    EMAIL_SECRET_KEY:process.env.EMAIL_SECRET_KEY,
}