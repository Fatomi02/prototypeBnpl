import { motion } from 'framer-motion'
import { FaCreditCard, FaHistory, FaChartLine } from 'react-icons/fa'
import { useUserStore } from '../../../store/userStore'
import './DashboardSections.css'

const DashboardWallet = () => {
  const { user } = useUserStore()
  
  // Sample transaction history data (would come from an API in a real app)
  const transactions = [
    {
      id: 1,
      type: 'Purchase',
      amount: 15000,
      vendor: 'Electronics Store',
      date: '2025-03-15',
      status: 'Completed'
    },
    {
      id: 2,
      type: 'Payment',
      amount: 5000,
      vendor: null,
      date: '2025-03-10',
      status: 'Completed'
    },
    {
      id: 3,
      type: 'Purchase',
      amount: 8000,
      vendor: 'Fashion Outlet',
      date: '2025-02-28',
      status: 'Completed'
    }
  ]
  
  const creditLimit = user.approvedCredit || 50000
  const usedCredit = transactions
    .filter(t => t.type === 'Purchase' && t.status === 'Completed')
    .reduce((total, t) => total + t.amount, 0)
    
  const paidCredit = transactions
    .filter(t => t.type === 'Payment' && t.status === 'Completed')
    .reduce((total, t) => total + t.amount, 0)
    
  const availableCredit = creditLimit - usedCredit + paidCredit
  
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
        <h1 className="dashboard-section__title">Wallet</h1>
        <p className="dashboard-section__description">
          Manage your credit balance and view transaction history
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
            <h2 className="dashboard-card__title">Credit Overview</h2>
          </div>
          <div className="dashboard-card__body">
            <div className="wallet-overview">
              <div className="wallet-overview__card">
                <FaCreditCard className="wallet-overview__icon" />
                <div className="wallet-overview__details">
                  <div className="wallet-overview__amount">₦{availableCredit.toLocaleString()}</div>
                  <div className="wallet-overview__label">Available Credit</div>
                </div>
              </div>
              
              <div className="wallet-stats">
                <div className="wallet-stats__item">
                  <div className="wallet-stats__label">Total Credit Limit</div>
                  <div className="wallet-stats__value">₦{creditLimit.toLocaleString()}</div>
                </div>
                
                <div className="wallet-stats__item">
                  <div className="wallet-stats__label">Used Credit</div>
                  <div className="wallet-stats__value">₦{usedCredit.toLocaleString()}</div>
                </div>
                
                <div className="wallet-stats__item">
                  <div className="wallet-stats__label">Payment Made</div>
                  <div className="wallet-stats__value">₦{paidCredit.toLocaleString()}</div>
                </div>
              </div>
              
              <div className="wallet-progress">
                <div className="wallet-progress__label">
                  <span>Credit Utilization</span>
                  <span>{Math.round((usedCredit - paidCredit) / creditLimit * 100)}%</span>
                </div>
                <div className="wallet-progress__bar">
                  <div 
                    className="wallet-progress__fill"
                    style={{ width: `${Math.min(100, (usedCredit - paidCredit) / creditLimit * 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        
        <motion.div className="dashboard-card" variants={itemVariants}>
          <div className="dashboard-card__header">
            <h2 className="dashboard-card__title">Recent Transactions</h2>
          </div>
          <div className="dashboard-card__body">
            <div className="transactions">
              {transactions.length > 0 ? (
                <div className="transactions__list">
                  {transactions.map((transaction) => (
                    <div key={transaction.id} className="transaction-item">
                      <div className="transaction-item__icon">
                        {transaction.type === 'Purchase' ? (
                          <FaShoppingBag className="transaction-item__icon-purchase" />
                        ) : (
                          <FaHistory className="transaction-item__icon-payment" />
                        )}
                      </div>
                      
                      <div className="transaction-item__details">
                        <div className="transaction-item__type">
                          {transaction.type}
                          {transaction.vendor && ` - ${transaction.vendor}`}
                        </div>
                        <div className="transaction-item__date">
                          {new Date(transaction.date).toLocaleDateString()}
                        </div>
                      </div>
                      
                      <div className="transaction-item__amount">
                        <span className={`transaction-item__amount-${transaction.type === 'Purchase' ? 'negative' : 'positive'}`}>
                          {transaction.type === 'Purchase' ? '-' : '+'}₦{transaction.amount.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="transactions__empty">
                  <FaHistory className="transactions__empty-icon" />
                  <p>No transactions yet</p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

// This component is used in DashboardWallet but not defined elsewhere
const FaShoppingBag = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="1em" height="1em">
      <path fill="currentColor" d="M352 160v-32C352 57.42 294.579 0 224 0 153.42 0 96 57.42 96 128v32H0v272c0 44.183 35.817 80 80 80h288c44.183 0 80-35.817 80-80V160h-96zm-192-32c0-35.347 28.653-64 64-64s64 28.653 64 64v32H160v-32zm160 120c-13.255 0-24-10.745-24-24s10.745-24 24-24 24 10.745 24 24-10.745 24-24 24zm-192 0c-13.255 0-24-10.745-24-24s10.745-24 24-24 24 10.745 24 24-10.745 24-24 24z"/>
    </svg>
  )
}

export default DashboardWallet