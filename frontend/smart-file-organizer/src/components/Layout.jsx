import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import { Menu } from 'lucide-react'

export default function Layout() {
    const [sidebarOpen, setSidebarOpen] = useState(false)

    return (
        <div className="flex min-h-screen bg-slate-50">
            
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-20 bg-black/40 backdrop-blur-sm lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            
            <aside
                className={`
          fixed inset-y-0 left-0 z-30 w-64 transform transition-transform duration-300 ease-in-out
          lg:static lg:translate-x-0 lg:z-auto
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
            >
                <Sidebar onClose={() => setSidebarOpen(false)} />
            </aside>

            <div className="flex-1 flex flex-col min-w-0">
            
                <header className="lg:hidden sticky top-0 z-10 bg-white border-b border-slate-200 px-4 h-14 flex items-center gap-3">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors"
                    >
                        <Menu className="w-5 h-5" />
                    </button>
                    <span className="font-semibold text-slate-800 text-sm">SmartOrganizer</span>
                </header>

                <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto page-enter">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}
