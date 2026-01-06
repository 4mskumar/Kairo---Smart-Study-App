import { create } from "zustand";
// import api from "api";
import { toast } from "sonner";
import { api } from "../api/axiosConfig.js";

export const useStudyStore = create((set) => ({
  studyLogs: [],
  target: 0,
  minutes: 0,
  todayMinutes: 0,
  monthMinutes: 0,
  streak: 0,
  loading: false,
  error: null,

  // ------------------------------
  // Add Study Log
  // ------------------------------
  addStudyLog: async (duration, topic, tags, userId, subject) => {
    try {
      const res = await api.post("/add-log", {
        duration,
        topic,
        tags,
        userId,
        subject,
      });

      if (res.data.success) {
        console.log(res.data);

        set((state) => ({
          studyLogs: [res.data.newLog, ...state.studyLogs],
          minutes: state.minutes + res.data.newLog.duration, // ✅ keep minutes in sync
        }));
        return { success: true, message: res.data.message };
      } else {
        return { success: false, message: res.data.message };
      }
    } catch (error) {
      return { success: false, message: error.message };
    }
  },

  deleteLog: async (id, userId) => {
    set({ loading: true })
    console.log(id, userId);

    try {
      const res = await api.post('/delete-log', { studyLogId: id, userId })

      if (res.data.success) {
        set((state) => ({
          studyLogs: state.studyLogs.filter((log) => log._id !== id),
          loading: false
        }));
        toast(res.data.message, {
          className: "animate-bounce bg-green-100 text-green-700 font-semibold shadow-md rounded-xl",
        });
        return { success: true };
      } else {
        set({ loading: false, error: res.data.message });
        return { success: false };
      }
    } catch (error) {

      return { success: false, message: error.message }
    }
  },
  editLog: async (duration, topic, tags, userId, subject, id) => {
    set({ loading: true });
    // console.log(duration, topic, tags, userId, subject, id);



    try {
      const res = await api.post('/edit-log', {
        userId,
        studyLogId: id,
        topic,
        subject,
        duration,
        tags
      });

      if (res.data.success) {
        set((state) => ({
          studyLogs: state.studyLogs.map((log) =>
            log._id === id ? res.data.newLog : log
          ),
          loading: false,
        }));
        return { success: true, message: res.data.message };
      }
      else {
        set({ loading: false, message: res.data.message });
        return { success: false };
      }
    } catch (error) {
      return { success: false, message: error.message };
    }
  },


  // ------------------------------
  // Fetch Logs
  // ------------------------------
  fetchStudyLog: async (userId) => {
    set({ loading: true, error: null });
    try {
      console.log('fetch called');

      const res = await api.get("/get-logs", { params: { userId } });
      // console.log(res.data);

      if (res.data.success) {
        set({
          studyLogs: res.data.studyLogs,
          loading: false,
        });
        return { success: true };
      } else {
        return { success: false, message: res.data.message };
      }
    } catch (error) {
      return { success: false, message: error.message };
    }
  },

  // ------------------------------
  // Fetch Weekly Target
  // ------------------------------
  fetchTarget: async (id) => {
    set({ loading: true, error: null });
    try {
      const res = await api.get("/get-target", { params: { id } });

      // ✅ Make sure backend returns this structure
      const usertarget =
        res.data.weekGoal?.targetHours
      
      const achieved = res.data.weekGoal?.achievedMinutes || 0;

      // console.log(res);


      set({
        minutes: achieved,
        target: usertarget,
        loading: false,
      });

      return { success: true, minutes: achieved, target: usertarget };
    } catch (error) {
      set({ loading: false, error: error.message });
      return { success: false, message: error.message };
    }
  },

  // ------------------------------
  // Fetch Daily + Monthly Minutes
  // ------------------------------
  fetchDailyAndMonthly: async (userId) => {
    set({ loading: true, error: null });
    try {
      const res = await api.get("/get-daily-monthly", { params: { userId } });

      set({
        todayMinutes: res.data.todayMinutes || 0,
        monthMinutes: res.data.monthMinutes || 0,
        loading: false,
      });

      return { success: true };
    } catch (error) {
      set({ loading: false, error: error.message });
      return { success: false, message: error.message };
    }
  },

  // ------------------------------
  // Fetch Streak
  // ------------------------------
  fetchStreak: async (userId) => {
    try {
      const res = await api.get("/get-streak", { params: { userId } });
      set({ streak: res.data.streak || 0 });
    } catch (error) {
      console.error("Error fetching streak:", error.message);
    }
  },
}));
