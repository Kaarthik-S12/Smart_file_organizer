import { NavLink, useNavigate } from 'react-router-dom'
import { logout, getUser } from '../utils/auth'
import { FolderOpen, LayoutDashboard, User, Settings, LogOut, X } from 'lucide-react'

const navItems = [
    { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/profile', label: 'Profile', icon: User },
    { to: '/settings', label: 'Settings', icon: Settings },
]

export default function Sidebar({ onClose }) {
    const navigate = useNavigate()
    const user = getUser()

    const handleLogout = () => {
        logout()
        navigate('/login')
    }

    return (
        <div className="h-full w-64 bg-[#0f1117] text-white flex flex-col">
           
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center">
                        <FolderOpen className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-semibold text-[15px] tracking-tight">SmartOrganizer</span>
                </div>
                <button
                    onClick={onClose}
                    className="lg:hidden p-1.5 rounded-md text-white/40 hover:text-white hover:bg-white/10 transition-colors"
                >
                    <X className="w-4 h-4" />
                </button>
            </div>

            <div className="px-4 py-3 mx-3 mt-3 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center shrink-0">
                        <span className="text-xs font-semibold text-indigo-300 uppercase">
                            {user?.email?.[0] ?? 'U'}
                        </span>
                    </div>
                    <div className="min-w-0">
                        <p className="text-xs text-white/40 leading-none mb-0.5">Signed in as</p>
                        <p className="text-xs font-medium text-white/80 truncate">{user?.email}</p>
                    </div>
                </div>
            </div>

         
            <nav className="flex-1 px-3 py-4 space-y-0.5">
                <p className="text-[10px] font-semibold text-white/30 uppercase tracking-widest px-3 mb-2">Navigation</p>
                {navItems.map(({ to, label, icon: Icon }) => (
                    <NavLink
                        key={to}
                        to={to}
                        end
                        onClick={onClose}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-medium transition-all duration-150 ${isActive
                                ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                                : 'text-white/50 hover:text-white/90 hover:bg-white/8'
                            }`
                        }
                    >
                        <Icon className="w-4 h-4 shrink-0" />
                        {label}
                    </NavLink>
                ))}
            </nav>

            <div className="px-3 pb-4 border-t border-white/10 pt-3">
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-[13px] font-medium text-white/40 hover:text-red-400 hover:bg-red-500/10 transition-all duration-150"
                >
                    <LogOut className="w-4 h-4 shrink-0" />
                    Sign Out
                </button>
            </div>
        </div>
    )
}
