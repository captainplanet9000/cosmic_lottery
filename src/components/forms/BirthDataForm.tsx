import React from 'react'
import { useFormContext } from 'react-hook-form'
import { motion, AnimatePresence } from 'framer-motion'
import Select from 'react-select'

// Animation variants
const formVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.3 }
  },
  exit: { 
    opacity: 0, 
    x: -20,
    transition: { duration: 0.3 }
  }
}

interface BirthDataFormProps {
  currentStep: number
}

const BirthDataForm: React.FC<BirthDataFormProps> = ({ currentStep }) => {
  const { register, formState: { errors }, watch } = useFormContext()
  
  // Mock location options for the select dropdown
  const locationOptions = [
    { value: 'new-york', label: 'New York, NY, USA', timezone: 'America/New_York' },
    { value: 'los-angeles', label: 'Los Angeles, CA, USA', timezone: 'America/Los_Angeles' },
    { value: 'london', label: 'London, UK', timezone: 'Europe/London' },
    { value: 'tokyo', label: 'Tokyo, Japan', timezone: 'Asia/Tokyo' },
    { value: 'sydney', label: 'Sydney, Australia', timezone: 'Australia/Sydney' },
  ]
  
  // Generate years for select dropdown (1900 to current year)
  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: currentYear - 1899 }, (_, i) => ({ 
    value: (1900 + i).toString(),
    label: (1900 + i).toString()
  }))  
  // Generate months for select dropdown
  const months = [
    { value: '01', label: 'January' },
    { value: '02', label: 'February' },
    { value: '03', label: 'March' },
    { value: '04', label: 'April' },
    { value: '05', label: 'May' },
    { value: '06', label: 'June' },
    { value: '07', label: 'July' },
    { value: '08', label: 'August' },
    { value: '09', label: 'September' },
    { value: '10', label: 'October' },
    { value: '11', label: 'November' },
    { value: '12', label: 'December' },
  ]
  
  // Generate days for select dropdown (1-31)
  const days = Array.from({ length: 31 }, (_, i) => ({ 
    value: (i + 1).toString().padStart(2, '0'),
    label: (i + 1).toString()
  }))
  
  // Generate hours for select dropdown (0-23)
  const hours = Array.from({ length: 24 }, (_, i) => ({ 
    value: i.toString().padStart(2, '0'),
    label: i.toString().padStart(2, '0')
  }))
  
  // Generate minutes for select dropdown (0-59)
  const minutes = Array.from({ length: 60 }, (_, i) => ({ 
    value: i.toString().padStart(2, '0'),
    label: i.toString().padStart(2, '0')
  }))
  
  // Custom styles for React Select
  const selectStyles = {
    control: (base: any) => ({
      ...base,
      backgroundColor: '#1E293B',
      borderColor: '#64748B',
      boxShadow: 'none',
      '&:hover': {
        borderColor: '#FFD700',
      },
    }),
    menu: (base: any) => ({
      ...base,
      backgroundColor: '#1E293B',
      zIndex: 20,
    }),
    option: (base: any, state: any) => ({
      ...base,
      backgroundColor: state.isSelected ? '#6A0DAD' : state.isFocused ? '#374151' : '#1E293B',
      color: '#F8FAFC',
      '&:hover': {
        backgroundColor: '#374151',
      },
    }),
    singleValue: (base: any) => ({
      ...base,
      color: '#F8FAFC',
    }),
    input: (base: any) => ({
      ...base,
      color: '#F8FAFC',
    }),
  }  return (
    <AnimatePresence mode="wait">
      {currentStep === 0 && (
        <motion.div
          key="name-step"
          variants={formVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <h3 className="text-xl font-heading mb-4 text-cosmic-secondary">What's Your Name?</h3>
          <div className="space-y-4">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium mb-1">Full Name</label>
              <input 
                id="fullName"
                type="text"
                className="cosmic-input"
                placeholder="Enter your full name"
                {...register('fullName', { required: 'Your name is required' })}
              />
              {errors.fullName && (
                <p className="mt-1 text-cosmic-accent text-sm">{errors.fullName.message?.toString()}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
              <input 
                id="email"
                type="email"
                className="cosmic-input"
                placeholder="Enter your email"
                {...register('email', { 
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address'
                  }
                })}
              />
              {errors.email && (
                <p className="mt-1 text-cosmic-accent text-sm">{errors.email.message?.toString()}</p>
              )}
            </div>
          </div>
        </motion.div>
      )}
      
      {currentStep === 1 && (
        <motion.div
          key="datetime-step"
          variants={formVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <h3 className="text-xl font-heading mb-4 text-cosmic-secondary">When Were You Born?</h3>          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label htmlFor="birthYear" className="block text-sm font-medium mb-1">Year</label>
                <Select
                  id="birthYear"
                  options={years.reverse()}
                  placeholder="Year"
                  styles={selectStyles}
                  {...register('birthYear', { required: 'Birth year is required' })}
                />
              </div>
              
              <div>
                <label htmlFor="birthMonth" className="block text-sm font-medium mb-1">Month</label>
                <Select
                  id="birthMonth"
                  options={months}
                  placeholder="Month"
                  styles={selectStyles}
                  {...register('birthMonth', { required: 'Birth month is required' })}
                />
              </div>
              
              <div>
                <label htmlFor="birthDay" className="block text-sm font-medium mb-1">Day</label>
                <Select
                  id="birthDay"
                  options={days}
                  placeholder="Day"
                  styles={selectStyles}
                  {...register('birthDay', { required: 'Birth day is required' })}
                />
              </div>
            </div>
            
            <div>
              <p className="text-lg font-medium mb-3">Birth Time</p>
              
              <div className="mb-3">
                <label className="inline-flex items-center">
                  <input 
                    type="checkbox" 
                    className="form-checkbox rounded bg-cosmic-card border-cosmic-muted text-cosmic-primary focus:ring-cosmic-secondary"
                    {...register('unknownTime')}
                  />
                  <span className="ml-2">I don't know my birth time</span>
                </label>
              </div>
              
              {!watch('unknownTime') && (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="birthHour" className="block text-sm font-medium mb-1">Hour</label>
                    <Select
                      id="birthHour"
                      options={hours}
                      placeholder="Hour"
                      styles={selectStyles}
                      {...register('birthHour', { required: !watch('unknownTime') && 'Birth hour is required' })}
                    />
                  </div>                  <div>
                    <label htmlFor="birthMinute" className="block text-sm font-medium mb-1">Minute</label>
                    <Select
                      id="birthMinute"
                      options={minutes}
                      placeholder="Minute"
                      styles={selectStyles}
                      {...register('birthMinute', { required: !watch('unknownTime') && 'Birth minute is required' })}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
      
      {currentStep === 2 && (
        <motion.div
          key="location-step"
          variants={formVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <h3 className="text-xl font-heading mb-4 text-cosmic-secondary">Where Were You Born?</h3>
          <div className="space-y-4">
            <div>
              <label htmlFor="birthLocation" className="block text-sm font-medium mb-1">Birth Location</label>
              <Select
                id="birthLocation"
                options={locationOptions}
                placeholder="Search for your birth city..."
                styles={selectStyles}
                {...register('birthLocation', { required: 'Birth location is required' })}
              />
              {errors.birthLocation && (
                <p className="mt-1 text-cosmic-accent text-sm">{errors.birthLocation.message?.toString()}</p>
              )}
            </div>
            
            <div className="text-sm text-cosmic-muted-foreground mt-2">
              <p>Your birth location's timezone will be automatically detected.</p>
            </div>
          </div>
        </motion.div>
      )}      
      {currentStep === 3 && (
        <motion.div
          key="review-step"
          variants={formVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <h3 className="text-xl font-heading mb-4 text-cosmic-secondary">Review Your Details</h3>
          <div className="space-y-6">
            <div className="cosmic-card bg-cosmic-card/50">
              <h4 className="text-lg font-heading mb-2">Personal Information</h4>
              <p><span className="text-cosmic-muted">Name:</span> {watch('fullName')}</p>
              <p><span className="text-cosmic-muted">Email:</span> {watch('email')}</p>
            </div>
            
            <div className="cosmic-card bg-cosmic-card/50">
              <h4 className="text-lg font-heading mb-2">Birth Details</h4>
              <p>
                <span className="text-cosmic-muted">Date:</span> {watch('birthMonth')?.label} {watch('birthDay')?.label}, {watch('birthYear')?.label}
              </p>
              {!watch('unknownTime') ? (
                <p>
                  <span className="text-cosmic-muted">Time:</span> {watch('birthHour')?.label}:{watch('birthMinute')?.label}
                </p>
              ) : (
                <p><span className="text-cosmic-muted">Time:</span> Unknown</p>
              )}
              <p><span className="text-cosmic-muted">Location:</span> {watch('birthLocation')?.label}</p>
            </div>
            
            <div className="bg-cosmic-gradient p-4 rounded-lg">
              <p className="text-center text-lg font-heading text-cosmic-secondary">
                Ready to discover your cosmic fortune? 🌟
              </p>
              <p className="text-center text-sm mt-2">
                Confirm your details and click the button below to continue to payment and generate your report.
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default BirthDataForm