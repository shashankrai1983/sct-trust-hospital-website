# Database Migration Assessment: Staging to Production

## 🎯 Executive Summary

**Risk Level: MEDIUM-HIGH**  
Production database requires **4 new collections** and associated indexes before staging code can be safely merged to master.

## 📊 Current State Analysis

### Production Database (`sct_hospital`)
- **Collections**: 1
  - `appointments` (37 documents)
- **Fields**: `_id, name, email, phone, service, date, time, message, status, createdAt, updatedAt`

### Staging Database (`sct_hospital_staging`)  
- **Collections**: 5
  - `appointments` (18 documents) - **COMPATIBLE** ✅
  - `bookedSlots` (10 documents) - **NEW** 🆕
  - `blockedDates` (4 documents) - **NEW** 🆕
  - `tickerNotifications` (4 documents) - **NEW** 🆕
  - `holidayOverrides` (1 document) - **NEW** 🆕

## 🚨 Critical Migration Requirements

### 1. New Collections Required in Production

#### 📁 `bookedSlots` Collection
```javascript
{
  _id: ObjectId,
  date: String,           // YYYY-MM-DD
  time: String,           // HH:MM AM/PM
  appointmentId: ObjectId,
  patientName: String,
  patientEmail: String,
  service: String,
  status: String,         // 'active' | 'cancelled'
  createdAt: Date,
  updatedAt: Date
}
```

#### 📁 `blockedDates` Collection
```javascript
{
  _id: ObjectId,
  date: String,                    // YYYY-MM-DD
  timeSlots: Array,               // Optional time slots
  reason: String,
  blockedBy: String,              // Admin user ID
  blockedByName: String,
  isActive: Boolean,
  notificationStartDate: Date,    // Additional fields in staging
  notificationEndDate: Date,
  createdAt: Date,
  updatedAt: Date
}
```

#### 📁 `tickerNotifications` Collection
```javascript
{
  _id: ObjectId,
  id: String,                     // Additional ID field
  message: String,
  type: String,                   // 'blocked_date' | 'emergency'
  startDate: Date,
  endDate: Date,
  isActive: Boolean,
  priority: Number,
  relatedBlockedDateId: ObjectId, // Reference to blocked date
  createdAt: Date,
  updatedAt: Date
}
```

#### 📁 `holidayOverrides` Collection
```javascript
{
  _id: ObjectId,
  date: String,              // YYYY-MM-DD
  holidayName: String,
  reason: String,
  overriddenBy: String,      // Admin user ID
  overriddenByName: String,
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### 2. Existing Collection Compatibility

#### ✅ `appointments` Collection
- **Status**: FULLY COMPATIBLE
- **Action**: No migration needed
- **Schema**: Identical fields in both databases

## 🛠️ Migration Strategy

### Phase 1: Pre-Migration Safety (CRITICAL)
1. **Production Database Backup**
   ```bash
   # Full database backup before any changes
   mongodump --uri="mongodb+srv://..." --db=sct_hospital --out=./backup_pre_migration
   ```

2. **Environment Variable Verification**
   - ✅ All required env vars already present in Netlify production
   - ✅ Authentication configuration compatible

### Phase 2: Database Schema Migration
1. **Create New Collections** (Empty, with proper indexes)
   ```javascript
   // Create collections with basic indexes
   db.createCollection("bookedSlots")
   db.createCollection("blockedDates")
   db.createCollection("tickerNotifications")
   db.createCollection("holidayOverrides")
   
   // Add performance indexes
   db.bookedSlots.createIndex({ "date": 1, "time": 1 })
   db.blockedDates.createIndex({ "date": 1, "isActive": 1 })
   db.tickerNotifications.createIndex({ "isActive": 1, "priority": -1 })
   db.holidayOverrides.createIndex({ "date": 1, "isActive": 1 })
   ```

### Phase 3: Code Deployment Strategy
1. **Merge Strategy**: Feature-flag new functionality
2. **API Backwards Compatibility**: Existing appointment endpoints remain functional
3. **Gradual Feature Activation**: Enable new features only after successful deployment

### Phase 4: Post-Migration Validation
1. **API Testing**: Verify all appointment operations work
2. **New Feature Testing**: Test blocked dates, notifications
3. **Performance Monitoring**: Monitor database performance
4. **Rollback Readiness**: Keep rollback scripts ready

## ⚠️ Risk Assessment

### HIGH RISKS
1. **Missing Collections**: Application will crash on new feature access
2. **API Dependencies**: Dashboard features depend on new collections
3. **Data Consistency**: No referential integrity between old and new data

### MEDIUM RISKS  
1. **Performance Impact**: New collections may affect query performance
2. **Index Optimization**: May need additional indexes based on usage patterns

### LOW RISKS
1. **Environment Variables**: Already configured correctly
2. **Authentication**: Compatible between staging and production

## 🚀 Recommended Deployment Sequence

1. **BACKUP** production database completely
2. **CREATE** new collections in production (empty)
3. **MERGE** staging branch to master
4. **DEPLOY** to production with new collections available
5. **TEST** all existing functionality thoroughly
6. **ENABLE** new features gradually
7. **MONITOR** system performance and errors

## 📋 Pre-Deployment Checklist

- [ ] Production database backed up
- [ ] New collections created in production
- [ ] Indexes added for performance
- [ ] Environment variables verified
- [ ] Rollback plan documented
- [ ] Testing strategy prepared
- [ ] Monitoring alerts configured

## 🔄 Rollback Plan

If issues occur post-deployment:
1. **Code Rollback**: Revert to previous master branch
2. **Database Rollback**: Remove new collections (data will be lost)
3. **Environment Reset**: Verify all environment variables
4. **Service Restart**: Restart application services

**Estimated Rollback Time**: 15-30 minutes

## ✅ Go/No-Go Decision

**RECOMMENDATION**: PROCEED with migration following the above strategy.

**Confidence Level**: 85% - All prerequisites identified and planned for.

**Next Steps**: Execute Phase 1 (Backup) immediately before any code changes.