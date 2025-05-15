import { create } from "zustand";
import api from "../api/api";
import { useUserStore } from "./userStore";
import { toast } from "react-toastify";

export const useTransactionStore = create((set) => ({
  transactions: {},
  isLoading: false,
  error: null,

  // Fetch history
  fetchTransactions: async () => {
    const userId = useUserStore.getState().userId
    set({ isLoading: true });
    try {
      const response = await api.get(`loans/transactions/${userId}`);
      if (response.status === 200) {
        set({ transactions: response.data, isLoading: false });
      }
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  makePayment: async (amount, id) => {
    const userId = useUserStore.getState().userId
    set({ isLoading: true });
    try {
      const response = await api.post(`loans/${id}/repay`, {
        amount: amount,
        userId: userId,
      });
      if (response.status === 201) {
        set({ isLoading: false });
        toast.success(response.data.message);
        setTimeout(() => {
          window.location.reload();
        }, 5000);
      }
    } catch (error) {
        toast.error(
          error?.response?.data?.message ||
            "Payment failed. Please try again."
        );
      set({ error: error.message, isLoading: false });
    }
  },
}));