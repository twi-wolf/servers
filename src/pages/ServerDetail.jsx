import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { io } from 'socket.io-client'
import '../styles/ServerDetail.css'
import {
  Terminal, FolderOpen, Database, Calendar, Users, Archive,
  Network, Zap, Settings, Activity, ExternalLink, Play, RefreshCw,
  Square, Wifi, Clock, Cpu, MemoryStick, HardDrive, Menu, X,
  ArrowLeft, Upload, Download, File, Folder, Save, Trash2, Copy, Check
} from 'lucide-react'

const MOCK_SERVERS = {
  '1': { id: '1', name: 'WA Sales Bot', node: 'Node-01', port: '3010', cpuLimit: '∞', memLimit: '∞' },
  '2': { id: '2', name: 'WA Support Bot', node: 'Node-02', port: '3011', cpuLimit: '∞', memLimit: '∞' },
  '3': { id: '3', name: 'WA Broadcast Bot', node: 'Node-01', port: '3012', cpuLimit: '∞', memLimit: '∞' },
}

const NAV_ITEMS = [
  { id: 'console', label: 'Console', icon: Terminal },
  { id: 'files', label: 'Files', icon: FolderOpen },
  { id: 'databases', label: 'Databases', icon: Database },
  { id: 'schedules', label: 'Schedules', icon: Calendar },
  { id: 'users', label: 'Users', icon: Users },
  { id: 'backups', label: 'Backups', icon: Archive },
  { id: 'network', label: 'Network', icon: Network },
  { id: 'startup', label: 'Startup', icon: Zap },
  { id: 'settings', label: 'Settings', icon: Settings },
  { id: 'activity', label: 'Activity', icon: Activity },
]

function getLogClass(entry) {
  const msg = (entry.message || '').toLowerCase()
  if (entry.type === 'command') return 'log-cmd'
  if (entry.type === 'system') return 'log-sys'
  if (entry.type === 'error') return 'log-err'
  if (msg.includes('error') || msg.includes('err:') || msg.includes('fatal')) return 'log-err'
  if (msg.includes('warn')) return 'log-warn'
  if (msg.includes('pair') || msg.includes('qr') || msg.includes('scan') || msg.includes('pairing')) return 'log-pair'
  if (msg.includes('success') || msg.includes('connected') || msg.includes('online')) return 'log-ok'
  return 'log-default'
}

function formatUptime(startedAt) {
  if (!startedAt) return '--'
  const s = Math.floor((Date.now() - new Date(startedAt).getTime()) / 1000)
  const d = Math.floor(s / 86400), h = Math.floor((s % 86400) / 3600)
  const m = Math.floor((s % 3600) / 60), sec = s % 60
  if (d > 0) return `${d}d ${h}h ${m}m`
  if (h > 0) return `${h}h ${m}m ${sec}s`
  if (m > 0) return `${m}m ${sec}s`
  return `${sec}s`
}

