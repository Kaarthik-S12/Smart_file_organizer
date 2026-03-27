import { Image, FileText, Video, Archive, File } from 'lucide-react'

const CATEGORIES = [
    {
        key: 'images', label: 'Images', icon: Image,
        bg: 'bg-blue-50', border: 'border-blue-100', icon_color: 'text-blue-500',
        num_color: 'text-blue-700', badge: 'bg-blue-100 text-blue-600',
    },
    {
        key: 'documents', label: 'Documents', icon: FileText,
        bg: 'bg-amber-50', border: 'border-amber-100', icon_color: 'text-amber-500',
        num_color: 'text-amber-700', badge: 'bg-amber-100 text-amber-600',
    },
    {
        key: 'videos', label: 'Videos', icon: Video,
        bg: 'bg-rose-50', border: 'border-rose-100', icon_color: 'text-rose-500',
        num_color: 'text-rose-700', badge: 'bg-rose-100 text-rose-600',
    },
    {
        key: 'archives', label: 'Archives', icon: Archive,
        bg: 'bg-emerald-50', border: 'border-emerald-100', icon_color: 'text-emerald-500',
        num_color: 'text-emerald-700', badge: 'bg-emerald-100 text-emerald-600',
    },
    {
        key: 'others', label: 'Others', icon: File,
        bg: 'bg-slate-50', border: 'border-slate-200', icon_color: 'text-slate-400',
        num_color: 'text-slate-600', badge: 'bg-slate-100 text-slate-500',
    },
]

export default function ResultsCards({ result }) {
    const total = CATEGORIES.reduce((s, c) => s + (result[c.key] ?? 0), 0)

    return (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                <div>
                    <p className="text-sm font-semibold text-slate-800">Analysis Results</p>
                    <p className="text-xs text-slate-400 mt-0.5">{total} file{total !== 1 ? 's' : ''} classified</p>
                </div>
                <span className="text-xs font-semibold bg-indigo-50 text-indigo-600 border border-indigo-100 px-2.5 py-1 rounded-full">
                    {total} total
                </span>
            </div>
            <div className="p-5 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                {CATEGORIES.map(({ key, label, icon: Icon, bg, border, icon_color, num_color, badge }) => {
                    const count = result[key] ?? 0
                    return (
                        <div
                            key={key}
                            className={`${bg} ${border} border rounded-xl p-4 flex flex-col items-center gap-2 transition-transform duration-150 hover:-translate-y-0.5`}
                        >
                            <div className={`w-9 h-9 rounded-lg bg-white/70 flex items-center justify-center shadow-sm`}>
                                <Icon className={`w-5 h-5 ${icon_color}`} />
                            </div>
                            <span className={`text-2xl font-extrabold ${num_color}`}>{count}</span>
                            <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${badge}`}>{label}</span>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
