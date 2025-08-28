# E-commerce Inventory Manager - SaaS Subscription Plan

## Overview
Convert the E-commerce Inventory Manager into a Subscription SaaS model with three tiers:
- Free Tier (limited features)
- Pro Tier (advanced features)
- Enterprise Tier (all features + premium support)

## Implementation Plan

### 1. Authentication System (NextAuth.js)
- Set up NextAuth.js with Credentials provider
- Create user model with subscription tier field
- Implement login/logout functionality
- Create protected routes based on authentication status

### 2. Database Schema (PostgreSQL with Prisma)
- User model:
  - id (UUID)
  - email (String, unique)
  - name (String)
  - password (String, hashed)
  - subscriptionTier (Enum: FREE, PRO, ENTERPRISE)
  - subscriptionStatus (Enum: ACTIVE, INACTIVE, PAST_DUE)
  - createdAt (DateTime)
  - updatedAt (DateTime)
- Subscription model:
  - id (UUID)
  - userId (Foreign key to User)
  - paypalSubscriptionId (String)
  - status (String)
  - planId (String)
  - startDate (DateTime)
  - endDate (DateTime)
  - createdAt (DateTime)
  - updatedAt (DateTime)

### 3. Payment Integration (PayPal)
- Set up PayPal Developer account
- Create sandbox accounts for testing
- Implement PayPal subscription integration:
  - Create subscription plans in PayPal
  - Handle subscription creation flow
  - Implement webhook handling for subscription events
  - Handle subscription cancellation/upgrades

### 4. Feature Locking System
- Create feature flag system based on subscription tier
- Implement UI components that show/hide based on tier
- Create middleware to protect API routes based on subscription
- Define feature access for each tier:
  - Free: Basic inventory management (limited products)
  - Pro: Advanced inventory management (unlimited products, reporting)
  - Enterprise: All features + API access + priority support

### 5. UI Components
- Pricing page with tier options
- User dashboard showing subscription status
- Subscription management page
- Feature access controls in inventory manager

### 6. API Routes
- /api/auth/* - Authentication routes
- /api/paypal/* - PayPal integration routes
- /api/subscription/* - Subscription management routes
- /api/inventory/* - Inventory management routes (protected by subscription)

### 7. Middleware
- Authentication middleware
- Subscription validation middleware

## File Structure
```
src/
  app/
    api/
      auth/
        [...nextauth]/
          route.ts
      paypal/
        create-subscription/
          route.ts
        webhook/
          route.ts
      subscription/
        upgrade/
          route.ts
        cancel/
          route.ts
    auth/
      login/
        page.tsx
      register/
        page.tsx
    dashboard/
      page.tsx
    pricing/
      page.tsx
    subscription/
      page.tsx
    layout.tsx
    page.tsx
  components/
    auth/
      LoginForm.tsx
      RegisterForm.tsx
    subscription/
      PricingTable.tsx
      SubscriptionStatus.tsx
      FeatureAccess.tsx
    inventory/
      InventoryManager.tsx
      ProductList.tsx
      ProductForm.tsx
  lib/
    auth.ts
    paypal.ts
    subscription.ts
    db.ts
  middleware.ts
```

## Implementation Steps

### Phase 1: Setup and Authentication
1. Install dependencies (NextAuth.js, Prisma, PayPal SDK)
2. Set up Prisma with PostgreSQL
3. Configure NextAuth.js
4. Create authentication pages (login, register)

### Phase 2: Database and Models
1. Define Prisma models
2. Create database migrations
3. Implement user management

### Phase 3: PayPal Integration
1. Set up PayPal Developer account
2. Create subscription plans
3. Implement PayPal SDK integration
4. Create subscription API routes

### Phase 4: Subscription Management
1. Create subscription models
2. Implement subscription logic
3. Create subscription UI components

### Phase 5: Feature Locking
1. Implement feature flag system
2. Create middleware for route protection
3. Add feature access controls to inventory manager

### Phase 6: UI Implementation
1. Create pricing page
2. Create subscription management page
3. Create dashboard with subscription status
4. Integrate feature access into inventory manager

## Dependencies to Install
```bash
npm install next-auth @prisma/client paypal-rest-sdk bcryptjs
npm install -D @types/bcryptjs
npm install @paypal/checkout-server-sdk  # For PayPal integration
```

## Environment Variables Needed
```
DATABASE_URL="postgresql://user:password@localhost:5432/inventory_saas"
NEXTAUTH_URL="http://localhost:8000"
NEXTAUTH_SECRET="your-secret-key"
PAYPAL_CLIENT_ID="your-paypal-client-id"
PAYPAL_CLIENT_SECRET="your-paypal-client-secret"
PAYPAL_SANDBOX=true
