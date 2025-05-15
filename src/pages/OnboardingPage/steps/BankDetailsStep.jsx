import { useForm } from 'react-hook-form'
import { FaArrowRight } from 'react-icons/fa'
import { useUserStore } from '../../../store/userStore'
import Button from '../../../components/Button/Button'
import FormInput from '../../../components/FormInput/FormInput'
import './Steps.css'
import PropTypes from 'prop-types'

const BankDetailsStep = ({ onNext }) => {
  const { user } = useUserStore()
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting, isValid } 
  } = useForm({
    defaultValues: {
      bvn: user.bvn || '',
      bankAccountNumber: user.bankAccountNumber,
      bankStatement: user.bankStatement
    },
    mode: 'onChange'
  })
  
  const onSubmit = (data) => {
    onNext(data)
  }
  
  return (
    <div className="onboarding-step">
      <div className="onboarding-step__header">
        <h1 className="onboarding-step__title">Bank Details</h1>
        <p className="onboarding-step__description">
          Please provide your banking information for verification purposes. This helps us determine your credit limit.
        </p>
      </div>
      
      <form className="onboarding-step__form" onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          id="bvn"
          label="Bank Verification Number (BVN)"
          placeholder="Enter your 11-digit BVN"
          required
          error={errors.bvn?.message}
          {...register('bvn', { 
            required: 'BVN is required',
            pattern: {
              value: /^[0-9]{11}$/,
              message: 'BVN must be exactly 11 digits'
            }
          })}
        />
        
        <FormInput
          id="bankAccountNumber"
          label="Bank Account Number"
          placeholder="Enter your 10-digit account number"
          required
          error={errors.bankAccountNumber?.message}
          {...register('bankAccountNumber', { 
            required: 'Bank account number is required',
            pattern: {
              value: /^[0-9]{10}$/,
              message: 'Account number must be exactly 10 digits'
            }
          })}
        />
        
        <div className="onboarding-step__file-upload">
          <label htmlFor="bankStatement" className="onboarding-step__file-label">
            Bank Statement (Last 6 months) <span className="required">*</span>
          </label>
          
          <div className="onboarding-step__file-input-container">
            <input
              type="file"
              id="bankStatement"
              className="onboarding-step__file-input"
              accept=".pdf,.jpg,.jpeg,.png"
              {...register('bankStatement', { 
                required: 'Bank statement is required' 
              })}
            />
            <div className="onboarding-step__file-input-text">
              Drag & drop a file or <span>Browse</span>
            </div>
            <div className="onboarding-step__file-input-help">
              Accepted formats: PDF, JPG, PNG (Max size: 5MB)
            </div>
          </div>
          
          {errors.bankStatement && (
            <div className="onboarding-step__error-text">
              {errors.bankStatement.message}
            </div>
          )}
        </div>
        
        <div className="onboarding-step__note">
          <p>
            <strong>Note:</strong> Your bank statement should cover the last 6 months. This information is used to assess your financial status and determine your credit limit.
          </p>
        </div>
        
        <div className="onboarding-step__actions">
          <Button 
            type="submit"
            disabled={!isValid}
            isLoading={isSubmitting}
            icon={<FaArrowRight />}
            iconPosition="right"
          >
            Continue
          </Button>
        </div>
      </form>
    </div>
  )
}
BankDetailsStep.propTypes = {
  onNext: PropTypes.func.isRequired
}

export default BankDetailsStep