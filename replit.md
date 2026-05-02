# SERVER-WOLF — WhatsApp Bot Hosting Panel

A Pterodactyl-inspired hosting panel for WhatsApp automation bots. React + Vite frontend + Node.js/Express/Socket.io backend (Wingx daemon).

## Architecture

- **Frontend**: React 19 + Vite 8 on port 5000
- **Backend (Wingx)**: Node.js + Express + Socket.io on port 3001
- **Routing**: React Router DOM v7
- **Auth**: Context-based (localStorage), protected routes
- **Icons**: Lucide React
- **Styling**: Plain CSS per component (no CSS framework)
- **Real-time logs**: Socket.io streaming from bot processes to browser

## Workflows

| Workflow | Command | Port | Type |
|----------|---------|------|------|
| Start application | `npm run dev` | 5000 | webview |
| Wingx Backend | `node server/index.js` | 3001 | console |

## Pages

| Route | Page | Auth Required |
|-------|------|---------------|
| `/` | Landing | No |
| `/login` | Login | No |
| `/register` | Register | No |
| `/dashboard` | Dashboard | Yes |
| `/servers` | Servers list (live API) | Yes |
| `/servers/:id` | ServerDetail (Pterodactyl-style) | Yes |
| `/users` | User management | Yes |
| `/api` | Application API keys | Yes |
| `/settings` | Settings | Yes |

## Demo Credentials

- **Admin**: admin@serverwolf.io / admin123
- **User**: user@serverwolf.io / user123

## Backend (Wingx Daemon) — server/

### Files
- `server/index.js` — Express + Socket.io daemon
- `server/package.json` — backend deps (express, socket.io, cors)
- `server/bots/1/` — silentwolf WhatsApp bot (WOLFTECH-254/silentwolf)

### API Endpoints
- `GET /api/servers` — list all servers with live status
- `GET /api/servers/:id` — server detail + recent logs
- `POST /api/servers/:id/start` — start bot process
- `POST /api/servers/:id/stop` — stop bot process
- `POST /api/servers/:id/restart` — restart bot
- `POST /api/servers/:id/command` — send command to bot stdin

### Socket.io Events
- `join:server` (client→server) — subscribe to server logs
- `leave:server` (client→server) — unsubscribe
- `log:history` (server→client) — buffered logs on join
- `log` (server→client) — real-time log entry
- `server:status` (server→client) — status change events
- `command` (client→server) — send command to bot stdin

## Bot Deployment

The silentwolf WhatsApp bot (github.com/WOLFTECH-254/silentwolf) is deployed to `server/bots/1/`. It auto-starts when the Wingx Backend workflow launches. The bot requests WhatsApp pairing via pairing code (option 1).

## Key Components

- `src/pages/ServerDetail.jsx` — Pterodactyl-style full-screen layout (own topbar, left nav, console, right stats)
- `src/styles/ServerDetail.css` — ServerDetail standalone styles (dark theme, no Layout wrapper)
- `src/components/Layout.jsx` — shared layout with mobile sidebar support
- `src/components/Sidebar.jsx` — collapsible sidebar with mobile hamburger
- `src/components/Header.jsx` — top header with mobile hamburger button
- `src/context/AuthContext.jsx` — auth with demo users

## Mobile Support

- Sidebar slides in via hamburger button on ≤768px screens
- Dark overlay closes sidebar when tapped
- ServerDetail page has its own mobile hamburger for the left nav panel
- Servers grid collapses to 1 column on mobile
