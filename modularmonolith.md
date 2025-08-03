# SCT Trust Hospital - Modular Monolith Architecture Guide

## Table of Contents
1. [Executive Summary](#executive-summary)
2. [Current State Analysis](#current-state-analysis)
3. [Proposed Modular Architecture](#proposed-modular-architecture)
4. [Domain Module Specifications](#domain-module-specifications)
5. [Module Interface Patterns](#module-interface-patterns)
6. [Data Architecture & Database Strategy](#data-architecture--database-strategy)
7. [File Organization & Structure](#file-organization--structure)
8. [Development Patterns & Best Practices](#development-patterns--best-practices)
9. [Testing Strategy](#testing-strategy)
10. [Migration Roadmap](#migration-roadmap)
11. [Benefits & Trade-offs](#benefits--trade-offs)
12. [Future Evolution Path](#future-evolution-path)

---

## Executive Summary

### Current Challenge
The SCT Trust Hospital Next.js application is currently structured as a traditional monolith with mixed concerns, making it harder to maintain, test, and scale. While the application works well, improving its architecture will enable better development velocity and future growth.

### Solution: Modular Monolith
Transform the application into a **modular monolith** - a single deployable unit organized into clearly defined, loosely coupled modules. This approach provides the benefits of microservices (separation of concerns, clear boundaries) without the operational complexity.

### Key Benefits
- ✅ **Improved Maintainability**: Clear separation of business domains
- ✅ **Better Testing**: Module-specific test strategies
- ✅ **Team Scalability**: Multiple developers can work on different modules
- ✅ **Future-Proof**: Easy path to microservices if needed
- ✅ **Single Deployment**: Maintains operational simplicity

---

## Current State Analysis

### Existing Application Structure
```
src/
├── app/                 # Next.js App Router pages (mixed concerns)
│   ├── api/            # API routes (appointments)
│   ├── dashboard/      # Admin functionality
│   ├── blog/          # Content management
│   ├── contact/       # Contact and appointments
│   └── services/      # Service pages
├── components/         # UI components (mixed domains)
├── lib/               # Utilities (mixed concerns)
├── data/              # Static data (SOPs)
├── pages/api/         # Legacy API routes (auth, dashboard)
└── types/             # Type definitions
```

### Identified Issues
1. **Mixed Concerns**: Components and logic scattered across domains
2. **Unclear Boundaries**: No clear separation between business domains  
3. **Difficult Testing**: Hard to test individual business areas
4. **Maintenance Overhead**: Changes in one area can affect others
5. **Team Coordination**: Developers working on same files/directories

### Business Domains Identified
1. **Appointments**: Booking, management, scheduling
2. **Content**: Blog posts, static content, CMS integration
3. **Authentication**: Admin login, session management
4. **Dashboard**: Admin interface, statistics, management
5. **Notifications**: Email/SMS communications
6. **SOPs**: Standard Operating Procedures for pregnancy care

---

## Proposed Modular Architecture

### High-Level Architecture Vision
```
┌─────────────────────────────────────────────────┐
│                 Next.js App                     │
├─────────────────────────────────────────────────┤
│  Web Layer (Pages, Components, API Routes)     │
├─────────────────────────────────────────────────┤
│              Module Layer                       │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐       │
│  │Appointment│ │ Content  │ │   Auth   │       │
│  │  Module   │ │  Module  │ │  Module  │ ....  │
│  └──────────┘ └──────────┘ └──────────┘       │
├─────────────────────────────────────────────────┤
│            Shared Layer                         │
│     Types, Utils, Database, Validation         │
├─────────────────────────────────────────────────┤
│           Infrastructure Layer                  │
│     MongoDB, Sanity CMS, NextAuth, Redis       │
└─────────────────────────────────────────────────┘
```

### Module Independence Principles
1. **Loose Coupling**: Modules interact through well-defined interfaces
2. **High Cohesion**: Related functionality grouped within modules
3. **Dependency Direction**: Modules depend on shared layer, not each other
4. **Data Ownership**: Each module owns its data and business logic
5. **Interface Contracts**: Clear APIs between modules

---

## Domain Module Specifications

### 1. Appointments Module
**Responsibility**: Complete appointment lifecycle management

```typescript
// Module Interface
interface AppointmentsModule {
  // Core Services
  bookAppointment(data: AppointmentRequest): Promise<AppointmentResult>
  getAppointments(filters?: AppointmentFilters): Promise<Appointment[]>
  updateAppointmentStatus(id: string, status: AppointmentStatus): Promise<void>
  cancelAppointment(id: string, reason?: string): Promise<void>
  
  // Business Logic
  validateAppointmentSlot(date: Date, time: string): Promise<boolean>
  calculateAvailableSlots(date: Date): Promise<TimeSlot[]>
  sendAppointmentConfirmation(appointmentId: string): Promise<void>
}
```

**Internal Structure**:
```
src/modules/appointments/
├── api/                 # API route handlers
│   ├── book.ts         # POST /api/appointments
│   ├── list.ts         # GET /api/appointments  
│   └── manage.ts       # PUT/DELETE /api/appointments/:id
├── components/         # Appointment-related UI components
│   ├── appointment-form.tsx
│   ├── appointment-calendar.tsx
│   └── appointment-list.tsx
├── services/           # Business logic
│   ├── appointment.service.ts
│   ├── validation.service.ts
│   └── notification.service.ts
├── types/              # Appointment-specific types
│   ├── appointment.types.ts
│   └── validation.types.ts
├── utils/              # Appointment utilities
│   ├── date-utils.ts
│   └── validation-utils.ts
└── __tests__/          # Module-specific tests
    ├── appointment.service.test.ts
    └── api.test.ts
```

**Data Ownership**:
- `appointments` collection in MongoDB
- Appointment-related validation rules
- Appointment status workflows

### 2. Content Module
**Responsibility**: Blog content, static pages, CMS integration

```typescript
// Module Interface  
interface ContentModule {
  // Blog Management
  getAllPosts(filters?: PostFilters): Promise<BlogPost[]>
  getPostBySlug(slug: string): Promise<BlogPost | null>
  getPostsByCategory(category: string): Promise<BlogPost[]>
  
  // Static Content
  getServiceContent(serviceId: string): Promise<ServiceContent>
  getSOPsData(): Promise<PregnancySOPsData>
  
  // CMS Integration
  revalidateContent(type: ContentType): Promise<void>
  getCachedContent<T>(key: string): Promise<T | null>
}
```

**Internal Structure**:
```
src/modules/content/
├── api/
│   ├── posts.ts        # Blog API endpoints
│   ├── services.ts     # Service content API
│   └── sops.ts         # SOPs data API
├── components/
│   ├── blog/
│   │   ├── post-preview.tsx
│   │   ├── post-list.tsx  
│   │   └── category-filter.tsx
│   └── sops/
│       ├── sop-navigation.tsx
│       └── sop-content.tsx
├── services/
│   ├── blog.service.ts
│   ├── sanity.service.ts
│   └── cache.service.ts
├── types/
│   ├── blog.types.ts
│   └── sops.types.ts
└── __tests__/
```

**Data Ownership**:
- Sanity CMS content
- Static SOPs data
- Content caching strategies

### 3. Authentication Module  
**Responsibility**: User authentication, session management, authorization

```typescript
// Module Interface
interface AuthModule {
  // Authentication
  login(credentials: LoginCredentials): Promise<AuthResult>
  logout(sessionId: string): Promise<void>
  refreshToken(token: string): Promise<TokenResult>
  
  // Authorization  
  validateSession(token: string): Promise<User | null>
  checkPermissions(user: User, resource: string): Promise<boolean>
  
  // Middleware
  requireAuth(req: NextRequest): Promise<User | Response>
  requireAdmin(req: NextRequest): Promise<User | Response>
}
```

**Internal Structure**:
```
src/modules/auth/
├── api/
│   ├── login.ts        # Authentication endpoints
│   ├── logout.ts
│   └── validate.ts
├── middleware/
│   ├── auth.middleware.ts
│   └── admin.middleware.ts  
├── services/
│   ├── auth.service.ts
│   ├── session.service.ts
│   └── password.service.ts
├── types/
│   ├── auth.types.ts
│   └── session.types.ts
└── __tests__/
```

**Data Ownership**:
- User sessions
- Authentication state
- Admin user data

### 4. Dashboard Module
**Responsibility**: Admin interface, statistics, management tools

```typescript
// Module Interface
interface DashboardModule {
  // Statistics
  getAppointmentStats(period: TimePeriod): Promise<AppointmentStats>
  getSystemHealth(): Promise<SystemHealthStats>
  
  // Management
  getRecentActivity(): Promise<Activity[]>
  exportAppointments(filters: ExportFilters): Promise<ExportResult>
  
  // UI Components
  renderDashboard(): JSX.Element
  renderAppointmentManagement(): JSX.Element
}
```

**Internal Structure**:
```
src/modules/dashboard/
├── api/
│   ├── stats.ts        # Dashboard statistics
│   └── export.ts       # Data export
├── components/
│   ├── dashboard-layout.tsx
│   ├── stats-widgets.tsx
│   ├── appointment-management.tsx
│   └── activity-feed.tsx
├── services/
│   ├── analytics.service.ts
│   └── export.service.ts
├── types/
│   └── dashboard.types.ts
└── __tests__/
```

**Data Ownership**:
- Dashboard-specific analytics
- Export configurations
- Admin interface state

### 5. Notifications Module
**Responsibility**: Email/SMS notifications, message templates, delivery tracking

```typescript
// Module Interface
interface NotificationsModule {
  // Email Notifications
  sendAppointmentConfirmation(appointmentId: string): Promise<NotificationResult>
  sendAppointmentReminder(appointmentId: string): Promise<NotificationResult>
  sendCancellationNotice(appointmentId: string): Promise<NotificationResult>
  
  // Template Management
  getTemplate(templateId: string): Promise<EmailTemplate>
  renderTemplate(templateId: string, data: any): Promise<string>
  
  // Delivery Tracking
  getDeliveryStatus(notificationId: string): Promise<DeliveryStatus>
  retryFailedNotification(notificationId: string): Promise<void>
}
```

**Internal Structure**:
```
src/modules/notifications/
├── api/
│   ├── send.ts         # Send notification endpoints
│   └── status.ts       # Delivery status
├── services/
│   ├── email.service.ts
│   ├── sms.service.ts
│   ├── template.service.ts
│   └── delivery.service.ts
├── templates/
│   ├── appointment-confirmation.tsx
│   ├── appointment-reminder.tsx
│   └── cancellation-notice.tsx
├── types/
│   └── notification.types.ts
└── __tests__/
```

**Data Ownership**:
- Notification logs
- Email templates
- Delivery status tracking

### 6. Shared Module
**Responsibility**: Common utilities, types, and infrastructure

```typescript
// Module Interface
interface SharedModule {
  // Database
  getDatabase(): Promise<Db>
  getCollection(name: string): Promise<Collection>
  
  // Validation  
  validateSchema<T>(data: unknown, schema: ZodSchema<T>): Promise<T>
  
  // Utilities
  formatDate(date: Date, format: string): string
  generateId(): string
  hashPassword(password: string): Promise<string>
  
  // Cache
  getCached<T>(key: string): Promise<T | null>
  setCached<T>(key: string, value: T, ttl?: number): Promise<void>
}
```

**Internal Structure**:
```
src/modules/shared/
├── database/
│   ├── mongodb.ts      # Database connection and utilities
│   └── queries.ts      # Common query patterns
├── validation/
│   ├── schemas.ts      # Zod validation schemas
│   └── validators.ts   # Custom validation functions
├── utils/
│   ├── date.utils.ts
│   ├── crypto.utils.ts
│   ├── format.utils.ts
│   └── cache.utils.ts
├── types/
│   ├── common.types.ts # Shared type definitions
│   └── api.types.ts    # Common API types
├── constants/
│   ├── app.constants.ts
│   └── validation.constants.ts
└── __tests__/
```

**Data Ownership**:
- Common utilities
- Shared type definitions  
- Infrastructure abstractions

---

## Module Interface Patterns

### Dependency Injection Pattern
Modules should not directly import each other. Instead, use dependency injection for loose coupling:

```typescript
// ❌ Bad: Direct module dependency
import { appointmentService } from '@/modules/appointments'

// ✅ Good: Dependency injection
interface NotificationDependencies {
  appointmentService: AppointmentService
}

export class NotificationService {
  constructor(private deps: NotificationDependencies) {}
  
  async sendConfirmation(appointmentId: string) {
    const appointment = await this.deps.appointmentService.getById(appointmentId)
    // Send notification logic
  }
}
```

### Event-Driven Communication
Use events for cross-module communication to maintain loose coupling:

```typescript
// Event system for module communication
type DomainEvents = {
  'appointment.booked': { appointmentId: string; userEmail: string }
  'appointment.cancelled': { appointmentId: string; reason?: string }  
  'user.authenticated': { userId: string; sessionId: string }
}

// Publisher (Appointments Module)
export class AppointmentService {
  async bookAppointment(data: AppointmentRequest) {
    const appointment = await this.create(data)
    
    // Emit event for other modules to handle
    eventBus.emit('appointment.booked', {
      appointmentId: appointment.id,
      userEmail: appointment.email
    })
    
    return appointment
  }
}

// Subscriber (Notifications Module)  
export class NotificationService {
  constructor() {
    eventBus.on('appointment.booked', this.handleAppointmentBooked.bind(this))
  }
  
  private async handleAppointmentBooked(event: DomainEvents['appointment.booked']) {
    await this.sendAppointmentConfirmation(event.appointmentId)
  }
}
```

### Module Factory Pattern
Create modules through factories to control dependencies:

```typescript
// Module factory
export class ModuleFactory {
  private static instances = new Map()
  
  static createAppointmentModule(deps: AppointmentDependencies): AppointmentModule {
    if (!this.instances.has('appointments')) {
      this.instances.set('appointments', new AppointmentModule(deps))
    }
    return this.instances.get('appointments')
  }
  
  static createNotificationModule(deps: NotificationDependencies): NotificationModule {
    if (!this.instances.has('notifications')) {
      this.instances.set('notifications', new NotificationModule(deps))
    }
    return this.instances.get('notifications')
  }
}

// Usage in API routes
export async function POST(request: NextRequest) {
  const appointmentModule = ModuleFactory.createAppointmentModule({
    database: await getDatabase(),
    eventBus: getEventBus(),
    validator: getValidator()
  })
  
  return appointmentModule.bookAppointment(await request.json())
}
```

---

## Data Architecture & Database Strategy

### Database Organization
While keeping a single MongoDB instance, organize data by domain:

```typescript
// Database collections by module
const DATABASE_SCHEMA = {
  // Appointments Module
  appointments: {
    collection: 'appointments',
    indexes: ['email', 'date', 'status', 'createdAt'],
    owner: 'appointments'
  },
  
  // Auth Module  
  sessions: {
    collection: 'sessions',
    indexes: ['userId', 'sessionId', 'expiresAt'],
    owner: 'auth'
  },
  
  // Notifications Module
  notifications: {
    collection: 'notifications',
    indexes: ['appointmentId', 'status', 'sentAt'],
    owner: 'notifications'
  },
  
  // Content Module (external)
  blog_posts: {
    source: 'sanity_cms',
    cache: 'redis',
    owner: 'content'
  }
} as const
```

### Data Access Layer (DAL)
Each module implements its own data access layer:

```typescript
// Base repository pattern
abstract class BaseRepository<T> {
  constructor(
    protected collection: Collection,
    protected validator: ZodSchema<T>
  ) {}
  
  async findById(id: string): Promise<T | null> {
    const doc = await this.collection.findOne({ _id: new ObjectId(id) })
    return doc ? this.validator.parse(doc) : null
  }
  
  async create(data: Omit<T, '_id'>): Promise<T> {
    const validated = this.validator.parse(data)
    const result = await this.collection.insertOne(validated)
    return { ...validated, _id: result.insertedId } as T
  }
}

// Module-specific repository
export class AppointmentRepository extends BaseRepository<Appointment> {
  constructor() {
    super(
      getCollection('appointments'),
      appointmentSchema
    )
  }
  
  async findByEmail(email: string): Promise<Appointment[]> {
    const docs = await this.collection.find({ email }).toArray()
    return docs.map(doc => this.validator.parse(doc))
  }
  
  async findByDateRange(start: Date, end: Date): Promise<Appointment[]> {
    const docs = await this.collection.find({
      date: { $gte: start, $lte: end }
    }).toArray()
    return docs.map(doc => this.validator.parse(doc))
  }
}
```

### Cache Strategy
Implement module-specific caching:

```typescript
// Cache abstraction
interface CacheService {
  get<T>(key: string): Promise<T | null>
  set<T>(key: string, value: T, ttl?: number): Promise<void>
  delete(key: string): Promise<void>
  invalidatePattern(pattern: string): Promise<void>
}

// Module-specific cache keys
export const CACHE_KEYS = {
  appointments: {
    byId: (id: string) => `appointments:${id}`,
    byEmail: (email: string) => `appointments:email:${email}`,
    availableSlots: (date: string) => `appointments:slots:${date}`
  },
  content: {
    blogPost: (slug: string) => `content:blog:${slug}`,
    sopData: () => `content:sops:data`,
    serviceContent: (id: string) => `content:service:${id}`
  }
} as const
```

---

## File Organization & Structure

### New Project Structure
```
src/
├── app/                          # Next.js App Router (Web Layer)
│   ├── (public)/                # Public routes
│   │   ├── page.tsx             # Homepage  
│   │   ├── about/
│   │   ├── services/
│   │   ├── gallery/
│   │   ├── contact/
│   │   └── blog/
│   ├── (admin)/                 # Admin routes
│   │   └── dashboard/
│   └── api/                     # API routes (thin wrappers)
│       ├── appointments/
│       ├── auth/
│       ├── content/
│       └── notifications/
├── modules/                      # Domain Modules (Business Layer)
│   ├── appointments/
│   │   ├── api/                 # Module API handlers
│   │   ├── components/          # Module-specific components
│   │   ├── services/            # Business logic
│   │   ├── types/               # Module types  
│   │   ├── utils/               # Module utilities
│   │   └── __tests__/           # Module tests
│   ├── content/
│   ├── auth/
│   ├── dashboard/
│   ├── notifications/
│   └── shared/                  # Shared utilities
│       ├── database/
│       ├── validation/
│       ├── utils/
│       ├── types/
│       └── constants/
├── components/                   # Shared UI Components (Presentation Layer)
│   ├── ui/                      # Design system components
│   ├── layout/                  # Layout components
│   └── forms/                   # Form components
├── lib/                         # Infrastructure Layer
│   ├── mongodb.ts               # Database configuration
│   ├── cache.ts                 # Cache configuration
│   ├── validation.ts            # Global validation
│   └── config.ts                # App configuration
└── types/                       # Global Types
    ├── global.types.ts
    └── api.types.ts
```

### File Naming Conventions
```typescript
// Files should follow these patterns:
- Components: PascalCase.tsx (e.g., AppointmentForm.tsx)
- Services: camelCase.service.ts (e.g., appointment.service.ts)  
- Types: camelCase.types.ts (e.g., appointment.types.ts)
- Utils: camelCase.utils.ts (e.g., date.utils.ts)
- Tests: filename.test.ts (e.g., appointment.service.test.ts)
- API Routes: kebab-case.ts (e.g., book-appointment.ts)
```

### Import Path Strategy
Use TypeScript path mapping for clean imports:

```typescript
// tsconfig.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@/modules/*": ["src/modules/*"],
      "@/components/*": ["src/components/*"],
      "@/lib/*": ["src/lib/*"],
      "@/types/*": ["src/types/*"]
    }
  }
}

// Usage examples
import { AppointmentService } from '@/modules/appointments/services/appointment.service'
import { Button } from '@/components/ui/button'
import { validateAppointment } from '@/modules/appointments/utils/validation.utils'
import type { Appointment } from '@/modules/appointments/types/appointment.types'
```

---

## Development Patterns & Best Practices

### Module Development Rules
1. **Single Responsibility**: Each module handles one business domain
2. **Dependency Direction**: Modules depend on shared layer, not each other
3. **Interface Contracts**: Clear, typed interfaces between modules
4. **Event Communication**: Use events for cross-module communication
5. **Data Ownership**: Each module owns its data and business rules

### Code Organization Patterns

#### Service Layer Pattern
```typescript
// Each module has a main service class
export class AppointmentService {
  constructor(
    private repository: AppointmentRepository,
    private validator: ValidationService,
    private eventBus: EventBus,
    private cache: CacheService
  ) {}
  
  async bookAppointment(data: AppointmentRequest): Promise<AppointmentResult> {
    // 1. Validate input
    const validatedData = await this.validator.validate(data, appointmentSchema)
    
    // 2. Business logic
    const isSlotAvailable = await this.checkSlotAvailability(validatedData.date, validatedData.time)
    if (!isSlotAvailable) {
      throw new BusinessError('Slot not available')
    }
    
    // 3. Create appointment
    const appointment = await this.repository.create(validatedData)
    
    // 4. Update cache
    await this.cache.invalidatePattern(`appointments:slots:${validatedData.date}`)
    
    // 5. Emit event
    this.eventBus.emit('appointment.booked', { appointmentId: appointment._id })
    
    return { success: true, appointment }
  }
}
```

#### Repository Pattern
```typescript
// Data access abstraction
export class AppointmentRepository {
  constructor(private collection: Collection<Appointment>) {}
  
  async create(data: CreateAppointmentData): Promise<Appointment> {
    const appointment = {
      ...data,
      _id: new ObjectId(),
      status: 'pending' as const,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    
    await this.collection.insertOne(appointment)
    return appointment
  }
  
  async findById(id: string): Promise<Appointment | null> {
    return await this.collection.findOne({ _id: new ObjectId(id) })
  }
  
  async findByDateRange(start: Date, end: Date): Promise<Appointment[]> {
    return await this.collection.find({
      date: { $gte: start, $lte: end }
    }).toArray()
  }
}
```

#### Validation Pattern
```typescript
// Module-specific validation
export const appointmentSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().regex(/^\+91[0-9]{10}$/),
  service: z.enum(['high-risk-pregnancy', 'antenatal', 'infertility']),
  date: z.string().transform((str) => new Date(str)),
  time: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
  message: z.string().optional()
})

export type AppointmentRequest = z.infer<typeof appointmentSchema>

// Usage in service
export class ValidationService {
  async validateAppointment(data: unknown): Promise<AppointmentRequest> {
    try {
      return appointmentSchema.parse(data)
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new ValidationError('Invalid appointment data', error.errors)
      }
      throw error
    }
  }
}
```

### Error Handling Pattern
```typescript
// Module-specific error types
export class AppointmentError extends Error {
  constructor(message: string, public code: string, public details?: any) {
    super(message)
    this.name = 'AppointmentError'
  }
}

export class SlotUnavailableError extends AppointmentError {
  constructor(date: string, time: string) {
    super(`Slot unavailable for ${date} at ${time}`, 'SLOT_UNAVAILABLE', { date, time })
  }
}

// Global error handler
export function handleModuleError(error: Error, module: string) {
  if (error instanceof AppointmentError) {
    return NextResponse.json(
      { success: false, error: error.message, code: error.code },
      { status: 400 }
    )
  }
  
  console.error(`Error in ${module} module:`, error)
  return NextResponse.json(
    { success: false, error: 'Internal server error' },
    { status: 500 }
  )
}
```

---

## Testing Strategy

### Module-Level Testing
Each module should have comprehensive tests covering all layers:

```typescript
// Test structure per module
src/modules/appointments/__tests__/
├── unit/
│   ├── services/
│   │   ├── appointment.service.test.ts
│   │   └── validation.service.test.ts
│   ├── repositories/
│   │   └── appointment.repository.test.ts
│   └── utils/
│       └── date.utils.test.ts
├── integration/
│   ├── api/
│   │   ├── book-appointment.test.ts
│   │   └── list-appointments.test.ts
│   └── database/
│       └── appointment.integration.test.ts
└── e2e/
    └── appointment-flow.test.ts
```

### Testing Patterns

#### Unit Tests - Service Layer
```typescript
// appointment.service.test.ts
describe('AppointmentService', () => {
  let service: AppointmentService
  let mockRepository: jest.Mocked<AppointmentRepository>
  let mockEventBus: jest.Mocked<EventBus>
  
  beforeEach(() => {
    mockRepository = createMockRepository()
    mockEventBus = createMockEventBus()
    service = new AppointmentService(mockRepository, mockEventBus)
  })
  
  describe('bookAppointment', () => {
    it('should book appointment successfully', async () => {
      // Arrange
      const appointmentData = createValidAppointmentData()
      mockRepository.create.mockResolvedValue(createMockAppointment())
      
      // Act
      const result = await service.bookAppointment(appointmentData)
      
      // Assert
      expect(result.success).toBe(true)
      expect(mockRepository.create).toHaveBeenCalledWith(appointmentData)
      expect(mockEventBus.emit).toHaveBeenCalledWith('appointment.booked', expect.any(Object))
    })
    
    it('should throw error when slot is unavailable', async () => {
      // Arrange
      const appointmentData = createValidAppointmentData()
      service.checkSlotAvailability = jest.fn().mockResolvedValue(false)
      
      // Act & Assert
      await expect(service.bookAppointment(appointmentData))
        .rejects.toThrow(SlotUnavailableError)
    })
  })
})
```

#### Integration Tests - API Layer
```typescript
// book-appointment.test.ts
describe('POST /api/appointments', () => {
  let testDb: Db
  
  beforeEach(async () => {
    testDb = await setupTestDatabase()
  })
  
  afterEach(async () => {
    await cleanupTestDatabase(testDb)
  })
  
  it('should create appointment with valid data', async () => {
    // Arrange
    const appointmentData = {
      name: 'Test Patient',
      email: 'test@example.com',
      phone: '+919876543210',
      service: 'high-risk-pregnancy',
      date: '2024-08-01',
      time: '10:00'
    }
    
    // Act
    const response = await request(app)
      .post('/api/appointments')
      .send(appointmentData)
    
    // Assert
    expect(response.status).toBe(201)
    expect(response.body.success).toBe(true)
    expect(response.body.appointment).toMatchObject({
      name: appointmentData.name,
      email: appointmentData.email,
      status: 'pending'
    })
    
    // Verify database
    const dbAppointment = await testDb.collection('appointments')
      .findOne({ email: appointmentData.email })
    expect(dbAppointment).toBeTruthy()
  })
})
```

#### End-to-End Tests
```typescript
// appointment-flow.test.ts (Playwright)
import { test, expect } from '@playwright/test'

test.describe('Appointment Booking Flow', () => {
  test('should book appointment successfully', async ({ page }) => {
    // Navigate to contact page
    await page.goto('/contact')
    
    // Fill appointment form
    await page.fill('[data-testid="name-input"]', 'Test Patient')
    await page.fill('[data-testid="email-input"]', 'test@example.com')
    await page.fill('[data-testid="phone-input"]', '+919876543210')
    await page.selectOption('[data-testid="service-select"]', 'high-risk-pregnancy')
    await page.fill('[data-testid="date-input"]', '2024-08-01')
    await page.selectOption('[data-testid="time-select"]', '10:00')
    
    // Submit form
    await page.click('[data-testid="submit-button"]')
    
    // Verify success message
    await expect(page.locator('[data-testid="success-message"]')).toBeVisible()
    await expect(page.locator('[data-testid="success-message"]'))
      .toContainText('Appointment booked successfully')
  })
})
```

### Test Configuration
```typescript
// jest.config.js
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  testMatch: [
    '**/__tests__/**/*.test.ts',
    '**/__tests__/**/*.test.tsx'
  ],
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@/modules/(.*)$': '<rootDir>/src/modules/$1'
  },
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  collectCoverageFrom: [
    'src/modules/**/*.{ts,tsx}',
    '!src/modules/**/*.types.ts',
    '!src/modules/**/__tests__/**'
  ],
  coverageReporters: ['text', 'lcov', 'html'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  }
}
```

---

## Migration Roadmap

### Phase 1: Foundation Setup (Week 1)
**Goal**: Establish new structure without breaking existing functionality

#### Step 1.1: Create Module Structure
```bash
# Create new directory structure
mkdir -p src/modules/{appointments,content,auth,dashboard,notifications,shared}
mkdir -p src/modules/{appointments,content,auth,dashboard,notifications}/{api,components,services,types,utils,__tests__}
mkdir -p src/modules/shared/{database,validation,utils,types,constants}
```

#### Step 1.2: Move Shared Utilities
- Move `lib/mongodb.ts` → `modules/shared/database/mongodb.ts`
- Move `lib/utils.ts` → `modules/shared/utils/common.utils.ts`  
- Create `modules/shared/types/common.types.ts`
- Update import paths in existing files

#### Step 1.3: Setup Path Mapping
```typescript
// Update tsconfig.json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["src/*"],
      "@/modules/*": ["src/modules/*"],
      "@/shared/*": ["src/modules/shared/*"]
    }
  }
}
```

#### Step 1.4: Create Module Interfaces
Define TypeScript interfaces for each module without implementation:
```typescript
// modules/appointments/types/appointment.types.ts
export interface AppointmentModule {
  bookAppointment(data: AppointmentRequest): Promise<AppointmentResult>
  // ... other methods
}
```

### Phase 2: Authentication Module (Week 2)
**Goal**: Extract authentication into dedicated module

#### Step 2.1: Create Auth Module Structure
```typescript
// modules/auth/services/auth.service.ts
export class AuthService implements AuthModule {
  async login(credentials: LoginCredentials): Promise<AuthResult> {
    // Move logic from pages/api/auth/[...nextauth].ts
  }
  
  async validateSession(token: string): Promise<User | null> {
    // Session validation logic
  }
}
```

#### Step 2.2: Create Auth API Handlers
```typescript
// modules/auth/api/login.ts
import { AuthService } from '../services/auth.service'

export async function POST(request: NextRequest) {
  const authService = new AuthService()
  const credentials = await request.json()
  return authService.login(credentials)
}
```

#### Step 2.3: Update NextAuth Configuration
```typescript
// Move NextAuth logic to auth module
// Update pages/api/auth/[...nextauth].ts to use auth module
```

#### Step 2.4: Test Auth Module
- Unit tests for AuthService
- Integration tests for API endpoints
- E2E tests for login flow

### Phase 3: Content Module (Week 3)
**Goal**: Extract blog and content management

#### Step 3.1: Create Content Services
```typescript
// modules/content/services/blog.service.ts
export class BlogService implements ContentModule {
  async getAllPosts(): Promise<BlogPost[]> {
    // Move logic from app/blog/page.tsx
  }
  
  async getPostBySlug(slug: string): Promise<BlogPost | null> {
    // Move logic from app/blog/[slug]/page.tsx
  }
}
```

#### Step 3.2: Extract Content API Routes
- Move blog API logic to `modules/content/api/`
- Update app router pages to use content module
- Implement caching strategy

#### Step 3.3: Move SOPs Data
```typescript
// modules/content/services/sops.service.ts
export class SOPsService {
  async getSOPsData(): Promise<PregnancySOPsData> {
    // Move from data/pregnancy-sops.ts
  }
}
```

### Phase 4: Appointments Module (Week 4)
**Goal**: Extract appointment management logic

#### Step 4.1: Create Appointment Services
```typescript
// modules/appointments/services/appointment.service.ts
export class AppointmentService implements AppointmentsModule {
  async bookAppointment(data: AppointmentRequest): Promise<AppointmentResult> {
    // Move from app/api/appointments/route.ts
  }
}
```

#### Step 4.2: Extract UI Components
- Move appointment form to `modules/appointments/components/`
- Update contact page to use appointment module
- Implement validation service

#### Step 4.3: Database Migration
- Create appointment repository
- Update database access patterns
- Implement caching

### Phase 5: Dashboard & Notifications (Week 5)
**Goal**: Complete remaining modules

#### Step 5.1: Dashboard Module
- Extract dashboard logic from `app/dashboard/`
- Create analytics service
- Move admin components

#### Step 5.2: Notifications Module  
- Create email service
- Implement notification templates
- Setup event handling

### Phase 6: Integration & Testing (Week 6)
**Goal**: Complete integration and testing

#### Step 6.1: Event System Implementation
```typescript
// modules/shared/events/event-bus.ts
export class EventBus {
  private handlers = new Map<string, Function[]>()
  
  emit<T extends keyof DomainEvents>(event: T, data: DomainEvents[T]): void {
    const handlers = this.handlers.get(event) || []
    handlers.forEach(handler => handler(data))
  }
  
  on<T extends keyof DomainEvents>(event: T, handler: (data: DomainEvents[T]) => void): void {
    const handlers = this.handlers.get(event) || []
    handlers.push(handler)
    this.handlers.set(event, handlers)
  }
}
```

#### Step 6.2: Module Integration
- Connect modules through event system
- Implement cross-module communication
- Setup dependency injection

#### Step 6.3: Comprehensive Testing
- Complete unit test coverage for all modules
- Integration tests for module interactions
- End-to-end tests for complete user flows
- Performance testing

### Phase 7: Optimization & Documentation (Week 7)
**Goal**: Performance optimization and documentation

#### Step 7.1: Performance Optimization
- Implement module-level caching
- Optimize database queries
- Add monitoring and metrics

#### Step 7.2: Documentation
- Complete API documentation
- Create development guidelines
- Document deployment procedures

#### Step 7.3: Final Testing
- Load testing
- Security testing
- User acceptance testing

---

## Benefits & Trade-offs

### Benefits of Modular Monolith

#### ✅ **Improved Maintainability**
- **Clear Boundaries**: Each module has well-defined responsibilities
- **Reduced Coupling**: Changes in one module don't affect others
- **Easier Debugging**: Issues are contained within modules
- **Better Code Organization**: Related functionality grouped together

#### ✅ **Better Development Experience**
- **Team Scalability**: Multiple developers can work on different modules
- **Faster Onboarding**: New developers can focus on specific modules
- **Independent Testing**: Each module can be tested in isolation
- **Clear Ownership**: Teams can own specific business domains

#### ✅ **Operational Simplicity**
- **Single Deployment**: No need for complex orchestration
- **Simplified Monitoring**: One application to monitor
- **No Network Latency**: Direct function calls instead of HTTP calls
- **Easier Local Development**: Single application to run

#### ✅ **Future Flexibility**
- **Microservices Path**: Easy to extract modules into separate services
- **Technology Evolution**: Can upgrade modules independently
- **Scalability Options**: Can identify bottlenecks and scale specific modules

### Trade-offs and Considerations

#### ⚠️ **Potential Challenges**

**Increased Complexity**
- More files and directories to manage
- Need for clear conventions and discipline
- Learning curve for team members

**Module Boundary Decisions**
- Risk of creating wrong boundaries
- Potential for over-modularization
- Need for ongoing architectural decisions

**Testing Overhead**
- More test files and test scenarios
- Need for integration testing between modules
- Potential for test duplication

#### 🔧 **Mitigation Strategies**

**Clear Guidelines**
- Establish clear module boundaries
- Document patterns and conventions
- Regular architecture reviews

**Tooling Support**
- TypeScript for compile-time safety
- Linting rules for import restrictions
- Automated testing pipelines

**Team Training**
- Architecture workshops
- Code review processes
- Pair programming for knowledge transfer

### Comparison with Alternatives

| Approach | Complexity | Performance | Scalability | Ops Overhead | Team Size |
|----------|------------|-------------|-------------|--------------|-----------|
| **Current Monolith** | Low | High | Limited | Low | Small |
| **Modular Monolith** | Medium | High | Medium | Low | Medium |
| **Microservices** | High | Medium | High | High | Large |

### Success Metrics

#### Immediate Benefits (Month 1-2)
- ✅ Reduced merge conflicts between developers
- ✅ Faster feature development in isolated modules  
- ✅ Improved test coverage and reliability
- ✅ Better code review process with clear ownership

#### Medium-term Benefits (Month 3-6)
- ✅ Easier onboarding of new team members
- ✅ Reduced bug reports due to better isolation
- ✅ Faster debugging and issue resolution
- ✅ Improved code quality metrics

#### Long-term Benefits (Month 6+)
- ✅ Foundation for future microservices if needed
- ✅ Improved system understanding and documentation
- ✅ Better scalability planning and bottleneck identification
- ✅ Enhanced team productivity and satisfaction

---

## Backend Architect Recommendations

*Added by: Backend Architect - Claude Code*

Based on the architectural analysis, the following enhancements will improve the modular monolith's resilience, observability, and security posture:

### 1. Circuit Breaker Pattern for External Services

Implement circuit breaker pattern to handle external service failures gracefully:

```typescript
// modules/shared/resilience/circuit-breaker.ts
interface CircuitBreakerConfig {
  failureThreshold: number
  resetTimeout: number
  monitoringPeriod: number
}

enum CircuitState {
  CLOSED = 'CLOSED',
  OPEN = 'OPEN', 
  HALF_OPEN = 'HALF_OPEN'
}

export class CircuitBreaker {
  private state = CircuitState.CLOSED
  private failureCount = 0
  private lastFailureTime = 0
  
  constructor(private config: CircuitBreakerConfig) {}
  
  async execute<T>(operation: () => Promise<T>): Promise<T> {
    if (this.state === CircuitState.OPEN) {
      if (Date.now() - this.lastFailureTime > this.config.resetTimeout) {
        this.state = CircuitState.HALF_OPEN
      } else {
        throw new Error('Circuit breaker is OPEN')
      }
    }
    
    try {
      const result = await operation()
      this.onSuccess()
      return result
    } catch (error) {
      this.onFailure()
      throw error
    }
  }
  
  private onSuccess(): void {
    this.failureCount = 0
    this.state = CircuitState.CLOSED
  }
  
  private onFailure(): void {
    this.failureCount++
    this.lastFailureTime = Date.now()
    
    if (this.failureCount >= this.config.failureThreshold) {
      this.state = CircuitState.OPEN
    }
  }
}

// Usage in modules
// modules/notifications/services/email.service.ts
export class EmailService {
  private circuitBreaker = new CircuitBreaker({
    failureThreshold: 5,
    resetTimeout: 60000, // 1 minute
    monitoringPeriod: 10000 // 10 seconds
  })
  
  async sendEmail(data: EmailData): Promise<void> {
    return this.circuitBreaker.execute(async () => {
      // External email service call
      await this.externalEmailProvider.send(data)
    })
  }
}
```

### 2. Module-Level Performance Metrics

Implement comprehensive performance monitoring from day one:

```typescript
// modules/shared/monitoring/performance-metrics.ts
interface ModulePerformanceMetrics {
  module: string
  operation: string
  duration: number
  timestamp: Date
  success: boolean
  errorCode?: string
  metadata?: Record<string, any>
}

export class PerformanceMonitor {
  private metrics: ModulePerformanceMetrics[] = []
  
  async trackOperation<T>(
    module: string,
    operation: string,
    fn: () => Promise<T>,
    metadata?: Record<string, any>
  ): Promise<T> {
    const startTime = Date.now()
    let success = true
    let errorCode: string | undefined
    
    try {
      const result = await fn()
      return result
    } catch (error) {
      success = false
      errorCode = error instanceof Error ? error.constructor.name : 'UnknownError'
      throw error
    } finally {
      const duration = Date.now() - startTime
      
      this.metrics.push({
        module,
        operation,
        duration,
        timestamp: new Date(),
        success,
        errorCode,
        metadata
      })
      
      // Send metrics to monitoring system
      this.flushMetrics()
    }
  }
  
  getMetrics(module?: string): ModulePerformanceMetrics[] {
    return module 
      ? this.metrics.filter(m => m.module === module)
      : this.metrics
  }
  
  private async flushMetrics(): Promise<void> {
    // Implementation for sending metrics to external monitoring
    // (DataDog, New Relic, custom metrics endpoint, etc.)
  }
}

// Usage in services
// modules/appointments/services/appointment.service.ts
export class AppointmentService {
  constructor(
    private repository: AppointmentRepository,
    private performanceMonitor: PerformanceMonitor
  ) {}
  
  async bookAppointment(data: AppointmentRequest): Promise<AppointmentResult> {
    return this.performanceMonitor.trackOperation(
      'appointments',
      'bookAppointment',
      async () => {
        // Existing booking logic
        const appointment = await this.repository.create(data)
        return { success: true, appointment }
      },
      { serviceType: data.service }
    )
  }
}
```

### 3. Security Validation Middleware

Integrate security validation at the service layer for defense in depth:

```typescript
// modules/shared/security/security-validator.ts
interface SecurityValidationConfig {
  enableRateLimiting: boolean
  enableInputSanitization: boolean
  enableSQLInjectionProtection: boolean
  enableXSSProtection: boolean
}

export class SecurityValidator {
  constructor(private config: SecurityValidationConfig) {}
  
  async validateRequest(
    module: string,
    operation: string,
    data: any,
    context?: { userAgent?: string; ip?: string }
  ): Promise<void> {
    if (this.config.enableRateLimiting) {
      await this.checkRateLimit(module, context?.ip)
    }
    
    if (this.config.enableInputSanitization) {
      this.sanitizeInput(data)
    }
    
    if (this.config.enableSQLInjectionProtection) {
      this.checkSQLInjection(data)
    }
    
    if (this.config.enableXSSProtection) {
      this.checkXSS(data)
    }
  }
  
  private async checkRateLimit(module: string, ip?: string): Promise<void> {
    // Implement rate limiting logic
    const key = `rate_limit:${module}:${ip}`
    const currentCount = await this.redis.get(key)
    
    if (currentCount && parseInt(currentCount) > 100) { // 100 requests per minute
      throw new SecurityError('Rate limit exceeded')
    }
    
    await this.redis.incr(key)
    await this.redis.expire(key, 60) // 1 minute window
  }
  
  private sanitizeInput(data: any): void {
    // Implement input sanitization
    if (typeof data === 'string') {
      // Remove potentially dangerous characters
      data = data.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    }
  }
  
  private checkSQLInjection(data: any): void {
    const sqlPatterns = [
      /('|(\\'))|(-)|(;)|(\\|)|(\\*)/i,
      /(union|select|insert|delete|update|drop|create|alter|exec|execute)/i
    ]
    
    const dataString = JSON.stringify(data)
    for (const pattern of sqlPatterns) {
      if (pattern.test(dataString)) {
        throw new SecurityError('Potential SQL injection detected')
      }
    }
  }
  
  private checkXSS(data: any): void {
    const xssPatterns = [
      /<script[^>]*>.*?<\/script>/gi,
      /<iframe[^>]*>.*?<\/iframe>/gi,
      /javascript:/gi,
      /on\w+\s*=/gi
    ]
    
    const dataString = JSON.stringify(data)
    for (const pattern of xssPatterns) {
      if (pattern.test(dataString)) {
        throw new SecurityError('Potential XSS attack detected')
      }
    }
  }
}

// Integration in service layer
// modules/appointments/services/appointment.service.ts
export class AppointmentService {
  constructor(
    private repository: AppointmentRepository,
    private securityValidator: SecurityValidator
  ) {}
  
  async bookAppointment(
    data: AppointmentRequest,
    context?: SecurityContext
  ): Promise<AppointmentResult> {
    // Security validation first
    await this.securityValidator.validateRequest(
      'appointments',
      'bookAppointment',
      data,
      context
    )
    
    // Then proceed with business logic
    const appointment = await this.repository.create(data)
    return { success: true, appointment }
  }
}

// Error classes
export class SecurityError extends Error {
  constructor(message: string, public code: string = 'SECURITY_VIOLATION') {
    super(message)
    this.name = 'SecurityError'
  }
}
```

### Implementation Priority

1. **Phase 1**: Performance monitoring (low risk, high value)
2. **Phase 2**: Security validation middleware (critical for production)
3. **Phase 3**: Circuit breaker pattern (when external integrations are added)

### Integration with Existing Architecture

These enhancements integrate seamlessly with the proposed modular monolith:
- **Shared Layer**: All three patterns belong in `modules/shared/`
- **Dependency Injection**: Can be injected into existing service constructors
- **Event System**: Performance metrics and security events can use the event bus
- **Testing**: Each enhancement includes unit and integration test requirements

---

## Frontend Architecture Plan

*Added by: Frontend Developer - Claude Code*

### Executive Summary

The existing modular monolith architecture provides an excellent backend foundation, but requires a comprehensive frontend architecture strategy to ensure optimal user experience, maintainability, and scalability. This section addresses critical frontend concerns including healthcare-specific UX requirements, performance optimization, component architecture, and developer experience.

### Healthcare-Specific Frontend Requirements

Healthcare applications have unique frontend requirements that must be addressed from the architecture level:

#### Accessibility & Compliance Framework

```typescript
// modules/frontend/accessibility/healthcare-a11y.ts
interface HealthcareAccessibilityStandards {
  wcag: 'AAA',           // Higher than typical web apps
  section508: true,      // Government compliance
  hipaa: {
    screenReaderSafe: true,      // No sensitive data in aria-labels
    keyboardAccessible: true,    // Full keyboard navigation
    contrastCompliance: 'AAA'    // 7:1 contrast ratio minimum
  }
}

export class HealthcareA11yValidator {
  validateComponent(component: ReactComponent): A11yReport {
    return {
      keyboardNavigation: this.checkKeyboardAccess(component),
      screenReaderCompatibility: this.checkScreenReader(component),
      colorContrast: this.checkContrast(component),
      focusManagement: this.checkFocusTraps(component),
      semanticMarkup: this.validateSemantics(component)
    }
  }
  
  checkMedicalFormCompliance(form: FormComponent): MedicalFormA11y {
    return {
      requiredFieldsAnnounced: boolean,
      errorMessagesAssociated: boolean,
      progressIndicatorsAccessible: boolean,
      sensitiveDataProtected: boolean
    }
  }
}
```

#### Trust & Credibility Design Patterns

```typescript
// modules/frontend/patterns/trust-indicators.tsx
interface TrustIndicators {
  medicalCredentials: boolean,
  securityBadges: boolean,
  testimonials: boolean,
  professionalImagery: boolean,
  clearContactInfo: boolean
}

export const TrustBadge: React.FC<{
  type: 'hipaa' | 'medical-license' | 'security-certified'
}> = ({ type }) => {
  const badges = {
    hipaa: {
      icon: ShieldCheckIcon,
      text: 'HIPAA Compliant',
      description: 'Your health information is protected'
    },
    'medical-license': {
      icon: CertificateIcon,
      text: 'Licensed Medical Facility',
      description: 'Certified by Medical Council of India'
    },
    'security-certified': {
      icon: LockIcon,
      text: 'SSL Secured',
      description: 'Your data is encrypted and secure'
    }
  }
  
  return (
    <Badge variant="outline" className="flex items-center gap-2 p-2">
      <badges[type].icon className="h-4 w-4 text-green-600" />
      <span className="font-medium">{badges[type].text}</span>
    </Badge>
  )
}
```

### Module-Aligned Frontend Architecture

#### Frontend Module Structure

```typescript
// Enhanced project structure with frontend modules
src/
├── modules/
│   ├── appointments/
│   │   ├── components/              # Business-specific components
│   │   │   ├── AppointmentForm.tsx
│   │   │   ├── CalendarPicker.tsx
│   │   │   ├── TimeSlotGrid.tsx
│   │   │   └── BookingConfirmation.tsx
│   │   ├── hooks/                   # Module-specific React hooks
│   │   │   ├── useAppointmentForm.ts
│   │   │   ├── useAvailableSlots.ts
│   │   │   └── useBookingValidation.ts
│   │   ├── stores/                  # Module-specific state
│   │   │   ├── appointmentStore.ts
│   │   │   └── bookingFlowStore.ts
│   │   ├── types/                   # Frontend-specific types
│   │   │   ├── appointment-ui.types.ts
│   │   │   └── form-validation.types.ts
│   │   └── utils/                   # UI utilities
│   │       ├── appointment-validation.ts
│   │       └── date-display.utils.ts
│   ├── content/
│   │   ├── components/
│   │   │   ├── BlogPostCard.tsx
│   │   │   ├── SOPNavigation.tsx
│   │   │   ├── ContentRenderer.tsx
│   │   │   └── SearchableContent.tsx
│   │   ├── hooks/
│   │   │   ├── useContentSearch.ts
│   │   │   ├── useBlogPosts.ts
│   │   │   └── useSOPData.ts
│   │   └── stores/
│   │       ├── contentStore.ts
│   │       └── searchStore.ts
│   ├── dashboard/
│   │   ├── components/
│   │   │   ├── StatsWidget.tsx
│   │   │   ├── AppointmentTable.tsx
│   │   │   ├── ActivityFeed.tsx
│   │   │   └── ExportDialog.tsx
│   │   ├── hooks/
│   │   │   ├── useDashboardStats.ts
│   │   │   ├── useAppointmentManagement.ts
│   │   │   └── useDataExport.ts
│   │   └── stores/
│   │       └── dashboardStore.ts
│   ├── auth/
│   │   ├── components/
│   │   │   ├── LoginForm.tsx
│   │   │   ├── SecurityIndicator.tsx
│   │   │   └── SessionTimeout.tsx
│   │   ├── hooks/
│   │   │   ├── useAuth.ts
│   │   │   ├── useSessionManagement.ts
│   │   │   └── useSecurityValidation.ts
│   │   └── stores/
│   │       └── authStore.ts
│   └── frontend/                    # Frontend-specific shared modules
│       ├── design-system/
│       │   ├── tokens/              # Design tokens
│       │   │   ├── colors.ts
│       │   │   ├── typography.ts
│       │   │   ├── spacing.ts
│       │   │   └── healthcare-theme.ts
│       │   ├── components/          # Base UI components
│       │   │   ├── Button/
│       │   │   ├── Input/
│       │   │   ├── Card/
│       │   │   └── Modal/
│       │   ├── patterns/            # Compound components
│       │   │   ├── DataTable/
│       │   │   ├── FormField/
│       │   │   ├── SearchInput/
│       │   │   └── DateTimePicker/
│       │   └── healthcare/          # Healthcare-specific components
│       │       ├── PatientForm/
│       │       ├── MedicalCard/
│       │       ├── AppointmentCard/
│       │       └── TrustIndicators/
│       ├── hooks/                   # Shared React hooks
│       │   ├── usePerformanceMonitor.ts
│       │   ├── useErrorBoundary.ts
│       │   ├── useAccessibility.ts
│       │   └── useAnalytics.ts
│       ├── providers/               # Context providers
│       │   ├── ThemeProvider.tsx
│       │   ├── AccessibilityProvider.tsx
│       │   ├── PerformanceProvider.tsx
│       │   └── ErrorBoundaryProvider.tsx
│       ├── stores/                  # Global state management
│       │   ├── globalStore.ts
│       │   ├── notificationStore.ts
│       │   └── themeStore.ts
│       ├── utils/                   # Frontend utilities
│       │   ├── performance.utils.ts
│       │   ├── accessibility.utils.ts
│       │   ├── validation.utils.ts
│       │   └── analytics.utils.ts
│       └── types/                   # Frontend-specific types
│           ├── ui.types.ts
│           ├── state.types.ts
│           └── performance.types.ts
```

#### Component Classification System

```typescript
// modules/frontend/design-system/component-hierarchy.ts
interface ComponentHierarchy {
  // Level 1: Primitive Components (Design System Foundation)
  primitive: {
    description: 'Base UI building blocks',
    examples: ['Button', 'Input', 'Text', 'Icon', 'Spacer'],
    responsibility: 'Visual consistency and accessibility',
    testing: 'Visual regression + accessibility'
  },
  
  // Level 2: Compound Components (Composed Primitives)
  compound: {
    description: 'Composed components with specific functionality',
    examples: ['SearchInput', 'FormField', 'DataTable', 'Modal'],
    responsibility: 'Interaction patterns and compound behavior',
    testing: 'Interaction testing + visual regression'
  },
  
  // Level 3: Pattern Components (Complex Interactions)
  pattern: {
    description: 'Complex interaction patterns',
    examples: ['DateTimePicker', 'MultiStepForm', 'InfiniteScroll'],
    responsibility: 'User experience patterns',
    testing: 'E2E testing + usability testing'
  },
  
  // Level 4: Business Components (Domain-Specific)
  business: {
    description: 'Healthcare business logic components',
    examples: ['AppointmentForm', 'PatientCard', 'MedicalHistory'],
    responsibility: 'Domain-specific functionality',
    testing: 'Business logic testing + domain validation'
  },
  
  // Level 5: Layout Components (Structural)
  layout: {
    description: 'Page and section structure',
    examples: ['PageLayout', 'Sidebar', 'Header', 'DashboardGrid'],
    responsibility: 'Page structure and navigation',
    testing: 'Layout testing + responsive testing'
  }
}

// Component development guidelines
export const componentGuidelines = {
  primitive: {
    props: 'Minimal, focused on visual variants',
    state: 'No internal business state',
    dependencies: 'Design tokens only',
    testing: 'Storybook + visual regression'
  },
  compound: {
    props: 'Behavior-focused with composition patterns',
    state: 'UI state only (open/closed, focused, etc.)',
    dependencies: 'Primitive components + utility functions',
    testing: 'Storybook + interaction testing'
  },
  business: {
    props: 'Domain entities and callback functions',
    state: 'Business state via module stores',
    dependencies: 'Module services + compound components',
    testing: 'Module integration tests + E2E tests'
  }
}
```

### Performance Optimization Strategy

#### Healthcare User Performance Targets

```typescript
// modules/frontend/performance/healthcare-metrics.ts
interface HealthcarePerformanceTargets {
  // Core Web Vitals - Stricter than general web
  lcp: 1.5,     // Largest Contentful Paint (seconds) - faster for healthcare
  fid: 50,      // First Input Delay (milliseconds) - critical for forms
  cls: 0.05,    // Cumulative Layout Shift - stability crucial for medical forms
  
  // Healthcare-specific metrics
  appointmentFormLoad: 1.0,      // Critical user journey
  sopContentLoad: 2.0,           // Educational content
  dashboardDataLoad: 1.5,        // Admin efficiency
  mobileOfflineCapability: true   // Poor network areas
}

export class HealthcarePerformanceMonitor {
  private metrics: PerformanceMetrics[] = []
  
  trackUserJourney(journey: 'booking' | 'content' | 'dashboard'): PerformanceObserver {
    return new PerformanceObserver((list) => {
      const entries = list.getEntries()
      entries.forEach(entry => {
        this.metrics.push({
          journey,
          metric: entry.entryType,
          value: entry.duration || entry.startTime,
          timestamp: Date.now(),
          userAgent: navigator.userAgent,
          connection: (navigator as any).connection?.effectiveType
        })
      })
      
      // Send to analytics
      this.flushMetrics()
    })
  }
  
  optimizeForHealthcareUsers(): OptimizationStrategy {
    return {
      criticalResourcesFirst: [
        'appointment-form-bundle',
        'healthcare-design-system',
        'accessibility-helpers'
      ],
      lazyLoadNonCritical: [
        'blog-content',
        'dashboard-charts',
        'admin-tools'
      ],
      offlineCapability: [
        'appointment-form-data',
        'user-session',
        'critical-sop-content'
      ],
      mobileOptimization: {
        touchTargetSize: '44px minimum',
        fontSizeMinimum: '16px',
        networkAwareness: true
      }
    }
  }
}
```

#### Bundle Optimization Per Module

```typescript
// next.config.js - Healthcare-focused bundle optimization
const nextConfig = {
  experimental: {
    optimizePackageImports: ['@/modules']
  },
  
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          // Critical healthcare UI
          healthcare: {
            test: /[\\/]modules[\\/]frontend[\\/]design-system[\\/]healthcare[\\/]/,
            name: 'healthcare-ui',
            priority: 30,
            chunks: 'all'
          },
          
          // Appointment booking (critical user journey)
          appointments: {
            test: /[\\/]modules[\\/]appointments[\\/]/,
            name: 'appointments',
            priority: 25,
            chunks: 'all'
          },
          
          // Design system foundation
          designSystem: {
            test: /[\\/]modules[\\/]frontend[\\/]design-system[\\/]/,
            name: 'design-system',
            priority: 20,
            chunks: 'all'
          },
          
          // Admin dashboard (admin-only)
          dashboard: {
            test: /[\\/]modules[\\/]dashboard[\\/]/,
            name: 'dashboard',
            priority: 15,
            chunks: 'async'
          },
          
          // Content (can be lazy loaded)
          content: {
            test: /[\\/]modules[\\/]content[\\/]/,
            name: 'content',
            priority: 10,
            chunks: 'async'
          }
        }
      }
    }
    
    return config
  }
}
```

### State Management Architecture

#### Multi-Layer State Strategy

```typescript
// modules/frontend/stores/state-architecture.ts
interface StateArchitecture {
  // Global Application State
  global: {
    user: 'zustand',              // User authentication & preferences
    theme: 'react-context',       // Theme and accessibility settings
    notifications: 'zustand',     // Toast notifications & alerts
    connectivity: 'zustand'       // Network status & offline state
  },
  
  // Module-Level State
  moduleLocal: {
    appointments: {
      bookingFlow: 'zustand',        // Multi-step booking state
      formData: 'react-hook-form',   // Form validation & state
      availability: 'swr',          // Server state caching
      optimisticUpdates: 'zustand'   // Optimistic UI updates
    },
    content: {
      searchState: 'zustand',        // Search filters & results
      contentCache: 'swr',          // Content caching
      readingProgress: 'local-storage' // User reading progress
    },
    dashboard: {
      filters: 'zustand',           // Dashboard filters & preferences
      data: 'react-query',          // Admin data with background updates
      realTimeUpdates: 'websocket'  // Live appointment updates
    }
  },
  
  // Component-Level State
  componentLocal: {
    ui: 'react-state',            // Component UI state
    forms: 'react-hook-form',     // Form-specific state
    modals: 'zustand',            // Modal state management
    animations: 'framer-motion'   // Animation state
  }
}

// Global store implementation
export const useGlobalStore = create<GlobalState>((set, get) => ({
  user: null,
  theme: 'light',
  notifications: [],
  connectivity: {
    isOnline: true,
    effectiveType: '4g'
  },
  
  // Actions
  setUser: (user) => set({ user }),
  toggleTheme: () => set((state) => ({ 
    theme: state.theme === 'light' ? 'dark' : 'light' 
  })),
  addNotification: (notification) => set((state) => ({
    notifications: [...state.notifications, {
      ...notification,
      id: crypto.randomUUID(),
      timestamp: Date.now()
    }]
  })),
  removeNotification: (id) => set((state) => ({
    notifications: state.notifications.filter(n => n.id !== id)
  }))
}))
```

#### Real-Time State Synchronization

```typescript
// modules/appointments/hooks/useRealTimeAppointments.ts
export const useRealTimeAppointments = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'disconnected' | 'reconnecting'>('disconnected')
  
  useEffect(() => {
    const ws = new WebSocket(process.env.NEXT_PUBLIC_WS_URL!)
    
    ws.onopen = () => {
      setConnectionStatus('connected')
      ws.send(JSON.stringify({ type: 'subscribe', channel: 'appointments' }))
    }
    
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data)
      
      switch (data.type) {
        case 'appointment_created':
          setAppointments(prev => [...prev, data.appointment])
          useGlobalStore.getState().addNotification({
            type: 'info',
            message: `New appointment booked: ${data.appointment.patientName}`,
            duration: 5000
          })
          break
          
        case 'appointment_updated':
          setAppointments(prev => prev.map(apt => 
            apt.id === data.appointment.id ? data.appointment : apt
          ))
          break
          
        case 'appointment_cancelled':
          setAppointments(prev => prev.filter(apt => apt.id !== data.appointmentId))
          break
      }
    }
    
    ws.onclose = () => {
      setConnectionStatus('disconnected')
      // Implement exponential backoff reconnection
      setTimeout(() => {
        setConnectionStatus('reconnecting')
        // Reconnection logic
      }, 1000)
    }
    
    return () => ws.close()
  }, [])
  
  return {
    appointments,
    connectionStatus,
    isConnected: connectionStatus === 'connected'
  }
}
```

### Design System Evolution

#### Healthcare Design Tokens

```typescript
// modules/frontend/design-system/tokens/healthcare-theme.ts
export const healthcareDesignTokens = {
  colors: {
    // Primary healthcare blues (trust & professionalism)
    primary: {
      50: '#eff6ff',   // Very light blue
      100: '#dbeafe',  // Light blue
      500: '#3b82f6',  // Primary blue
      600: '#2563eb',  // Darker blue
      900: '#1e3a8a'   // Very dark blue
    },
    
    // Healthcare-specific semantic colors
    medical: {
      success: '#059669',    // Healthy green
      warning: '#d97706',    // Caution orange
      error: '#dc2626',      // Medical alert red
      info: '#0284c7',       // Information blue
      neutral: '#6b7280'     // Neutral gray
    },
    
    // Accessibility-first contrast ratios (WCAG AAA)
    text: {
      primary: '#111827',    // 21:1 contrast on white
      secondary: '#374151',  // 10.7:1 contrast on white
      tertiary: '#6b7280',   // 7.1:1 contrast on white
      inverse: '#ffffff'     // White text on dark backgrounds
    },
    
    // Trust & credibility colors
    trust: {
      verified: '#059669',   // Green for verified/secure
      certified: '#0284c7',  // Blue for certifications
      secure: '#7c3aed'      // Purple for security badges
    }
  },
  
  typography: {
    // Healthcare-optimized typography scale
    fontFamily: {
      sans: ['Inter', 'system-ui', 'sans-serif'],        // Modern, readable
      serif: ['Lora', 'Georgia', 'serif'],               // For long-form content
      mono: ['JetBrains Mono', 'Courier New', 'monospace'] // For technical content
    },
    
    fontSize: {
      // Minimum 16px for mobile accessibility
      xs: ['0.75rem', { lineHeight: '1rem' }],     // 12px
      sm: ['0.875rem', { lineHeight: '1.25rem' }], // 14px
      base: ['1rem', { lineHeight: '1.5rem' }],    // 16px (minimum for mobile)
      lg: ['1.125rem', { lineHeight: '1.75rem' }], // 18px
      xl: ['1.25rem', { lineHeight: '1.75rem' }],  // 20px
      '2xl': ['1.5rem', { lineHeight: '2rem' }],   // 24px
      '3xl': ['1.875rem', { lineHeight: '2.25rem' }], // 30px
      '4xl': ['2.25rem', { lineHeight: '2.5rem' }]  // 36px
    },
    
    fontWeight: {
      normal: '400',
      medium: '500',    // For emphasis in healthcare content
      semibold: '600',  // For headings
      bold: '700'       // For critical information
    }
  },
  
  spacing: {
    // Healthcare-optimized spacing scale (44px minimum touch targets)
    touchTarget: '2.75rem', // 44px minimum touch target
    formSpacing: '1.5rem',   // 24px between form elements
    cardPadding: '1.5rem',   // 24px card padding
    sectionSpacing: '3rem'   // 48px between major sections
  },
  
  borderRadius: {
    // Subtle, professional border radius
    sm: '0.25rem',   // 4px
    md: '0.375rem',  // 6px
    lg: '0.5rem',    // 8px
    xl: '0.75rem'    // 12px - maximum for healthcare UI
  },
  
  shadows: {
    // Subtle shadows for healthcare UI
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)'
  }
}
```

#### Healthcare Component Library

```typescript
// modules/frontend/design-system/healthcare/PatientForm.tsx
interface PatientFormProps {
  variant: 'appointment' | 'registration' | 'medical-history'
  accessibility: {
    announceErrors: boolean
    showProgress: boolean
    keyboardNavigation: boolean
  }
  validation: 'client' | 'server' | 'both'
  onSubmit: (data: PatientFormData) => Promise<void>
}

export const PatientForm: React.FC<PatientFormProps> = ({
  variant,
  accessibility,
  validation,
  onSubmit
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setValue
  } = useForm<PatientFormData>({
    resolver: zodResolver(getPatientFormSchema(variant)),
    mode: validation === 'client' ? 'onChange' : 'onSubmit'
  })
  
  // Accessibility announcements
  const announceError = useCallback((field: string, message: string) => {
    if (accessibility.announceErrors) {
      const announcer = document.getElementById('form-announcer')
      if (announcer) {
        announcer.textContent = `Error in ${field}: ${message}`
        announcer.setAttribute('aria-live', 'assertive')
      }
    }
  }, [accessibility.announceErrors])
  
  // Phone number formatting for Indian numbers
  const formatPhoneNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, '')
    if (cleaned.length <= 10) {
      return cleaned.replace(/(\d{5})(\d{5})/, '$1 $2')
    }
    return cleaned.replace(/(\d{2})(\d{5})(\d{5})/, '+$1 $2 $3')
  }
  
  return (
    <form 
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 max-w-2xl mx-auto"
      noValidate
    >
      {/* Screen reader announcements */}
      <div id="form-announcer" className="sr-only" aria-live="polite" />
      
      {/* Progress indicator */}
      {accessibility.showProgress && (
        <ProgressIndicator 
          currentStep={getCurrentStep(variant)}
          totalSteps={getTotalSteps(variant)}
          accessibleLabel={`Step ${getCurrentStep(variant)} of ${getTotalSteps(variant)}`}
        />
      )}
      
      {/* Patient Name */}
      <FormField
        label="Full Name"
        required
        error={errors.name?.message}
        helpText="Please enter your full name as it appears on your ID"
      >
        <Input
          {...register('name')}
          type="text"
          autoComplete="name"
          aria-describedby={errors.name ? 'name-error' : 'name-help'}
          className={cn(
            'w-full',
            errors.name && 'border-red-500 focus:border-red-500'
          )}
        />
      </FormField>
      
      {/* Phone Number with Indian formatting */}
      <FormField
        label="Phone Number"
        required
        error={errors.phone?.message}
        helpText="10-digit mobile number for appointment confirmations"
      >
        <Input
          {...register('phone')}
          type="tel"
          autoComplete="tel"
          placeholder="98765 43210"
          onChange={(e) => {
            const formatted = formatPhoneNumber(e.target.value)
            setValue('phone', formatted)
          }}
          className={cn(
            'w-full',
            errors.phone && 'border-red-500 focus:border-red-500'
          )}
        />
      </FormField>
      
      {/* Email with healthcare-specific validation */}
      <FormField
        label="Email Address"
        required
        error={errors.email?.message}
        helpText="We'll send appointment confirmations to this email"
      >
        <Input
          {...register('email')}
          type="email"
          autoComplete="email"
          aria-describedby={errors.email ? 'email-error' : 'email-help'}
          className={cn(
            'w-full',
            errors.email && 'border-red-500 focus:border-red-500'
          )}
        />
      </FormField>
      
      {/* Date of Birth with accessibility */}
      <FormField
        label="Date of Birth"
        required
        error={errors.dateOfBirth?.message}
        helpText="Required for medical records"
      >
        <DatePicker
          {...register('dateOfBirth')}
          maxDate={new Date()}
          format="DD/MM/YYYY"
          accessibility={{
            calendarLabel: 'Choose your date of birth',
            monthYearFormat: 'MMMM YYYY',
            dayFormat: 'DD'
          }}
          className={cn(
            'w-full',
            errors.dateOfBirth && 'border-red-500 focus:border-red-500'
          )}
        />
      </FormField>
      
      {/* Medical Service Selection */}
      <FormField
        label="Medical Service"
        required
        error={errors.service?.message}
        helpText="Select the type of consultation you need"
      >
        <Select
          {...register('service')}
          aria-describedby={errors.service ? 'service-error' : 'service-help'}
        >
          <SelectTrigger className={cn(
            'w-full',
            errors.service && 'border-red-500 focus:border-red-500'
          )}>
            <SelectValue placeholder="Choose a service" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="high-risk-pregnancy">
              High-Risk Pregnancy Care
            </SelectItem>
            <SelectItem value="antenatal">
              Antenatal Care
            </SelectItem>
            <SelectItem value="infertility">
              Infertility Treatment
            </SelectItem>
            <SelectItem value="general">
              General Consultation
            </SelectItem>
          </SelectContent>
        </Select>
      </FormField>
      
      {/* Medical History (if variant includes it) */}
      {variant === 'medical-history' && (
        <FormField
          label="Medical History"
          error={errors.medicalHistory?.message}
          helpText="Please describe any relevant medical conditions, allergies, or current medications"
        >
          <Textarea
            {...register('medicalHistory')}
            rows={4}
            placeholder="Describe your medical history..."
            aria-describedby={errors.medicalHistory ? 'history-error' : 'history-help'}
            className={cn(
              'w-full resize-none',
              errors.medicalHistory && 'border-red-500 focus:border-red-500'
            )}
          />
        </FormField>
      )}
      
      {/* Privacy Consent */}
      <FormField
        error={errors.privacyConsent?.message}
      >
        <div className="flex items-start space-x-3">
          <Checkbox
            {...register('privacyConsent')}
            id="privacy-consent"
            aria-describedby={errors.privacyConsent ? 'consent-error' : 'consent-help'}
            className={cn(
              errors.privacyConsent && 'border-red-500'
            )}
          />
          <Label
            htmlFor="privacy-consent"
            className="text-sm leading-5 cursor-pointer"
          >
            I consent to the collection and processing of my personal health information
            in accordance with the{' '}
            <Link href="/privacy-policy" className="text-blue-600 hover:underline">
              Privacy Policy
            </Link>
            {' '}and{' '}
            <Link href="/hipaa-notice" className="text-blue-600 hover:underline">
              HIPAA Notice
            </Link>
          </Label>
        </div>
      </FormField>
      
      {/* Submit Button */}
      <div className="flex justify-end space-x-4 pt-6">
        <Button
          type="button"
          variant="outline"
          disabled={isSubmitting}
          onClick={() => window.history.back()}
        >
          Cancel
        </Button>
        
        <Button
          type="submit"
          disabled={isSubmitting}
          className="min-w-[120px]"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {variant === 'appointment' ? 'Booking...' : 'Submitting...'}
            </>
          ) : (
            variant === 'appointment' ? 'Book Appointment' : 'Submit'
          )}
        </Button>
      </div>
      
      {/* Trust indicators */}
      <div className="flex flex-wrap gap-3 justify-center pt-4 border-t">
        <TrustBadge type="hipaa" />
        <TrustBadge type="medical-license" />
        <TrustBadge type="security-certified" />
      </div>
    </form>
  )
}
```

### Next.js App Router Integration

#### Optimized Route Structure

```typescript
// Next.js App Router structure optimized for healthcare UX
src/app/
├── (public)/                    # Public routes for patients
│   ├── layout.tsx              # Public layout with trust indicators
│   ├── page.tsx                # Homepage with appointment CTA
│   ├── about/
│   │   └── page.tsx            # About page with medical credentials  
│   ├── services/
│   │   ├── page.tsx            # Services overview
│   │   └── [service]/
│   │       └── page.tsx        # Individual service pages
│   ├── appointments/
│   │   ├── page.tsx            # Appointment booking form
│   │   ├── confirmation/
│   │   │   └── page.tsx        # Booking confirmation
│   │   └── manage/
│   │       └── page.tsx        # Manage existing appointments
│   ├── sops/                   # Standard Operating Procedures
│   │   ├── page.tsx            # SOPs overview
│   │   ├── pregnancy-care/
│   │   │   └── page.tsx        # Pregnancy care guidelines
│   │   └── [category]/
│   │       └── page.tsx        # Category-specific SOPs
│   ├── blog/
│   │   ├── page.tsx            # Blog listing
│   │   └── [slug]/
│   │       └── page.tsx        # Individual blog posts
│   └── contact/
│       └── page.tsx            # Contact information
├── (admin)/                     # Admin routes
│   ├── layout.tsx              # Admin layout with authentication
│   └── dashboard/
│       ├── page.tsx            # Dashboard overview
│       ├── appointments/
│       │   ├── page.tsx        # Appointment management
│       │   └── [id]/
│       │       └── page.tsx    # Individual appointment details
│       ├── patients/
│       │   └── page.tsx        # Patient management
│       ├── content/
│       │   └── page.tsx        # Content management
│       └── settings/
│           └── page.tsx        # System settings
└── api/                        # API routes
    ├── appointments/
    │   ├── route.ts            # CRUD operations
    │   ├── availability/
    │   │   └── route.ts        # Check appointment availability
    │   └── [id]/
    │       └── route.ts        # Individual appointment operations
    ├── content/
    │   ├── blog/
    │   │   └── route.ts        # Blog post operations
    │   └── sops/
    │       └── route.ts        # SOPs data
    ├── auth/
    │   └── [...nextauth]/
    │       └── route.ts        # NextAuth configuration
    └── webhooks/
        ├── sanity/
        │   └── route.ts        # Sanity CMS webhooks
        └── notifications/
            └── route.ts        # Notification webhooks
```

#### Server Components Strategy

```typescript
// app/(public)/appointments/page.tsx - Server Component for SEO
import { Suspense } from 'react'
import { AppointmentBookingForm } from '@/modules/appointments/components/AppointmentBookingForm'
import { AvailabilityCalendar } from '@/modules/appointments/components/AvailabilityCalendar'
import { TrustIndicators } from '@/modules/frontend/design-system/healthcare/TrustIndicators'

// Server Component - runs on server for SEO
export default async function AppointmentBookingPage() {
  // Server-side data fetching
  const availableSlots = await getAvailableSlots()
  const services = await getServices()
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* SEO-optimized content */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Book Your Appointment
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Schedule your consultation with our experienced healthcare professionals. 
          We offer comprehensive women's healthcare services including high-risk pregnancy care, 
          antenatal care, and infertility treatment.
        </p>
      </div>
      
      {/* Trust indicators - rendered server-side for SEO */}
      <TrustIndicators />
      
      {/* Interactive components - client-side */}
      <div className="grid md:grid-cols-2 gap-8 mt-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Select Date & Time</h2>
          <Suspense fallback={<CalendarSkeleton />}>
            <AvailabilityCalendar 
              availableSlots={availableSlots}
              // Client component for interactivity
            />
          </Suspense>
        </div>
        
        <div>
          <h2 className="text-2xl font-semibold mb-4">Your Information</h2>
          <Suspense fallback={<FormSkeleton />}>
            <AppointmentBookingForm 
              services={services}
              // Client component for form interactivity
            />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

// Generate metadata for SEO
export async function generateMetadata() {
  return {
    title: 'Book Appointment | SCT Trust Hospital',
    description: 'Schedule your healthcare appointment online. Expert women\'s healthcare services including pregnancy care, antenatal care, and infertility treatment.',
    keywords: 'appointment booking, women\'s healthcare, pregnancy care, antenatal care, infertility treatment',
    openGraph: {
      title: 'Book Your Healthcare Appointment Online',
      description: 'Expert women\'s healthcare services with easy online booking.',
      type: 'website',
    }
  }
}
```

### Error Handling & User Feedback

#### Healthcare-Appropriate Error Messaging

```typescript
// modules/frontend/utils/healthcare-error-handling.ts
interface HealthcareError {
  type: 'validation' | 'network' | 'server' | 'auth' | 'medical'
  severity: 'low' | 'medium' | 'high' | 'critical'
  userMessage: string
  technicalMessage?: string
  recoveryAction?: string
  supportContact?: boolean
}

export class HealthcareErrorHandler {
  private static errorMessages: Record<string, HealthcareError> = {
    // Form validation errors
    'INVALID_PHONE': {
      type: 'validation',
      severity: 'medium',
      userMessage: 'Please enter a valid 10-digit mobile number',
      recoveryAction: 'Check your phone number format (e.g., 9876543210)'
    },
    
    'INVALID_EMAIL': {
      type: 'validation', 
      severity: 'medium',
      userMessage: 'Please enter a valid email address',
      recoveryAction: 'Make sure your email includes @ and a domain (e.g., name@example.com)'
    },
    
    'APPOINTMENT_SLOT_TAKEN': {
      type: 'validation',
      severity: 'medium',
      userMessage: 'This appointment slot is no longer available',
      recoveryAction: 'Please select a different date or time'
    },
    
    // Network errors
    'NETWORK_ERROR': {
      type: 'network',
      severity: 'high',
      userMessage: 'Connection problem. Your appointment data is saved locally.',
      recoveryAction: 'Check your internet connection and try again',
      supportContact: true
    },
    
    // Medical data errors
    'MEDICAL_RECORD_ERROR': {
      type: 'medical',
      severity: 'critical',
      userMessage: 'We encountered an issue accessing your medical records',
      recoveryAction: 'Please contact our support team immediately',
      supportContact: true
    },
    
    // Authentication errors
    'SESSION_EXPIRED': {
      type: 'auth',
      severity: 'medium', 
      userMessage: 'Your session has expired for security',
      recoveryAction: 'Please log in again to continue'
    }
  }
  
  static handleError(errorCode: string, context?: any): HealthcareError {
    const error = this.errorMessages[errorCode] || {
      type: 'server',
      severity: 'high',
      userMessage: 'We encountered an unexpected issue',
      recoveryAction: 'Please try again or contact support if the problem persists',
      supportContact: true
    }
    
    // Log error for monitoring
    this.logError(errorCode, error, context)
    
    return error
  }
  
  private static logError(code: string, error: HealthcareError, context?: any): void {
    // Send to monitoring service
    if (typeof window !== 'undefined') {
      // Client-side error logging
      console.error('Healthcare Error:', { code, error, context, url: window.location.href })
    }
  }
}

// Error boundary component for healthcare context
export const HealthcareErrorBoundary: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ErrorBoundary
      FallbackComponent={HealthcareErrorFallback}
      onError={(error, errorInfo) => {
        HealthcareErrorHandler.handleError('UNEXPECTED_ERROR', { error, errorInfo })
      }}
    >
      {children}
    </ErrorBoundary>
  )
}

const HealthcareErrorFallback: React.FC<FallbackProps> = ({ error, resetErrorBoundary }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6">
        <div className="flex items-center mb-4">
          <AlertTriangle className="h-8 w-8 text-red-500 mr-3" />
          <h1 className="text-xl font-semibold text-gray-900">
            Technical Issue
          </h1>
        </div>
        
        <p className="text-gray-600 mb-6">
          We're experiencing a technical issue. Your data is safe and our team has been notified.
        </p>
        
        <div className="space-y-3">
          <Button 
            onClick={resetErrorBoundary}
            className="w-full"
          >
            Try Again
          </Button>
          
          <Button 
            variant="outline" 
            onClick={() => window.location.href = '/contact'}
            className="w-full"
          >
            Contact Support
          </Button>
        </div>
        
        <div className="mt-6 pt-4 border-t">
          <p className="text-sm text-gray-500 text-center">
            For urgent medical concerns, please call: 
            <a href="tel:+91-XXX-XXX-XXXX" className="font-medium text-blue-600">
              +91-XXX-XXX-XXXX
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
```

### Testing Strategy

#### Healthcare-Specific Testing Framework

```typescript
// modules/frontend/__tests__/healthcare-testing.setup.ts
import { render, RenderOptions } from '@testing-library/react'
import { ReactElement } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AccessibilityProvider } from '@/modules/frontend/providers/AccessibilityProvider'
import { ThemeProvider } from '@/modules/frontend/providers/ThemeProvider'

interface HealthcareRenderOptions extends RenderOptions {
  accessibility?: {
    screenReader?: boolean
    highContrast?: boolean
    reducedMotion?: boolean
  }
  userType?: 'patient' | 'admin' | 'guest'
}

// Custom render function for healthcare components
export const renderHealthcareComponent = (
  ui: ReactElement,
  options: HealthcareRenderOptions = {}
) => {
  const { accessibility = {}, userType = 'patient', ...renderOptions } = options
  
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false }
    }
  })
  
  const AllTheProviders = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AccessibilityProvider preferences={accessibility}>
          {children}
        </AccessibilityProvider>
      </ThemeProvider>
    </QueryClientProvider>
  )
  
  return render(ui, { wrapper: AllTheProviders, ...renderOptions })
}

// Healthcare-specific matchers
export const healthcareMatchers = {
  // Check WCAG compliance
  toBeAccessible: (element: HTMLElement) => {
    const issues = []
    
    // Check for proper ARIA labels
    if (element.tagName === 'BUTTON' && !element.getAttribute('aria-label') && !element.textContent) {
      issues.push('Button missing accessible name')
    }
    
    // Check color contrast
    const styles = window.getComputedStyle(element)
    const contrastRatio = calculateContrastRatio(styles.color, styles.backgroundColor)
    if (contrastRatio < 7) { // WCAG AAA standard
      issues.push(`Insufficient color contrast: ${contrastRatio.toFixed(2)} (minimum: 7.0)`)
    }
    
    // Check touch target size
    const rect = element.getBoundingClientRect()
    if (element.tagName === 'BUTTON' && (rect.width < 44 || rect.height < 44)) {
      issues.push('Touch target too small (minimum: 44px)')
    }
    
    return {
      pass: issues.length === 0,
      message: () => issues.join(', ')
    }
  },
  
  // Check for healthcare-appropriate error messages
  toHaveHealthcareErrorMessage: (element: HTMLElement) => {
    const errorMessage = element.textContent || ''
    const hasSupportInfo = errorMessage.includes('contact') || errorMessage.includes('support')
    const isUserFriendly = !errorMessage.includes('Error:') && !errorMessage.includes('Exception')
    
    return {
      pass: hasSupportInfo && isUserFriendly,
      message: () => 'Error message should be user-friendly and include support information'
    }
  }
}

// Test utilities for healthcare workflows
export const healthcareTestUtils = {
  // Simulate appointment booking flow
  bookAppointment: async (user: UserEvent, formData: {
    name: string
    email: string
    phone: string
    service: string
    date: string
    time: string
  }) => {
    await user.type(screen.getByLabelText(/full name/i), formData.name)
    await user.type(screen.getByLabelText(/email/i), formData.email)
    await user.type(screen.getByLabelText(/phone/i), formData.phone)
    await user.selectOptions(screen.getByLabelText(/service/i), formData.service)
    
    // Date selection
    await user.click(screen.getByLabelText(/date/i))
    await user.click(screen.getByText(formData.date))
    
    // Time selection
    await user.click(screen.getByLabelText(/time/i))
    await user.click(screen.getByText(formData.time))
    
    // Privacy consent
    await user.click(screen.getByLabelText(/privacy consent/i))
    
    // Submit
    await user.click(screen.getByRole('button', { name: /book appointment/i }))
  },
  
  // Check accessibility tree
  checkAccessibilityTree: (container: HTMLElement) => {
    const accessibleElements = container.querySelectorAll('[role], [aria-label], [aria-labelledby]')
    return Array.from(accessibleElements).map(el => ({
      tagName: el.tagName,
      role: el.getAttribute('role'),
      label: el.getAttribute('aria-label') || el.getAttribute('aria-labelledby'),
      text: el.textContent?.trim()
    }))
  }
}
```

#### E2E Testing for Patient Journeys

```typescript
// e2e/patient-journey.spec.ts - Playwright E2E tests
import { test, expect } from '@playwright/test'

test.describe('Patient Appointment Booking Journey', () => {
  test.beforeEach(async ({ page }) => {
    // Set up accessibility testing
    await page.goto('/')
    await page.evaluate(() => {
      // Inject accessibility testing tools
      window.axe = require('axe-core')
    })
  })
  
  test('should complete full appointment booking flow', async ({ page }) => {
    // Navigate to appointment booking
    await page.click('[data-testid="book-appointment-cta"]')
    await expect(page).toHaveURL('/appointments')
    
    // Check page accessibility
    const accessibilityResults = await page.evaluate(() => window.axe.run())
    expect(accessibilityResults.violations).toHaveLength(0)
    
    // Fill patient information
    await page.fill('[data-testid="patient-name"]', 'Priya Sharma')
    await page.fill('[data-testid="patient-email"]', 'priya.sharma@example.com')
    await page.fill('[data-testid="patient-phone"]', '9876543210')
    
    // Select medical service
    await page.selectOption('[data-testid="medical-service"]', 'high-risk-pregnancy')
    
    // Select appointment date (next available)
    await page.click('[data-testid="calendar-next-available"]')
    
    // Select appointment time
    await page.click('[data-testid="time-slot-10:00"]')
    
    // Verify appointment summary
    await expect(page.locator('[data-testid="appointment-summary"]')).toContainText('Priya Sharma')
    await expect(page.locator('[data-testid="appointment-summary"]')).toContainText('High-Risk Pregnancy Care')
    
    // Accept privacy policy
    await page.check('[data-testid="privacy-consent"]')
    
    // Submit appointment
    await page.click('[data-testid="submit-appointment"]')
    
    // Verify confirmation
    await expect(page).toHaveURL('/appointments/confirmation')
    await expect(page.locator('[data-testid="confirmation-message"]'))
      .toContainText('Appointment Confirmed')
    
    // Check confirmation email trigger
    await expect(page.locator('[data-testid="email-confirmation-notice"]'))
      .toContainText('confirmation email has been sent')
    
    // Verify appointment management link
    await expect(page.locator('[data-testid="manage-appointment-link"]')).toBeVisible()
  })
  
  test('should handle form validation errors gracefully', async ({ page }) => {
    await page.goto('/appointments')
    
    // Try to submit empty form
    await page.click('[data-testid="submit-appointment"]')
    
    // Check error messages are accessible
    const nameError = page.locator('[data-testid="name-error"]')
    await expect(nameError).toBeVisible()
    await expect(nameError).toHaveAttribute('role', 'alert')
    
    // Check error is announced to screen readers
    const announcer = page.locator('#form-announcer')
    await expect(announcer).toHaveAttribute('aria-live', 'assertive')
    
    // Check error recovery guidance
    await expect(nameError).toContainText('Please enter your full name')
  })
  
  test('should work with keyboard navigation only', async ({ page }) => {
    await page.goto('/appointments')
    
    // Navigate using only keyboard
    await page.keyboard.press('Tab') // Focus on first input
    await page.keyboard.type('Rahul Kumar')
    
    await page.keyboard.press('Tab') // Move to email
    await page.keyboard.type('rahul.kumar@example.com')
    
    await page.keyboard.press('Tab') // Move to phone
    await page.keyboard.type('9876543210')
    
    await page.keyboard.press('Tab') // Move to service dropdown
    await page.keyboard.press('Space') // Open dropdown
    await page.keyboard.press('ArrowDown') // Select option
    await page.keyboard.press('Enter') // Confirm selection
    
    // Verify form is fillable with keyboard only
    await expect(page.locator('[data-testid="patient-name"]')).toHaveValue('Rahul Kumar')
    await expect(page.locator('[data-testid="patient-email"]')).toHaveValue('rahul.kumar@example.com')
  })
  
  test('should handle network failures gracefully', async ({ page }) => {
    // Simulate network failure
    await page.route('**/api/appointments', route => route.abort())
    
    await page.goto('/appointments')
    
    // Fill form
    await page.fill('[data-testid="patient-name"]', 'Test Patient')
    await page.fill('[data-testid="patient-email"]', 'test@example.com')
    await page.fill('[data-testid="patient-phone"]', '9876543210')
    await page.selectOption('[data-testid="medical-service"]', 'antenatal')
    await page.check('[data-testid="privacy-consent"]')
    
    // Try to submit
    await page.click('[data-testid="submit-appointment"]')
    
    // Check error handling
    await expect(page.locator('[data-testid="network-error"]'))
      .toContainText('Connection problem. Your appointment data is saved locally.')
    
    // Check retry option
    await expect(page.locator('[data-testid="retry-button"]')).toBeVisible()
    
    // Check support contact information
    await expect(page.locator('[data-testid="support-contact"]')).toBeVisible()
  })
})

test.describe('Mobile Accessibility', () => {
  test.use({ 
    viewport: { width: 375, height: 667 } // iPhone SE size
  })
  
  test('should be fully accessible on mobile', async ({ page }) => {
    await page.goto('/appointments')
    
    // Check touch target sizes
    const buttons = page.locator('button')
    const buttonCount = await buttons.count()
    
    for (let i = 0; i < buttonCount; i++) {
      const button = buttons.nth(i)
      const box = await button.boundingBox()
      
      if (box) {
        expect(box.width).toBeGreaterThanOrEqual(44) // Minimum touch target
        expect(box.height).toBeGreaterThanOrEqual(44)
      }
    }
    
    // Check text is readable (minimum 16px)
    const textElements = page.locator('p, span, label, input')
    const textCount = await textElements.count()
    
    for (let i = 0; i < textCount; i++) {
      const element = textElements.nth(i)
      const fontSize = await element.evaluate(el => {
        const styles = window.getComputedStyle(el)
        return parseInt(styles.fontSize)
      })
      
      expect(fontSize).toBeGreaterThanOrEqual(16) // Minimum readable size
    }
  })
})
```

### Implementation Roadmap

#### Phase 1: Frontend Foundation (Week 1-2)

```typescript
// Implementation checklist for frontend foundation
const frontendPhase1Tasks = {
  designSystem: {
    tasks: [
      'Create healthcare design tokens',
      'Build base component library',
      'Implement accessibility utilities',
      'Set up Storybook documentation'
    ],
    deliverables: [
      'modules/frontend/design-system/',
      'Storybook with all base components',
      'Accessibility testing setup',
      'Design token documentation'
    ]
  },
  
  architecture: {
    tasks: [
      'Set up module-aligned frontend structure',
      'Implement global state management',
      'Create error boundary system',
      'Set up performance monitoring'
    ],
    deliverables: [
      'Frontend module structure',
      'Global Zustand store',
      'Healthcare error boundaries',
      'Performance monitoring dashboard'
    ]
  },
  
  integration: {
    tasks: [
      'Optimize Next.js App Router integration',
      'Implement Server Components strategy',
      'Set up bundle optimization',
      'Create development tooling'
    ],
    deliverables: [
      'Optimized app structure',
      'Server/Client component split',
      'Webpack bundle optimization',
      'Development scripts and tools'
    ]
  }
}
```

#### Phase 2: Component Development (Week 3-4)

```typescript
const frontendPhase2Tasks = {
  appointments: {
    components: [
      'PatientForm with healthcare validation',
      'CalendarPicker with accessibility',
      'TimeSlotGrid with real-time updates',
      'BookingConfirmation with trust indicators'
    ],
    hooks: [
      'useAppointmentForm with optimistic updates',
      'useAvailableSlots with caching',
      'useBookingValidation with healthcare rules'
    ]
  },
  
  content: {
    components: [
      'BlogPostCard with SEO optimization',
      'SOPNavigation with keyboard support',
      'ContentRenderer with accessibility',
      'SearchableContent with performance'
    ],
    hooks: [
      'useContentSearch with debouncing',
      'useBlogPosts with infinite scroll',
      'useSOPData with caching'
    ]
  },
  
  dashboard: {
    components: [
      'StatsWidget with real-time data',
      'AppointmentTable with sorting/filtering',
      'ActivityFeed with live updates',
      'ExportDialog with progress indication'
    ],
    hooks: [
      'useDashboardStats with polling',
      'useAppointmentManagement with optimistic updates',
      'useDataExport with progress tracking'
    ]
  }
}
```

#### Phase 3: Testing & Optimization (Week 5-6)

```typescript
const frontendPhase3Tasks = {
  testing: {
    unit: [
      'Component testing with React Testing Library',
      'Hook testing with @testing-library/react-hooks',
      'Utility function testing with Jest',
      'Accessibility testing with jest-axe'
    ],
    integration: [
      'Module integration testing',
      'API integration testing',
      'State management testing',
      'Error boundary testing'
    ],
    e2e: [
      'Patient journey testing with Playwright',
      'Admin workflow testing',
      'Accessibility testing across devices',
      'Performance testing with real data'
    ]
  },
  
  performance: {
    optimization: [
      'Bundle size analysis and optimization',
      'Component lazy loading implementation',
      'Image optimization and CDN setup',
      'Service worker for offline capability'
    ],
    monitoring: [
      'Core Web Vitals tracking',
      'Component performance profiling',
      'User interaction analytics',
      'Error rate monitoring'
    ]
  },
  
  accessibility: {
    compliance: [
      'WCAG 2.1 AAA compliance validation',
      'Screen reader testing',
      'Keyboard navigation testing',
      'Color contrast validation'
    ],
    enhancement: [
      'High contrast mode support',
      'Reduced motion preferences',
      'Font size preferences',
      'Language localization setup'
    ]
  }
}
```

### Migration Strategy from Current Frontend

```typescript
// Step-by-step migration from existing Next.js structure
const migrationStrategy = {
  phase1: {
    description: 'Foundation setup without breaking existing functionality',
    steps: [
      '1. Create new module structure alongside existing code',
      '2. Set up design system foundation',
      '3. Implement global state management',
      '4. Add error boundaries and performance monitoring'
    ],
    risk: 'low',
    rollback: 'Remove new directories, no impact on existing functionality'
  },
  
  phase2: {
    description: 'Migrate components module by module',
    steps: [
      '1. Start with shared UI components (Button, Input, Card)',
      '2. Migrate appointment booking form',
      '3. Migrate content components (blog, SOPs)',
      '4. Migrate dashboard components'
    ],
    risk: 'medium',
    rollback: 'Feature flag system allows instant rollback to old components'
  },
  
  phase3: {
    description: 'Optimize and enhance migrated components',
    steps: [
      '1. Add accessibility enhancements',
      '2. Implement performance optimizations', 
      '3. Add comprehensive testing',
      '4. Remove old components'
    ],
    risk: 'low',
    rollback: 'Keep old components as fallback until confidence is high'
  }
}
```

### Success Metrics & Monitoring

```typescript
interface FrontendSuccessMetrics {
  performance: {
    lcp: { target: 1.5, current: number },
    fid: { target: 50, current: number },
    cls: { target: 0.05, current: number },
    bundleSize: { target: '500KB', current: string }
  },
  
  accessibility: {
    wcagCompliance: { target: 'AAA', current: 'AA' | 'AAA' },
    keyboardNavigation: { target: 100, current: number }, // percentage
    screenReaderCompatibility: { target: 100, current: number },
    colorContrastRatio: { target: 7, current: number }
  },
  
  userExperience: {
    appointmentBookingSuccess: { target: 95, current: number }, // percentage
    formCompletionRate: { target: 85, current: number },
    errorRecoveryRate: { target: 90, current: number },
    mobileUsability: { target: 95, current: number }
  },
  
  developer: {
    componentReusability: { target: 80, current: number }, // percentage
    testCoverage: { target: 90, current: number },
    buildTime: { target: '2min', current: string },
    hotReloadTime: { target: '500ms', current: string }
  }
}
```

### Conclusion

This comprehensive frontend architecture plan addresses all the gaps identified in the original modular monolith architecture. It provides:

- **Healthcare-specific UX patterns** with WCAG AAA compliance
- **Module-aligned component architecture** that mirrors backend structure
- **Performance optimization** for healthcare users and mobile devices
- **Comprehensive testing strategy** including accessibility and E2E testing
- **Clear migration path** from existing Next.js structure
- **Success metrics and monitoring** for continuous improvement

The frontend architecture complements the backend modular monolith perfectly, ensuring a cohesive full-stack solution that serves healthcare users effectively while maintaining developer productivity and code quality.

---

## Future Evolution Path

### Microservices Migration Strategy
If the application outgrows the modular monolith, modules can be extracted into microservices:

#### Phase 1: Identify Extraction Candidates
```typescript
// Metrics to consider for microservice extraction:
interface ExtractionMetrics {
  module: string
  changeFrequency: number        // How often the module changes
  teamOwnership: number          // Number of teams working on it
  performanceRequirements: number // Different performance needs
  scalingRequirements: number    // Different scaling needs
  technologyFit: number          // Would benefit from different tech
}

// Example evaluation:
const extractionCandidates = [
  {
    module: 'notifications',
    score: 8.5,
    reasons: ['High change frequency', 'Different scaling needs', 'Could use message queues']
  },
  {
    module: 'content',
    score: 7.2,
    reasons: ['Read-heavy workload', 'Could benefit from CDN', 'Separate team ownership']
  }
]
```

#### Phase 2: Service Extraction Process
```typescript
// 1. Create API contract
interface NotificationServiceAPI {
  'POST /notifications/send': {
    body: SendNotificationRequest
    response: SendNotificationResponse
  }
  'GET /notifications/:id/status': {
    params: { id: string }
    response: NotificationStatus
  }
}

// 2. Implement service behind feature flag
if (useExternalNotificationService) {
  await notificationServiceClient.send(request)
} else {
  await notificationModule.send(request)
}

// 3. Gradual rollout with monitoring
// 4. Remove internal module once confident
```

### Technology Evolution Strategy

#### Database Evolution
```typescript
// Current: Single MongoDB
// Future options per module:

const databaseStrategy = {
  appointments: {
    current: 'mongodb',
    future: 'postgresql', // ACID compliance for bookings
    migration: 'dual-write-pattern'
  },
  content: {
    current: 'sanity + mongodb cache',
    future: 'sanity + redis + cdn',
    migration: 'cache-replacement'
  },
  notifications: {
    current: 'mongodb',
    future: 'message-queue + postgres',
    migration: 'event-sourcing'
  }
}
```

#### Caching Evolution
```typescript
// Module-specific caching strategies
const cachingEvolution = {
  current: 'in-memory + mongodb',
  intermediate: 'redis + mongodb',
  advanced: {
    appointments: 'redis + database',
    content: 'cdn + redis + database',
    notifications: 'message-queue + redis'
  }
}
```

### Monitoring and Observability Roadmap

#### Current State
- Basic error logging
- Performance monitoring via Next.js
- Simple health checks

#### Module-Level Monitoring
```typescript
// Module performance metrics
interface ModuleMetrics {
  module: string
  requestCount: number
  averageResponseTime: number
  errorRate: number
  cacheHitRate: number
  databaseQueryTime: number
}

// Health check per module
export class AppointmentHealthCheck {
  async check(): Promise<HealthStatus> {
    return {
      module: 'appointments',
      status: 'healthy',
      checks: {
        database: await this.checkDatabase(),
        cache: await this.checkCache(),
        externalServices: await this.checkExternalServices()
      }
    }
  }
}
```

#### Advanced Observability
```typescript
// Distributed tracing for module interactions
interface TraceContext {
  traceId: string
  spanId: string
  parentSpanId?: string
  module: string
  operation: string
}

// Business metrics per module
interface BusinessMetrics {
  appointments: {
    bookingsPerDay: number
    cancellationRate: number
    averageBookingTime: number
  }
  content: {
    pageViews: number
    contentEngagement: number
    cacheEfficiency: number
  }
}
```

### Team Structure Evolution

#### Current Team Structure
- 1-2 Full-stack developers
- Shared responsibility for all features

#### Module-Oriented Team Structure
```typescript
interface TeamStructure {
  modules: {
    appointments: {
      owner: 'backend-team',
      contributors: ['frontend-team']
    },
    content: {
      owner: 'content-team',
      contributors: ['frontend-team']
    },
    dashboard: {
      owner: 'backend-team',
      contributors: []
    }
  },
  shared: {
    owner: 'platform-team',
    contributors: ['all-teams']
  }
}
```

#### Future Microservices Team Structure
- Service ownership model
- Cross-functional teams per service
- Platform team for shared infrastructure

---

## Conclusion

The modular monolith architecture provides SCT Trust Hospital with the perfect balance of simplicity and scalability. It maintains the operational benefits of a monolith while providing the structural benefits of microservices.

### Key Success Factors
1. **Clear Module Boundaries**: Well-defined responsibilities and interfaces
2. **Team Discipline**: Following established patterns and conventions
3. **Gradual Migration**: Step-by-step implementation without breaking changes
4. **Comprehensive Testing**: Module-level and integration testing
5. **Future Flexibility**: Foundation for potential microservices evolution

### Next Steps
1. **Get Team Buy-in**: Review this plan with all stakeholders
2. **Start with Phase 1**: Create foundation structure (low risk)
3. **Implement Gradually**: One module at a time with full testing
4. **Monitor and Adjust**: Track metrics and adjust approach as needed
5. **Document Learnings**: Capture what works and what doesn't

This architecture will serve SCT Trust Hospital well as it grows from a regional healthcare provider to a larger organization, providing the flexibility to evolve while maintaining operational simplicity.