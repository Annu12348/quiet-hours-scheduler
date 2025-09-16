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

export const listBlocks = async (req, res) => {
  try {
    const userId = req.user && req.user._id;
    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized: User not authenticated",
      });
    }

    const blocks = await blockModel.find({ userId }).sort({ startTime: 1 });

    return res.status(200).json({
      message: "Blocks fetched successfully",
      blocks,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error. Please try again later.",
    });
  }
};

export const updateController = async (req, res) => {
  try {
    const userId = req.user && req.user._id;
    const blockId = req.params.blockId;

    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized: User not authenticated",
      });
    }

    if (!blockId) {
      return res.status(400).json({
        message: "Block ID is required",
      });
    }

    const blocks = await blockModel.findOne({ _id: blockId, userId });
    if (!blocks) {
      return res.status(404).json({
        message: "Block not found or not authorized to update",
      });
    }

    const { title, startTime, endTime } = req.body;
    const block = await blockModel.findOneAndUpdate({_id: blockId, userId}, {title,startTime, endTime}, {new: true})

    res.status(200).json({
      message: "Updated block successfully",
      block,
    })
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Internal server error. Please try again later.",
    });
  }
}


export const deleteController = async (req, res) => {
  try {
    const userId = req.user && req.user._id;
    
    const blockId = req.params.blockId;
    

    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized: User not authenticated",
      });
    }

    if (!blockId) {
      return res.status(400).json({
        message: "Block ID is required",
      });
    }

    const deletedBlock = await blockModel.findOneAndDelete({ _id: blockId, userId });

    if (!deletedBlock) {
      return res.status(404).json({
        message: "Block not found or not authorized to delete",
      });
    }

    res.status(200).json({
      message: "Deleted block successfully",
      block: deletedBlock,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Internal server error. Please try again later.",
    });
  }
}