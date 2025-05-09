import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaArrowRight, FaCreditCard, FaMobileAlt, FaShieldAlt } from 'react-icons/fa'
import Button from '../../components/Button/Button'
import './WelcomePage.css'

const WelcomePage = () => {
  const navigate = useNavigate()
  
  const handleGetStarted = () => {
    navigate('/onboarding')
  }
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  }
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  }
  
  const features = [
    {
      icon: <FaCreditCard />,
      title: 'Shop Now, Pay Later',
      description: 'Purchase what you need today and split the cost over time with flexible payment options.'
    },
    {
      icon: <FaMobileAlt />,
      title: 'Easy Application',
      description: 'Simple digital application process with quick approval decisions.'
    },
    {
      icon: <FaShieldAlt />,
      title: 'Secure & Transparent',
      description: 'No hidden fees, transparent terms, and secure transactions for your peace of mind.'
    }
  ]
  
  return (
    <div className="welcome-page">
      <header className="welcome-page__header">
        <div className="welcome-page__logo">BNPL App</div>
        <Button 
          variant="ghost" 
          size="small"
          onClick={() => navigate('/onboarding')}
        >
          Log in
        </Button>
      </header>
      
      <main className="welcome-page__main">
        <motion.div 
          className="welcome-page__hero"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="welcome-page__title">
            Buy What You Need, <br />
            <span className="welcome-page__title-highlight">Pay Over Time</span>
          </h1>
          <p className="welcome-page__subtitle">
            Get instant access to the things you want without paying the full price upfront. 
            Our Buy Now Pay Later service makes shopping flexible and budget-friendly.
          </p>
          <Button 
            onClick={handleGetStarted}
            icon={<FaArrowRight />}
            iconPosition="right"
            size="large"
          >
            Get Started
          </Button>
          <p className="welcome-page__note">
            No credit check required. Quick application process.
          </p>
        </motion.div>
        
        <div className="welcome-page__image-container">
          <motion.img 
            src="https://images.pexels.com/photos/5926389/pexels-photo-5926389.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
            alt="Happy shopper using Buy Now Pay Later" 
            className="welcome-page__image"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
        </div>
      </main>
      
      <motion.section 
        className="welcome-page__features"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <h2 className="welcome-page__features-title">Why Choose Our BNPL Service?</h2>
        <div className="welcome-page__features-grid">
          {features.map((feature, index) => (
            <motion.div 
              key={index} 
              className="welcome-page__feature-card"
              variants={itemVariants}
            >
              <div className="welcome-page__feature-icon">
                {feature.icon}
              </div>
              <h3 className="welcome-page__feature-title">{feature.title}</h3>
              <p className="welcome-page__feature-description">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>
      
      <footer className="welcome-page__footer">
        <p>© 2025 BNPL App. All rights reserved.</p>
        <div className="welcome-page__footer-links">
          <a href="#">Terms & Conditions</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Contact Us</a>
        </div>
      </footer>
    </div>
  )
}

export default WelcomePage