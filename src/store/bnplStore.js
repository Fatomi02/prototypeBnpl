import { create } from 'zustand'
import api from '../api/api';
import { toast } from 'react-toastify';

// Store for BNPL application-specific data
export const useBnplStore = create((set) => ({
  // BNPL application data
  application: {
    userId: localStorage.getItem('userId') || '',
    amount: 0,
    vendor: '',
    category: '',
    purpose: '',
    durationInMonths: 6,
  },
  loading: false,
  applicationStatus: '',
  
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
  
submitApplication: (payload) => {
  set({loading: true})
  set((state) => ({
    application: { 
      ...state.application, 
    }
  }));
  try {
    const res = api.post('loans/apply', payload);
    set({loading: false})
    return res;
  }
  catch (error) {
    console.log(error, 'ol');
    set({loading: false})
    toast.error(
      error?.response?.data?.message || 'Application submission failed. Please try again.'
    );
  }
},
  
  // Simulate BNPL decision (in a real app, this would be an API call)
  processApplication: (data) => {
    console.log(data)
  },

  setApplicationStatus: (status) => set({
    applicationStatus: status
  }),
  
  // Reset application
  resetApplication: () => set({
    application: {
      amount: 0,
      vendor: '',
      category: '',
      purpose: '',
      productImageUrl: '',
      durationInMonths: 6,
    }
  })
}))