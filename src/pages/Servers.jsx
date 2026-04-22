// import { useState } from 'react'
// import { Link } from 'react-router-dom'
// import Layout from '../components/Layout'
// import '../styles/Servers.css'
// import { 
//   Plus,
//   Search,
//   Filter,
//   Play,
//   Square,
//   RefreshCw,
//   Terminal,
//   FolderOpen,
//   MoreVertical,
//   Server,
//   Cpu,
//   MemoryStick,
//   HardDrive,
//   Globe,
//   Copy,
//   Trash2,
//   Settings
// } from 'lucide-react'

// export default function Servers() {
//   const [searchTerm, setSearchTerm] = useState('')
//   const [filterStatus, setFilterStatus] = useState('all')
//   // Removed unused selectedServer state - will add back when implementing server actions modal

//   // Mock data - will be replaced with API calls
//   const servers = [
//     { 
//       id: 1, 
//       name: 'Discord Music Bot', 
//       status: 'online', 
//       cpu: '12%', 
//       ram: '256MB / 1GB',
//       disk: '2.3GB / 10GB',
//       uptime: '3 days',
//       node: 'Node-01 (US East)',
//       ip: '192.168.1.101',
//       port: '25565',
//       type: 'Discord Bot',
//       version: 'Node.js 20',
//       lastBackup: '2 hours ago'
//     },
//     { 
//       id: 2, 
//       name: 'Moderation Bot', 
//       status: 'online', 
//       cpu: '8%', 
//       ram: '180MB / 512MB',
//       disk: '1.1GB / 5GB',
//       uptime: '7 days',
//       node: 'Node-02 (EU West)',
//       ip: '192.168.1.102',
//       port: '25566',
//       type: 'Discord Bot',
//       version: 'Python 3.11',
//       lastBackup: '1 day ago'
//     },
//     { 
//       id: 3, 
//       name: 'Telegram Bot', 
//       status: 'offline', 
//       cpu: '0%', 
//       ram: '0MB / 1GB',
//       disk: '0.8GB / 5GB',
//       uptime: 'Stopped',
//       node: 'Node-01 (US East)',
//       ip: '192.168.1.103',
//       port: '25567',
//       type: 'Telegram Bot',
//       version: 'Python 3.11',
//       lastBackup: '3 days ago'
//     },
//     { 
//       id: 4, 
//       name: 'Minecraft Bot', 
//       status: 'online', 
//       cpu: '5%', 
//       ram: '120MB / 512MB',
//       disk: '0.5GB / 5GB',
//       uptime: '12 hours',
//       node: 'Node-03 (Asia)',
//       ip: '192.168.1.104',
//       port: '25568',
//       type: 'Minecraft Bot',
//       version: 'Node.js 18',
//       lastBackup: '6 hours ago'
//     },
//   ]

//   const filteredServers = servers.filter(server => {
//     const matchesSearch = server.name.toLowerCase().includes(searchTerm.toLowerCase())
//     const matchesFilter = filterStatus === 'all' || server.status === filterStatus
//     return matchesSearch && matchesFilter
//   })

//   const stats = {
//     total: servers.length,
//     online: servers.filter(s => s.status === 'online').length,
//     offline: servers.filter(s => s.status === 'offline').length,
//     totalRam: '3.5GB / 8GB',
//     totalCpu: '25%'
//   }

//   // Copy IP to clipboard
//   const copyToClipboard = (text) => {
//     navigator.clipboard.writeText(text)
//     // You could add a toast notification here later
//   }

//   return (
//     <Layout pageTitle="Servers">
//       <div className="servers-page">
//         {/* Header Actions */}
//         <div className="servers-header">
//           <div className="header-actions">
//             <Link to="/servers/create" className="create-server-btn">
//               <Plus size={18} />
//               Create New Server
//             </Link>
//           </div>
//         </div>

