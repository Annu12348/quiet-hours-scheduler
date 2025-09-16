import { validationResult } from "express-validator";
import blockModel from "../models/blocks.model.js";


export const blockController = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }

    const { title, startTime, endTime } = req.body;
    const userId = req.user && req.user._id;

    if (!title || !startTime || !endTime) {
        return res.status(400).json({
            message: "Title, startTime, and endTime are required."
        });
    }

    const block = await blockModel.create({
        userId,
        title,
        startTime,
        endTime,
      });

    res.status(201).json({
        message: "Block created successfully.",
        block,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error. Please try again later.",
    });
  }
};
