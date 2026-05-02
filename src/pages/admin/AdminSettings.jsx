import { useState } from 'react'
import { Link } from 'react-router-dom'
import Layout from '../../components/Layout'
import '../../styles/admin/Admin.css'
import {
  Settings, Save, Check, LayoutDashboard, Code2,
  Database, MapPin, Server, Users, HardDrive, Package, Globe, Shield, Bell
} from 'lucide-react'

const adminNav = [
  { label: 'BASIC ADMINISTRATION', items: [
    { path: '/admin', icon: LayoutDashboard, label: 'Overview' },
    { path: '/admin/settings', icon: Settings, label: 'Settings' },
    { path: '/admin/api', icon: Code2, label: 'Application API' },
  ]},
  { label: 'MANAGEMENT', items: [
    { path: '/admin/databases', icon: Database, label: 'Databases' },
    { path: '/admin/locations', icon: MapPin, label: 'Locations' },
    { path: '/admin/nodes', icon: Server, label: 'Nodes' },
    { path: '/admin/servers', icon: Server, label: 'Servers' },
    { path: '/admin/users', icon: Users, label: 'Users' },
  ]},
  { label: 'SERVICE MANAGEMENT', items: [
    { path: '/admin/mounts', icon: HardDrive, label: 'Mounts' },
    { path: '/admin/nests', icon: Package, label: 'Nests' },
  ]},
]

export default function AdminSettings() {
  const [saved, setSaved] = useState(false)
  const [cfg, setCfg] = useState({
    panelName: 'SERVER-WOLF',
    panelUrl: 'https://panel.serverwolf.io',
    daemonUrl: 'https://daemon.serverwolf.io',
    daemonPort: '3001',
    registrationEnabled: true,
    requireEmailVerification: false,
    maxServersPerUser: '5',
    defaultNodeId: '1',
  })

  const save = () => { setSaved(true); setTimeout(() => setSaved(false), 2000) }

  return (
    <Layout pageTitle="Admin — Settings">
      <div className="admin-page">
        <div className="admin-layout">
          <aside className="admin-sidenav">
            {adminNav.map(group => (
              <div key={group.label} className="admin-nav-group">
                <span className="admin-nav-group-label">{group.label}</span>
                {group.items.map(item => {
                  const Icon = item.icon
                  return (
                    <Link key={item.path} to={item.path} className={`admin-nav-link ${window.location.pathname === item.path ? 'active' : ''}`}>
                      <Icon size={15} /><span>{item.label}</span>
                    </Link>
                  )
                })}
              </div>
            ))}
          </aside>

          <div className="admin-content">
            <div className="admin-content-header">
              <div>
                <h1>Settings <span className="admin-header-sub">Panel-wide configuration.</span></h1>
                <div className="admin-breadcrumb">Admin &rsaquo; Settings</div>
              </div>
              <button className="admin-create-btn" onClick={save}>
                {saved ? <Check size={15} /> : <Save size={15} />}
                {saved ? 'Saved!' : 'Save Changes'}
              </button>
            </div>

            <div className="admin-settings-grid">
              <div className="admin-settings-card">
                <div className="admin-settings-card-header"><Globe size={16} /> Panel</div>
                {[
                  { label: 'Panel Name', key: 'panelName' },
                  { label: 'Panel URL', key: 'panelUrl' },
                ].map(f => (
                  <div className="admin-form-group" key={f.key}>
                    <label>{f.label}</label>
                    <input value={cfg[f.key]} onChange={e => setCfg({ ...cfg, [f.key]: e.target.value })} />
                  </div>
                ))}
              </div>

              <div className="admin-settings-card">
                <div className="admin-settings-card-header"><Server size={16} /> Wingx Daemon</div>
                {[
                  { label: 'Daemon Domain/IP', key: 'daemonUrl' },
                  { label: 'Daemon Port', key: 'daemonPort' },
                ].map(f => (
                  <div className="admin-form-group" key={f.key}>
                    <label>{f.label}</label>
                    <input value={cfg[f.key]} onChange={e => setCfg({ ...cfg, [f.key]: e.target.value })} />
                  </div>
                ))}
                <p className="admin-hint">
                  On VPS deployment, install the Wingx daemon, point it to a subdomain (e.g. <code>daemon.yourdomain.com</code>), and set that URL here.
                </p>
              </div>

              <div className="admin-settings-card">
                <div className="admin-settings-card-header"><Shield size={16} /> Registration</div>
                <div className="admin-toggle-row">
                  <div>
                    <span className="toggle-label">Allow Registration</span>
                    <p className="toggle-desc">Let new users create accounts</p>
                  </div>
                  <label className="switch">
                    <input type="checkbox" checked={cfg.registrationEnabled}
                      onChange={e => setCfg({ ...cfg, registrationEnabled: e.target.checked })} />
                    <span className="slider" />
                  </label>
                </div>
                <div className="admin-toggle-row">
                  <div>
                    <span className="toggle-label">Email Verification</span>
                    <p className="toggle-desc">Require email verification on signup</p>
                  </div>
                  <label className="switch">
                    <input type="checkbox" checked={cfg.requireEmailVerification}
                      onChange={e => setCfg({ ...cfg, requireEmailVerification: e.target.checked })} />
                    <span className="slider" />
                  </label>
                </div>
              </div>

              <div className="admin-settings-card">
                <div className="admin-settings-card-header"><Bell size={16} /> Limits</div>
                <div className="admin-form-group">
                  <label>Max Servers per User</label>
                  <input type="number" value={cfg.maxServersPerUser}
                    onChange={e => setCfg({ ...cfg, maxServersPerUser: e.target.value })} />
                </div>
                <div className="admin-form-group">
                  <label>Default Node ID</label>
                  <input type="number" value={cfg.defaultNodeId}
                    onChange={e => setCfg({ ...cfg, defaultNodeId: e.target.value })} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
