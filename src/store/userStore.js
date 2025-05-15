import { create } from "zustand";
import api from "../api/api";
import { toast } from "react-toastify";

export const useUserStore = create((set) => ({
  isAuthenticated: false,
  isLoading: false,
  error: null,

  // User profile information
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : {},

  userId: localStorage.getItem("userId")
    ? localStorage.getItem("userId")
    : "",


  // Onboarding step tracking
  onboardingStep: 1,
  onboardingComplete: false,

  // Methods to update user state
  setUser: (userData) =>
    set((state) => ({
      user: { ...state.user, ...userData },
    })),

  updateOnboardingStep: (step) =>
    set({
      onboardingStep: step,
    }),


  // Authentication methods
  register: (payload) => {
    set({  isLoading: true,})
    const formData = new FormData();
    formData.append("fullName", payload.fullName);
    formData.append("phoneNumber", payload.phoneNumber);
    formData.append("email", payload.email);
    formData.append("password", payload.password);
    formData.append("bvn", payload.bvn);
    formData.append("bankAccountNumber", payload.bankAccountNumber);
    formData.append("idType", payload.idType);
    if (payload.idDocument[0]) {
      formData.append("idDocument", payload.idDocument[0]);
    }
    if (payload.bankStatement[0]) {
      formData.append("bankStatement", payload.bankStatement[0]);
    }

    api
      .post("auth/register", formData)
      .then((response) => {
        if (response?.status === 201) {
          toast.success(response?.data?.message);
          set({
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
          window.location.href = "/login";
        }
      })
      .catch((error) => {
        console.error("Registration error:", error);
        toast.error(
          error?.response?.data?.message ||
            "Registration failed. Please try again."
        );
        set({
          isAuthenticated: false,
          isLoading: false,
          error: "Registration failed. Please try again.",
        });
      });
  },

  login: (payload) => {
    set({
      isLoading: true,
      error: null,
    });
    api
      .post("auth/login", payload)
      .then((response) => {
        if (response?.status === 201) {
          toast.success(response?.data?.message);
          set({
            isAuthenticated: true,
            isLoading: false,
            error: null,
            user: response.data.data.user
          });
          localStorage.setItem("user", JSON.stringify(response?.data?.data?.user));
          localStorage.setItem("access_token", response?.data?.data?.access_token);
          localStorage.setItem("userId", response?.data?.data?.user.id);
          setTimeout(() => {
           window.location.href = "/dashboard";
          }, 5000);
        }
      })
      .catch((error) => {
        console.error("Login error:", error);
        toast.error(
          error?.response?.data?.message ||
            "Login failed. Please check your credentials."
        );
        set({
          isAuthenticated: false,
          isLoading: false,
          error: "Login failed. Please check your credentials.",
        });
      });
  },

  logout: () => {
    set({
      isAuthenticated: false,
      user: {},
      onboardingStep: 1,
      onboardingComplete: false,
    });
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    localStorage.removeItem("userId");
    window.location.href = "/";
  },

  // Method to set authentication error
  setAuthError: (error) =>
    set({
      error,
      isLoading: false,
    }),

  // Method to set loading state
  setLoading: (isLoading) =>
    set({
      isLoading,
    }),
}));
