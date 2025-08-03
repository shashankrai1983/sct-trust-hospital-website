# SCT Hospital - Minimal Modular Monolith with Frontend Handling

## 🎯 Goal
Transform both backend AND frontend into clean modular structure with **maximum impact, minimum complexity**.

## 📋 3-Phase Implementation (2-3 weeks total)

### Phase 1: Foundation Setup (3-4 days)
**Create modular structure for both backend and frontend**

#### 1.1 Directory Structure
```
src/modules/
├── appointments/
│   ├── components/     # Appointment UI components
│   ├── hooks/         # Appointment-specific React hooks
│   ├── services/      # Business logic
│   ├── types/         # Appointment types
│   ├── utils/         # Appointment utilities
│   └── api/          # API handlers
├── content/
│   ├── components/     # Blog/SOPs UI components
│   ├── hooks/         # Content hooks
│   ├── services/      # Content logic
│   └── api/          # Content API
├── shared/
│   ├── components/    # Reusable UI components
│   ├── hooks/        # Shared React hooks
│   ├── utils/        # Common utilities
│   ├── types/        # Shared types
│   └── database/     # DB utilities
└── frontend/         # Frontend-specific shared
    ├── design-system/ # Basic UI components
    │   ├── components/  # Button, Input, Card, Modal
    │   ├── healthcare/  # TrustBadge, MedicalForm, PatientCard
    │   └── tokens/      # Colors, typography, spacing
    └── providers/     # React providers
```

#### 1.2 Move Shared Code
**Backend Utilities:**
- `lib/mongodb.ts` → `modules/shared/database/mongodb.ts`
- `lib/utils.ts` → `modules/shared/utils/common.utils.ts`
- Create `modules/shared/types/common.types.ts`

**Frontend Utilities:**
- Move reusable components from `components/` to `modules/shared/components/`
- Extract common hooks to `modules/shared/hooks/`
- Create basic design tokens in `modules/frontend/design-system/tokens/`

#### 1.3 TypeScript Path Setup
```json
// tsconfig.json
{
  "compilerOptions": {
    "paths": {
      "@/modules/*": ["src/modules/*"],
      "@/shared/*": ["src/modules/shared/*"],
      "@/ui/*": ["src/modules/frontend/design-system/*"]
    }
  }
}
```

### Phase 2: Extract Appointments Module (Frontend + Backend) (5-6 days)
**Complete appointment functionality separation**

#### 2.1 Move Appointment Components
```
modules/appointments/components/
├── AppointmentForm.tsx        # From components/
├── AppointmentCalendar.tsx    # If exists
├── BookingConfirmation.tsx    # Success states
└── AppointmentStatus.tsx      # Status display
```

#### 2.2 Create Appointment Hooks
```typescript
// modules/appointments/hooks/useAppointmentForm.ts
export const useAppointmentForm = () => {
  const [formData, setFormData] = useState<AppointmentFormData>()
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<ValidationErrors>()

  const handleSubmit = async (data: AppointmentFormData) => {
    // Form submission logic
  }

  const validateForm = (data: AppointmentFormData) => {
    // Validation logic
  }

  return {
    formData,
    handleSubmit,
    isLoading,
    errors,
    validateForm,
    setFormData
  }
}

// modules/appointments/hooks/useAppointmentBooking.ts
export const useAppointmentBooking = () => {
  const bookAppointment = async (data: AppointmentRequest) => {
    // API call logic
  }

  return {
    bookAppointment,
    isBooking,
    bookingError,
    bookingSuccess
  }
}

// modules/appointments/hooks/useAvailableSlots.ts
export const useAvailableSlots = (date: string) => {
  // Fetch and manage available time slots
  return {
    slots,
    isLoading,
    error,
    refreshSlots
  }
}
```

