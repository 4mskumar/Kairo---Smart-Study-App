import mongoose from "mongoose";

const revisionSchema = new mongoose.Schema({
  user: { type: String, required: true }, // Clerk userId
  studySessionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "StudySession",
    required: true,
  },

  subject: { type: String, required: true },
  topic: { type: String, required: true },

  revisionNumber: { type: Number, required: true }, // 1st, 2nd, 3rd revision
  dueDate: { type: Date, required: true },

  completed: { type: Boolean, default: false },
  completedAt: { type: Date },

  createdAt: { type: Date, default: Date.now },
});

export const Revision = mongoose.model("Revision", revisionSchema);
