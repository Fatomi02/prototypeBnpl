import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaUser, FaPhone, FaEnvelope, FaIdCard, FaUniversity, FaEdit, FaCheck } from 'react-icons/fa'
import { useUserStore } from '../../../store/userStore'
import Button from '../../../components/Button/Button'
import FormInput from '../../../components/FormInput/FormInput'
import './DashboardSections.css'

const DashboardProfile = () => {
  const { user, setUser } = useUserStore()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    fullName: user.fullName || '',
    phoneNumber: user.phoneNumber || '',
    email: user.email || ''
  })
  
  const handleEditToggle = () => {
    if (isEditing) {
      // Save changes
      setUser(formData)
    }
    setIsEditing(!isEditing)
  }
  
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
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
        <h1 className="dashboard-section__title">My Profile</h1>
        <p className="dashboard-section__description">
          View and manage your profile information
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
            <h2 className="dashboard-card__title">Personal Information</h2>
            
            <Button
              variant={isEditing ? 'secondary' : 'primary'}
              size="small"
              onClick={handleEditToggle}
              icon={isEditing ? <FaCheck /> : <FaEdit />}
              iconPosition="left"
            >
              {isEditing ? 'Save' : 'Edit'}
            </Button>
          </div>
          
          <div className="dashboard-card__body">
            <div className="profile-info">
              <div className="profile-info__avatar">
                {user.fullName ? user.fullName.charAt(0).toUpperCase() : 'U'}
              </div>
              
              <div className="profile-info__details">
                {isEditing ? (
                  <div className="profile-info__form">
                    <FormInput
                      id="fullName"
                      name="fullName"
                      label="Full Name"
                      value={formData.fullName}
                      onChange={handleChange}
                    />
                    
                    <FormInput
                      id="phoneNumber"
                      name="phoneNumber"
                      label="Phone Number"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                    />
                    
                    <FormInput
                      id="email"
                      name="email"
                      label="Email Address"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                ) : (
                  <div className="profile-info__items">
                    <div className="profile-info__item">
                      <div className="profile-info__icon">
                        <FaUser />
                      </div>
                      <div className="profile-info__content">
                        <div className="profile-info__label">Full Name</div>
                        <div className="profile-info__value">{user.fullName}</div>
                      </div>
                    </div>
                    
                    <div className="profile-info__item">
                      <div className="profile-info__icon">
                        <FaPhone />
                      </div>
                      <div className="profile-info__content">
                        <div className="profile-info__label">Phone Number</div>
                        <div className="profile-info__value">{user.phoneNumber}</div>
                      </div>
                    </div>
                    
                    <div className="profile-info__item">
                      <div className="profile-info__icon">
                        <FaEnvelope />
                      </div>
                      <div className="profile-info__content">
                        <div className="profile-info__label">Email Address</div>
                        <div className="profile-info__value">{user.email}</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
        
        <motion.div className="dashboard-card" variants={itemVariants}>
          <div className="dashboard-card__header">
            <h2 className="dashboard-card__title">Financial & Identity Information</h2>
          </div>
          
          <div className="dashboard-card__body">
            <div className="profile-info__items">
              <div className="profile-info__item">
                <div className="profile-info__icon">
                  <FaIdCard />
                </div>
                <div className="profile-info__content">
                  <div className="profile-info__label">BVN</div>
                  <div className="profile-info__value">
                    {user.bvn ? `${user.bvn.slice(0, 4)}****${user.bvn.slice(-3)}` : 'Not provided'}
                  </div>
                </div>
              </div>
              
              <div className="profile-info__item">
                <div className="profile-info__icon">
                  <FaUniversity />
                </div>
                <div className="profile-info__content">
                  <div className="profile-info__label">Bank Account</div>
                  <div className="profile-info__value">
                    {user.bankAccountNumber ? `****${user.bankAccountNumber.slice(-4)}` : 'Not provided'}
                  </div>
                </div>
              </div>
              
              <div className="profile-info__item">
                <div className="profile-info__icon">
                  <FaIdCard />
                </div>
                <div className="profile-info__content">
                  <div className="profile-info__label">ID Type</div>
                  <div className="profile-info__value">
                    {user.idType ? (
                      user.idType === 'nin' ? 'National ID' :
                      user.idType === 'voters' ? 'Voter\'s Card' :
                      user.idType === 'drivers' ? 'Driver\'s License' :
                      'International Passport'
                    ) : 'Not provided'}
                  </div>
                </div>
              </div>
              
              <div className="profile-info__item">
                <div className="profile-info__icon">
                  <FaCheck />
                </div>
                <div className="profile-info__content">
                  <div className="profile-info__label">KYC Status</div>
                  <div className="profile-info__value">
                    <span className={`profile-info__badge ${user.kycVerified ? 'profile-info__badge--verified' : 'profile-info__badge--pending'}`}>
                      {user.kycVerified ? 'Verified' : 'Pending'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="profile-info__note">
              For security reasons, sensitive information is partially masked. To update your financial or identity information, please contact customer support.
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default DashboardProfile