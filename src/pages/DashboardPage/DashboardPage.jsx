import { Routes, Route, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Sidebar from '../../components/Sidebar/Sidebar'
import DashboardHome from './sections/DashboardHome'
import DashboardWallet from './sections/DashboardWallet'
import DashboardHistory from './sections/DashboardHistory'
import DashboardProfile from './sections/DashboardProfile'
import DashboardSupport from './sections/DashboardSupport'
import DashboardRepayments from './sections/DashboardRepayment'
import './DashboardPage.css'

const DashboardPage = () => {
  // Animation variants
  const pageVariants = {
    initial: { opacity: 0, x: 10 },
    in: { opacity: 1, x: 0 },
    out: { opacity: 0, x: -10 }
  }
  
  const pageTransition = {
    type: "tween",
    ease: "easeInOut",
    duration: 0.3
  }
  
  return (
    <div className="dashboard-page">
      <Sidebar />
      
      <div className="dashboard-page__content">
        <motion.div
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          transition={pageTransition}
          className="dashboard-page__container"
        >
          <Routes>
            <Route path="/" element={<DashboardHome />} />
            <Route path="/wallet" element={<DashboardWallet />} />
            <Route path="/repayments" element={<DashboardRepayments />} />
            <Route path="/history" element={<DashboardHistory />} />
            <Route path="/profile" element={<DashboardProfile />} />
            <Route path="/support" element={<DashboardSupport />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </motion.div>
      </div>
    </div>
  )
}

export default DashboardPage