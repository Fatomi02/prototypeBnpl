/* eslint-disable react/prop-types */
import { motion } from 'framer-motion'
import { FaCheckCircle, FaArrowRight } from 'react-icons/fa'
import Button from '../../../components/Button/Button'
import './Steps.css'

const SuccessStep = ({ onComplete, isSubmitting }) => {
  return (
    <div className="onboarding-step onboarding-step--success">
      <motion.div 
        className="onboarding-step__success-icon"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ 
          type: "spring", 
          stiffness: 260, 
          damping: 20,
          delay: 0.3
        }}
      >
        <FaCheckCircle />
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <h1 className="onboarding-step__title">Onboarding Complete!</h1>
        <p className="onboarding-step__description">
          Thank you for providing your information. Your BNPL account is now ready to use.
        </p>
        
        <div className="onboarding-step__success-details">
          <h2>What happens next?</h2>
          <ul>
            <li>Your credit limit will be automatically determined based on the information provided</li>
            <li>You can now browse the BNPL dashboard and apply for purchase financing</li>
            <li>Your account is ready for immediate use at participating vendors</li>
          </ul>
        </div>
        
        <div className="onboarding-step__actions">
          <Button 
            onClick={onComplete}
            isLoading={isSubmitting}
            icon={<FaArrowRight />}
            iconPosition="right"
          >
            Go to Dashboard
          </Button>
        </div>
      </motion.div>
    </div>
  )
}

export default SuccessStep