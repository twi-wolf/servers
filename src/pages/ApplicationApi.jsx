import { useState } from 'react'
import Layout from '../components/Layout'
import '../styles/ApplicationApi.css'
import {
  Key, Plus, Copy, Check, Trash2, Eye, EyeOff,
  RefreshCw, Code, Globe, Shield, Activity, Clock, X,
  Eye as ReadIcon, Edit, Edit3
} from 'lucide-react'

const PERMISSION_TYPES = [
  {
    id: 'read',
    label: 'Read Only',
    desc: 'Can only read data. Cannot create, update or delete.',
    color: '#22c55e',
    bg: 'rgba(34,197,94,0.08)',
    border: 'rgba(34,197,94,0.3)',
    perms: ['read:servers', 'read:users'],
  },
  {
    id: 'read_write',
    label: 'Read & Write',
    desc: 'Full access to read and write all resources.',
    color: '#3b82f6',
    bg: 'rgba(59,130,246,0.08)',
    border: 'rgba(59,130,246,0.3)',
    perms: ['read:servers', 'write:servers', 'read:users', 'write:users'],
  },
  {
    id: 'write',
    label: 'Write Only',
    desc: 'Can only write/modify data. Cannot read existing records.',
    color: '#ef4444',
    bg: 'rgba(239,68,68,0.08)',
    border: 'rgba(239,68,68,0.3)',
    perms: ['write:servers', 'write:users'],
  },
]

const mockKeys = [
  {
    id: 1, name: 'Production Key', key: 'sw_live_4xK9mP2nQrT8vZ3wA1bC6dE7fG5hJ0kL',
    created: 'Jan 15, 2026', lastUsed: '2 minutes ago', requests: 14820, status: 'active',
    permType: 'read_write',
    permissions: ['read:servers', 'write:servers', 'read:users'],
  },
  {
    id: 2, name: 'Staging Key', key: 'sw_live_9aB2cD3eF4gH5iJ6kL7mN8oP9qR0sT1u',
    created: 'Feb 10, 2026', lastUsed: '3 hours ago', requests: 3201, status: 'active',
    permType: 'read',
    permissions: ['read:servers'],
  },
  {
    id: 3, name: 'Dev Key (Revoked)', key: 'sw_live_xXxXxXxXxXxXxXxXxXxXxXxXxXxXxX',
    created: 'Mar 1, 2026', lastUsed: '5 days ago', requests: 890, status: 'revoked',
    permType: 'write',
    permissions: ['write:servers', 'write:users'],
  },
]

const endpoints = [
  { method: 'GET',  path: '/api/v1/servers',          desc: 'List all servers for the authenticated user' },
  { method: 'POST', path: '/api/v1/servers',          desc: 'Create a new WhatsApp bot server' },
  { method: 'GET',  path: '/api/v1/servers/:id',      desc: 'Get details of a specific server' },
  { method: 'POST', path: '/api/v1/servers/:id/start',   desc: 'Start a bot server' },
  { method: 'POST', path: '/api/v1/servers/:id/stop',    desc: 'Stop a bot server' },
  { method: 'POST', path: '/api/v1/servers/:id/restart', desc: 'Restart a bot server' },
  { method: 'GET',  path: '/api/v1/servers/:id/logs',    desc: 'Stream real-time console logs' },
  { method: 'GET',  path: '/api/v1/users',            desc: 'List all users (admin only)' },
  { method: 'POST', path: '/api/v1/users',            desc: 'Create a new user (admin only)' },
]

const methodColor = { GET: '#00ff00', POST: '#3b82f6', DELETE: '#ef4444', PATCH: '#f59e0b' }

const permTypeInfo = (id) => PERMISSION_TYPES.find(p => p.id === id)

