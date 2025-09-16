import mongoose from "mongoose";
import { body, validationResult } from "express-validator";

export const registerValidation = [
    body("name")
    .notEmpty()
    .withMessage("name is required")
    .isLength({ min: 3, max: 20 })
    .withMessage("name must be between 3 and 20 characters"),

    body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("email must be a valid email address"),

    body("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 8, max: 20 })
    .withMessage("password must be between 3 and 20 characters")
    .matches(/[0-9]/).withMessage("Password must contain a number")
    .matches(/[A-Z]/)
    .withMessage("Password must contain an uppercase letter")
    .matches(/[a-z]/)
    .withMessage("Password must contain a lowercase letter"),

    (req, res, next) => {
        const errors  = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array()
            })
        }
        next()
    }
   
]