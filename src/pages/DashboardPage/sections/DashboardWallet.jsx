import { motion } from 'framer-motion'
import { FaCreditCard, FaHistory, FaShoppingBag } from 'react-icons/fa'
import './DashboardSections.css'
import { useEffect } from 'react'
import { useTransactionStore } from '../../../store/transaction'
import { useHistoryStore } from '../../../store/history'

const DashboardWallet = () => {

    const {fetchWalletDashboard, walletDashboard, transactions, fetchTransactions} = useTransactionStore();
    const {fetchRepaymentHistory, repaymentHistory} = useHistoryStore();
  
    useEffect(() => {
      fetchWalletDashboard();
      fetchTransactions()
      fetchRepaymentHistory();
    }, [fetchWalletDashboard, fetchTransactions, fetchRepaymentHistory])
    
  
  // Sample transaction history data (would come from an API in a real app)
  const paidCredit = repaymentHistory
    .filter(t => t.status === 'paid off')
    .reduce((total, t) => total + t.amountApproved, 0)
  
  
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
                  <div className="wallet-overview__amount">₦{walletDashboard?.availableCredit?.toLocaleString()}</div>
                  <div className="wallet-overview__label">Available Credit</div>
                </div>
              </div>
              
              <div className="wallet-stats">
                <div className="wallet-stats__item">
                  <div className="wallet-stats__label">Total Credit Limit</div>
                  <div className="wallet-stats__value">₦{walletDashboard?.totalCreditLimit?.toLocaleString()}</div>
                </div>
                
                <div className="wallet-stats__item">
                  <div className="wallet-stats__label">Used Credit</div>
                  <div className="wallet-stats__value">₦{walletDashboard?.usedCredit?.toLocaleString()}</div>
                </div>
                
                <div className="wallet-stats__item">
                  <div className="wallet-stats__label">Payment Made</div>
                  <div className="wallet-stats__value">₦{paidCredit.toLocaleString() || '---'}</div>
                </div>
              </div>
              
              <div className="wallet-progress">
                <div className="wallet-progress__label">
                  <span>Credit Utilization</span>
                  <span>{Math.round((walletDashboard?.usedCredit - paidCredit) / walletDashboard?.totalCreditLimit * 100)}%</span>
                </div>
                <div className="wallet-progress__bar">
                  <div 
                    className="wallet-progress__fill"
                    style={{ width: `${Math.min(100, (walletDashboard?.usedCredit - paidCredit) / walletDashboard?.totalCreditLimit * 100)}%` }}
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
                        {transaction.type == 'disbursement' ? (
                          <FaShoppingBag className="transaction-item__icon-purchase" />
                        ) : (
                          <FaHistory className="transaction-item__icon-payment" />
                        )}
                      </div>
                      
                      <div className="transaction-item__details">
                        <div className="transaction-item__type">
                          {transaction.type == 'disbursement' ? 'Purchase' : 'Payment'}
                          {transaction.vendor && ` - ${transaction.vendor}`}
                        </div>
                        <div className="transaction-item__date">
                          {new Date(transaction.date).toLocaleDateString()}
                        </div>
                      </div>
                      
                      <div className="transaction-item__amount">
                        <span className={`transaction-item__amount-${transaction.type == 'disbursement' ? 'negative' : 'positive'}`}>
                          {transaction.type === 'disbursement' ? '-' : '+'}₦{transaction.amount.toLocaleString()}
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


export default DashboardWallet