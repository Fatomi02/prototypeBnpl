import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FaHome, FaWallet, FaHistory, FaUser, FaQuestionCircle, FaBars, FaTimes, FaCalendarAlt } from 'react-icons/fa'
import { useUserStore } from '../../store/userStore'
import './Sidebar.css'

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { user, logout } = useUserStore()
  
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed)
  }
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }
  
  const navItems = [
    { to: '/dashboard', label: 'Dashboard', icon: <FaHome /> },
    { to: '/dashboard/wallet', label: 'Wallet', icon: <FaWallet /> },
    { to: '/dashboard/repayments', label: 'Repayments', icon: <FaCalendarAlt /> },
    { to: '/dashboard/history', label: 'History', icon: <FaHistory /> },
    { to: '/dashboard/profile', label: 'Profile', icon: <FaUser /> },
    { to: '/dashboard/support', label: 'Support', icon: <FaQuestionCircle /> },
  ]
  
  const sidebarVariants = {
    expanded: {
      width: '240px',
      transition: { duration: 0.3 }
    },
    collapsed: {
      width: '72px',
      transition: { duration: 0.3 }
    }
  }
  
  const mobileMenuVariants = {
    open: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.3 }
    },
    closed: {
      x: '-100%',
      opacity: 0,
      transition: { duration: 0.3 }
    }
  }
  
  return (
    <>
      {/* Mobile Menu Toggle */}
      <button 
        className="sidebar-mobile-toggle"
        onClick={toggleMobileMenu}
        aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
      >
        {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
      </button>
      
      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            className="sidebar-mobile-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleMobileMenu}
          />
        )}
      </AnimatePresence>
      
      {/* Sidebar */}
      <motion.nav 
        className={`sidebar ${isMobileMenuOpen ? 'sidebar--mobile-open' : ''}`}
        initial="expanded"
        animate={isCollapsed ? "collapsed" : "expanded"}
        variants={sidebarVariants}
      >
        <div className="sidebar__header">
          <div className={`sidebar__logo ${isCollapsed ? 'sidebar__logo--collapsed' : ''}`}>
            {isCollapsed ? 'BP' : 'BNPL App'}
          </div>
          <button 
            className="sidebar__toggle"
            onClick={toggleSidebar}
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? '→' : '←'}
          </button>
        </div>
        
        <div className="sidebar__content">
          <ul className="sidebar__nav">
            {navItems.map((item) => (
              <li key={item.to} className="sidebar__item">
                <NavLink 
                  to={item.to} 
                  className={({ isActive }) => 
                    `sidebar__link ${isActive ? 'sidebar__link--active' : ''}`
                  }
                  onClick={() => setIsMobileMenuOpen(false)}
                  end={item.to === '/dashboard'}
                >
                  <span className="sidebar__icon">{item.icon}</span>
                  {!isCollapsed && <span className="sidebar__label">{item.label}</span>}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="sidebar__footer">
          <div className={`sidebar__user ${isCollapsed ? 'sidebar__user--collapsed' : ''}`}>
            <div className="sidebar__avatar">
              {user.fullName ? user.fullName.charAt(0).toUpperCase() : 'U'}
            </div>
            {!isCollapsed && (
              <div className="sidebar__user-info">
                <div className="sidebar__user-name">{user.fullName || 'User'}</div>
                <button className="sidebar__logout" onClick={logout}>
                  Log out
                </button>
              </div>
            )}
          </div>
        </div>
      </motion.nav>
    </>
  )
}

export default Sidebar