export default function ApplicationApi() {
  const [showCreate, setShowCreate] = useState(false)
  const [newKeyName, setNewKeyName] = useState('')
  const [selectedPermType, setSelectedPermType] = useState('read_write')
  const [visibleKeys, setVisibleKeys] = useState({})
  const [copied, setCopied] = useState(null)
  const [keys, setKeys] = useState(mockKeys)

  const toggleVisible = (id) => setVisibleKeys(p => ({ ...p, [id]: !p[id] }))

  const copyKey = (key, id) => {
    navigator.clipboard.writeText(key)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  const maskKey = (key) => key.slice(0, 12) + '•'.repeat(22) + key.slice(-4)

  const handleCreate = () => {
    if (!newKeyName.trim()) return
    const pt = PERMISSION_TYPES.find(p => p.id === selectedPermType)
    const newKey = {
      id: Date.now(),
      name: newKeyName,
      key: `sw_live_${Math.random().toString(36).substring(2, 14)}${Math.random().toString(36).substring(2, 14)}`,
      created: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      lastUsed: 'Never',
      requests: 0,
      status: 'active',
      permType: selectedPermType,
      permissions: pt.perms,
    }
    setKeys(prev => [newKey, ...prev])
    setNewKeyName('')
    setSelectedPermType('read_write')
    setShowCreate(false)
  }

  const revokeKey = (id) => setKeys(prev => prev.map(k => k.id === id ? { ...k, status: 'revoked' } : k))

  const totalRequests = keys.reduce((s, k) => s + k.requests, 0)
  const activeKeys = keys.filter(k => k.status === 'active').length

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
              {keys.map(k => {
                const pt = permTypeInfo(k.permType)
                return (
                  <div key={k.id} className={`key-card ${k.status}`}>
                    <div className="key-card-header">
                      <div className="key-meta">
                        <Key size={16} />
                        <span className="key-name">{k.name}</span>
                        <span className={`key-status ${k.status}`}>{k.status}</span>
                        {pt && (
                          <span className="key-perm-type" style={{ color: pt.color, background: pt.bg, border: `1px solid ${pt.border}` }}>
                            {pt.label}
                          </span>
                        )}
                      </div>
                      <div className="key-actions">
                        {k.status === 'active' && (
                          <button className="key-btn" title="Rotate key"><RefreshCw size={15} /></button>
                        )}
                        <button className="key-btn danger" title="Revoke key" onClick={() => revokeKey(k.id)}>
                          <Trash2 size={15} />
                        </button>
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
                )
              })}
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
            <div className="modal-box api-key-modal" onClick={e => e.stopPropagation()}>
              <div className="modal-header">
                <h3>Create API Key</h3>
                <button className="modal-close" onClick={() => setShowCreate(false)}><X size={18} /></button>
              </div>

              <div className="form-group">
                <label>Key Name</label>
                <input
                  type="text"
                  placeholder="e.g. Production Key"
                  value={newKeyName}
                  onChange={e => setNewKeyName(e.target.value)}
                  autoFocus
                />
              </div>

              {/* Permission Type Selector */}
              <div className="form-group">
                <label>Permission Level</label>
                <div className="perm-type-grid">
                  {PERMISSION_TYPES.map(pt => (
                    <button
                      key={pt.id}
                      className={`perm-type-card ${selectedPermType === pt.id ? 'selected' : ''}`}
                      style={selectedPermType === pt.id ? {
                        borderColor: pt.border,
                        background: pt.bg,
                        boxShadow: `0 0 14px ${pt.bg}`,
                      } : {}}
                      onClick={() => setSelectedPermType(pt.id)}
                    >
                      <div className="perm-type-dot" style={{ background: pt.color, boxShadow: `0 0 6px ${pt.color}` }} />
                      <div className="perm-type-info">
                        <span className="perm-type-label" style={selectedPermType === pt.id ? { color: pt.color } : {}}>
                          {pt.label}
                        </span>
                        <span className="perm-type-desc">{pt.desc}</span>
                      </div>
                      {selectedPermType === pt.id && (
                        <Check size={14} style={{ color: pt.color, marginLeft: 'auto', flexShrink: 0 }} />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Preview of permissions */}
              <div className="perm-preview">
                <span className="perm-preview-label">Permissions included:</span>
                <div className="perm-preview-tags">
                  {PERMISSION_TYPES.find(p => p.id === selectedPermType)?.perms.map(p => (
                    <span key={p} className="perm-tag">{p}</span>
                  ))}
                </div>
              </div>

              <div className="modal-actions">
                <button className="modal-cancel" onClick={() => setShowCreate(false)}>Cancel</button>
                <button
                  className="modal-submit"
                  onClick={handleCreate}
                  disabled={!newKeyName.trim()}
                >
                  Generate Key
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}