//         {/* Stats Overview */}
//         <div className="servers-stats">
//           <div className="stat-item">
//             <Server size={20} />
//             <div className="stat-info">
//               <span className="stat-value">{stats.total}</span>
//               <span className="stat-label">Total Servers</span>
//             </div>
//           </div>
//           <div className="stat-item online">
//             <div className="status-dot"></div>
//             <div className="stat-info">
//               <span className="stat-value">{stats.online}</span>
//               <span className="stat-label">Online</span>
//             </div>
//           </div>
//           <div className="stat-item offline">
//             <div className="status-dot"></div>
//             <div className="stat-info">
//               <span className="stat-value">{stats.offline}</span>
//               <span className="stat-label">Offline</span>
//             </div>
//           </div>
//           <div className="stat-item">
//             <Cpu size={20} />
//             <div className="stat-info">
//               <span className="stat-value">{stats.totalCpu}</span>
//               <span className="stat-label">Total CPU</span>
//             </div>
//           </div>
//           <div className="stat-item">
//             <MemoryStick size={20} />
//             <div className="stat-info">
//               <span className="stat-value">{stats.totalRam}</span>
//               <span className="stat-label">Total RAM</span>
//             </div>
//           </div>
//         </div>

//         {/* Search and Filter Bar */}
//         <div className="servers-toolbar">
//           <div className="search-wrapper">
//             <Search size={18} />
//             <input 
//               type="text" 
//               placeholder="Search servers..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div>
//           <div className="filter-wrapper">
//             <Filter size={18} />
//             <select 
//               value={filterStatus}
//               onChange={(e) => setFilterStatus(e.target.value)}
//             >
//               <option value="all">All Servers</option>
//               <option value="online">Online</option>
//               <option value="offline">Offline</option>
//             </select>
//           </div>
//         </div>

//         {/* Servers Grid */}
//         <div className="servers-grid">
//           {filteredServers.map((server) => (
//             <div key={server.id} className="server-card">
//               {/* Card Header */}
//               <div className="server-card-header">
//                 <div className="server-title">
//                   <div className={`server-status-badge ${server.status}`}>
//                     <span className="status-dot"></span>
//                     {server.status}
//                   </div>
//                   <h3>{server.name}</h3>
//                 </div>
//                 <button className="more-options-btn">
//                   <MoreVertical size={18} />
//                 </button>
//               </div>

//               {/* Server Type & Version */}
//               <div className="server-type">
//                 <span className="type-badge">{server.type}</span>
//                 <span className="version-badge">{server.version}</span>
//               </div>

//               {/* Resource Usage */}
//               <div className="server-resources">
//                 <div className="resource-item">
//                   <Cpu size={14} />
//                   <div className="resource-bar">
//                     <div 
//                       className="resource-fill cpu" 
//                       style={{ width: server.cpu }}
//                     ></div>
//                   </div>
//                   <span>{server.cpu}</span>
//                 </div>
//                 <div className="resource-item">
//                   <MemoryStick size={14} />
//                   <div className="resource-bar">
//                     <div 
//                       className="resource-fill ram" 
//                       style={{ 
//                         width: server.ram.includes('/') ? 
//                           (parseInt(server.ram.split('/')[0].replace('MB', '')) / 
//                            parseInt(server.ram.split('/')[1].replace('MB', '').replace('GB', '')) * 100) + '%' 
//                           : '0%' 
//                       }}
//                     ></div>
//                   </div>
//                   <span>{server.ram}</span>
//                 </div>
//                 <div className="resource-item">
//                   <HardDrive size={14} />
//                   <div className="resource-bar">
//                     <div 
//                       className="resource-fill disk" 
//                       style={{ width: '23%' }}
//                     ></div>
//                   </div>
//                   <span>{server.disk}</span>
//                 </div>
//               </div>

//               {/* Server Details */}
//               <div className="server-details-compact">
//                 <div className="detail-row">
//                   <Globe size={14} />
//                   <span>{server.node}</span>
//                 </div>
//                 <div className="detail-row">
//                   <Server size={14} />
//                   <span>{server.ip}:{server.port}</span>
//                   <button 
//                     className="copy-ip-btn" 
//                     title="Copy IP"
//                     onClick={() => copyToClipboard(`${server.ip}:${server.port}`)}
//                   >
//                     <Copy size={12} />
//                   </button>
//                 </div>
//                 <div className="detail-row">
//                   <RefreshCw size={14} />
//                   <span>Uptime: {server.uptime}</span>
//                 </div>
//               </div>

//               {/* Card Actions */}
//               <div className="server-card-actions">
//                 {server.status === 'online' ? (
//                   <>
//                     <button className="card-action-btn" title="Restart">
//                       <RefreshCw size={16} />
//                       <span>Restart</span>
//                     </button>
//                     <button className="card-action-btn danger" title="Stop">
//                       <Square size={16} />
//                       <span>Stop</span>
//                     </button>
//                   </>
//                 ) : (
//                   <button className="card-action-btn success" title="Start">
//                     <Play size={16} />
//                     <span>Start</span>
//                   </button>
//                 )}
//                 <Link to={`/servers/${server.id}/terminal`} className="card-action-btn">
//                   <Terminal size={16} />
//                   <span>Terminal</span>
//                 </Link>
//                 <Link to={`/servers/${server.id}/files`} className="card-action-btn">
//                   <FolderOpen size={16} />
//                   <span>Files</span>
//                 </Link>
//               </div>

