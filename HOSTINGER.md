# Hostinger compatibility (verified against published docs, not your private hPanel)

Checked: [Hostinger Next.js](https://docs.hostinger.com/node.js/overview-1/next) and Node.js web app docs (2026).

| Setting | Required value |
|---|---|
| Plan | Business or Cloud with Node.js web apps |
| Node.js | 20 or 22 (Next.js 16 needs **20.9+**; 18 is not enough) |
| App type | `next` (server mode) |
| Build | `npm run build` |
| Output | `.next` |
| Entry file | leave empty for Next.js |
| `output: "export"` | **Do not use** — Hostinger replaces output with standalone anyway, and this app needs a server |

PostgreSQL is **not** available on Hostinger shared MySQL. Use **Supabase** (external) for the marketplace database, or later adopt MySQL + Prisma like PAPerGenerator if you want everything on Hostinger.

Do not attach this app to `papergenerator.online` unless you explicitly decide to replace that product.
