declare global {
  interface Window {
    gtag: any;
  }
}

export const GA_TRACKING_ID = 'G-N0Y7RHMSG2'

export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    })
  }
}

export const event = ({ action, category, label, value }: {
  action: string
  category: string
  label?: string
  value?: number
}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}

// Medical practice specific tracking events
export const trackAppointmentBooking = (method: string) => {
  event({
    action: 'appointment_booking',
    category: 'conversion',
    label: method,
    value: 1
  })
}

export const trackPhoneCall = (location: string) => {
  event({
    action: 'phone_call',
    category: 'conversion', 
    label: location,
    value: 1
  })
}

export const trackServicePageView = (serviceName: string) => {
  event({
    action: 'service_page_view',
    category: 'engagement',
    label: serviceName,
    value: 1
  })
}

export const trackFormSubmission = (formType: string) => {
  event({
    action: 'form_submission',
    category: 'engagement',
    label: formType,
    value: 1
  })
}

export const trackEmergencyContact = () => {
  event({
    action: 'emergency_contact',
    category: 'conversion',
    label: 'emergency_call',
    value: 1
  })
}