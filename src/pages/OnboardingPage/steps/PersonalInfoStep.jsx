import { useForm } from 'react-hook-form'
import { FaArrowRight } from 'react-icons/fa'
import { useUserStore } from '../../../store/userStore'
import Button from '../../../components/Button/Button'
import FormInput from '../../../components/FormInput/FormInput'
import './Steps.css'
import PropTypes from 'prop-types'

const PersonalInfoStep = ({ onNext }) => {
  const { user, setUser } = useUserStore()
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting, isValid } 
  } = useForm({
    defaultValues: {
      fullName: user.fullName || '',
      phoneNumber: user.phoneNumber || '',
      email: user.email || ''
    },
    mode: 'onChange'
  })
  
  const onSubmit = (data) => {
    setUser(data)
    onNext()
  }
  
  return (
    <div className="onboarding-step">
      <div className="onboarding-step__header">
        <h1 className="onboarding-step__title">Personal Information</h1>
        <p className="onboarding-step__description">
          Please provide your basic information to get started with your BNPL account.
        </p>
      </div>
      
      <form className="onboarding-step__form" onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          id="fullName"
          label="Full Name"
          placeholder="Enter your full name"
          required
          error={errors.fullName?.message}
          {...register('fullName', { 
            required: 'Full name is required',
            minLength: {
              value: 3,
              message: 'Name must be at least 3 characters'
            }
          })}
        />
        
        <FormInput
          id="phoneNumber"
          label="Phone Number"
          placeholder="Enter your phone number"
          required
          error={errors.phoneNumber?.message}
          {...register('phoneNumber', { 
            required: 'Phone number is required',
            pattern: {
              value: /^[0-9+\s()-]{10,15}$/,
              message: 'Please enter a valid phone number'
            }
          })}
        />
        
        <FormInput
          id="email"
          type="email"
          label="Email Address"
          placeholder="Enter your email address"
          required
          error={errors.email?.message}
          {...register('email', { 
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Please enter a valid email address'
            }
          })}
        />
        
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
PersonalInfoStep.propTypes = {
  onNext: PropTypes.func.isRequired,
}

export default PersonalInfoStep