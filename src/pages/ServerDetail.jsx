import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Layout from '../components/Layout'
import '../styles/ServerDetail.css'
import { 
  Play,
  Square,
  RefreshCw,
  Terminal,
  FolderOpen,
  Settings,
  Cpu,
  MemoryStick,
  HardDrive,
  Globe,
  Activity,
  Clock,
  Copy,
  ChevronLeft,
  Zap,
  Database,
  Shield,
  Wifi,
  AlertCircle,
  Power,
  Save,
  Upload,
  Download,
  File,
  Folder,
  MoreVertical,
  Edit3,
  Trash2
} from 'lucide-react'

export default function ServerDetail() {
  const { id } = useParams()
  const [activeTab, setActiveTab] = useState('console')
  const [command, setCommand] = useState('')
  const [consoleOutput, setConsoleOutput] = useState([
    { type: 'info', message: '[SERVER-WOLF] Starting server...', time: '10:30:15' },
    { type: 'success', message: '[INFO] Node.js v20.10.0 detected', time: '10:30:16' },
    { type: 'info', message: '[INFO] Installing dependencies...', time: '10:30:17' },
    { type: 'success', message: '[SUCCESS] Dependencies installed', time: '10:30:25' },
    { type: 'info', message: '[INFO] Starting bot application...', time: '10:30:26' },
    { type: 'success', message: '[SUCCESS] Bot is online and running!', time: '10:30:28' },
  ])

  // Mock server data
  const server = {
    id: id,
    name: 'Discord Music Bot',
    status: 'online',
    cpu: '12%',
    ram: '256MB / 1GB',
    disk: '2.3GB / 10GB',
    uptime: '3 days 4 hours',
    node: 'Node-01 (US East)',
    ip: '192.168.1.101',
    port: '25565',
    type: 'Discord Bot',
    version: 'Node.js 20',
    lastBackup: '2 hours ago',
    sftp: {
      host: 'sftp.server-wolf.com',
      port: '2022',
      username: 'user_server1'
    }
  }

  const tabs = [
    { id: 'console', label: 'Console', icon: Terminal },
    { id: 'files', label: 'File Manager', icon: FolderOpen },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'backups', label: 'Backups', icon: Database },
    { id: 'network', label: 'Network', icon: Globe },
  ]

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
  }

  const sendCommand = (e) => {
    e.preventDefault()
    if (command.trim()) {
      setConsoleOutput([...consoleOutput, { 
        type: 'command', 
        message: `> ${command}`, 
        time: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })
      }])
      setCommand('')
    }
  }

  return (
    <Layout pageTitle={`Server: ${server.name}`}>
      <div className="server-detail">
        {/* Back Navigation */}
        <div className="back-nav">
          <Link to="/servers" className="back-link">
            <ChevronLeft size={18} />
            Back to Servers
          </Link>
        </div>

        {/* Server Header */}
        <div className="server-header">
          <div className="server-title-section">
            <div className={`server-status-large ${server.status}`}>
              <span className="status-dot"></span>
              <span>{server.status}</span>
            </div>
            <h1>{server.name}</h1>
            <div className="server-tags">
              <span className="tag">{server.type}</span>
              <span className="tag">{server.version}</span>
            </div>
          </div>
          <div className="server-actions-large">
            {server.status === 'online' ? (
              <>
                <button className="action-btn" title="Restart">
                  <RefreshCw size={18} />
                  <span>Restart</span>
                </button>
                <button className="action-btn danger" title="Stop">
                  <Square size={18} />
                  <span>Stop</span>
                </button>
              </>
            ) : (
              <button className="action-btn success" title="Start">
                <Play size={18} />
                <span>Start</span>
              </button>
            )}
            <button className="action-btn" title="Force Stop">
              <Power size={18} />
              <span>Kill</span>
            </button>
          </div>
        </div>

        {/* Resource Stats */}
        <div className="resource-stats">
          <div className="resource-stat-card">
            <Cpu size={18} />
            <div className="resource-info">
              <span className="resource-value">{server.cpu}</span>
              <span className="resource-label">CPU Usage</span>
            </div>
            <div className="resource-bar-wrapper">
              <div className="resource-bar" style={{ width: server.cpu }}></div>
            </div>
          </div>
          <div className="resource-stat-card">
            <MemoryStick size={18} />
            <div className="resource-info">
              <span className="resource-value">{server.ram}</span>
              <span className="resource-label">Memory</span>
            </div>
            <div className="resource-bar-wrapper">
              <div className="resource-bar" style={{ width: '25%' }}></div>
            </div>
          </div>
          <div className="resource-stat-card">
            <HardDrive size={18} />
            <div className="resource-info">
              <span className="resource-value">{server.disk}</span>
              <span className="resource-label">Storage</span>
            </div>
            <div className="resource-bar-wrapper">
              <div className="resource-bar" style={{ width: '23%' }}></div>
            </div>
          </div>
          <div className="resource-stat-card">
            <Clock size={18} />
            <div className="resource-info">
              <span className="resource-value">{server.uptime}</span>
              <span className="resource-label">Uptime</span>
            </div>
          </div>
        </div>

        {/* Server Info Bar */}
        <div className="server-info-bar">
          <div className="info-item">
            <Globe size={14} />
            <span>{server.node}</span>
          </div>
          <div className="info-item">
            <Wifi size={14} />
            <span>{server.ip}:{server.port}</span>
            <button onClick={() => copyToClipboard(`${server.ip}:${server.port}`)} className="copy-btn">
              <Copy size={12} />
            </button>
          </div>
          <div className="info-item">
            <Database size={14} />
            <span>Last Backup: {server.lastBackup}</span>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="server-tabs">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <Icon size={16} />
                <span>{tab.label}</span>
              </button>
            )
          })}
        </div>

        {/* Tab Content */}
        <div className="tab-content">
          {/* Console Tab */}
          {activeTab === 'console' && (
            <div className="console-tab">
              <div className="console-output">
                {consoleOutput.map((line, index) => (
                  <div key={index} className={`console-line ${line.type}`}>
                    <span className="console-time">[{line.time}]</span>
                    <span className="console-message">{line.message}</span>
                  </div>
                ))}
              </div>
              <form onSubmit={sendCommand} className="console-input-form">
                <span className="console-prompt">$</span>
                <input
                  type="text"
                  value={command}
                  onChange={(e) => setCommand(e.target.value)}
                  placeholder="Type a command..."
                  className="console-input"
                />
                <button type="submit" className="send-btn">
                  Send
                </button>
              </form>
            </div>
          )}

          {/* File Manager Tab */}
          {activeTab === 'files' && (
            <div className="files-tab">
              <div className="files-toolbar">
                <div className="files-actions">
                  <button className="file-action-btn">
                    <Upload size={16} />
                    Upload
                  </button>
                  <button className="file-action-btn">
                    <Folder size={16} />
                    New Folder
                  </button>
                  <button className="file-action-btn">
                    <Download size={16} />
                    Download
                  </button>
                  <button className="file-action-btn danger">
                    <Trash2 size={16} />
                    Delete
                  </button>
                </div>
                <div className="file-path">
                  <Folder size={14} />
                  <span>/home/container/</span>
                </div>
              </div>
              <div className="files-list">
                <div className="file-item">
                  <Folder size={16} />
                  <span>node_modules</span>
                  <span className="file-size">-</span>
                </div>
                <div className="file-item">
                  <File size={16} />
                  <span>index.js</span>
                  <span className="file-size">2.4 KB</span>
                </div>
                <div className="file-item">
                  <File size={16} />
                  <span>package.json</span>
                  <span className="file-size">856 B</span>
                </div>
                <div className="file-item">
                  <File size={16} />
                  <span>config.json</span>
                  <span className="file-size">432 B</span>
                </div>
                <div className="file-item">
                  <Folder size={16} />
                  <span>src</span>
                  <span className="file-size">-</span>
                </div>
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="settings-tab">
              <div className="settings-section">
                <h3>General Settings</h3>
                <div className="setting-item">
                  <label>Server Name</label>
                  <input type="text" value={server.name} className="setting-input" />
                </div>
                <div className="setting-item">
                  <label>Startup Command</label>
                  <input type="text" value="node index.js" className="setting-input" />
                </div>
                <div className="setting-item">
                  <label>Docker Image</label>
                  <select className="setting-select">
                    <option>Node.js 20</option>
                    <option>Node.js 18</option>
                    <option>Python 3.11</option>
                    <option>Java 17</option>
                  </select>
                </div>
              </div>
              <div className="settings-section">
                <h3>Resource Limits</h3>
                <div className="setting-item">
                  <label>CPU Limit (%)</label>
                  <input type="number" value="100" className="setting-input" />
                </div>
                <div className="setting-item">
                  <label>Memory Limit (MB)</label>
                  <input type="number" value="1024" className="setting-input" />
                </div>
                <div className="setting-item">
                  <label>Disk Limit (MB)</label>
                  <input type="number" value="10240" className="setting-input" />
                </div>
              </div>
              <div className="settings-section">
                <h3>SFTP Details</h3>
                <div className="setting-item">
                  <label>Host</label>
                  <div className="copy-input">
                    <input type="text" value={server.sftp.host} readOnly />
                    <button onClick={() => copyToClipboard(server.sftp.host)}>
                      <Copy size={14} />
                    </button>
                  </div>
                </div>
                <div className="setting-item">
                  <label>Port</label>
                  <div className="copy-input">
                    <input type="text" value={server.sftp.port} readOnly />
                    <button onClick={() => copyToClipboard(server.sftp.port)}>
                      <Copy size={14} />
                    </button>
                  </div>
                </div>
                <div className="setting-item">
                  <label>Username</label>
                  <div className="copy-input">
                    <input type="text" value={server.sftp.username} readOnly />
                    <button onClick={() => copyToClipboard(server.sftp.username)}>
                      <Copy size={14} />
                    </button>
                  </div>
                </div>
              </div>
              <div className="settings-actions">
                <button className="save-settings-btn">
                  <Save size={16} />
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {/* Backups Tab */}
          {activeTab === 'backups' && (
            <div className="backups-tab">
              <div className="backups-header">
                <button className="create-backup-btn">
                  <Save size={16} />
                  Create Backup
                </button>
              </div>
              <div className="backups-list">
                <div className="backup-item">
                  <div className="backup-info">
                    <Database size={18} />
                    <div>
                      <h4>backup-2026-04-22-10-30.zip</h4>
                      <p>Created: 2 hours ago • Size: 45.2 MB</p>
                    </div>
                  </div>
                  <div className="backup-actions">
                    <button className="backup-action" title="Restore">
                      <RefreshCw size={14} />
                    </button>
                    <button className="backup-action" title="Download">
                      <Download size={14} />
                    </button>
                    <button className="backup-action danger" title="Delete">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
                <div className="backup-item">
                  <div className="backup-info">
                    <Database size={18} />
                    <div>
                      <h4>backup-2026-04-21-15-20.zip</h4>
                      <p>Created: 1 day ago • Size: 44.8 MB</p>
                    </div>
                  </div>
                  <div className="backup-actions">
                    <button className="backup-action" title="Restore">
                      <RefreshCw size={14} />
                    </button>
                    <button className="backup-action" title="Download">
                      <Download size={14} />
                    </button>
                    <button className="backup-action danger" title="Delete">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Network Tab */}
          {activeTab === 'network' && (
            <div className="network-tab">
              <div className="network-section">
                <h3>Port Allocations</h3>
                <div className="port-list">
                  <div className="port-item">
                    <span>Primary Port</span>
                    <code>{server.port}</code>
                  </div>
                </div>
              </div>
              <div className="network-section">
                <h3>Connection Info</h3>
                <div className="info-grid">
                  <div className="info-row">
                    <span>IP Address</span>
                    <code>{server.ip}</code>
                  </div>
                  <div className="info-row">
                    <span>Node</span>
                    <code>{server.node}</code>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}