#### 2.3 Service Layer Integration
```typescript
// modules/appointments/services/appointment.service.ts
export class AppointmentService {
  constructor(
    private database: DatabaseConnection,
    private validator: ValidationService
  ) {}

  async bookAppointment(data: AppointmentRequest): Promise<AppointmentResult> {
    // 1. Validate input
    const validatedData = await this.validator.validate(data)
    
    // 2. Check availability
    const isAvailable = await this.checkSlotAvailability(validatedData.date, validatedData.time)
    if (!isAvailable) {
      throw new Error('Slot not available')
    }
    
    // 3. Create appointment
    const appointment = await this.database.appointments.create(validatedData)
    
    return { success: true, appointment }
  }

  async validateSlot(date: string, time: string): Promise<boolean> {
    // Slot validation logic
  }

  async getAppointments(filters?: AppointmentFilters): Promise<Appointment[]> {
    // Fetch appointments with filters
  }
}

// modules/appointments/services/validation.service.ts
export class AppointmentValidationService {
  validateAppointmentData(data: unknown): AppointmentRequest {
    // Zod validation logic
  }

  validateTimeSlot(date: string, time: string): boolean {
    // Time slot validation
  }
}
```

#### 2.4 API Route Updates
```typescript
// modules/appointments/api/book.ts
import { AppointmentService } from '../services/appointment.service'

export async function POST(request: NextRequest) {
  try {
    const appointmentService = new AppointmentService()
    const data = await request.json()
    const result = await appointmentService.bookAppointment(data)
    
    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    )
  }
}

// app/api/appointments/route.ts (thin wrapper)
export { POST } from '@/modules/appointments/api/book'
```

#### 2.5 Update Pages to Use Module
```typescript
// app/contact/page.tsx
import { AppointmentForm } from '@/modules/appointments/components/AppointmentForm'
import { useAppointmentBooking } from '@/modules/appointments/hooks/useAppointmentBooking'

export default function ContactPage() {
  return (
    <div>
      <h1>Book an Appointment</h1>
      <AppointmentForm />
    </div>
  )
}
```

### Phase 3: Basic Design System + Integration (2-3 days)
**Ensure UI consistency and test everything**

#### 3.1 Create Basic Design System
```typescript
// modules/frontend/design-system/components/Button/Button.tsx
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'outline'
  size: 'sm' | 'md' | 'lg'
  children: React.ReactNode
  onClick?: () => void
  disabled?: boolean
  loading?: boolean
}

export const Button: React.FC<ButtonProps> = ({
  variant,
  size,
  children,
  ...props
}) => {
  // Accessible button implementation
}

// modules/frontend/design-system/components/Input/Input.tsx
interface InputProps {
  label: string
  type: 'text' | 'email' | 'tel' | 'date' | 'time'
  required?: boolean
  error?: string
  helpText?: string
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helpText,
  ...props
}) => {
  // Accessible input with label and error handling
}
```

#### 3.2 Healthcare-Specific Components
```typescript
// modules/frontend/design-system/healthcare/TrustBadge.tsx
interface TrustBadgeProps {
  type: 'hipaa' | 'medical-license' | 'ssl-secured'
}

export const TrustBadge: React.FC<TrustBadgeProps> = ({ type }) => {
  const badges = {
    'hipaa': {
      icon: ShieldIcon,
      text: 'HIPAA Compliant',
      description: 'Your health information is protected'
    },
    'medical-license': {
      icon: CertificateIcon,
      text: 'Licensed Medical Facility',
      description: 'Certified by Medical Council of India'
    },
    'ssl-secured': {
      icon: LockIcon,
      text: 'SSL Secured',
      description: 'Your data is encrypted and secure'
    }
  }
  
  return (
    <div className="trust-badge">
      {/* Badge implementation */}
    </div>
  )
}

// modules/frontend/design-system/healthcare/MedicalForm.tsx
export const MedicalForm: React.FC<MedicalFormProps> = ({
  children,
  onSubmit,
  isLoading
}) => {
  // Accessible medical form with healthcare-specific considerations
  return (
    <form onSubmit={onSubmit} className="medical-form">
      {children}
      <TrustBadge type="hipaa" />
    </form>
  )
}
```

