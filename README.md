# Punjab Property Hub

Property marketplace for **Punjab, Pakistan**. Temporary brand name, colours, and contact details live in `src/config/brand.ts`.

This application is a **separate Next.js app** inside the existing `papermaker` repository so PAPerGenerator.online is not overwritten.

Owners and dealers can **list their own property**. Ads stay private until an administrator approves them. Local database is SQLite so the app runs without Supabase credentials.

## Stack

| Piece | Choice | Why |
|---|---|---|
| App | Next.js 16 App Router + TypeScript | Hostinger Node.js web apps run Next.js in **server** mode |
| UI | Tailwind CSS 4, Lucide | Matches the requested design system |
| Validation | Zod + server actions | Client checks are never the only gate |
| Auth / DB | Prisma + SQLite (MySQL later on Hostinger) | Works without extra cloud keys |
| Photos | Local `UPLOAD_DIR` | Hostinger overwrites deploy folders — keep uploads outside |
| Node | **20.9+** (this machine: 22) | Next.js 16 minimum; Hostinger offers 20, 22, 24 |

Hostinger always builds Next.js with `output: "standalone"`. Do **not** switch this app to `output: "export"`. Listings, auth, and uploads need a Node server.

## Local setup

```bash
cd punjab-property-hub
cp .env.example .env
cp .env.example .env.local
# Set a strong ADMIN_BOOTSTRAP_PASSWORD, then:
npm install
npx prisma migrate deploy
npx tsx --env-file=.env prisma/seed.ts
npm run dev
```

Review URL: **http://127.0.0.1:45218**

```bash
npm run lint
npm run typecheck
npm run build
npm run start
```

## Environment variables

See `.env.example`. Required later:

- `NEXT_PUBLIC_APP_URL`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` (server only — never prefix with `NEXT_PUBLIC_`)
- Optional SMTP fields for mail

The service role key must never appear in client bundles.

## Hostinger deployment (marketplace only)

1. Create a **new** Node.js web app. Do not point `papergenerator.online` at this folder.
2. Set the application root to `punjab-property-hub` (or split this folder into its own GitHub repo).
3. Node.js **22** (or 20).
4. Application type: `next`.
5. Build: `npm run build`
6. Start: Hostinger starts the standalone server; if you must set it, `npm run start -- -p $PORT`
7. Output directory: `.next`
8. Add environment variables in hPanel from `.env.example`.
9. After Phase 2, add a Supabase project and paste URL + keys. Run SQL from `supabase/` there — not on Hostinger MySQL unless you later choose Prisma + MySQL instead.

## Testing checklist (Phase 1)

- [x] Homepage renders with search, cities, empty featured/recent, how it works, benefits, CTA, footer
- [x] Buy / Rent / Commercial search options write shareable query strings
- [x] All 36 Punjab districts plus 209 cities/towns (Jhang, Toba Tek Singh, Gojra, Murree, and the rest) in search and the cities directory
- [x] Empty search results do not invent listings
- [x] Mobile navigation opens and closes
- [x] Owners and dealers can register, sign in, and submit their own listings
- [x] Photos validated (JPEG/PNG/WebP, size and count limits)
- [x] Unapproved properties stay off public search
- [x] Admin can approve or reject listings
- [ ] Email verification / SMTP — not configured
- [ ] Hostinger production database — local SQLite until you deploy

## Completed vs remaining

**Done:** homepage, Punjab city directory, **self-serve listing** (owner/dealer form, dashboard, photo upload, admin review).

**Still needed for a public Hostinger launch:** point a Node.js app at `punjab-property-hub`, set environment variables, keep `UPLOAD_DIR` outside the deploy folder, and change the bootstrap admin password.
