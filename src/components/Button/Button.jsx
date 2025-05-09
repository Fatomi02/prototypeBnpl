import { forwardRef } from 'react'
import PropTypes from 'prop-types'
import { motion } from 'framer-motion'
import './Button.css'

const Button = forwardRef(({ 
  children, 
  variant = 'primary', 
  size = 'medium', 
  fullWidth = false, 
  icon, 
  iconPosition = 'left',
  isLoading = false,
  disabled = false,
  onClick,
  type = 'button',
  ...props 
}, ref) => {
  
  const buttonClasses = `
    button 
    button--${variant} 
    button--${size}
    ${fullWidth ? 'button--full-width' : ''}
    ${icon ? 'button--with-icon' : ''}
    ${isLoading ? 'button--loading' : ''}
    ${disabled ? 'button--disabled' : ''}
  `
  
  return (
    <motion.button
      ref={ref}
      className={buttonClasses}
      whileTap={{ scale: disabled || isLoading ? 1 : 0.98 }}
      whileHover={{ scale: disabled || isLoading ? 1 : 1.02 }}
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
      {...props}
    >
      {isLoading && (
        <span className="button__loader"></span>
      )}
      
      {icon && iconPosition === 'left' && !isLoading && (
        <span className="button__icon button__icon--left">
          {icon}
        </span>
      )}
      
      <span className="button__text">{children}</span>
      
      {icon && iconPosition === 'right' && !isLoading && (
        <span className="button__icon button__icon--right">
          {icon}
        </span>
      )}
    </motion.button>
  )
})
Button.displayName = 'Button'

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'tertiary']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  fullWidth: PropTypes.bool,
  icon: PropTypes.node,
  iconPosition: PropTypes.oneOf(['left', 'right']),
  isLoading: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
}

export default Button;