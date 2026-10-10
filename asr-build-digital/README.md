# ASR Build & Digital

Premium, responsive six-page business website with expanded sections and a richer navy-and-gold design for two service divisions:
- **ASR Digital** — websites, workflow automation, Power Apps, dashboards, and custom applications.
- **ASR Spaces** — house planning, construction support, land planning, and property-related support.

Built with React + Vite, React Router, Express, and PostgreSQL.

## Requirements

Install:
1. **Node.js LTS** (includes npm): https://nodejs.org/
2. **PostgreSQL** (only needed for saving enquiries locally): https://www.postgresql.org/download/
3. **Visual Studio Code** (recommended): https://code.visualstudio.com/
4. **Git** (optional, for GitHub): https://git-scm.com/downloads

No separate React, Vite, Express, or PostgreSQL client download is required; npm installs the JavaScript dependencies.

## Project folders

- `frontend/` — all six public pages and responsive styling
- `backend/` — contact/enquiry API
- `database/schema.sql` — database table
- `.gitignore` — ignores secrets and installed packages
- `.env.example` files — configuration templates

## 1. Install and run the frontend

Open a terminal in `frontend`:

```bash
npm install
npm run dev
```

Open the local URL Vite prints, usually `http://localhost:5173`.

The frontend can be viewed without running the backend. The contact form will show a helpful error until the API is running.

## 2. Configure PostgreSQL

Install PostgreSQL and make a database named `asr_build_digital`.

In pgAdmin's Query Tool or `psql`, run the contents of `database/schema.sql`.

Create `backend/.env` by copying `backend/.env.example`, then set your PostgreSQL credentials. Example:

```env
PORT=5000
FRONTEND_URL=http://localhost:5173
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/asr_build_digital
```

If your PostgreSQL setup uses a different username/password/port, update `DATABASE_URL`.

## 3. Run the backend

Open a second terminal in `backend`:

```bash
npm install
npm run dev
```

Test the health endpoint at `http://localhost:5000/api/health`.

Run the frontend and backend in separate terminals. Submit the contact form; successful enquiries are saved in PostgreSQL.

## Environment and security

- Never commit `backend/.env`.
- Use a strong database password.
- Do not expose PostgreSQL directly to the public internet.
- Before production, add CAPTCHA/spam controls, email notifications, backups, and an authenticated admin interface.
- This starter intentionally does not include an admin dashboard or email sender yet; enquiry capture is implemented.
- The business name, service claims, contact details, project images, and personal photos are placeholders. Replace them with verified information before publishing.

## Build frontend for deployment

From `frontend`:

```bash
npm run build
```

The production files are written to `frontend/dist`.

## Suggested free-tier deployment

- Frontend: Cloudflare Pages (connect GitHub; build command `npm run build`; output directory `dist`; root directory `frontend`).
- Database/API: free-tier availability and limits vary. This project currently expects an Express API and PostgreSQL, so deploy the backend to a compatible Node host and PostgreSQL to a managed database, then set the frontend `VITE_API_URL` environment variable to the backend base URL (for example, `https://your-api.example.com/api`).
- Do not use a temporary/local database for real customer leads without backups. Free tiers may sleep, expire, or have quotas.

## Frontend API setting

Create `frontend/.env` if your API is not at `http://localhost:5000/api`:

```env
VITE_API_URL=https://your-api-domain.example.com/api
```

Restart Vite after changing environment variables.


## Personalize the team photos and branding

On the About page (`frontend/src/App.jsx`), find the two image URLs in the `About` component:
- `photo-1500648767791-00dcc994a43e` is the placeholder for the Digital Solutions lead.
- `photo-1560250097-0b93528c311a` is the placeholder for the Property & Construction lead.

For best results, copy your own photos into `frontend/src/assets/` and import them at the top of `App.jsx`, then replace those placeholder image URLs with the imported image variables. Update `Your Name`, `Your Brother's Name`, phone, email, location, and social links before publishing.

The portfolio and hero images are sample stock images. Replace the sample project cards in `frontend/src/data.js` with real work before presenting them as completed projects.
