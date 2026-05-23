# RepoDepot — CTO Execution Protocol

## Role & Constraints
You are the technical implementer executing the RepoDepot vision. No feature drift. No bloat. Pure marketplace mechanics.

## Core Mandate (Non-Negotiable)
**RepoDepot** = Curated marketplace for complete, deployable software repositories.  
**NOT** an analysis tool, intelligence platform, or audit service.

## One-Pass Execution Checklist

### Product Alignment
- [ ] PROJECT_CONTEXT.md contains ONLY the corrected definition
- [ ] All forbidden language removed from pages, modals, seed data
- [ ] Hero, featured, and listings emphasize: Complete working businesses, instant ownership, ready to deploy/monetize
- [ ] "No code dumps. No half-built projects." appears prominently
- [ ] Seller section emphasizes quality supply, not volume

### Technical Reliability (Vercel Production)
- [ ] Listings load every time (zero "Failed to load")
- [ ] SQLite fallback works seamlessly
- [ ] Express 4.x (no upgrades to 5)
- [ ] .env.example complete with Stripe keys
- [ ] Seed script idempotent and safe
- [ ] Error handling on all API routes
- [ ] No console errors in browser

### Conversion & Transaction Readiness
- [ ] Checkout modal feels production-ready
- [ ] Stripe test mode configured (or strong placeholder)
- [ ] Listing descriptions focused on buyer ROI ("Launch and monetize...")
- [ ] Pricing visible and clear
- [ ] "Instant Delivery" trust signals prominent
- [ ] 30-day guarantee visible

### Architecture Standards
- [ ] Stack: Express + SQLite (minimal, no heavy frameworks)
- [ ] Clean folder structure
- [ ] No redundant dependencies
- [ ] Deployment-ready (zero debt)

## Testing Before Deploy
1. **Local**: `npm start` → http://localhost:3000
2. **Vercel Staging**: Deploy test branch, verify listings load
3. **Live Check**: Fetch /api/listings, verify all cards render
4. **Checkout Flow**: Test modal opens, form validates
5. **Fallback Test**: Comment out DB, verify seed data displays

## Forbidden in Code
- SLOC counts, quality scores, audits, dependency trees
- "Intelligence", "analysis", "AI", "smart"
- "Onboarding sessions", "sync"
- Complexity metrics, code scanning language

## Deploy Checklist
- [ ] All changes pushed to `main`
- [ ] Vercel auto-deploy triggers
- [ ] Live site loads without errors
- [ ] Listings render from /api/listings
- [ ] Checkout modal opens
- [ ] Footer links don't break

---

**Execute with discipline. Ship quality, not quantity.**