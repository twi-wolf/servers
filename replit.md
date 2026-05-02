# SERVER-WOLF — WhatsApp Bot Hosting Panel

A Pterodactyl-inspired hosting panel built for WhatsApp automation bots. React + Vite frontend.

## Architecture

- **Framework**: React 19 + Vite 8
- **Routing**: React Router DOM v7
- **Auth**: Context-based (localStorage), protected routes
- **Icons**: Lucide React
- **Styling**: Plain CSS per component (no CSS framework)
- **Port**: 5000 (dev), static deployment

## Pages

| Route | Page | Auth Required |
|-------|------|---------------|
| `/` | Landing | No |
| `/login` | Login | No |
| `/register` | Register | No |
| `/dashboard` | Dashboard | Yes |
| `/servers` | Bot Servers list | Yes |
| `/servers/:id` | Server Detail | Yes |
| `/users` | Users management | Yes |
| `/api` | Application API / API Keys | Yes |
| `/settings` | Settings | Yes |

## Auth System

- `src/context/AuthContext.jsx` — provides `user`, `login()`, `register()`, `logout()`
- `src/components/ProtectedRoute.jsx` — wraps protected pages, redirects to `/login` if not authenticated
- Auth state stored in `localStorage` key `sw_user`
- Demo accounts:
  - `admin@serverwolf.io` / `admin123` (admin role)
  - `user@serverwolf.io` / `user123` (user role)

## Key Files

- `src/App.jsx` — routes, AuthProvider wrapper
- `src/components/Sidebar.jsx` — nav with real logout, shows logged-in user
- `src/components/Layout.jsx` — shell with sidebar + header
- `src/context/AuthContext.jsx` — auth logic
- `src/pages/Users.jsx` — user management table + create modal
- `src/pages/ApplicationApi.jsx` — API key management + endpoint reference

## Removed

- Billing, Wallet, Referrals pages (redirected to `/dashboard`)

## Dev

```bash
npm run dev   # starts on http://0.0.0.0:5000
npm run build # builds to dist/
```

## Deployment

Configured as static site: build = `npm run build`, publicDir = `dist`.
