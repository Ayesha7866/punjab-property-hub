# GitHub + Hostinger web app (no coding)

This file is for putting **EstateHubb** (estatehubb.online) on GitHub, then creating a **Hostinger Node.js web app**. Do not point **papergenerator.online** at this app.

GitHub repository: [https://github.com/Ayesha7866/punjab-property-hub](https://github.com/Ayesha7866/punjab-property-hub)

When that repo holds this app at the **root** (`package.json` on the first page), Hostinger **Root directory** is empty `/` and the branch is **`main`**.

## Part 1 — GitHub

This marketplace is a **separate** GitHub repo. It is not papergenerator.online.

### If you need a new GitHub repository

1. Open [github.com](https://github.com) and sign in (or create an account).
2. Click the **+** (top right) → **New repository**.
3. Name: `punjab-property-hub`
4. Choose **Private**.
5. Do **not** add a README.
6. Click **Create repository**.

This cloud workspace can push to Cursor Origin, not to your personal GitHub login. To get the files into GitHub:

- **Cursor on your computer:** open this project → Source Control → **Publish to GitHub**, or add the new repo as remote and push branch `cursor/pph-qa-bugfixes-120e`.
- **GitHub Desktop:** File → Add local repository, then Publish.

The GitHub repo should contain the **contents of** `punjab-property-hub` at the root (`package.json` visible at the top), **or** the full papermaker repo with this folder inside (then Hostinger root directory must be `punjab-property-hub`).

Never upload `.env`, `prisma/dev.db`, or `storage/uploads`.

## Part 2 — Hostinger Node.js web app

You need a **Business** plan (you already have this). Use **Node.js web app**, not a normal PHP website.

1. Log in at [hpanel.hostinger.com](https://hpanel.hostinger.com).
2. **Websites** → **Add Website**.
3. Choose **Node.js web app** (sometimes **Web App**).
4. **Import your Git repository** → **Connect with GitHub**.
5. Allow Hostinger to read the repo.
6. Select the repo from Part 1.

### Paste these settings

| Field | Value |
|---|---|
| Branch | `main` |
| Root directory | empty (this GitHub repo is the app itself) |
| Node.js | `22` |
| Application type | `next` |
| Build script | `build` |
| Output directory | `.next` |
| Entry file | empty |

### Folders that must survive deploys

In **File Manager**, in your home folder (name like `u123456789`), create:

- `pph-data`
- `pph-data/uploads`

### Environment variables

**Environment variables** (or the deploy settings screen). Replace `YOUR_USER`, domain, email, password:

```
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://estatehubb.online
DATABASE_URL=file:/home/YOUR_USER/pph-data/pph.db
UPLOAD_DIR=/home/YOUR_USER/pph-data/uploads
ADMIN_BOOTSTRAP_EMAIL=you@estatehubb.online
ADMIN_BOOTSTRAP_PASSWORD=use-a-long-unique-password
ADMIN_BOOTSTRAP_NAME=Site Administrator
```

Save, then **Deploy**. Wait until **Deployments** is green. Open the preview URL.

Success = homepage **EstateHubb**, not PAPerGenerator.

Then attach **estatehubb.online** to **this new website**, not papergenerator.online.
