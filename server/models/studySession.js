// models/studySession.js
import mongoose from "mongoose";

const studySessionSchema = new mongoose.Schema({
  // user: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "User",
  //   required: true,
  //   index: true,
  // },
  user: {
    type: String,  
  },

  subject: { type: String, required: true },
  topic: String,
  duration: { type: Number, required: true }, // minutes
  tags: [String],
  createdAt: { type: Date, default: Date.now },
});

export const StudySession = mongoose.model("StudySession", studySessionSchema);
