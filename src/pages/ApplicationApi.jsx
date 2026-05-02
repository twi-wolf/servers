import { useState } from 'react'
import Layout from '../components/Layout'
import '../styles/ApplicationApi.css'
import {
  Key,
  Plus,
  Copy,
  Check,
  Trash2,
  Eye,
  EyeOff,
  RefreshCw,
  Code,
  Globe,
  Shield,
  Activity,
  Clock,
  X
} from 'lucide-react'

const mockKeys = [
  {
    id: 1, name: 'Production Key', key: 'sw_live_4xK9mP2nQrT8vZ3wA1bC6dE7fG5hJ0kL',
    created: 'Jan 15, 2026', lastUsed: '2 minutes ago', requests: 14820, status: 'active',
    permissions: ['read:servers', 'write:servers', 'read:users']
  },
  {
    id: 2, name: 'Staging Key', key: 'sw_live_9aB2cD3eF4gH5iJ6kL7mN8oP9qR0sT1u',
    created: 'Feb 10, 2026', lastUsed: '3 hours ago', requests: 3201, status: 'active',
    permissions: ['read:servers']
  },
  {
    id: 3, name: 'Dev Key (Revoked)', key: 'sw_live_xXxXxXxXxXxXxXxXxXxXxXxXxXxXxX',
    created: 'Mar 1, 2026', lastUsed: '5 days ago', requests: 890, status: 'revoked',
    permissions: ['read:servers', 'write:servers']
  },
]

const endpoints = [
  { method: 'GET', path: '/api/v1/servers', desc: 'List all servers for the authenticated user' },
  { method: 'POST', path: '/api/v1/servers', desc: 'Create a new WhatsApp bot server' },
  { method: 'GET', path: '/api/v1/servers/:id', desc: 'Get details of a specific server' },
  { method: 'POST', path: '/api/v1/servers/:id/start', desc: 'Start a bot server' },
  { method: 'POST', path: '/api/v1/servers/:id/stop', desc: 'Stop a bot server' },
  { method: 'POST', path: '/api/v1/servers/:id/restart', desc: 'Restart a bot server' },
  { method: 'GET', path: '/api/v1/servers/:id/logs', desc: 'Stream real-time console logs' },
  { method: 'GET', path: '/api/v1/users', desc: 'List all users (admin only)' },
  { method: 'POST', path: '/api/v1/users', desc: 'Create a new user (admin only)' },
]

const methodColor = { GET: '#00ff00', POST: '#3b82f6', DELETE: '#ef4444', PATCH: '#f59e0b' }

