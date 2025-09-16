import mongoose from "mongoose";
import { body, validationResult } from "express-validator";

export const blockValidator = [
  body("title")
    .notEmpty()
    .withMessage("title is required")
    .isLength({ min: 3, max: 700 })
    .withMessage("title must be between 3 and 700 characters"),

    body("startTime")
    .notEmpty()
    .withMessage("Start time is required")
    .isISO8601()
    .withMessage("Start time must be a valid date"),

  body("endTime")
    .notEmpty()
    .withMessage("End time is required")
    .isISO8601()
    .withMessage("End time must be a valid date")
    .custom((value, { req }) => {
      if (new Date(value) <= new Date(req.body.startTime)) {
        throw new Error("End time must be after start time");
      }
      return true;
    }),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(401).json({
        errors: errors.array(),
      });
    }
    next();
  },
];
