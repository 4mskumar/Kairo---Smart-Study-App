import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userId: { type: String, required: true, unique: true }, // Clerk userId
    email: { type: String, required: true, unique: true }, // Clerk userId
    profilePic: { type: String },
    name : String,
    achievments: [
        {
            title: { type: String },
            badge: { type: String },
            createdAt: { type: Date, default: Date.now },
        }
    ],
    streak: { type: Number, default: 0 },
    highestStreak: { type: Number, default: 0 },
    todos: [
        {
            taskName: { type: String, required: true }, // e.g. Monday of that week
            completed: { type: Boolean, default: false }, // user’s goal (in hours) 
            priority: { type: String, enum: ["Low", "Medium", "High"], default: "Medium" },
        }
    ],
    reminder: [
        {
            reminderName: { type: String, required: true }, // e.g. Monday of that week
            upcoming: { type: Boolean, default: true }, // user’s goal (in hours)         
            date: { type: Date },
        }
    ],
});

export const User = mongoose.model("user", userSchema);
