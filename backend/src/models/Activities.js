import mongoose from "mongoose";

const activitySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    action: {
      type: String,
      required: true,
    },
    minutes: {
      type: Number,
      required: true,
      default: 0,
    },
    xpBase: {
      type: Number,
      required: true,
      default: 0,
    },
    xpBonus: {
      type: Number,
      required: true,
      default: 0,
    },
    xpGained: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Activity = mongoose.model("Activity", activitySchema);

export default Activity;