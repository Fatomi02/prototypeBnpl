import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaCreditCard, FaCalendarAlt, FaClock, FaCheckCircle, FaBell } from 'react-icons/fa'
import Button from '../../../components/Button/Button'
import './DashboardSections.css'

const DashboardRepayments = () => {
  const [isSettingUpAutoPay, setIsSettingUpAutoPay] = useState(false)
  const [autoPayEnabled, setAutoPayEnabled] = useState(false)
  
  // Sample repayment data (would come from an API in a real app)
  const repayments = [
    {
      id: 1,
      amount: 5000,
      dueDate: '2025-04-15',
      status: 'upcoming',
      purchase: 'Electronics Store - Smartphone'
    },
    {
      id: 2,
      amount: 3000,
      dueDate: '2025-04-01',
      status: 'paid',
      purchase: 'Fashion Outlet - Winter Clothing'
    },
    {
      id: 3,
      amount: 2000,
      dueDate: '2025-03-15',
      status: 'overdue',
      purchase: 'Home Goods - Kitchen Appliances'
    }
  ]
  
  const handleSetupAutoPay = () => {
    setIsSettingUpAutoPay(true)
    // Simulate API call
    setTimeout(() => {
      setAutoPayEnabled(true)
      setIsSettingUpAutoPay(false)
    }, 2000)
  }
  
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
        <h1 className="dashboard-section__title">Repayments</h1>
        <p className="dashboard-section__description">
          Track your repayment schedule and manage payment options
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
            <h2 className="dashboard-card__title">Payment Options</h2>
          </div>
          <div className="dashboard-card__body">
            <div className="payment-options">
              <div className="payment-options__auto-pay">
                <div className="payment-options__icon">
                  <FaCreditCard />
                </div>
                <div className="payment-options__details">
                  <h3>Auto-Pay</h3>
                  <p>Set up automatic payments to never miss a due date</p>
                  {autoPayEnabled ? (
                    <div className="payment-options__status payment-options__status--enabled">
                      <FaCheckCircle /> Auto-Pay is enabled
                    </div>
                  ) : (
                    <Button
                      onClick={handleSetupAutoPay}
                      isLoading={isSettingUpAutoPay}
                      size="small"
                    >
                      Set Up Auto-Pay
                    </Button>
                  )}
                </div>
              </div>
              
              <div className="payment-options__reminders">
                <div className="payment-options__icon">
                  <FaBell />
                </div>
                <div className="payment-options__details">
                  <h3>Payment Reminders</h3>
                  <p>Get notified before your payments are due</p>
                  <div className="payment-options__reminder-settings">
                    <label className="payment-options__checkbox">
                      <input type="checkbox" defaultChecked />
                      <span>Email notifications</span>
                    </label>
                    <label className="payment-options__checkbox">
                      <input type="checkbox" defaultChecked />
                      <span>SMS notifications</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        
        <motion.div className="dashboard-card" variants={itemVariants}>
          <div className="dashboard-card__header">
            <h2 className="dashboard-card__title">Repayment Schedule</h2>
          </div>
          <div className="dashboard-card__body">
            <div className="repayments">
              {repayments.length > 0 ? (
                <div className="repayments__list">
                  {repayments.map((repayment) => (
                    <div 
                      key={repayment.id} 
                      className={`repayment-item repayment-item--${repayment.status}`}
                    >
                      <div className="repayment-item__icon">
                        {repayment.status === 'paid' ? (
                          <FaCheckCircle />
                        ) : repayment.status === 'upcoming' ? (
                          <FaCalendarAlt />
                        ) : (
                          <FaClock />
                        )}
                      </div>
                      
                      <div className="repayment-item__details">
                        <div className="repayment-item__purchase">
                          {repayment.purchase}
                        </div>
                        <div className="repayment-item__date">
                          Due: {new Date(repayment.dueDate).toLocaleDateString()}
                        </div>
                      </div>
                      
                      <div className="repayment-item__amount">
                        ₦{repayment.amount.toLocaleString()}
                      </div>
                      
                      <div className="repayment-item__status">
                        <span className={`repayment-item__status-badge repayment-item__status-badge--${repayment.status}`}>
                          {repayment.status}
                        </span>
                      </div>
                      
                      {repayment.status !== 'paid' && (
                        <div className="repayment-item__action">
                          <Button size="small">
                            Pay Now
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="repayments__empty">
                  <FaCalendarAlt className="repayments__empty-icon" />
                  <p>No repayments scheduled</p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default DashboardRepayments