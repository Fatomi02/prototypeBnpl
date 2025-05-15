import { create } from "zustand";
import api from "../api/api";
import { useUserStore } from "./userStore";

export const useHistoryStore = create((set) => ({
  history: [],
  repaymentHistory: [],
  isLoading: false,
  error: null,

  // Fetch history
  fetchHistory: async () => {
    const userId = useUserStore.getState().userId
    set({ isLoading: true });
    try {
      const response = await api.get(`loans/history/grouped/${userId}`);
      if (response.status === 200) {
        set({ history: response.data.loans, isLoading: false });
      }
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  fetchRepaymentHistory: async () => {
    const userId = useUserStore.getState().userId
    set({ isLoading: true });
    try {
      const response = await api.get(`loans/history/${userId}`);
      if (response.status === 200) {
        set({ repaymentHistory: response.data, isLoading: false });
      }
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },
}));