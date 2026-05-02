import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Layout from '../components/Layout'
import '../styles/Servers.css'
import {
  Plus, Search, Filter, Play, Square, RefreshCw,
  Server, Cpu, MemoryStick, HardDrive, Globe,
  Copy, Trash2, Settings, ExternalLink, Loader
} from 'lucide-react'

export default function Servers() {
  const [servers, setServers] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [actionLoading, setActionLoading] = useState({})

  const fetchServers = async () => {
    try {
      const res = await fetch('/api/servers')
      if (res.ok) {
        const data = await res.json()
        setServers(data)
      }
    } catch {
      setServers([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchServers()
    const interval = setInterval(fetchServers, 5000)
    return () => clearInterval(interval)
  }, [])

  const serverAction = async (id, action) => {
    setActionLoading(p => ({ ...p, [`${id}-${action}`]: true }))
    try {
      await fetch(`/api/servers/${id}/${action}`, { method: 'POST' })
      setTimeout(fetchServers, 1000)
    } catch (e) {}
    setActionLoading(p => ({ ...p, [`${id}-${action}`]: false }))
  }

  const copyToClipboard = (text) => navigator.clipboard.writeText(text)

  const filtered = servers.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === 'all' || s.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const stats = {
    total: servers.length,
    online: servers.filter(s => s.status === 'online').length,
    offline: servers.filter(s => s.status === 'stopped' || s.status === 'error').length,
    starting: servers.filter(s => s.status === 'starting').length,
  }

  return (
    <Layout pageTitle="Servers">
      <div className="servers-page">
        {/* Header */}
        <div className="servers-header">
          <div className="header-actions">
            <Link to="/servers/create" className="create-server-btn">
              <Plus size={16} />
              New Server
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="servers-stats">
          <div className="stat-item">
            <Server size={20} />
            <div className="stat-info">
              <span className="stat-value">{stats.total}</span>
              <span className="stat-label">Total</span>
            </div>
          </div>
          <div className="stat-item online">
            <div className="status-dot"></div>
            <div className="stat-info">
              <span className="stat-value">{stats.online}</span>
              <span className="stat-label">Online</span>
            </div>
          </div>
          <div className="stat-item offline">
            <div className="status-dot"></div>
            <div className="stat-info">
              <span className="stat-value">{stats.offline}</span>
              <span className="stat-label">Offline</span>
            </div>
          </div>
          <div className="stat-item" style={{ color: '#f59e0b' }}>
            <div className="status-dot" style={{ background: '#f59e0b', boxShadow: '0 0 8px #f59e0b' }}></div>
            <div className="stat-info">
              <span className="stat-value">{stats.starting}</span>
              <span className="stat-label">Starting</span>
            </div>
          </div>
          <div className="stat-item">
            <Cpu size={20} />
            <div className="stat-info">
              <span className="stat-value">--</span>
              <span className="stat-label">CPU Avg</span>
            </div>
          </div>
        </div>

        {/* Toolbar */}
        <div className="servers-toolbar">
          <div className="search-wrapper">
            <Search size={16} />
            <input
              type="text"
              placeholder="Search servers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="filter-wrapper">
            <Filter size={16} />
            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
              <option value="all">All Status</option>
              <option value="online">Online</option>
              <option value="stopped">Stopped</option>
              <option value="starting">Starting</option>
            </select>
          </div>
          <button className="refresh-btn" onClick={fetchServers} title="Refresh">
            <RefreshCw size={16} />
          </button>
        </div>

        {/* Loading */}
        {loading && (
          <div className="servers-loading">
            <Loader size={28} className="spin" />
            <span>Connecting to Wingx daemon...</span>
          </div>
        )}

        {/* Grid */}
        {!loading && (
          <div className="servers-grid">
            {filtered.map((server) => (
              <div key={server.id} className={`server-card ${server.status}`}>
                {/* Card Header */}
                <div className="server-card-header">
                  <div className="server-title">
                    <div className={`server-status-badge ${server.status}`}>
                      <span className="status-dot"></span>
                      {server.status}
                    </div>
                    <h3>{server.name}</h3>
                  </div>
                  <span className="server-id">#{server.id}</span>
                </div>

                {/* Tags */}
                <div className="server-type">
                  <span className="type-badge">WhatsApp Bot</span>
                  <span className="version-badge">Node.js 20</span>
                </div>

                {/* Resource bars */}
                <div className="server-resources">
                  <div className="resource-item">
                    <Cpu size={12} />
                    <div className="resource-bar">
                      <div className="resource-fill cpu" style={{ width: server.status === 'online' ? '12%' : '0%' }}></div>
                    </div>
                    <span>{server.status === 'online' ? '--' : '0%'}</span>
                  </div>
                  <div className="resource-item">
                    <MemoryStick size={12} />
                    <div className="resource-bar">
                      <div className="resource-fill ram" style={{ width: server.status === 'online' ? '18%' : '0%' }}></div>
                    </div>
                    <span>-- MiB</span>
                  </div>
                  <div className="resource-item">
                    <HardDrive size={12} />
                    <div className="resource-bar">
                      <div className="resource-fill disk" style={{ width: '5%' }}></div>
                    </div>
                    <span>-- MiB</span>
                  </div>
                </div>

                {/* Details */}
                <div className="server-details-compact">
                  <div className="detail-row">
                    <Globe size={12} />
                    <span>{server.node}</span>
                  </div>
                  <div className="detail-row">
                    <Server size={12} />
                    <span>{server.node}:{server.port}</span>
                    <button className="copy-ip-btn" title="Copy" onClick={() => copyToClipboard(`${server.node}:${server.port}`)}>
                      <Copy size={10} />
                    </button>
                  </div>
                  <div className="detail-row">
                    <RefreshCw size={12} />
                    <span>Uptime: {server.uptime || '--'}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="server-card-actions-simple">
                  {server.status === 'online' || server.status === 'starting' ? (
                    <>
                      <button
                        className="card-action-icon"
                        title="Restart"
                        onClick={() => serverAction(server.id, 'restart')}
                        disabled={!!actionLoading[`${server.id}-restart`]}
                      >
                        <RefreshCw size={15} />
                      </button>
                      <button
                        className="card-action-icon danger"
                        title="Stop"
                        onClick={() => serverAction(server.id, 'stop')}
                        disabled={!!actionLoading[`${server.id}-stop`]}
                      >
                        <Square size={15} />
                      </button>
                    </>
                  ) : (
                    <button
                      className="card-action-icon success"
                      title="Start"
                      onClick={() => serverAction(server.id, 'start')}
                      disabled={!!actionLoading[`${server.id}-start`]}
                    >
                      <Play size={15} />
                    </button>
                  )}
                  <Link to={`/servers/${server.id}`} className="manage-server-btn">
                    Manage <ExternalLink size={13} />
                  </Link>
                </div>

                {/* Footer */}
                <div className="server-card-footer">
                  <button className="footer-action" title="Settings">
                    <Settings size={12} />
                  </button>
                  <button className="footer-action danger" title="Delete">
                    <Trash2 size={12} />
                  </button>
                  <span className="backup-info">Node.js 20 • Wingx</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty */}
        {!loading && filtered.length === 0 && (
          <div className="empty-state">
            <Server size={42} />
            <h3>No servers found</h3>
            <p>{servers.length === 0 ? 'Create your first server to get started.' : 'No servers match your search.'}</p>
            <Link to="/servers/create" className="create-server-btn">
              <Plus size={16} />
              Create Server
            </Link>
          </div>
        )}
      </div>
    </Layout>
  )
}
