import mongoose from "mongoose"

const blockSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    startTime: {
      type: Date,
      required: true,
      unique: true,
    },
    endTime: {
      type: Date,
      required: true,
      unique: true,
      validate: {
        validator: function (value) {
          return value > this.startTime; // endTime must be greater
        },
        message: "End time must be after start time",
      },
    },
    reminderSent: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true } 
);

const blockModel = mongoose.model("block", blockSchema);
export default blockModel;