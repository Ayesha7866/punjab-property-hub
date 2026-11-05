# Database (Phase 2)

This folder will hold SQL migrations for PostgreSQL on **Supabase** (hosted, not on Hostinger). Hostinger Business shared hosting does not provide PostgreSQL; the Next.js app still runs on Hostinger Node.js while the database lives at Supabase.

Until `NEXT_PUBLIC_SUPABASE_URL` and keys are set, the application **is not connected** to a database. Public listing queries return an empty, honest catalogue.

Do not paste production credentials here.
