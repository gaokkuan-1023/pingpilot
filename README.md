# SaaS Starter

A production-ready Next.js starter kit with everything you need to start charging customers today.

**Stack:** Next.js 16 + TypeScript + Tailwind CSS + Prisma + SQLite + NextAuth v5 + Stripe

## What's included

- **Email/password auth** — NextAuth v5 with credentials provider, signup, login, logout, session management
- **Stripe subscriptions** — Checkout flow, webhook handler, customer portal, plan-based access (free/pro)
- **Dashboard layout** — Responsive sidebar, protected routes, user context
- **Prisma ORM** — Type-safe database with SQLite (swap to Postgres in one line)
- **Tailwind CSS** — Clean, minimal design system
- **Server actions** — React 19 useActionState forms, type-safe mutations

## Quick start

```bash
# 1. Install
npm install

# 2. Set up env vars
cp .env.example .env.local
# Fill in: AUTH_SECRET, STRIPE_SECRET_KEY, STRIPE_PRO_PRICE_ID, STRIPE_WEBHOOK_SECRET

# 3. Initialize database
npx prisma db push

# 4. Run
npm run dev
```

## Environment variables

| Variable | Description |
|----------|-------------|
| `AUTH_SECRET` | Random string for session encryption (`openssl rand -base64 32`) |
| `DATABASE_URL` | SQLite connection string (`file:./dev.db`) |
| `STRIPE_SECRET_KEY` | Stripe secret key (`sk_test_...`) |
| `STRIPE_PRO_PRICE_ID` | Stripe price ID for Pro plan (`price_...`) |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signing secret (`whsec_...`) |
| `CRON_SECRET` | Secret for cron job endpoints (optional) |

## Stripe setup

1. Create a product in Stripe Dashboard
2. Add a recurring price
3. Copy the price ID to `STRIPE_PRO_PRICE_ID`
4. Create a webhook endpoint pointing to `https://yourdomain.com/api/stripe/webhook`
5. Listen for `checkout.session.completed` and `customer.subscription.deleted`
6. Copy the webhook secret to `STRIPE_WEBHOOK_SECRET`

## Project structure

```
src/
├── app/
│   ├── api/
│   │   ├── auth/[...nextauth]/    # NextAuth route
│   │   └── stripe/                # Checkout, portal, webhook
│   ├── dashboard/
│   │   ├── billing/              # Billing page
│   │   └── layout.tsx             # Dashboard shell
│   ├── login/                    # Login page
│   ├── signup/                   # Signup page
│   └── page.tsx                  # Landing page
├── lib/
│   ├── auth.ts                   # NextAuth config
│   ├── db.ts                     # Prisma singleton
│   ├── actions.ts                # Auth server actions
│   └── stripe.ts                 # Stripe client
```

## Customizing

1. **Data model** — Edit `prisma/schema.prisma`, add your models, run `npx prisma db push`
2. **Pages** — Add your pages in `src/app/dashboard/`, they're automatically protected
3. **Pricing** — Update `src/app/dashboard/billing/page.tsx` with your pricing
4. **Landing page** — Edit `src/app/page.tsx` with your product's value prop
5. **Branding** — Replace "SaaS App" with your product name

## Deploy

Push to GitHub and import to Vercel. Add your env vars in the Vercel dashboard. Done.

## License

MIT — use it for anything.
