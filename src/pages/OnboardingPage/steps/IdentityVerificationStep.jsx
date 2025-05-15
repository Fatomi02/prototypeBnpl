/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import { useForm } from 'react-hook-form'
import { FaArrowRight, FaIdCard } from 'react-icons/fa'
import { useUserStore } from '../../../store/userStore'
import Button from '../../../components/Button/Button'
import FormInput from '../../../components/FormInput/FormInput'
import './Steps.css'

const IdentityVerificationStep = ({ onNext }) => {
  const { user, isLoading } = useUserStore()
  
  const { 
    register, 
    handleSubmit,
    watch,
    formState: { errors, isSubmitting, isValid } 
  } = useForm({
    defaultValues: {
      idType: user.idType || '',
      idNumber: '',
      idDocument: user.idDocument || ''
    },
    mode: 'onChange'
  })
  
  const selectedIdType = watch('idType')
  
  const onSubmit = (data) => {
    onNext(data)
  }
  
  return (
    <div className="onboarding-step">
      <div className="onboarding-step__header">
        <h1 className="onboarding-step__title">Identity Verification</h1>
        <p className="onboarding-step__description">
          Please provide a government-issued ID to verify your identity. This is required for KYC compliance.
        </p>
      </div>
      
      <form className="onboarding-step__form" onSubmit={handleSubmit(onSubmit)}>
        <div className="onboarding-step__select-container">
          <label htmlFor="idType" className="onboarding-step__label">
            ID Type <span className="required">*</span>
          </label>
          <select
            id="idType"
            className={`onboarding-step__select ${errors.idType ? 'onboarding-step__select--error' : ''}`}
            {...register('idType', { 
              required: 'Please select an ID type' 
            })}
          >
            <option value="">Select ID Type</option>
            <option value="nin">National Identity Number (NIN)</option>
            <option value="voters">Voter's Card</option>
            <option value="drivers">Driver's License</option>
            <option value="passport">International Passport</option>
          </select>
          
          {errors.idType && (
            <div className="onboarding-step__error-text">
              {errors.idType.message}
            </div>
          )}
        </div>
        
        {selectedIdType && (
          <FormInput
            id="idNumber"
            label={`${selectedIdType === 'nin' ? 'NIN' : 
                    selectedIdType === 'voters' ? 'Voter\'s Card' : 
                    selectedIdType === 'drivers' ? 'Driver\'s License' : 
                    'Passport'} Number`}
            placeholder="Enter your ID number"
            {...register('idNumber', { 
              minLength: {
                value: 4,
                message: 'ID number is too short'
              }
            })}
          />
        )}
        
        <div className="onboarding-step__file-upload">
          <label htmlFor="idDocument" className="onboarding-step__file-label">
            Upload ID Document <span className="required">*</span>
          </label>
          
          <div className="onboarding-step__file-input-container">
            <input
              type="file"
              id="idDocument"
              className="onboarding-step__file-input"
              accept=".pdf,.jpg,.jpeg,.png"
              {...register('idDocument', { 
                required: 'ID document is required' 
              })}
            />
            <div className="onboarding-step__file-input-text">
              <FaIdCard className="onboarding-step__file-icon" />
              Drag & drop a file or <span>Browse</span>
            </div>
            <div className="onboarding-step__file-input-help">
              Upload a clear photo or scan of your ID (front and back)
            </div>
          </div>
          
          {errors.idDocument && (
            <div className="onboarding-step__error-text">
              {errors.idDocument.message}
            </div>
          )}
        </div>
        
        <div className="onboarding-step__note">
          <p>
            <strong>Important:</strong> Please ensure that the ID is valid and not expired. All information must be clearly visible.
          </p>
        </div>
        
        <div className="onboarding-step__actions">
          <Button 
            type="submit"
            disabled={!isValid}
            isLoading={isLoading}
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

export default IdentityVerificationStep