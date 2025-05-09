import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaSearch, FaFilter, FaFileAlt } from 'react-icons/fa'
import './DashboardSections.css'

const DashboardHistory = () => {
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  
  // Sample application history data (would come from an API in a real app)
  const applications = [
    {
      id: 1,
      date: '2025-03-15',
      amount: 15000,
      vendor: 'Electronics Store',
      category: 'Electronics',
      description: 'Smartphone purchase',
      status: 'approved'
    },
    {
      id: 2,
      date: '2025-02-28',
      amount: 8000,
      vendor: 'Fashion Outlet',
      category: 'Fashion',
      description: 'Winter clothing',
      status: 'approved'
    },
    {
      id: 3,
      date: '2025-02-10',
      amount: 25000,
      vendor: 'Home Goods',
      category: 'Household Items',
      description: 'Kitchen appliances',
      status: 'rejected'
    }
  ]
  
  // Filter applications based on status and search term
  const filteredApplications = applications.filter(app => {
    const matchesFilter = filter === 'all' || app.status === filter
    const matchesSearch = searchTerm === '' || 
      app.vendor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.category.toLowerCase().includes(searchTerm.toLowerCase())
    
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
              {filteredApplications.length > 0 ? (
                <div className="applications__list">
                  {filteredApplications.map((application) => (
                    <div 
                      key={application.id} 
                      className={`application-item application-item--${application.status}`}
                    >
                      <div className="application-item__header">
                        <div className="application-item__vendor">{application.vendor}</div>
                        <div className="application-item__date">
                          {new Date(application.date).toLocaleDateString()}
                        </div>
                      </div>
                      
                      <div className="application-item__body">
                        <div className="application-item__details">
                          <div className="application-item__amount">
                            ₦{application.amount.toLocaleString()}
                          </div>
                          <div className="application-item__category">
                            {application.category}
                          </div>
                          <div className="application-item__description">
                            {application.description}
                          </div>
                        </div>
                        
                        <div className="application-item__status">
                          <span className={`application-item__status-badge application-item__status-badge--${application.status}`}>
                            {application.status}
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