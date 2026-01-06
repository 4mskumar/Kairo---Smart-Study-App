import { create } from "zustand";
import {api} from '../api/axiosConfig.js'

export const useRevisionStore = create((set) => ({
  upcoming: [],
  today: [],
  overdue: [],
  loading: false,

  fetchAll: async (userId) => {
    set({ loading: true });

    try {
      const [upcoming, today, overdue] = await Promise.all([
        api.get(`/upcoming?userId=${userId}`),
        api.get(`/today?userId=${userId}`),
        api.get(`/overdue?userId=${userId}`),
      ]);

      set({
        upcoming: upcoming.data.revisions,
        today: today.data.revisions,
        overdue: overdue.data.revisions,
      });
      // console.log(upcoming, overdue, today);
      
    } finally {
      set({ loading: false });
    }
  },

  completeRevision: async (id, userId) => {
    await api.patch(`/${id}/complete`);
    // refresh after completion
    useRevisionStore.getState().fetchAll(userId);
  },
}));
