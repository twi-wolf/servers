import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
import cors from 'cors'
import { spawn } from 'child_process'
import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express()
const httpServer = createServer(app)

const IS_PRODUCTION = process.env.NODE_ENV === 'production'
const PORT = process.env.PORT || 3001

// In production the frontend is on the same origin, so no need for wildcard CORS.
// In dev, allow everything so Vite's proxy works.
const corsOrigin = IS_PRODUCTION
  ? (process.env.CORS_ORIGIN || false)
  : '*'

const io = new Server(httpServer, {
  cors: { origin: corsOrigin || '*', methods: ['GET', 'POST'] }
})

app.use(cors({ origin: corsOrigin || '*' }))
app.use(express.json())

// ── In production, serve the built Vite frontend ────────────────────────────
if (IS_PRODUCTION) {
  const distPath = path.join(__dirname, '..', 'dist')
  if (fs.existsSync(distPath)) {
    app.use(express.static(distPath))
    console.log(`[WINGX] Serving static frontend from ${distPath}`)
  } else {
    console.warn('[WINGX] WARNING: dist/ folder not found. Run "npm run build" first.')
  }
}

// ── Bot server registry ─────────────────────────────────────────────────────
const BOT_SERVERS = {
  '1': { id: '1', name: 'WA Sales Bot',      node: 'Node-01', port: '3010', cpuLimit: '∞', memLimit: '∞', diskLimit: '∞' },
  '2': { id: '2', name: 'WA Support Bot',    node: 'Node-02', port: '3011', cpuLimit: '∞', memLimit: '∞', diskLimit: '∞' },
  '3': { id: '3', name: 'WA Broadcast Bot',  node: 'Node-01', port: '3012', cpuLimit: '∞', memLimit: '∞', diskLimit: '∞' },
}

const runtime = {}
Object.keys(BOT_SERVERS).forEach(id => {
  runtime[id] = {
    process: null,
    status: 'stopped',
    logBuffer: [],
    startedAt: null,
    stats: { cpu: '0.00%', memory: '0 MiB', disk: '0 MiB', network: '0 B' }
  }
})

// ── Helpers ─────────────────────────────────────────────────────────────────
function addLog(serverId, type, message) {
  const entry = { type, message, time: new Date().toISOString() }
  if (!runtime[serverId]) return
  runtime[serverId].logBuffer.push(entry)
  if (runtime[serverId].logBuffer.length > 2000) runtime[serverId].logBuffer.shift()
  io.to(`server:${serverId}`).emit('log', entry)
}

function updateStatus(serverId, status) {
  if (!runtime[serverId]) return
  runtime[serverId].status = status
  io.to(`server:${serverId}`).emit('server:status', status)
  io.emit('servers:status', { id: serverId, status })
}

function getUptime(serverId) {
  const rt = runtime[serverId]
  if (!rt || !rt.startedAt) return '--'
  const secs = Math.floor((Date.now() - rt.startedAt.getTime()) / 1000)
  const d = Math.floor(secs / 86400)
  const h = Math.floor((secs % 86400) / 3600)
  const m = Math.floor((secs % 3600) / 60)
  const s = secs % 60
  if (d > 0) return `${d}d ${h}h ${m}m`
  if (h > 0) return `${h}h ${m}m ${s}s`
  if (m > 0) return `${m}m ${s}s`
  return `${s}s`
}

// ── Bot process management ───────────────────────────────────────────────────
function startServer(serverId) {
  const srv = BOT_SERVERS[serverId]
  const rt = runtime[serverId]
  if (!srv || !rt) return { success: false, error: 'Server not found' }
  if (rt.process) return { success: false, error: 'Already running' }

  const botDir = path.join(__dirname, 'bots', serverId)
  if (!fs.existsSync(botDir)) {
    return { success: false, error: `Bot directory not found: ${botDir}` }
  }
  if (!fs.existsSync(path.join(botDir, 'index.js'))) {
    return { success: false, error: 'index.js not found in bot directory' }
  }

  addLog(serverId, 'system', `[SERVER-WOLF] Starting ${srv.name}...`)
  addLog(serverId, 'system', `[SERVER-WOLF] Working dir: ${botDir}`)
  updateStatus(serverId, 'starting')

  const proc = spawn('node', ['--no-warnings', '--expose-gc', '--max-old-space-size=512', 'index.js'], {
    cwd: botDir,
    env: { ...process.env, NODE_ENV: 'production' },
    stdio: ['pipe', 'pipe', 'pipe']
  })

  rt.process = proc
  rt.startedAt = new Date()

  proc.stdout.on('data', (data) => {
    data.toString().split('\n').filter(l => l.trim()).forEach(line => addLog(serverId, 'stdout', line))
    if (rt.status !== 'online') updateStatus(serverId, 'online')
  })

  proc.stderr.on('data', (data) => {
    data.toString().split('\n').filter(l => l.trim()).forEach(line => addLog(serverId, 'stderr', line))
    if (rt.status === 'starting') updateStatus(serverId, 'online')
  })

  proc.on('close', (code) => {
    rt.process = null
    rt.startedAt = null
    addLog(serverId, 'system', `[SERVER-WOLF] Process exited with code ${code ?? 'SIGTERM'}`)
    updateStatus(serverId, 'stopped')
  })

  proc.on('error', (err) => {
    rt.process = null
    rt.startedAt = null
    addLog(serverId, 'error', `[SERVER-WOLF] Process error: ${err.message}`)
    updateStatus(serverId, 'error')
  })

  return { success: true }
}