export default function ApplicationApi() {
  const [showCreate, setShowCreate] = useState(false)
  const [newKeyName, setNewKeyName] = useState('')
  const [visibleKeys, setVisibleKeys] = useState({})
  const [copied, setCopied] = useState(null)

  const toggleVisible = (id) => setVisibleKeys(p => ({ ...p, [id]: !p[id] }))

  const copyKey = (key, id) => {
    navigator.clipboard.writeText(key)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  const maskKey = (key) => key.slice(0, 12) + '•'.repeat(24) + key.slice(-4)

  const totalRequests = mockKeys.reduce((s, k) => s + k.requests, 0)
  const activeKeys = mockKeys.filter(k => k.status === 'active').length

  return (
    <Layout pageTitle="Application API">
      <div className="api-page">

        {/* Stats */}
        <div className="api-stats">
          <div className="api-stat-card">
            <Key size={20} />
            <div>
              <span className="api-stat-val">{activeKeys}</span>
              <span className="api-stat-lbl">Active Keys</span>
            </div>
          </div>
          <div className="api-stat-card">
            <Activity size={20} />
            <div>
              <span className="api-stat-val">{totalRequests.toLocaleString()}</span>
              <span className="api-stat-lbl">Total Requests</span>
            </div>
          </div>
          <div className="api-stat-card">
            <Globe size={20} />
            <div>
              <span className="api-stat-val">{endpoints.length}</span>
              <span className="api-stat-lbl">Endpoints</span>
            </div>
          </div>
          <div className="api-stat-card">
            <Shield size={20} />
            <div>
              <span className="api-stat-val">v1</span>
              <span className="api-stat-lbl">API Version</span>
            </div>
          </div>
        </div>

        <div className="api-grid">
          {/* API Keys Section */}
          <div className="api-section">
            <div className="api-section-header">
              <div>
                <h3>API Keys</h3>
                <p className="api-section-desc">Manage keys to authenticate requests to the SERVER-WOLF API.</p>
              </div>
              <button className="btn-create-key" onClick={() => setShowCreate(true)}>
                <Plus size={16} />
                New Key
              </button>
            </div>

            <div className="keys-list">
              {mockKeys.map(k => (
                <div key={k.id} className={`key-card ${k.status}`}>
                  <div className="key-card-header">
                    <div className="key-meta">
                      <Key size={16} />
                      <span className="key-name">{k.name}</span>
                      <span className={`key-status ${k.status}`}>{k.status}</span>
                    </div>
                    <div className="key-actions">
                      {k.status === 'active' && (
                        <button className="key-btn" title="Rotate key"><RefreshCw size={15} /></button>
                      )}
                      <button className="key-btn danger" title="Revoke key"><Trash2 size={15} /></button>
                    </div>
                  </div>

                  <div className="key-value-row">
                    <code className="key-value">
                      {visibleKeys[k.id] ? k.key : maskKey(k.key)}
                    </code>
                    <button className="key-btn" onClick={() => toggleVisible(k.id)} title="Toggle visibility">
                      {visibleKeys[k.id] ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                    <button className="key-btn" onClick={() => copyKey(k.key, k.id)} title="Copy key">
                      {copied === k.id ? <Check size={15} /> : <Copy size={15} />}
                    </button>
                  </div>

                  <div className="key-footer">
                    <span className="key-info-item"><Clock size={12} /> Created {k.created}</span>
                    <span className="key-info-item"><Activity size={12} /> {k.requests.toLocaleString()} requests</span>
                    <span className="key-info-item">Last used: {k.lastUsed}</span>
                  </div>

                  <div className="key-perms">
                    {k.permissions.map(p => (
                      <span key={p} className="perm-tag">{p}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* API Reference Section */}
          <div className="api-section">
            <div className="api-section-header">
              <div>
                <h3>API Reference</h3>
                <p className="api-section-desc">Available endpoints for the SERVER-WOLF REST API.</p>
              </div>
              <div className="api-base-url">
                <Code size={14} />
                <code>https://api.serverwolf.io</code>
              </div>
            </div>

            <div className="endpoints-list">
              {endpoints.map((ep, i) => (
                <div key={i} className="endpoint-row">
                  <span className="ep-method" style={{ color: methodColor[ep.method] || '#9ca3af' }}>
                    {ep.method}
                  </span>
                  <code className="ep-path">{ep.path}</code>
                  <span className="ep-desc">{ep.desc}</span>
                </div>
              ))}
            </div>

            <div className="api-auth-note">
              <Shield size={14} />
              <span>Authenticate by passing your API key in the <code>Authorization: Bearer YOUR_KEY</code> header.</span>
            </div>
          </div>
        </div>

        {/* Create Key Modal */}
        {showCreate && (
          <div className="modal-overlay" onClick={() => setShowCreate(false)}>
            <div className="modal-box" onClick={e => e.stopPropagation()}>
              <div className="modal-header">
                <h3>Create API Key</h3>
                <button className="modal-close" onClick={() => setShowCreate(false)}><X size={18} /></button>
              </div>
              <div className="form-group">
                <label>Key Name</label>
                <input type="text" placeholder="e.g. Production Key"
                  value={newKeyName} onChange={e => setNewKeyName(e.target.value)} />
              </div>
              <div className="form-group">
                <label>Permissions</label>
                <div className="perm-checkboxes">
                  {['read:servers', 'write:servers', 'read:users', 'write:users'].map(p => (
                    <label key={p} className="perm-check">
                      <input type="checkbox" defaultChecked={p === 'read:servers'} />
                      <span>{p}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="modal-actions">
                <button className="modal-cancel" onClick={() => setShowCreate(false)}>Cancel</button>
                <button className="modal-submit" onClick={() => setShowCreate(false)}>Generate Key</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}
