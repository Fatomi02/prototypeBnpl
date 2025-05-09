import { forwardRef } from 'react'
import PropTypes from 'prop-types'
import './FormInput.css'

const FormInput = forwardRef(({
  id,
  label,
  error,
  type = 'text',
  placeholder,
  helperText,
  required = false,
  ...props
}, ref) => {
  return (
    <div className="form-input">
      {label && (
        <label htmlFor={id} className="form-input__label">
          {label}
          {required && <span className="form-input__required">*</span>}
        </label>
      )}
      
      <input
        ref={ref}
        id={id}
        type={type}
        className={`form-input__field ${error ? 'form-input__field--error' : ''}`}
        placeholder={placeholder}
        required={required}
        aria-invalid={error ? 'true' : 'false'}
        {...props}
      />
      
      {helperText && !error && (
        <span className="form-input__helper-text">{helperText}</span>
      )}
      
      {error && (
        <span className="form-input__error-text">{error}</span>
      )}
    </div>
  )
})
FormInput.displayName = 'FormInput'

FormInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  error: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  helperText: PropTypes.string,
  required: PropTypes.bool,
}

export default FormInput