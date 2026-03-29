import { useState, useEffect } from 'react'
import api from '../utils/api'
import { FolderPlus, Trash2, Loader, FolderOpen, AlertCircle } from 'lucide-react'

export default function Settings() {
    const [paths, setPaths] = useState([])
    const [input, setInput] = useState('')
    const [error, setError] = useState('')
    const [adding, setAdding] = useState(false)
    const [deletingId, setDeletingId] = useState(null)
    const [fetchError, setFetchError] = useState('')

    const loadPaths = async () => {
        try {
            const { data } = await api.get('/settings/list')
            setPaths(data)
        } catch {
            setFetchError('Failed to load paths.')
        }
    }

    useEffect(() => { loadPaths() }, [])

    const handleAdd = async () => {
        const trimmed = input.trim()
        if (!trimmed) return
        if (paths.find((p) => p.path === trimmed)) { setError('Path already exists.'); return }
        setAdding(true)
        setError('')
        try {
            const { data } = await api.post(`/settings/add?paths=${encodeURIComponent(trimmed)}`)
            setPaths(data)
            setInput('')
        } catch (err) {
            setError(err?.response?.data || 'Failed to add path.')
        } finally {
            setAdding(false)
        }
    }

    const handleDelete = async (id) => {
        setDeletingId(id)
        try {
            await api.delete('/settings/delete')
            await loadPaths()
        } catch {
            await loadPaths()
        } finally {
            setDeletingId(null)
        }
    }

    return (
        <div className="max-w-2xl mx-auto space-y-6 page-enter">
            <div>
                <h1 className="text-xl font-bold text-slate-900">Settings</h1>
                <p className="text-slate-500 text-sm mt-0.5">Manage allowed destination paths for file segregation.</p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-100">
                    <p className="text-sm font-semibold text-slate-800">Allowed Paths</p>
                    <p className="text-xs text-slate-400 mt-0.5">Only these paths can be used as segregation destinations.</p>
                </div>

                <div className="p-6 space-y-4">
                   
                    <div className="flex gap-2">
                        <div className="relative flex-1">
                            <FolderOpen className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                            <input
                                type="text" value={input}
                                onChange={(e) => { setInput(e.target.value); setError('') }}
                                onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
                                placeholder="e.g. D:/Images or C:/Users/you/Docs"
                                className="w-full border border-slate-200 bg-slate-50 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:bg-white transition-all"
                            />
                        </div>
                        <button
                            onClick={handleAdd} disabled={adding || !input.trim()}
                            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 shadow-sm whitespace-nowrap"
                        >
                            {adding ? <Loader className="w-4 h-4 animate-spin" /> : <FolderPlus className="w-4 h-4" />}
                            Add Path
                        </button>
                    </div>

                    {error && (
                        <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 border border-red-200 px-3.5 py-2.5 rounded-xl">
                            <AlertCircle className="w-4 h-4 shrink-0" /> {error}
                        </div>
                    )}
                    {fetchError && (
                        <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 border border-red-200 px-3.5 py-2.5 rounded-xl">
                            <AlertCircle className="w-4 h-4 shrink-0" /> {fetchError}
                        </div>
                    )}

                    {paths.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-12 text-center">
                            <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center mb-3">
                                <FolderOpen className="w-6 h-6 text-slate-400" />
                            </div>
                            <p className="text-sm font-medium text-slate-600">No paths added yet</p>
                            <p className="text-xs text-slate-400 mt-1">Add a path above to get started.</p>
                        </div>
                    ) : (
                        <ul className="space-y-2">
                            {paths.map((p, i) => (
                                <li
                                    key={p.id}
                                    className="group flex items-center justify-between bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl px-4 py-3 transition-colors duration-150"
                                >
                                    <div className="flex items-center gap-3 min-w-0">
                                        <span className="text-xs font-bold text-slate-400 w-5 shrink-0">{String(i + 1).padStart(2, '0')}</span>
                                        <span className="text-sm text-slate-700 font-mono truncate">{p.path}</span>
                                    </div>
                                    <button
                                        onClick={() => handleDelete(p.id)}
                                        disabled={deletingId === p.id}
                                        className="ml-3 p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all duration-150 disabled:opacity-50 shrink-0 opacity-0 group-hover:opacity-100"
                                        title="Remove path"
                                    >
                                        {deletingId === p.id
                                            ? <Loader className="w-3.5 h-3.5 animate-spin" />
                                            : <Trash2 className="w-3.5 h-3.5" />}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    )
}
