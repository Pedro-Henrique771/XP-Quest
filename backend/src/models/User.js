import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    //   lowercase: true
    },
    password: {
      type: String,
      required: true,
    },
    xp: {
      type: Number,
      default: 0,
    },
    nivel: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;