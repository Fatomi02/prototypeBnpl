import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaHome } from 'react-icons/fa'
import Button from '../../components/Button/Button'
import './NotFoundPage.css'

const NotFoundPage = () => {
  const navigate = useNavigate()
  
  return (
    <div className="not-found-page">
      <motion.div 
        className="not-found-page__content"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="not-found-page__title">404</h1>
        <h2 className="not-found-page__subtitle">Page Not Found</h2>
        <p className="not-found-page__description">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Button 
          onClick={() => navigate('/')}
          icon={<FaHome />}
          iconPosition="left"
        >
          Back to Home
        </Button>
      </motion.div>
    </div>
  )
}

export default NotFoundPage