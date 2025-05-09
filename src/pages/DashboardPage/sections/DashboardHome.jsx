import { useState } from 'react'
import { FaArrowRight, FaMoneyBillWave, FaStore, FaShoppingBag, FaFileAlt } from 'react-icons/fa'
import { motion } from 'framer-motion'
import { useUserStore } from '../../../store/userStore'
import { useBnplStore } from '../../../store/bnplStore'
import Button from '../../../components/Button/Button'
import FormInput from '../../../components/FormInput/FormInput'
import './DashboardSections.css'

const DashboardHome = () => {
  const { user } = useUserStore()
  const { 
    application, 
    vendors, 
    productCategories, 
    updateApplication, 
    submitApplication, 
    processApplication 
  } = useBnplStore()
  
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  
  const handleContinue = () => {
    setStep(2)
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Submit application
    await new Promise(resolve => setTimeout(resolve, 1000))
    submitApplication()
    setIsSubmitting(false)
    setStep(3)
  }
  
  const handleProcess = async () => {
    setIsProcessing(true)
    const result = await processApplication()
    setIsProcessing(false)
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
                ₦{(user.approvedCredit || 50000).toLocaleString()}
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
                    <label htmlFor="loanAmount" className="bnpl-form__label">
                      Loan Amount (₦)
                    </label>
                    <input
                      type="number"
                      id="loanAmount"
                      className="bnpl-form__input"
                      placeholder="Enter amount"
                      value={application.loanAmount || ''}
                      onChange={(e) => updateApplication({ loanAmount: Number(e.target.value) })}
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
                    <label htmlFor="productCategory" className="bnpl-form__label">
                      Product Category
                    </label>
                    <select
                      id="productCategory"
                      className="bnpl-form__select"
                      value={application.productCategory || ''}
                      onChange={(e) => updateApplication({ productCategory: e.target.value })}
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
                      disabled={!application.loanAmount || !application.vendor || !application.productCategory}
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
                    <label htmlFor="productDescription" className="bnpl-form__label">
                      Product Description
                    </label>
                    <textarea
                      id="productDescription"
                      className="bnpl-form__textarea"
                      placeholder="Briefly describe what you are purchasing"
                      value={application.productDescription || ''}
                      onChange={(e) => updateApplication({ productDescription: e.target.value })}
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
                      <span className="bnpl-form__summary-value">₦{application.loanAmount?.toLocaleString() || 0}</span>
                    </div>
                    <div className="bnpl-form__summary-item">
                      <FaStore />
                      <span className="bnpl-form__summary-label">Vendor:</span>
                      <span className="bnpl-form__summary-value">{application.vendor || 'Not selected'}</span>
                    </div>
                    <div className="bnpl-form__summary-item">
                      <FaShoppingBag />
                      <span className="bnpl-form__summary-label">Category:</span>
                      <span className="bnpl-form__summary-value">{application.productCategory || 'Not selected'}</span>
                    </div>
                  </div>
                  
                  <div className="bnpl-form__actions">
                    <Button
                      variant="secondary"
                      onClick={() => setStep(1)}
                    >
                      Back
                    </Button>
                    <Button
                      type="submit"
                      isLoading={isSubmitting}
                      disabled={!application.productDescription}
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
            
            {step === 4 && application.applicationStatus === 'approved' && (
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
                      <span className="bnpl-form__approved-value">₦{application.loanAmount?.toLocaleString() || 0}</span>
                    </div>
                    <div className="bnpl-form__approved-item">
                      <span className="bnpl-form__approved-label">Vendor:</span>
                      <span className="bnpl-form__approved-value">{application.vendor}</span>
                    </div>
                    <div className="bnpl-form__approved-item">
                      <span className="bnpl-form__approved-label">Category:</span>
                      <span className="bnpl-form__approved-value">{application.productCategory}</span>
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
                        updateApplication({
                          loanAmount: 0,
                          vendor: '',
                          productCategory: '',
                          productDescription: '',
                          productImageUrl: '',
                          applicationStatus: 'pending',
                          applicationDate: null,
                        })
                        setStep(1)
                      }}
                    >
                      Start New Application
                    </Button>
                  </div>
                </div>
              </div>
            )}
            
            {step === 4 && application.applicationStatus === 'rejected' && (
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
                        updateApplication({
                          loanAmount: 0,
                          vendor: '',
                          productCategory: '',
                          productDescription: '',
                          productImageUrl: '',
                          applicationStatus: 'pending',
                          applicationDate: null,
                        })
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