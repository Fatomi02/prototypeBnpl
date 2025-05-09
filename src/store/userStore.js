import { create } from 'zustand'

// This is the main user store for the BNPL application
export const useUserStore = create((set) => ({
  // User authentication state
  isAuthenticated: false,
  isLoading: false,
  error: null,
  
  // User profile information
  user: {
    fullName: '',
    phoneNumber: '',
    email: '',
    bvn: '',
    bankAccountNumber: '',
    bankStatementUploaded: false,
    idType: '', // NIN, Voter's Card, Driver's License
    idUploaded: false,
    approvedCredit: 0,
    kycVerified: false
  },
  
  // Onboarding step tracking
  onboardingStep: 1,
  onboardingComplete: false,
  
  // Methods to update user state
  setUser: (userData) => set((state) => ({
    user: { ...state.user, ...userData }
  })),
  
  updateOnboardingStep: (step) => set({
    onboardingStep: step
  }),
  
  completeOnboarding: () => set({
    onboardingComplete: true
  }),
  
  // Authentication methods
  login: () => set({
    isAuthenticated: true,
    isLoading: false,
    error: null
  }),
  
  logout: () => set({
    isAuthenticated: false,
    user: {
      fullName: '',
      phoneNumber: '',
      email: '',
      bvn: '',
      bankAccountNumber: '',
      bankStatementUploaded: false,
      idType: '',
      idUploaded: false,
      approvedCredit: 0,
      kycVerified: false
    },
    onboardingStep: 1,
    onboardingComplete: false
  }),
  
  // Method to set authentication error
  setAuthError: (error) => set({
    error,
    isLoading: false
  }),
  
  // Method to set loading state
  setLoading: (isLoading) => set({
    isLoading
  })
}))