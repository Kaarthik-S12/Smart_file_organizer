import { useState, useEffect } from 'react'
import api from '../utils/api'
import { CheckCircle2, AlertCircle, FolderInput, Loader, ChevronDown } from 'lucide-react'

const CATEGORIES = [
    { key: 'images', label: 'Images', color: 'text-blue-600', dot: 'bg-blue-400' },
    { key: 'documents', label: 'Documents', color: 'text-amber-600', dot: 'bg-amber-400' },
    { key: 'videos', label: 'Videos', color: 'text-rose-600', dot: 'bg-rose-400' },
    { key: 'archives', label: 'Archives', color: 'text-emerald-600', dot: 'bg-emerald-400' },
    { key: 'others', label: 'Others', color: 'text-slate-500', dot: 'bg-slate-400' },
]

export default function SegregationPanel({ result, scanPath, onDone }) {
    const [allowedPaths, setAllowedPaths] = useState([])
    const [paths, setPaths] = useState({})
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [apiError, setApiError] = useState('')

    const activeCategories = CATEGORIES.filter((c) => (result[c.key] ?? 0) > 0)

    useEffect(() => {
        api.get('/settings/list')
            .then(({ data }) => setAllowedPaths(data.map((p) => p.path)))
            .catch(() => setAllowedPaths([]))
    }, [])

    const handlePathChange = (key, value) => {
        setPaths((prev) => ({ ...prev, [key]: value }))
        setErrors((prev) => ({ ...prev, [key]: '' }))
        setSuccess(false)
        setApiError('')
    }

    const handleStartSegregation = async () => {
        const newErrors = {}
        let valid = true
        activeCategories.forEach(({ key }) => {
            const val = paths[key]?.trim() || ''
            if (val && !allowedPaths.includes(val)) {
                newErrors[key] = `"${val}" is not in your allowed paths.`
                valid = false
            }
        })
        setErrors(newErrors)
        if (!valid) return

        const destinations = {}
        activeCategories.forEach(({ key }) => {
            const val = paths[key]?.trim() || ''
            if (val) destinations[key] = val
        })

        if (Object.keys(destinations).length === 0) {
            setApiError('Please select at least one destination path.')
            return
        }

        setLoading(true)
        setApiError('')
        try {
            await api.post('/files/segregate', { scanPath, destinations })
            setSuccess(true)
            setTimeout(() => onDone?.(), 2500)
        } catch (err) {
            setApiError(err?.response?.data || 'Segregation failed. Check paths and try again.')
        } finally {
            setLoading(false)
        }
    }

    if (activeCategories.length === 0) {
        return (
            <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center text-slate-400 text-sm shadow-sm">
                No categories with files to segregate.
            </div>
        )
    }

    return (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-2.5">
                <div className="w-7 h-7 bg-violet-50 rounded-lg flex items-center justify-center">
                    <FolderInput className="w-4 h-4 text-violet-600" />
                </div>
                <div>
                    <p className="text-sm font-semibold text-slate-800">Set Destination Paths</p>
                    <p className="text-xs text-slate-400">Choose where each category should be moved</p>
                </div>
            </div>

            <div className="p-6 space-y-5">
                {allowedPaths.length === 0 && (
                    <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 text-amber-800 rounded-xl text-sm">
                        <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-amber-500" />
                        <span>No allowed paths configured. Go to <strong>Settings</strong> to add destination paths first.</span>
                    </div>
                )}

                <div className="space-y-3">
                    {activeCategories.map(({ key, label, color, dot }) => (
                        <div key={key} className="group">
                            <div className="flex items-center justify-between mb-1.5">
                                <label className={`flex items-center gap-2 text-sm font-medium ${color}`}>
                                    <span className={`w-2 h-2 rounded-full ${dot}`} />
                                    {label}
                                </label>
                                <span className="text-xs text-slate-400 bg-slate-50 border border-slate-200 px-2 py-0.5 rounded-full">
                                    {result[key]} file{result[key] !== 1 ? 's' : ''}
                                </span>
                            </div>
                            <div className="relative">
                                <select
                                    value={paths[key] || ''}
                                    onChange={(e) => handlePathChange(key, e.target.value)}
                                    className={`w-full appearance-none border rounded-xl px-4 py-2.5 pr-9 text-sm bg-slate-50 focus:bg-white focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-all cursor-pointer
                    ${errors[key] ? 'border-red-300 bg-red-50' : 'border-slate-200'}`}
                                >
                                    <option value="">— Skip this category —</option>
                                    {allowedPaths.map((p) => (
                                        <option key={p} value={p}>{p}</option>
                                    ))}
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                            </div>
                            {errors[key] && (
                                <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1.5">
                                    <AlertCircle className="w-3 h-3 shrink-0" /> {errors[key]}
                                </p>
                            )}
                        </div>
                    ))}
                </div>

                {apiError && (
                    <div className="flex items-start gap-3 p-3.5 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm">
                        <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" /> {apiError}
                    </div>
                )}

                {success && (
                    <div className="flex items-center gap-3 p-4 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl text-sm">
                        <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-500" />
                        <div>
                            <p className="font-semibold">Segregation complete!</p>
                            <p className="text-emerald-600 text-xs mt-0.5">Files have been moved to their destinations.</p>
                        </div>
                    </div>
                )}

                <button
                    onClick={handleStartSegregation}
                    disabled={loading || success || allowedPaths.length === 0}
                    className="w-full flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md text-sm"
                >
                    {loading
                        ? <><Loader className="w-4 h-4 animate-spin" /> Segregating pls wait</>
                        : 'Start Segregation'
                    }
                </button>
            </div>
        </div>
    )
}
