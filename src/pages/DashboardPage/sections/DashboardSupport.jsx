import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaHeadset, FaQuestionCircle, FaPhone, FaEnvelope, FaPaperPlane } from 'react-icons/fa'
import Button from '../../../components/Button/Button'
import './DashboardSections.css'

const DashboardSupport = () => {
  const [message, setMessage] = useState('')
  const [isSending, setIsSending] = useState(false)
  const [isSent, setIsSent] = useState(false)
  
  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSending(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsSending(false)
      setIsSent(true)
      setMessage('')
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSent(false)
      }, 5000)
    }, 1500)
  }
  
  const faqs = [
    {
      question: 'How does Buy Now Pay Later work?',
      answer: 'Buy Now Pay Later allows you to make purchases and pay for them over time. You can shop at participating vendors, submit a BNPL application, and if approved, make your purchase immediately while paying in installments.'
    },
    {
      question: 'Is there an interest charge?',
      answer: 'Our BNPL service charges a small processing fee rather than traditional interest. The exact fee depends on the purchase amount and will be clearly displayed before you confirm your application.'
    },
    {
      question: 'How is my credit limit determined?',
      answer: 'Your credit limit is determined based on factors including your banking history, income, and previous payment behavior. We use the information provided during onboarding to assess your creditworthiness.'
    },
    {
      question: 'What happens if I miss a payment?',
      answer: 'Missing a payment may result in late fees and could affect your ability to use BNPL services in the future. If you anticipate difficulty making a payment, please contact customer support in advance.'
    }
  ]
  
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
        <h1 className="dashboard-section__title">Support</h1>
        <p className="dashboard-section__description">
          Get help with your BNPL account
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
            <h2 className="dashboard-card__title">Contact Support</h2>
          </div>
          
          <div className="dashboard-card__body">
            <div className="support-contact">
              <div className="support-contact__methods">
                <div className="support-contact__method">
                  <div className="support-contact__icon">
                    <FaPhone />
                  </div>
                  <div className="support-contact__details">
                    <h3>Phone Support</h3>
                    <p>Call us at: <a href="tel:+2348000000000">+234 800 000 0000</a></p>
                    <p className="support-contact__hours">Available Mon-Fri, 9am-5pm</p>
                  </div>
                </div>
                
                <div className="support-contact__method">
                  <div className="support-contact__icon">
                    <FaEnvelope />
                  </div>
                  <div className="support-contact__details">
                    <h3>Email Support</h3>
                    <p>Email us at: <a href="mailto:support@bnplapp.com">support@bnplapp.com</a></p>
                    <p className="support-contact__hours">We respond within 24 hours</p>
                  </div>
                </div>
                
                {/* <div className="support-contact__method">
                  <div className="support-contact__icon">
                    <FaComments />
                  </div>
                  <div className="support-contact__details">
                    <h3>Live Chat</h3>
                    <p>Chat with our support agents in real-time</p>
                    <Button size="small">Start Chat</Button>
                  </div>
                </div> */}
              </div>
              
              <div className="support-message">
                <h3 className="support-message__title">Send us a Message</h3>
                
                {isSent ? (
                  <div className="support-message__success">
                    <FaHeadset className="support-message__success-icon" />
                    <p>Your message has been sent! Our team will get back to you shortly.</p>
                  </div>
                ) : (
                  <form className="support-message__form" onSubmit={handleSubmit}>
                    <div className="support-message__field">
                      <label htmlFor="messageType" className="support-message__label">
                        Type of Inquiry
                      </label>
                      <select id="messageType" className="support-message__select">
                        <option value="general">General Inquiry</option>
                        <option value="application">Application Issue</option>
                        <option value="payment">Payment Issue</option>
                        <option value="account">Account Issue</option>
                      </select>
                    </div>
                    
                    <div className="support-message__field">
                      <label htmlFor="message" className="support-message__label">
                        Your Message
                      </label>
                      <textarea
                        id="message"
                        className="support-message__textarea"
                        placeholder="Describe your issue or question..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        rows={4}
                        required
                      ></textarea>
                    </div>
                    
                    <div className="support-message__actions">
                      <Button
                        type="submit"
                        isLoading={isSending}
                        disabled={message.trim() === ''}
                        icon={<FaPaperPlane />}
                        iconPosition="right"
                      >
                        Send Message
                      </Button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </motion.div>
        
        <motion.div className="dashboard-card" variants={itemVariants}>
          <div className="dashboard-card__header">
            <h2 className="dashboard-card__title">Frequently Asked Questions</h2>
          </div>
          
          <div className="dashboard-card__body">
            <div className="faq-list">
              {faqs.map((faq, index) => (
                <div key={index} className="faq-item">
                  <div className="faq-item__question">
                    <FaQuestionCircle className="faq-item__icon" />
                    <h3>{faq.question}</h3>
                  </div>
                  <div className="faq-item__answer">
                    <p>{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default DashboardSupport