//               {/* Additional Actions */}
//               <div className="server-card-footer">
//                 <button className="footer-action" title="Settings">
//                   <Settings size={14} />
//                 </button>
//                 <button className="footer-action danger" title="Delete">
//                   <Trash2 size={14} />
//                 </button>
//                 <span className="backup-info">
//                   Last backup: {server.lastBackup}
//                 </span>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Empty State */}
//         {filteredServers.length === 0 && (
//           <div className="empty-state">
//             <Server size={48} />
//             <h3>No servers found</h3>
//             <p>Create your first server to get started!</p>
//             <Link to="/servers/create" className="create-server-btn">
//               <Plus size={18} />
//               Create Server
//             </Link>
//           </div>
//         )}
//       </div>
//     </Layout>
//   )
// }




































import { useState } from 'react'
import { Link } from 'react-router-dom'
import Layout from '../components/Layout'
import '../styles/Servers.css'
import { 
  Plus,
  Search,
  Filter,
  Play,
  Square,
  RefreshCw,
  MoreVertical,
  Server,
  Cpu,
  MemoryStick,
  HardDrive,
  Globe,
  Copy,
  Trash2,
  Settings,
  ExternalLink
} from 'lucide-react'

export default function Servers() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')

  // Mock data - will be replaced with API calls
  const servers = [
    { 
      id: 1, 
      name: 'Discord Music Bot', 
      status: 'online', 
      cpu: '12%', 
      ram: '256MB / 1GB',
      disk: '2.3GB / 10GB',
      uptime: '3 days',
      node: 'Node-01 (US East)',
      ip: '192.168.1.101',
      port: '25565',
      type: 'Discord Bot',
      version: 'Node.js 20',
      lastBackup: '2 hours ago'
    },
    { 
      id: 2, 
      name: 'Moderation Bot', 
      status: 'online', 
      cpu: '8%', 
      ram: '180MB / 512MB',
      disk: '1.1GB / 5GB',
      uptime: '7 days',
      node: 'Node-02 (EU West)',
      ip: '192.168.1.102',
      port: '25566',
      type: 'Discord Bot',
      version: 'Python 3.11',
      lastBackup: '1 day ago'
    },
    { 
      id: 3, 
      name: 'Telegram Bot', 
      status: 'offline', 
      cpu: '0%', 
      ram: '0MB / 1GB',
      disk: '0.8GB / 5GB',
      uptime: 'Stopped',
      node: 'Node-01 (US East)',
      ip: '192.168.1.103',
      port: '25567',
      type: 'Telegram Bot',
      version: 'Python 3.11',
      lastBackup: '3 days ago'
    },
    { 
      id: 4, 
      name: 'Minecraft Bot', 
      status: 'online', 
      cpu: '5%', 
      ram: '120MB / 512MB',
      disk: '0.5GB / 5GB',
      uptime: '12 hours',
      node: 'Node-03 (Asia)',
      ip: '192.168.1.104',
      port: '25568',
      type: 'Minecraft Bot',
      version: 'Node.js 18',
      lastBackup: '6 hours ago'
    },
  ]

  const filteredServers = servers.filter(server => {
    const matchesSearch = server.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === 'all' || server.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const stats = {
    total: servers.length,
    online: servers.filter(s => s.status === 'online').length,
    offline: servers.filter(s => s.status === 'offline').length,
    totalRam: '3.5GB / 8GB',
    totalCpu: '25%'
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <Layout pageTitle="Servers">
      <div className="servers-page">
        {/* Header Actions */}
        <div className="servers-header">
          <div className="header-actions">
            <Link to="/servers/create" className="create-server-btn">
              <Plus size={18} />
              Create New Server
            </Link>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="servers-stats">
          <div className="stat-item">
            <Server size={20} />
            <div className="stat-info">
              <span className="stat-value">{stats.total}</span>
              <span className="stat-label">Total Servers</span>
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
          <div className="stat-item">
            <Cpu size={20} />
            <div className="stat-info">
              <span className="stat-value">{stats.totalCpu}</span>
              <span className="stat-label">Total CPU</span>
            </div>
          </div>
          <div className="stat-item">
            <MemoryStick size={20} />
            <div className="stat-info">
              <span className="stat-value">{stats.totalRam}</span>
              <span className="stat-label">Total RAM</span>
            </div>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="servers-toolbar">
          <div className="search-wrapper">
            <Search size={18} />
            <input 
              type="text" 
              placeholder="Search servers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="filter-wrapper">
            <Filter size={18} />
            <select 
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Servers</option>
              <option value="online">Online</option>
              <option value="offline">Offline</option>
            </select>
          </div>
        </div>

        {/* Servers Grid */}
        <div className="servers-grid">
          {filteredServers.map((server) => (
            <div key={server.id} className="server-card">
              {/* Card Header */}
              <div className="server-card-header">
                <div className="server-title">
                  <div className={`server-status-badge ${server.status}`}>
                    <span className="status-dot"></span>
                    {server.status}
                  </div>
                  <h3>{server.name}</h3>
                </div>
                <button className="more-options-btn">
                  <MoreVertical size={18} />
                </button>
              </div>

              {/* Server Type & Version */}
              <div className="server-type">
                <span className="type-badge">{server.type}</span>
                <span className="version-badge">{server.version}</span>
              </div>

              {/* Resource Usage */}
              <div className="server-resources">
                <div className="resource-item">
                  <Cpu size={14} />
                  <div className="resource-bar">
                    <div 
                      className="resource-fill cpu" 
                      style={{ width: server.cpu }}
                    ></div>
                  </div>
                  <span>{server.cpu}</span>
                </div>
                <div className="resource-item">
                  <MemoryStick size={14} />
                  <div className="resource-bar">
                    <div 
                      className="resource-fill ram" 
                      style={{ 
                        width: server.ram.includes('/') ? 
                          (parseInt(server.ram.split('/')[0].replace('MB', '')) / 
                           parseInt(server.ram.split('/')[1].replace('MB', '').replace('GB', '')) * 100) + '%' 
                          : '0%' 
                      }}
                    ></div>
                  </div>
                  <span>{server.ram}</span>
                </div>
                <div className="resource-item">
                  <HardDrive size={14} />
                  <div className="resource-bar">
                    <div 
                      className="resource-fill disk" 
                      style={{ width: '23%' }}
                    ></div>
                  </div>
                  <span>{server.disk}</span>
                </div>
              </div>

              {/* Server Details */}
              <div className="server-details-compact">
                <div className="detail-row">
                  <Globe size={14} />
                  <span>{server.node}</span>
                </div>
                <div className="detail-row">
                  <Server size={14} />
                  <span>{server.ip}:{server.port}</span>
                  <button 
                    className="copy-ip-btn" 
                    title="Copy IP"
                    onClick={() => copyToClipboard(`${server.ip}:${server.port}`)}
                  >
                    <Copy size={12} />
                  </button>
                </div>
                <div className="detail-row">
                  <RefreshCw size={14} />
                  <span>Uptime: {server.uptime}</span>
                </div>
              </div>

              {/* Card Actions - Simplified */}
              <div className="server-card-actions-simple">
                {server.status === 'online' ? (
                  <>
                    <button className="card-action-icon" title="Restart">
                      <RefreshCw size={16} />
                    </button>
                    <button className="card-action-icon danger" title="Stop">
                      <Square size={16} />
                    </button>
                  </>
                ) : (
                  <button className="card-action-icon success" title="Start">
                    <Play size={16} />
                  </button>
                )}
                
                {/* Dominant Manage Server Button */}
                <Link to={`/servers/${server.id}`} className="manage-server-btn">
                  Manage Server
                  <ExternalLink size={14} />
                </Link>
              </div>

              {/* Additional Actions */}
              <div className="server-card-footer">
                <button className="footer-action" title="Settings">
                  <Settings size={14} />
                </button>
                <button className="footer-action danger" title="Delete">
                  <Trash2 size={14} />
                </button>
                <span className="backup-info">
                  Last backup: {server.lastBackup}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredServers.length === 0 && (
          <div className="empty-state">
            <Server size={48} />
            <h3>No servers found</h3>
            <p>Create your first server to get started!</p>
            <Link to="/servers/create" className="create-server-btn">
              <Plus size={18} />
              Create Server
            </Link>
          </div>
        )}
      </div>
    </Layout>
  )
}