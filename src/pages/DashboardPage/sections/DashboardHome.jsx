/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from 'react'
import { FaArrowRight, FaMoneyBillWave, FaStore, FaShoppingBag, FaFileAlt } from 'react-icons/fa'
import { motion } from 'framer-motion'
import { useUserStore } from '../../../store/userStore'
import { useBnplStore } from '../../../store/bnplStore'
import Button from '../../../components/Button/Button'
// import FormInput from '../../../components/FormInput/FormInput'
import './DashboardSections.css'
import { toast } from 'react-toastify'
import { useTransactionStore } from '../../../store/transaction'

const DashboardHome = () => {
  const { user } = useUserStore();
    const {fetchTransactions, transactions} = useTransactionStore();

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions])

  const { 
    applicationStatus,
    application, 
    vendors, 
    productCategories, 
    updateApplication, 
    submitApplication,
    resetApplication,
    setApplicationStatus
  } = useBnplStore()
  
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  
  const handleContinue = () => {
    setStep(2)
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true);

    try {
     const result = await submitApplication(application)
     console.log(result, 'ol')
     if(result.status === 201) {
      setIsSubmitting(false)
      toast.success(result?.data?.message);
      setApplicationStatus(result?.data?.data?.status)
      setStep(3)
     }
    } catch (error) {
      console.log(error, 'ol');
      toast.error(error.response?.data?.message);
      setIsSubmitting(false)
    }
  }
  
  const handleProcess = async () => {
    setIsProcessing(true)
    setStep(4)
  }
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  }
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.3 }
    }
  }
  
  return (
    <div className="dashboard-section">
      <div className="dashboard-section__header">
        <h1 className="dashboard-section__title">Dashboard</h1>
        <p className="dashboard-section__welcome">
          Welcome back, {user.fullName || 'User'}!
        </p>
      </div>
      
      <motion.div
        className="dashboard-section__content"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="dashboard-card" variants={itemVariants}>
          <div className="dashboard-card__header">
            <h2 className="dashboard-card__title">Your Credit</h2>
          </div>
          <div className="dashboard-card__body">
            <div className="dashboard-credit">
              <div className="dashboard-credit__amount">
                ₦{(transactions?.availableCredit || '50,000').toLocaleString()}
              </div>
              <div className="dashboard-credit__label">
                Available Credit
              </div>
              <div className="dashboard-credit__info">
                You can use this amount for your next purchase.
              </div>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          className="dashboard-card dashboard-card--bnpl" 
          variants={itemVariants}
        >
          <div className="dashboard-card__header">
            <h2 className="dashboard-card__title">Apply for BNPL</h2>
          </div>
          <div className="dashboard-card__body">
            {step === 1 && (
              <div className="bnpl-form">
                <h3 className="bnpl-form__title">Step 1: Enter Purchase Details</h3>
                
                <form className="bnpl-form__container">
                  <div className="bnpl-form__field">
                    <label htmlFor="amount" className="bnpl-form__label">
                      Loan Amount (₦)
                    </label>
                    <input
                      type="number"
                      id="amount"
                      className="bnpl-form__input"
                      placeholder="Enter amount"
                      value={application.amount || ''}
                      onChange={(e) => updateApplication({ amount: Number(e.target.value) })}
                      min="1000"
                      max={user.approvedCredit || 50000}
                    />
                  </div>
                  
                  <div className="bnpl-form__field">
                    <label htmlFor="vendor" className="bnpl-form__label">
                      Select Vendor
                    </label>
                    <select
                      id="vendor"
                      className="bnpl-form__select"
                      value={application.vendor || ''}
                      onChange={(e) => updateApplication({ vendor: e.target.value })}
                    >
                      <option value="">Select a vendor</option>
                      {vendors.map((vendor) => (
                        <option key={vendor.id} value={vendor.name}>
                          {vendor.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="bnpl-form__field">
                    <label htmlFor="category" className="bnpl-form__label">
                      Product Category
                    </label>
                    <select
                      id="category"
                      className="bnpl-form__select"
                      value={application.category || ''}
                      onChange={(e) => updateApplication({ category: e.target.value })}
                    >
                      <option value="">Select a category</option>
                      {productCategories.map((category) => (
                        <option key={category.id} value={category.name}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="bnpl-form__actions">
                    <Button
                      onClick={handleContinue}
                      disabled={!application.amount || !application.vendor || !application.category}
                      icon={<FaArrowRight />}
                      iconPosition="right"
                    >
                      Continue
                    </Button>
                  </div>
                </form>
              </div>
            )}
            
            {step === 2 && (
              <div className="bnpl-form">
                <h3 className="bnpl-form__title">Step 2: Describe Your Purchase</h3>
                
                <form className="bnpl-form__container" onSubmit={handleSubmit}>
                  <div className="bnpl-form__field">
                    <label htmlFor="purpose" className="bnpl-form__label">
                      Product Description
                    </label>
                    <textarea
                      id="purpose"
                      className="bnpl-form__textarea"
                      placeholder="Briefly describe what you are purchasing"
                      value={application.purpose || ''}
                      onChange={(e) => updateApplication({ purpose: e.target.value })}
                      rows={4}
                      required
                    />
                  </div>
                  
                  <div className="bnpl-form__field">
                    <label htmlFor="productImage" className="bnpl-form__label">
                      Upload Receipt or Product Image (Optional)
                    </label>
                    <div className="bnpl-form__file-input-container">
                      <input
                        type="file"
                        id="productImage"
                        className="bnpl-form__file-input"
                        accept=".jpg,.jpeg,.png,.pdf"
                        onChange={(e) => {
                          // In a real app, you would upload this file to a server
                          // and get back a URL to store in the application state
                          if (e.target.files?.length) {
                            updateApplication({ 
                              productImageUrl: URL.createObjectURL(e.target.files[0])
                            })
                          }
                        }}
                      />
                      <div className="bnpl-form__file-input-text">
                        Drag & drop a file or <span>Browse</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bnpl-form__summary">
                    <h4>Purchase Summary</h4>
                    <div className="bnpl-form__summary-item">
                      <FaMoneyBillWave />
                      <span className="bnpl-form__summary-label">Amount:</span>
                      <span className="bnpl-form__summary-value">₦{application.amount?.toLocaleString() || 0}</span>
                    </div>
                    <div className="bnpl-form__summary-item">
                      <FaStore />
                      <span className="bnpl-form__summary-label">Vendor:</span>
                      <span className="bnpl-form__summary-value">{application.vendor || 'Not selected'}</span>
                    </div>
                    <div className="bnpl-form__summary-item">
                      <FaShoppingBag />
                      <span className="bnpl-form__summary-label">Category:</span>
                      <span className="bnpl-form__summary-value">{application.category || 'Not selected'}</span>
                    </div>
                  </div>
                  
                  <div className="bnpl-form__actions">
                    <Button
                      variant="tertiary"
                      onClick={() => setStep(1)}
                    >
                      Back
                    </Button>
                    <Button
                      type="submit"
                      isLoading={isSubmitting}
                      disabled={!application.purpose}
                    >
                      Apply for BNPL
                    </Button>
                  </div>
                </form>
              </div>
            )}
            
            {step === 3 && (
              <div className="bnpl-form">
                <h3 className="bnpl-form__title">Application Submitted</h3>
                
                <div className="bnpl-form__success">
                  <div className="bnpl-form__success-icon">
                    <FaFileAlt />
                  </div>
                  <p className="bnpl-form__success-message">
                    Your BNPL application has been submitted successfully. 
                    Click the button below to process your application and receive an instant decision.
                  </p>
                  
                  <div className="bnpl-form__actions">
                    <Button
                      onClick={handleProcess}
                      isLoading={isProcessing}
                    >
                      Process My Application
                    </Button>
                  </div>
                </div>
              </div>
            )}
            
            {step === 4 && applicationStatus === 'approved' && (
              <div className="bnpl-form">
                <h3 className="bnpl-form__title">Application Approved!</h3>
                
                <div className="bnpl-form__success bnpl-form__success--approved">
                  <div className="bnpl-form__success-icon bnpl-form__success-icon--approved">
                    <FaMoneyBillWave />
                  </div>
                  <p className="bnpl-form__success-message">
                    Congratulations! Your BNPL application has been approved. 
                    You can now proceed with your purchase.
                  </p>
                  
                  <div className="bnpl-form__approved-details">
                    <h4>Purchase Details</h4>
                    <div className="bnpl-form__approved-item">
                      <span className="bnpl-form__approved-label">Amount:</span>
                      <span className="bnpl-form__approved-value">₦{application.amount?.toLocaleString() || 0}</span>
                    </div>
                    <div className="bnpl-form__approved-item">
                      <span className="bnpl-form__approved-label">Vendor:</span>
                      <span className="bnpl-form__approved-value">{application.vendor}</span>
                    </div>
                    <div className="bnpl-form__approved-item">
                      <span className="bnpl-form__approved-label">Category:</span>
                      <span className="bnpl-form__approved-value">{application.category}</span>
                    </div>
                    <div className="bnpl-form__approved-item">
                      <span className="bnpl-form__approved-label">Approval Date:</span>
                      <span className="bnpl-form__approved-value">
                        {new Date().toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  
                  <div className="bnpl-form__actions">
                    <Button
                      onClick={() => {
                        // Reset the application and start over
                        resetApplication()
                        setStep(1)
                      }}
                    >
                      Start New Application
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {step === 4 && applicationStatus === 'pending' && (
              <div className="bnpl-form">
                <h3 className="bnpl-form__title">Application Is Pending!</h3>
                
                <div className="bnpl-form__success bnpl-form__success--approved">
                  <div className="bnpl-form__success-icon bnpl-form__success-icon--approved">
                    <FaMoneyBillWave />
                  </div>
                  <p className="bnpl-form__success-message">
                    Your BNPL application is under review. 
                    An update will be sent to your email.
                  </p>
                  
                  <div className="bnpl-form__approved-details">
                    <h4>Purchase Details</h4>
                    <div className="bnpl-form__approved-item">
                      <span className="bnpl-form__approved-label">Amount:</span>
                      <span className="bnpl-form__approved-value">₦{application.amount?.toLocaleString() || 0}</span>
                    </div>
                    <div className="bnpl-form__approved-item">
                      <span className="bnpl-form__approved-label">Vendor:</span>
                      <span className="bnpl-form__approved-value">{application.vendor}</span>
                    </div>
                    <div className="bnpl-form__approved-item">
                      <span className="bnpl-form__approved-label">Category:</span>
                      <span className="bnpl-form__approved-value">{application.category}</span>
                    </div>
                    <div className="bnpl-form__approved-item">
                      <span className="bnpl-form__approved-label">Product Description:</span>
                      <span className="bnpl-form__approved-value">{application.purpose}</span>
                    </div>
                  </div>
                  
                  <div className="bnpl-form__actions">
                    <Button
                      onClick={() => {
                        // Reset the application and start over
                        resetApplication()
                        setStep(1)
                      }}
                    >
                      Start New Application
                    </Button>
                  </div>
                </div>
              </div>
            )}
            
            {step === 4 && applicationStatus === 'rejected' && (
              <div className="bnpl-form">
                <h3 className="bnpl-form__title">Application Not Approved</h3>
                
                <div className="bnpl-form__success bnpl-form__success--rejected">
                  <div className="bnpl-form__success-icon bnpl-form__success-icon--rejected">
                    <FaFileAlt />
                  </div>
                  <p className="bnpl-form__success-message">
                    We're sorry, but your BNPL application could not be approved at this time.
                    This could be due to several reasons including credit availability or purchase amount.
                  </p>
                  
                  <div className="bnpl-form__actions">
                    <Button
                      onClick={() => {
                        // Reset the application and start over
                        resetApplication()
                        setStep(1)
                      }}
                    >
                      Try Again
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default DashboardHome