export default function ServerDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('console')
  const [navOpen, setNavOpen] = useState(false)
  const [status, setStatus] = useState('stopped')
  const [logs, setLogs] = useState([])
  const [command, setCommand] = useState('')
  const [startedAt, setStartedAt] = useState(null)
  const [uptimeStr, setUptimeStr] = useState('--')
  const [copied, setCopied] = useState(false)
  const consoleRef = useRef(null)
  const socketRef = useRef(null)
  const server = MOCK_SERVERS[id] || MOCK_SERVERS['1']

  useEffect(() => {
    const socket = io('/', { path: '/socket.io', transports: ['websocket', 'polling'] })
    socketRef.current = socket
    socket.on('connect', () => socket.emit('join:server', id))
    socket.on('log:history', (h) => setLogs(h))
    socket.on('log', (e) => setLogs(p => [...p.slice(-999), e]))
    socket.on('server:status', (s) => {
      setStatus(s)
      if (s === 'online') setStartedAt(new Date().toISOString())
      if (s === 'stopped') setStartedAt(null)
    })
    return () => { socket.emit('leave:server', id); socket.disconnect() }
  }, [id])

  useEffect(() => {
    if (consoleRef.current) {
      consoleRef.current.scrollTop = consoleRef.current.scrollHeight
    }
  }, [logs])

  useEffect(() => {
    const t = setInterval(() => { if (startedAt) setUptimeStr(formatUptime(startedAt)) }, 1000)
    return () => clearInterval(t)
  }, [startedAt])

  const call = (action) => fetch(`/api/servers/${id}/${action}`, { method: 'POST' }).catch(() => {})
  const handleCommand = (e) => {
    e.preventDefault()
    if (command.trim() && socketRef.current) {
      socketRef.current.emit('command', { serverId: id, cmd: command })
      setCommand('')
    }
  }
  const copyAddr = () => {
    navigator.clipboard.writeText(`${server.node}:${server.port}`)
    setCopied(true); setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="sd-root">
      {/* Top Bar */}
      <header className="sd-topbar">
        <div className="sd-topbar-left">
          <button className="sd-back" onClick={() => navigate('/servers')}>
            <ArrowLeft size={18} />
          </button>
          <div className="sd-brand">
            <svg viewBox="0 0 24 24" fill="none" stroke="#00ff00" strokeWidth="2" width="22" height="22">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
            </svg>
            <span>SERVER-WOLF</span>
          </div>
        </div>

        <div className="sd-topbar-center">
          <span className="sd-top-server-name">{server.name}</span>
          <span className={`sd-top-status ${status}`}>
            <span className="sd-top-dot" />
            {status}
          </span>
        </div>

        <div className="sd-topbar-right">
          <button className="sd-hamburger" onClick={() => setNavOpen(o => !o)}>
            {navOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Body */}
      <div className="sd-body">
        {/* Left Nav */}
        {navOpen && <div className="sd-nav-overlay" onClick={() => setNavOpen(false)} />}
        <nav className={`sd-nav ${navOpen ? 'open' : ''}`}>
          {NAV_ITEMS.map(item => {
            const Icon = item.icon
            return (
              <button
                key={item.id}
                className={`sd-nav-btn ${activeTab === item.id ? 'active' : ''}`}
                onClick={() => { setActiveTab(item.id); setNavOpen(false) }}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </button>
            )
          })}
          <div className="sd-nav-gap" />
          <a
            href="https://github.com/WOLFTECH-254/silentwolf"
            target="_blank" rel="noopener noreferrer"
            className="sd-nav-btn external"
            title="Bot Source"
          >
            <ExternalLink size={18} />
          </a>
        </nav>

        {/* Main */}
        <main className="sd-main">
          {/* Content header with control buttons */}
          <div className="sd-ctrl-bar">
            <div className="sd-ctrl-title">
              <h2>{server.name}</h2>
            </div>
            <div className="sd-ctrl-btns">
              <button
                className="sd-ctrl-btn start"
                onClick={() => call('start')}
                disabled={status === 'online' || status === 'starting'}
              >
                <Play size={14} /> Start
              </button>
              <button className="sd-ctrl-btn restart" onClick={() => call('restart')}>
                <RefreshCw size={14} /> Restart
              </button>
              <button
                className="sd-ctrl-btn stop"
                onClick={() => call('stop')}
                disabled={status === 'stopped'}
              >
                <Square size={14} /> Stop
              </button>
            </div>
          </div>

          {/* Console */}
          {activeTab === 'console' && (
            <div className="sd-console-wrap">
              <div className="sd-console" ref={consoleRef}>
                {logs.length === 0 && (
                  <div className="sd-log-line log-sys">
                    <span className="sd-log-msg">Waiting for output... Press Start to launch the bot.</span>
                  </div>
                )}
                {logs.map((entry, i) => (
                  <div key={i} className={`sd-log-line ${getLogClass(entry)}`}>
                    <span className="sd-log-time">
                      {entry.time ? new Date(entry.time).toLocaleTimeString('en-US', { hour12: false }) : ''}
                    </span>
                    <span className="sd-log-msg">{entry.message}</span>
                  </div>
                ))}
              </div>
              <form className="sd-console-input" onSubmit={handleCommand}>
                <span className="sd-prompt">$</span>
                <input
                  type="text"
                  value={command}
                  onChange={e => setCommand(e.target.value)}
                  placeholder="Enter command..."
                  autoComplete="off"
                />
                <button type="submit">Send</button>
              </form>
            </div>
          )}

          {/* Files */}
          {activeTab === 'files' && (
            <div className="sd-files">
              <div className="sd-files-toolbar">
                <span className="sd-file-path"><Folder size={14} /> /home/container/</span>
                <div className="sd-file-actions">
                  <button className="sd-file-btn"><Upload size={14} /> Upload</button>
                  <button className="sd-file-btn"><Folder size={14} /> New Folder</button>
                  <button className="sd-file-btn danger"><Trash2 size={14} /> Delete</button>
                </div>
              </div>
              <div className="sd-file-list">
                {[
                  { name: 'node_modules', type: 'dir', size: '-' },
                  { name: 'index.js', type: 'file', size: '12.4 KB' },
                  { name: 'package.json', type: 'file', size: '2.1 KB' },
                  { name: 'wolf.js', type: 'file', size: '45.8 KB' },
                  { name: 'lib', type: 'dir', size: '-' },
                  { name: '.env', type: 'file', size: '0.5 KB' },
                ].map((f, i) => (
                  <div key={i} className="sd-file-row">
                    {f.type === 'dir' ? <Folder size={16} className="file-dir" /> : <File size={16} className="file-file" />}
                    <span className="sd-file-name">{f.name}</span>
                    <span className="sd-file-size">{f.size}</span>
                    <div className="sd-file-row-actions">
                      <button title="Download"><Download size={13} /></button>
                      <button className="danger" title="Delete"><Trash2 size={13} /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Settings */}
          {activeTab === 'settings' && (
            <div className="sd-settings">
              <div className="sd-settings-section">
                <h3>General</h3>
                <div className="sd-setting-row">
                  <label>Server Name</label>
                  <input type="text" defaultValue={server.name} className="sd-setting-input" />
                </div>
                <div className="sd-setting-row">
                  <label>Startup Command</label>
                  <input type="text" defaultValue="node --no-warnings index.js" className="sd-setting-input" />
                </div>
                <div className="sd-setting-row">
                  <label>Runtime</label>
                  <select className="sd-setting-select">
                    <option>Node.js 20</option>
                    <option>Node.js 18</option>
                    <option>Python 3.11</option>
                  </select>
                </div>
              </div>
              <div className="sd-settings-section">
                <h3>Resource Limits</h3>
                <div className="sd-setting-row">
                  <label>CPU Limit (%)</label>
                  <input type="number" defaultValue="100" className="sd-setting-input" />
                </div>
                <div className="sd-setting-row">
                  <label>Memory (MB)</label>
                  <input type="number" defaultValue="512" className="sd-setting-input" />
                </div>
                <div className="sd-setting-row">
                  <label>Disk (MB)</label>
                  <input type="number" defaultValue="5120" className="sd-setting-input" />
                </div>
              </div>
              <button className="sd-save-btn"><Save size={16} /> Save Changes</button>
            </div>
          )}

          {/* Placeholder tabs */}
          {!['console', 'files', 'settings'].includes(activeTab) && (
            <div className="sd-placeholder">
              {(() => { const item = NAV_ITEMS.find(n => n.id === activeTab); const Icon = item?.icon || Settings; return <Icon size={42} /> })()}
              <h3>{NAV_ITEMS.find(n => n.id === activeTab)?.label}</h3>
              <p>This section is coming soon</p>
            </div>
          )}
        </main>

        {/* Right Stats Panel */}
        <aside className="sd-stats">
          <div className="sd-stat-card">
            <div className="sd-stat-icon"><Wifi size={20} /></div>
            <div className="sd-stat-body">
              <div className="sd-stat-lbl">Address</div>
              <div className="sd-stat-val">
                {server.node}:{server.port}
                <button className="sd-copy-btn" onClick={copyAddr} title="Copy">
                  {copied ? <Check size={12} /> : <Copy size={12} />}
                </button>
              </div>
            </div>
          </div>
          <div className="sd-stat-card">
            <div className="sd-stat-icon"><Clock size={20} /></div>
            <div className="sd-stat-body">
              <div className="sd-stat-lbl">Uptime</div>
              <div className="sd-stat-val">{status === 'online' ? uptimeStr : '--'}</div>
            </div>
          </div>
          <div className="sd-stat-card">
            <div className="sd-stat-icon"><Cpu size={20} /></div>
            <div className="sd-stat-body">
              <div className="sd-stat-lbl">CPU Load</div>
              <div className="sd-stat-val">-- / {server.cpuLimit}</div>
            </div>
          </div>
          <div className="sd-stat-card">
            <div className="sd-stat-icon"><MemoryStick size={20} /></div>
            <div className="sd-stat-body">
              <div className="sd-stat-lbl">Memory</div>
              <div className="sd-stat-val">-- MiB / {server.memLimit}</div>
            </div>
          </div>
          <div className="sd-stat-card">
            <div className="sd-stat-icon"><HardDrive size={20} /></div>
            <div className="sd-stat-body">
              <div className="sd-stat-lbl">Disk</div>
              <div className="sd-stat-val">-- MiB / ∞</div>
            </div>
          </div>
          <div className="sd-stat-card">
            <div className="sd-stat-icon"><Activity size={20} /></div>
            <div className="sd-stat-body">
              <div className="sd-stat-lbl">Network (In)</div>
              <div className="sd-stat-val">-- GiB</div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
