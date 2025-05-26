import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FaSearch, FaFilter, FaFileAlt } from 'react-icons/fa'
import './DashboardSections.css'
import { useHistoryStore } from '../../../store/history'

const DashboardHistory = () => {
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('');

  const {fetchHistory, history} = useHistoryStore()

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory])
  
  // Filter applications based on status and search term
  const filteredHistory = history.filter(app => {
    const matchesFilter = filter === 'all' || app.status === filter
    const matchesSearch = searchTerm === '' || 
      app?.vendor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app?.purpose.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app?.category.toLowerCase().includes(searchTerm.toLowerCase())
    
    return matchesFilter && matchesSearch
  })
  
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
        <h1 className="dashboard-section__title">Application History</h1>
        <p className="dashboard-section__description">
          View and track your BNPL applications
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
            <h2 className="dashboard-card__title">Your Applications</h2>
            
            <div className="dashboard-card__filters">
              <div className="dashboard-search">
                <FaSearch className="dashboard-search__icon" />
                <input
                  type="text"
                  className="dashboard-search__input"
                  placeholder="Search applications..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="dashboard-filter">
                <FaFilter className="dashboard-filter__icon" />
                <select
                  className="dashboard-filter__select"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                >
                  <option value="all">All Applications</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                  <option value="pending">Pending</option>
                </select>
              </div>
            </div>
          </div>
          
          <div className="dashboard-card__body">
            <div className="applications">
              {filteredHistory.length > 0 ? (
                <div className="applications__list">
                  {filteredHistory.map((application, index) => (
                    <div 
                      key={index} 
                      className={`application-item application-item--${application.status}`}
                    >
                      <div className="application-item__header">
                        <div className="application-item__vendor">{application.vendor}</div>
                        <div className="application-item__date">
                          {new Date(application.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                      
                      <div className="application-item__body">
                        <div className="application-item__details">
                          <div className="application-item__amount">
                            ₦{application?.amountApproved.toLocaleString()}
                          </div>
                          <div className="application-item__category">
                            {application.category}
                          </div>
                          <div className="application-item__description">
                            {application.purpose}
                          </div>
                        </div>
                        
                        <div className="application-item__status">
                          <span className={`application-item__status-badge application-item__status-badge--${application.status}`}>
                              {application.status === 'approved' ? 'Vendor Paid' : application.status === 'paid off' ? 'Loan Repaid' : application.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="applications__empty">
                  <FaFileAlt className="applications__empty-icon" />
                  <p>No applications found</p>
                  {searchTerm && (
                    <button 
                      className="applications__empty-reset"
                      onClick={() => setSearchTerm('')}
                    >
                      Clear search
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default DashboardHistory