#### 3.3 Design Tokens
```typescript
// modules/frontend/design-system/tokens/colors.ts
export const colors = {
  primary: {
    50: '#f0f9ff',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8'
  },
  healthcare: {
    trust: '#10b981',      // Green for trust indicators
    warning: '#f59e0b',    // Amber for warnings
    error: '#ef4444',      // Red for errors
    info: '#3b82f6'        // Blue for information
  },
  text: {
    primary: '#111827',
    secondary: '#6b7280',
    muted: '#9ca3af'
  }
}

// modules/frontend/design-system/tokens/typography.ts
export const typography = {
  fontFamily: {
    sans: ['Inter', 'system-ui', 'sans-serif'],
    medical: ['Source Sans Pro', 'system-ui', 'sans-serif']
  },
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',      // 16px minimum for healthcare
    lg: '1.125rem',
    xl: '1.25rem'
  }
}
```

#### 3.4 Test Complete Flow
**Manual Testing Checklist:**
- [ ] Appointment booking form loads correctly
- [ ] Form validation works (required fields, email format, phone format)
- [ ] Date and time selection functional
- [ ] Form submission success/error states
- [ ] Responsive design on mobile/tablet
- [ ] Basic accessibility (keyboard navigation, screen reader friendly)

**Technical Testing:**
- [ ] All imports resolve correctly
- [ ] TypeScript compilation passes
- [ ] No console errors in browser
- [ ] API endpoints respond correctly
- [ ] Database operations work

## ✅ Success Criteria
- [ ] Appointment UI components cleanly separated
- [ ] Appointment booking flow fully functional
- [ ] Reusable design system components created
- [ ] No visual regressions in existing UI
- [ ] Basic accessibility maintained (WCAG 2.1 AA basics)
- [ ] Team can work on appointment UI independently
- [ ] Clear component import paths
- [ ] TypeScript types properly defined
- [ ] Build process unchanged

## 🎨 Frontend Benefits
- **Component Ownership**: Clear responsibility for appointment UI
- **Reusable Design System**: Foundation for consistent healthcare UI
- **Better Testing**: Can test appointment components in isolation
- **Performance**: Module-based code splitting ready
- **Accessibility**: Healthcare-specific accessibility patterns
- **Maintainability**: UI changes isolated to relevant modules
- **Type Safety**: Proper TypeScript integration across modules

## 🚀 Why This Approach?
- **Complete Solution**: Handles both frontend and backend modularization
- **Healthcare Focus**: Includes medical/accessibility considerations
- **Fast Implementation**: 2-3 weeks for core structure
- **Foundation Ready**: Easy to add dashboard, content, auth modules
- **Team Scalability**: Frontend and backend developers can work independently
- **Low Risk**: Incremental changes, existing functionality preserved

## 📊 Expected Frontend Impact
- 70% reduction in UI-related merge conflicts
- Clear separation of appointment UI from other components
- Reusable healthcare design patterns
- Better component testing capabilities
- Foundation for advanced UI patterns (loading states, error boundaries, etc.)
- Improved developer experience with clear module boundaries

## 🔄 Future Expansion Path
After successful appointments module implementation:

1. **Content Module**: Extract blog and SOPs components
2. **Auth Module**: Login forms and session management UI
3. **Dashboard Module**: Admin interface components
4. **Advanced Design System**: More sophisticated healthcare UI patterns
5. **Performance Optimization**: Lazy loading, code splitting
6. **Accessibility Enhancement**: Screen reader optimization, keyboard shortcuts

## 🧪 Testing Strategy
- **Unit Tests**: Individual component testing
- **Integration Tests**: Module interaction testing
- **E2E Tests**: Complete user journey testing
- **Accessibility Tests**: Automated accessibility scanning
- **Visual Regression Tests**: UI consistency validation

This plan provides a solid foundation for a maintainable, scalable healthcare application with clear module boundaries and team ownership.