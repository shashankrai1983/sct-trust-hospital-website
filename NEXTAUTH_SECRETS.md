# Environment Configuration Summary

## Unified Credentials Approach
**Decision**: Using same admin credentials and reCAPTCHA keys across all environments for simplicity.

## Environment Variables

### Local Development (.env.local)
```
NEXTAUTH_SECRET=STz/OnplF55lDoy6WcCJTzMcsx/fldSEqz+2kVpfCdQ=
ADMIN_EMAIL=admin@scttrusthospital.com
ADMIN_PASSWORD_HASH=$2b$12$FamNDeVSdSzliUicRncc6u7geRQ1yiD5zlYT1vhuXPgeethWIufoW
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=6LdT9JgrAAAAAIYozDQQ_OU4J4PZnu95ZiEi2xgP
RECAPTCHA_SECRET_KEY=6LdT9JgrAAAAAGYn6vIdliEXOimDScJKxoeBY1W6
MONGODB_URI=mongodb+srv://khushburai1008:ITMUH2rr3ZkGvqxU@cluster0.bqufcqe.mongodb.net/sct_hospital_staging?retryWrites=true&w=majority
```
✅ Already configured in .env.local

### Staging Environment (Netlify)
```
NEXTAUTH_SECRET=/s7Z+DKttBCAs7lmk+Vg7S/zdMafQDYT+1Dk+knu+UI=
ADMIN_EMAIL=admin@scttrusthospital.com
ADMIN_PASSWORD_HASH=$2b$12$FamNDeVSdSzliUicRncc6u7geRQ1yiD5zlYT1vhuXPgeethWIufoW
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=6LdT9JgrAAAAAIYozDQQ_OU4J4PZnu95ZiEi2xgP
RECAPTCHA_SECRET_KEY=6LdT9JgrAAAAAGYn6vIdliEXOimDScJKxoeBY1W6
MONGODB_URI=mongodb+srv://khushburai1008:ITMUH2rr3ZkGvqxU@cluster0.bqufcqe.mongodb.net/sct_hospital_staging?retryWrites=true&w=majority
```
📋 **Action Required**: Add to Netlify staging environment variables

### Production Environment (Netlify)
```
NEXTAUTH_SECRET=P1Bpdzq9hGR028F4kTgKyVrKQLdF5woEl6Dw1CwLPq8=
ADMIN_EMAIL=admin@scttrusthospital.com
ADMIN_PASSWORD_HASH=$2b$12$FamNDeVSdSzliUicRncc6u7geRQ1yiD5zlYT1vhuXPgeethWIufoW
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=6LdT9JgrAAAAAIYozDQQ_OU4J4PZnu95ZiEi2xgP
RECAPTCHA_SECRET_KEY=6LdT9JgrAAAAAGYn6vIdliEXOimDScJKxoeBY1W6
MONGODB_URI=mongodb+srv://khushburai1008:ITMUH2rr3ZkGvqxU@cluster0.bqufcqe.mongodb.net/sct_hospital?retryWrites=true&w=majority
```
📋 **Action Required**: Add to Netlify production environment variables

## Admin Credentials
- **Email**: `admin@scttrusthospital.com`
- **Password**: `admin123`
- **Hash**: `$2b$12$FamNDeVSdSzliUicRncc6u7geRQ1yiD5zlYT1vhuXPgeethWIufoW`
- **Used in**: All environments (Production, Staging, Local)

## reCAPTCHA Configuration
- **Site Key**: `6LdT9JgrAAAAAIYozDQQ_OU4J4PZnu95ZiEi2xgP`
- **Secret Key**: `6LdT9JgrAAAAAGYn6vIdliEXOimDScJKxoeBY1W6`
- **Used in**: All environments (Production, Staging, Local)
- **Action Required**: Add `staging-dramitashukla.netlify.app` and `localhost` to existing reCAPTCHA site domains

## Security Notes
- ✅ Only NEXTAUTH_SECRET is unique per environment for security
- ✅ Same admin credentials across all environments for simplicity
- ✅ Same reCAPTCHA keys across all environments for simplicity
- ✅ Database isolation maintained (separate staging/production DBs)
- ⚠️ Keep all secrets secure and never commit to version control

## Implementation Steps

### For Staging Environment:
1. Go to Netlify staging site dashboard
2. Navigate to Site Settings → Environment Variables
3. Add: `NEXTAUTH_SECRET=/s7Z+DKttBCAs7lmk+Vg7S/zdMafQDYT+1Dk+knu+UI=`

### For Production Environment:
1. Go to Netlify production site dashboard
2. Navigate to Site Settings → Environment Variables
3. Add: `NEXTAUTH_SECRET=P1Bpdzq9hGR028F4kTgKyVrKQLdF5woEl6Dw1CwLPq8=`

## Verification
After deployment, verify authentication works properly:
- Login/logout functionality
- Session management
- JWT token encryption
- Cookie security

---
**Note**: This file contains sensitive information. Do not commit to version control.