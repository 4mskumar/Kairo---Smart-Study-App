import mongoose from "mongoose";

const weeklyGoalSchema = new mongoose.Schema({
  user: {
    type: String
  },
  // user: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "User",
  //   required: true,
  //   index: true,
  // },

  weekStart: { type: Date, required: true },
  targetHours: { type: Number, required: true },
  achievedMinutes: { type: Number, default: 0 },
}, { timestamps: true });

export const WeeklyGoal = mongoose.model("WeeklyGoal", weeklyGoalSchema);