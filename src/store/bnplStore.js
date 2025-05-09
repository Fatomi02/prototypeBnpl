import { create } from 'zustand'

// Store for BNPL application-specific data
export const useBnplStore = create((set) => ({
  // BNPL application data
  application: {
    loanAmount: 0,
    vendor: '',
    productCategory: '',
    productDescription: '',
    productImageUrl: '',
    applicationStatus: 'pending', // pending, approved, rejected
    applicationDate: null,
  },
  
  // Available vendors and product categories (normally these would come from an API)
  vendors: [
    { id: '1', name: 'Electronics Store' },
    { id: '2', name: 'Fashion Outlet' },
    { id: '3', name: 'Home Goods' },
    { id: '4', name: 'Supermarket' },
  ],
  
  productCategories: [
    { id: '1', name: 'Electronics' },
    { id: '2', name: 'Fashion' },
    { id: '3', name: 'Household Items' },
    { id: '4', name: 'Food & Groceries' },
  ],
  
  // Methods to update BNPL application
  updateApplication: (data) => set((state) => ({
    application: { ...state.application, ...data }
  })),
  
  submitApplication: () => set((state) => ({
    application: { 
      ...state.application, 
      applicationStatus: 'pending',
      applicationDate: new Date().toISOString()
    }
  })),
  
  // Simulate BNPL decision (in a real app, this would be an API call)
  processApplication: () => {
    return new Promise((resolve) => {
      // Simulate API delay
      setTimeout(() => {
        // Random approval (70% chance of approval for demo purposes)
        const isApproved = Math.random() > 0.3
        
        set((state) => ({
          application: {
            ...state.application,
            applicationStatus: isApproved ? 'approved' : 'rejected'
          }
        }))
        
        resolve(isApproved)
      }, 2000)
    })
  },
  
  // Reset application
  resetApplication: () => set({
    application: {
      loanAmount: 0,
      vendor: '',
      productCategory: '',
      productDescription: '',
      productImageUrl: '',
      applicationStatus: 'pending',
      applicationDate: null,
    }
  })
}))