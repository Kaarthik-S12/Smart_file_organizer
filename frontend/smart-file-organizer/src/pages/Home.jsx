import { useState } from 'react'
import api from '../utils/api'
import ResultsCards from '../components/ResultsCards'
import SegregationPanel from '../components/SegregationPanel'
import { FolderSearch, Sparkles, Shuffle, ChevronRight, CheckCircle2, FolderOpen, Image, FileText, Video, Archive, File } from 'lucide-react'


function Step({ n, label, active, done }) {
    return (
        <div className={`flex items-center gap-2 text-xs font-semibold transition-all ${done ? 'text-emerald-500' : active ? 'text-indigo-600' : 'text-slate-400'}`}>
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold transition-all
        ${done ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-200'
                    : active ? 'text-white shadow-lg shadow-indigo-200' : 'bg-slate-200 text-slate-400'}`}
                style={active ? { background: 'linear-gradient(135deg, #6366f1, #a855f7)' } : {}}>
                {done ? <CheckCircle2 className="w-3.5 h-3.5" /> : n}
            </div>
            <span className="hidden sm:inline">{label}</span>
        </div>
    )
}

/* ── Animated empty state ── */
function EmptyState({ loading }) {
    const floatingFiles = [
        { icon: Image, color: '#3b82f6', label: 'photo.jpg', delay: '0s', x: '-60px', y: '-80px' },
        { icon: FileText, color: '#f59e0b', label: 'report.pdf', delay: '0.4s', x: '60px', y: '-70px' },
        { icon: Video, color: '#ef4444', label: 'video.mp4', delay: '0.8s', x: '-80px', y: '20px' },
        { icon: Archive, color: '#10b981', label: 'backup.zip', delay: '1.2s', x: '75px', y: '30px' },
        { icon: File, color: '#8b5cf6', label: 'data.xlsx', delay: '1.6s', x: '0px', y: '80px' },
    ]

    return (
        <div className="flex flex-col items-center justify-center py-16 px-6 select-none">
            {/* Animated illustration */}
            <div className="relative w-56 h-56 mb-8">
                {/* Pulsing rings */}
                <div className="absolute inset-0 rounded-full animate-ping opacity-10"
                    style={{ background: 'linear-gradient(135deg, #6366f1, #a855f7)', animationDuration: '2.5s' }} />
                <div className="absolute inset-4 rounded-full animate-ping opacity-10"
                    style={{ background: 'linear-gradient(135deg, #6366f1, #a855f7)', animationDuration: '2.5s', animationDelay: '0.4s' }} />

                {/* Center folder */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 rounded-3xl flex items-center justify-center"
                        style={{
                            background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                            boxShadow: '0 12px 40px rgba(99,102,241,0.45)',
                            animation: 'floatCenter 3s ease-in-out infinite',
                        }}>
                        <FolderOpen className="w-9 h-9 text-white" />
                    </div>
                </div>

                {/* Orbiting file chips */}
                {floatingFiles.map(({ icon: Icon, color, label, delay, x, y }) => (
                    <div key={label}
                        className="absolute top-1/2 left-1/2 flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold text-white whitespace-nowrap"
                        style={{
                            background: `${color}dd`,
                            boxShadow: `0 4px 15px ${color}55`,
                            transform: `translate(calc(-50% + ${x}), calc(-50% + ${y}))`,
                            animation: `floatChip 3s ease-in-out infinite`,
                            animationDelay: delay,
                        }}>
                        <Icon style={{ width: 12, height: 12 }} />
                        {label}
                    </div>
                ))}
            </div>

            {/* Text */}
            <div className="text-center space-y-2 max-w-sm">
                <h3 className="text-lg font-bold text-slate-700">
                    {loading ? 'Analyzing your files...' : 'Ready to organize your files?'}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                    {loading
                        ? 'Our AI is classifying your files into categories. This will only take a moment.'
                        : 'Enter a folder path above and click Scan & Analyze. The AI will classify every file and show you a breakdown by category.'}
                </p>
            </div>

            {/* Animated dots when loading */}
            {loading && (
                <div className="flex items-center gap-2 mt-5">
                    {[0, 1, 2].map(i => (
                        <div key={i} className="w-2 h-2 rounded-full"
                            style={{
                                background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                                animation: 'bounceDot 1.2s ease-in-out infinite',
                                animationDelay: `${i * 0.2}s`,
                            }} />
                    ))}
                </div>
            )}

            {/* Feature hints */}
            {!loading && (
                <div className="mt-8 grid grid-cols-3 gap-3 w-full max-w-sm">
                    {[
                        { icon: Image, label: 'Images', color: '#3b82f6' },
                        { icon: FileText, label: 'Documents', color: '#f59e0b' },
                        { icon: Video, label: 'Videos', color: '#ef4444' },
                    ].map(({ icon: Icon, label, color }) => (
                        <div key={label} className="flex flex-col items-center gap-1.5 p-3 rounded-2xl"
                            style={{ background: `${color}10`, border: `1px solid ${color}20` }}>
                            <Icon style={{ width: 18, height: 18, color }} />
                            <span className="text-xs font-medium" style={{ color }}>{label}</span>
                        </div>
                    ))}
                </div>
            )}

            {/* Keyframe styles injected inline */}
            <style>{`
        @keyframes floatCenter {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-10px); }
        }
        @keyframes floatChip {
          0%, 100% { transform: translate(calc(-50% + var(--fx, 0px)), calc(-50% + var(--fy, 0px))) translateY(0px); }
          50%       { transform: translate(calc(-50% + var(--fx, 0px)), calc(-50% + var(--fy, 0px))) translateY(-6px); }
        }
        @keyframes bounceDot {
          0%, 80%, 100% { transform: scale(0.8); opacity: 0.4; }
          40%            { transform: scale(1.3); opacity: 1; }
        }
      `}</style>
        </div>
    )
}

/* ── Main page ── */
export default function Home() {
    const [scanPath, setScanPath] = useState('')
    const [analysisResult, setAnalysisResult] = useState(null)
    const [scanError, setScanError] = useState('')
    const [loading, setLoading] = useState(false)
    const [showSegregation, setShowSegregation] = useState(false)

    const step = analysisResult ? (showSegregation ? 3 : 2) : 1

    const handleScan = async () => {
        if (!scanPath.trim()) { setScanError('Please enter a folder path.'); return }
        setScanError(''); setLoading(true); setAnalysisResult(null); setShowSegregation(false)
        try {
            const { data } = await api.post('/files/scan', { scanPath: scanPath.trim() })
            setAnalysisResult(data.result ?? data)
        } catch (err) {
            setScanError(err?.response?.data || 'Scan failed. Check the path and ensure the backend is running.')
        } finally { setLoading(false) }
    }

    const handleDone = () => { setShowSegregation(false); setAnalysisResult(null); setScanPath('') }

    return (
        <div className="max-w-5xl mx-auto page-enter space-y-6">

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">File Organizer</h1>
                    <p className="text-slate-500 text-sm mt-0.5">Scan, classify, and segregate your files with AI.</p>
                </div>
                <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl"
                    style={{ background: 'rgba(255,255,255,0.8)', border: '1px solid rgba(99,102,241,0.12)', backdropFilter: 'blur(10px)' }}>
                    <Step n="1" label="Scan" active={step === 1} done={step > 1} />
                    <ChevronRight className="w-3 h-3 text-slate-300" />
                    <Step n="2" label="Results" active={step === 2} done={step > 2} />
                    <ChevronRight className="w-3 h-3 text-slate-300" />
                    <Step n="3" label="Segregate" active={step === 3} done={false} />
                </div>
            </div>

            {/* Scan card */}
            <div style={{
                borderRadius: 24, overflow: 'hidden',
                background: 'rgba(255,255,255,0.88)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.95)',
                boxShadow: '0 8px 32px rgba(99,102,241,0.1)',
            }}>
                {/* Top accent bar */}
                <div style={{ height: 4, background: 'linear-gradient(90deg, #6366f1, #8b5cf6, #a855f7)' }} />

                <div style={{ padding: '28px 32px 32px' }}>
                    {/* Card header */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24 }}>
                        <div style={{
                            width: 46, height: 46, borderRadius: 14, flexShrink: 0,
                            background: 'linear-gradient(135deg, rgba(99,102,241,0.12), rgba(168,85,247,0.08))',
                            border: '1px solid rgba(99,102,241,0.18)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                            <FolderSearch style={{ width: 20, height: 20, color: '#6366f1' }} />
                        </div>
                        <div>
                            <p style={{ fontWeight: 700, color: '#1e293b', fontSize: 15, margin: 0 }}>Scan &amp; Analyze Folder</p>
                            <p style={{ color: '#94a3b8', fontSize: 13, margin: '2px 0 0' }}>Enter a folder path to classify its contents using AI</p>
                        </div>
                    </div>

                    {/* Input — full width of card */}
                    <div style={{ position: 'relative', width: '100%', marginBottom: 20 }}>
                        <FolderSearch style={{
                            position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)',
                            width: 16, height: 16, color: '#94a3b8', pointerEvents: 'none',
                        }} />
                        <input
                            type="text"
                            value={scanPath}
                            onChange={(e) => { setScanPath(e.target.value); setScanError('') }}
                            onKeyDown={(e) => e.key === 'Enter' && handleScan()}
                            placeholder="e.g. D:/MyFiles or C:/Users/you/Downloads"
                            style={{
                                display: 'block',
                                width: '100%',
                                boxSizing: 'border-box',
                                height: 50,
                                paddingLeft: 46,
                                paddingRight: 16,
                                fontSize: 14,
                                color: '#0f172a',
                                background: 'rgba(248,250,252,0.9)',
                                border: '1.5px solid #e2e8f0',
                                borderRadius: 14,
                                outline: 'none',
                                transition: 'all 0.2s ease',
                                fontFamily: 'inherit',
                            }}
                            onFocus={e => { e.target.style.borderColor = '#6366f1'; e.target.style.boxShadow = '0 0 0 3px rgba(99,102,241,0.12)'; e.target.style.background = '#fff' }}
                            onBlur={e => { e.target.style.borderColor = '#e2e8f0'; e.target.style.boxShadow = 'none'; e.target.style.background = 'rgba(248,250,252,0.9)' }}
                        />
                    </div>

                    {/* Button — centered, natural width */}
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <button
                            onClick={handleScan}
                            disabled={loading}
                            style={{
                                padding: '12px 40px',
                                borderRadius: 14,
                                border: 'none',
                                cursor: loading ? 'not-allowed' : 'pointer',
                                opacity: loading ? 0.72 : 1,
                                background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 55%, #a855f7 100%)',
                                boxShadow: '0 6px 22px rgba(99,102,241,0.42)',
                                color: 'white',
                                fontWeight: 700,
                                fontSize: 14,
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: 8,
                                transition: 'all 0.2s ease',
                                letterSpacing: '0.01em',
                                whiteSpace: 'nowrap',
                                fontFamily: 'inherit',
                            }}
                            onMouseEnter={e => { if (!loading) { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 30px rgba(99,102,241,0.52)' } }}
                            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 6px 22px rgba(99,102,241,0.42)' }}
                        >
                            {loading ? (
                                <>
                                    <svg className="animate-spin" style={{ width: 16, height: 16 }} viewBox="0 0 24 24" fill="none">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                                    </svg>
                                    Analyzing...
                                </>
                            ) : (
                                <>
                                    <Sparkles style={{ width: 16, height: 16 }} />
                                    Scan &amp; Analyze with AI
                                </>
                            )}
                        </button>
                    </div>

                    {scanError && (
                        <div style={{
                            marginTop: 16, display: 'flex', alignItems: 'center', gap: 10,
                            padding: '12px 16px', borderRadius: 14, fontSize: 13,
                            background: 'rgba(239,68,68,0.07)', border: '1px solid rgba(239,68,68,0.18)', color: '#dc2626',
                        }}>
                            <div style={{
                                width: 20, height: 20, borderRadius: '50%', background: '#fee2e2',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                            }}>
                                <span style={{ color: '#ef4444', fontSize: 10, fontWeight: 700 }}>!</span>
                            </div>
                            {scanError}
                        </div>
                    )}
                </div>
            </div>


            {/* Empty state — shown only when no results yet */}
            {!analysisResult && (
                <div className="rounded-3xl overflow-hidden shadow-xl"
                    style={{ background: 'rgba(255,255,255,0.75)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.9)' }}>
                    <EmptyState loading={loading} />
                </div>
            )}

            {/* Results */}
            {analysisResult && (
                <div className="space-y-5">
                    <ResultsCards result={analysisResult} />
                    {!showSegregation && (
                        <div className="flex justify-center py-2">
                            <button onClick={() => setShowSegregation(true)}
                                className="flex items-center gap-2.5 text-white font-semibold px-8 py-3.5 rounded-2xl text-sm transition-all hover:-translate-y-0.5"
                                style={{ background: 'linear-gradient(135deg, #7c3aed, #6366f1)', boxShadow: '0 8px 25px rgba(124,58,237,0.4)' }}>
                                <Shuffle className="w-4 h-4" />
                                Segregate Files
                            </button>
                        </div>
                    )}
                </div>
            )}

            {/* Segregation */}
            {showSegregation && analysisResult && (
                <SegregationPanel result={analysisResult} scanPath={scanPath} onDone={handleDone} />
            )}
        </div>
    )
}