function stopServer(serverId) {
  const rt = runtime[serverId]
  if (!rt || !rt.process) return { success: false, error: 'Not running' }
  addLog(serverId, 'system', '[SERVER-WOLF] Stopping server...')
  rt.process.kill('SIGTERM')
  setTimeout(() => { if (rt.process) rt.process.kill('SIGKILL') }, 5000)
  return { success: true }
}

// ── API Routes ───────────────────────────────────────────────────────────────
app.get('/api/servers', (_req, res) => {
  const list = Object.values(BOT_SERVERS).map(srv => ({
    ...srv, status: runtime[srv.id].status, uptime: getUptime(srv.id)
  }))
  res.json(list)
})

app.get('/api/servers/:id', (req, res) => {
  const srv = BOT_SERVERS[req.params.id]
  if (!srv) return res.status(404).json({ error: 'Not found' })
  const rt = runtime[req.params.id]
  res.json({ ...srv, status: rt.status, uptime: getUptime(req.params.id), logs: rt.logBuffer.slice(-100) })
})

app.post('/api/servers/:id/start',   (req, res) => res.json(startServer(req.params.id)))
app.post('/api/servers/:id/stop',    (req, res) => res.json(stopServer(req.params.id)))
app.post('/api/servers/:id/restart', (req, res) => {
  stopServer(req.params.id)
  setTimeout(() => startServer(req.params.id), 2000)
  res.json({ success: true })
})

app.post('/api/servers/:id/command', (req, res) => {
  const rt = runtime[req.params.id]
  const { cmd } = req.body
  if (!rt || !rt.process || !rt.process.stdin) {
    return res.json({ success: false, error: 'Not running or no stdin' })
  }
  rt.process.stdin.write(cmd + '\n')
  addLog(req.params.id, 'command', `> ${cmd}`)
  res.json({ success: true })
})

// ── Socket.io ────────────────────────────────────────────────────────────────
io.on('connection', (socket) => {
  socket.on('join:server', (serverId) => {
    socket.join(`server:${serverId}`)
    const rt = runtime[serverId]
    if (rt) {
      socket.emit('log:history', rt.logBuffer)
      socket.emit('server:status', rt.status)
    }
  })

  socket.on('leave:server', (serverId) => socket.leave(`server:${serverId}`))

  socket.on('command', ({ serverId, cmd }) => {
    const rt = runtime[serverId]
    if (rt?.process?.stdin) {
      rt.process.stdin.write(cmd + '\n')
      addLog(serverId, 'command', `> ${cmd}`)
    }
  })
})

// ── SPA fallback — must be AFTER all API routes ──────────────────────────────
// In production, any non-API route returns index.html so React Router works.
if (IS_PRODUCTION) {
  const indexPath = path.join(__dirname, '..', 'dist', 'index.html')
  app.get('*', (_req, res) => {
    if (fs.existsSync(indexPath)) {
      res.sendFile(indexPath)
    } else {
      res.status(404).send('Frontend not built. Run: npm run build')
    }
  })
}

// ── Start ────────────────────────────────────────────────────────────────────
httpServer.listen(PORT, '0.0.0.0', () => {
  console.log(`[WINGX] Daemon running on port ${PORT}`)
  console.log(`[WINGX] Environment: ${IS_PRODUCTION ? 'production' : 'development'}`)
  console.log(`[WINGX] Bot servers registered: ${Object.keys(BOT_SERVERS).join(', ')}`)

  // Auto-start bot 1 only in dev (on Heroku the bot dir likely won't exist yet)
  if (!IS_PRODUCTION) {
    setTimeout(() => {
      console.log('[WINGX] Auto-starting Server 1 (WA Sales Bot)...')
      const result = startServer('1')
      console.log(result.success
        ? '[WINGX] Server 1 started successfully'
        : `[WINGX] Server 1 auto-start failed: ${result.error}`)
    }, 3000)
  }
})
