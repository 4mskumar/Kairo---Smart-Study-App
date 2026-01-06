import { json } from "express";
import { convertToMinutes } from "../lib/TimeToHours.js";
import { getWeekStart } from "../lib/weekStart.js";
import { StudySession } from "../models/studySession.js";
import { WeeklyGoal } from "../models/weeklyGoal.js";
import mongoose from "mongoose";
import { User } from "../models/userModel.js";
import { createRevisionsForSession } from "../revision.js";

export const addStudyLog = async (req, res) => {
  try {
    const { topic, duration, userId, tags, subject } = req.body;

    if (!subject || !duration || !topic) {
      return res.status(400).json({ success: false, message: "Missing fields" });
    }

    const weekStart = getWeekStart();
    const durationMinutes = Number(duration); // 🔒 enforce minutes

    const log = await StudySession.create({
      topic,
      subject,
      user: userId,
      duration: durationMinutes,
      tags,
    });
    // console.log(log);
    

    await createRevisionsForSession(log)

    // ✅ GUARANTEED update or create
    await WeeklyGoal.findOneAndUpdate(
      { user: userId, weekStart },
      {
        $inc: { achievedMinutes: durationMinutes },
        $setOnInsert: {
          user: userId,
          weekStart,
          targetMinutes: 0, // until user sets goal
        },
      },
      { upsert: true }
    );

    res.status(201).json({
      success: true,
      message: "Log created successfully",
      newLog: log,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


export const editLog = async (req, res) => {
  try {
    console.log('Request body:', req.body);

    const { userId, topic, tags, subject, duration, studyLogId } = req.body;

    if (!userId || !studyLogId) {
      return res.status(404).json({ message: "userId or studyLogId not defined" });
    }
    console.log('working fine');

    const updatedLog = await StudySession.findOneAndUpdate(
      { _id: studyLogId, user : userId },  // Correct usage
      { topic, duration : Number(duration) , tags, subject },
      { new: true }
    );

    if (!updatedLog) {
      return res.status(404).json({ success: false, message: "Log not found or unauthorized" });
    }

    return res.status(202).json({ success: true, message: 'Your log has been updated!! 👍', newLog: updatedLog });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};


export const deleteLog = async (req, res) => {
  try {
    const { userId, studyLogId } = req.body;

    if (!userId || !studyLogId) {
      return res.status(400).json({
        success: false,
        message: "userId and studyLogId required",
      });
    }

    // 1️⃣ Find the log FIRST (to get duration)
    const log = await StudySession.findOne({
      _id: studyLogId,
      user: userId,
    });

    if (!log) {
      return res.status(404).json({
        success: false,
        message: "Study log not found",
      });
    }

    const duration = Number(log.duration);

    // 2️⃣ Delete the log
    await StudySession.deleteOne({ _id: studyLogId });

    // 3️⃣ Update weekly goal (subtract duration)
    const weekStart = getWeekStart();

    await WeeklyGoal.findOneAndUpdate(
      { user: userId },
      {
        $inc: { achievedMinutes: -duration },
      },
      { new: true }
    );

    // 4️⃣ Fetch updated logs (FIXED field name)
    const updatedStudyLogs = await StudySession.find({
      user: userId,
    }).lean();

    return res.status(200).json({
      success: true,
      studyLogs: updatedStudyLogs,
      message: "Log deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const addWeekHourGoals = async (req, res) => {
  try {
    const { userId, targetHours } = req.body;

    const weekStart = getWeekStart();

    const goal = await WeeklyGoal.findOneAndUpdate(
      { user: userId, weekStart },
      {
        user: userId,
        weekStart,
        targetHours,
      },
      { new: true, upsert: true }
    );

    res.status(200).json({
      success: true,
      message: "Weekly goal set successfully",
      weekGoal: goal,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


export const addTodo = async (req, res) => {
  try {
    const { taskName, priority = "Medium", userId } = req.body;
    // const userId = req.user.userId; // 🔥 middlew/are se

    if (!taskName) {
      return res.status(400).json({ success: false, message: "Task name required" });
    }

    const user = await User.findOne({ userId });

    const exists = user.todos.some(todo => todo.taskName === taskName);
    if (exists) {
      return res.status(409).json({ success: false, message: "Task already exists" });
    }

    user.todos.push({
      taskName,
      priority,
      completed: false,
    });

    await user.save();

    res.status(201).json({
      success: true,
      message: "Todo added",
      todos: user.todos,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


export const deleteTodo = async (req, res) => {
  try {
    const { id, userId } = req.body;

    if (!userId || !id) {
      return res.status(400).json({
        success: false,
        message: "userId and todo id are required",
      });
    }

    const user = await User.findOneAndUpdate(
      { userId },
      {
        $pull: {
          todos: { _id: id }, // 🔥 correct way
        },
      },
      { new: true }
    ).select("todos");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Your task is deleted",
      todos: user.todos,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



  export const getAllTodos = async (req, res) => {
    try {
      const {userId} = req.query;
  
      const user = await User.findOne({ userId }).select("todos");
  
      res.status(200).json({
        success: true,
        allTodos: user.todos,
      });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  };
  
export const getAllStudyLogs = async (req, res) => {
  try {
    const { userId } = req.query
    const studyLogs = await StudySession.find({
      user: userId
    })



    if (!studyLogs) {
      return res.status(404).json({ message: 'Can"t find any todos', success: false })
    }

    return res.status(201).json({ studyLogs, success: true })

  } catch (error) {
    return res.status(500).json({ message: error.message, success: false })
  }
}

// controllers/weeklyGoalController.js
export const fetchUserWeek = async (req, res) => {
  try {
    const { id } = req.query;

    const response = await WeeklyGoal.findOne({ _id: id });

    if (!response) {
      return res.status(404).json({
        message: "No weekly goal found",
        weekGoal: null,
        success: true,
      });
    }

    return res.status(200).json({
      message: "Target fetched successfully",
      weekGoal: response,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};

export const fetchDailyAndMonthlyMinutes = async (req, res) => {
  try {
    const { userId } = req.query; // string

    if (!userId) {
      return res.status(400).json({ success: false, message: "userId required" });
    }

    // ✅ FORCE UTC start of day
    const startOfToday = new Date();
    startOfToday.setUTCHours(0, 0, 0, 0);

    const startOfMonth = new Date();
    startOfMonth.setUTCDate(1);
    startOfMonth.setUTCHours(0, 0, 0, 0);

    const todayLogs = await StudySession.aggregate([
      {
        $match: {
          user: userId, // ✅ string match
          createdAt: { $gte: startOfToday },
        },
      },
      {
        $group: { _id: null, total: { $sum: "$duration" } },
      },
    ]);

    const monthLogs = await StudySession.aggregate([
      {
        $match: {
          user: userId,
          createdAt: { $gte: startOfMonth },
        },
      },
      {
        $group: { _id: null, total: { $sum: "$duration" } },
      },
    ]);
    

    res.json({
      success: true,
      todayMinutes: todayLogs[0]?.total || 0,
      monthMinutes: monthLogs[0]?.total || 0,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};


export const fetchStreak = async (req, res) => {
  try {
    const { userId } = req.query;
    if (!userId) return res.status(400).json({ success: false, message: "userId required" });

    // fetch last 30 days logs
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 30);

    const logs = await StudySession.find({
      user: userId,
      createdAt: { $gte: startDate }
    }).sort({ createdAt: -1 });

    // extract study dates (unique days)
    const days = [...new Set(logs.map(l => l.createdAt.toISOString().split("T")[0]))];

    let streak = 0;
    let currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    // walk backwards day by day
    while (days.includes(currentDate.toISOString().split("T")[0])) {
      streak++;
      currentDate.setDate(currentDate.getDate() - 1); // move one day back
    }

    res.json({ success: true, streak });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getUserActivity = async (req, res) => {
  try {
    const { userId } = req.query;

    const sessions = await StudySession.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(userId) } },
      {
        $group: {
          _id: { $dayOfWeek: "$createdAt" },
          totalMinutes: { $sum: "$duration" },
        },
      },
    ]);

    const todos = await UserTodo.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(userId), completed: true } },
      {
        $group: {
          _id: { $dayOfWeek: "$createdAt" },
          completedCount: { $sum: 1 },
        },
      },
    ]);

    // 3️⃣ Format results into { day: "Mon", studyHours, todosDone }
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const activity = days.map((day, index) => {
      const study = sessions.find((s) => s._id === index + 1);
      const todo = todos.find((t) => t._id === index + 1);
      return {
        day,
        studyHours: study ? Math.round(study.totalMinutes / 60) : 0,
        todosDone: todo ? todo.completedCount : 0,
      };
    });

    // console.log(activity);


    res.json({ success: true, activity });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const markCompleted = async (req, res) => {
  try {
    const quotes = [
      "✨ Bravo! Task slayer in action! 💪",
      "🔥 You just crushed it like a pro!",
      "🌟 One step closer to greatness 🚀",
      "🎉 Woohoo! Another victory in the bag 🎯",
      "😎 Damn, productivity looks good on you!",
      "🌈 Keep shining, superstar ⭐",
      "🍀 Every task done = more peace unlocked 🧘‍♂️",
      "💡 Genius at work, keep it going!",
      "🦾 You’re unstoppable, one todo at a time!",
      "🎶 Victory dance unlocked — play your jam!"
    ];

    const { userId, taskName } = req.body;

    if (!userId || !taskName) {
      return res.status(400).json({
        success: false,
        message: "userId and taskName required",
      });
    }

    const user = await User.findOneAndUpdate(
      {
        userId,
        "todos.taskName": taskName,
      },
      {
        $set: { "todos.$.completed": true },
      },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Todo not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: quotes[Math.floor(Math.random() * quotes.length)],
      todos: user.todos, // send updated todos if you want
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


export const setUserDetails = async (req, res) => {
  try {
    const {userId, profilePic, email, streak, highestStreak} = req.body
    if (!userId || !profilePic || !email) {
      res.status(404).json({message : "All field are required", success : false})
    }
    const user = await User.findOneAndUpdate({userId}, {profilePic, email, streak, highestStreak}, {new : true})
    if (!user) {
      const newUser = await User.create({userId, profilePic, email, streak, highestStreak})
      if (!newUser) {
        return res.status(404).json({message: "User not created", success: false})
      }
      return res.status(200).json({message: "User details updated successfully", success: true, newUser})
    }
    res.status(200).json({message : "User details updated successfully", success : true, user})
  } catch (error) {
    res.status(500).json({message : error.message, success : false})
  }
}

export const getUserDetails = async (req, res) => {
  try {
    // const {userId} = req.query
    // if (!userId){
    //   return res.status(404).json({message: "Users ID is required", success: false})
    // }
    const user = await User.findById(req.user._id)
    res.status(200).json({message: "User details fetched successfully", success: true, user})
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};