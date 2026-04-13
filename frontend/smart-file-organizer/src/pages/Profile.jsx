import { useState, useEffect, useRef } from 'react'
import api from '../utils/api'
import { getUser } from '../utils/auth'
import {
    Camera, Save, Loader, CheckCircle2, AlertCircle,
    Mail, Briefcase, Users, UserCircle2, Pencil,
    FolderOpen, Shield, Sparkles, Star
} from 'lucide-react'

function StatChip({ label, value, color }) {
    return (
        <div style={{ flex: 1, minWidth: 0, padding: '14px 16px', borderRadius: 16, textAlign: 'center', background: `${color}0d`, border: `1px solid ${color}22` }}>
            <p style={{ fontSize: 18, fontWeight: 800, color, margin: 0, lineHeight: 1 }}>{value || '--'}</p>
            <p style={{ fontSize: 11, color: '#94a3b8', marginTop: 4, fontWeight: 500 }}>{label}</p>
        </div>
    )
}

function EmptyBanner() {
    const tips = [
        { icon: FolderOpen, color: '#6366f1', text: 'Add your name so we can personalize your experience' },
        { icon: Shield, color: '#10b981', text: 'A complete profile helps secure your account' },
        { icon: Sparkles, color: '#f59e0b', text: 'Your occupation helps us tailor file suggestions' },
    ]
    return (
        <div style={{ borderRadius: 20, background: 'linear-gradient(135deg,rgba(99,102,241,0.04),rgba(168,85,247,0.04))', border: '1.5px dashed rgba(99,102,241,0.2)', padding: '28px 24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg,#6366f1,#a855f7)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(99,102,241,0.35)' }}>
                    <Star style={{ width: 16, height: 16, color: 'white' }} />
                </div>
                <div>
                    <p style={{ fontWeight: 700, fontSize: 14, color: '#1e293b', margin: 0 }}>Complete your profile</p>
                    <p style={{ fontSize: 12, color: '#94a3b8', margin: 0 }}>A complete profile unlocks the full experience</p>
                </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {tips.map(({ icon: Icon, color, text }, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <div style={{ width: 32, height: 32, borderRadius: 9, flexShrink: 0, background: `${color}15`, border: `1px solid ${color}25`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Icon style={{ width: 14, height: 14, color }} />
                        </div>
                        <p style={{ fontSize: 13, color: '#64748b', margin: 0 }}>{text}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

function Field({ label, icon: Icon, children }) {
    return (
        <div>
            <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>
                <Icon style={{ width: 13, height: 13, color: '#a5b4fc' }} />{label}
            </label>
            {children}
        </div>
    )
}

const inputStyle = {
    display: 'block', width: '100%', boxSizing: 'border-box',
    height: 46, padding: '0 16px', fontSize: 14, color: '#0f172a',
    background: 'rgba(248,250,252,0.8)', border: '1.5px solid #e2e8f0',
    borderRadius: 12, outline: 'none', fontFamily: 'inherit', transition: 'all 0.2s ease',
}

function FileRobot() {
    const [robotX, setRobotX] = useState(3)
    const [facingRight, setFacingRight] = useState(true)
    const [collectedIds, setCollectedIds] = useState([])
    const [activeFileId, setActiveFileId] = useState(null)
    const [isRunning, setIsRunning] = useState(false)
    const cancelRef = useRef(false)

    const FILES = [
        { id: 0, label: 'image.jpg', type: 'IMG', color: '#3b82f6', bg: '#eff6ff', x: 58 },
        { id: 1, label: 'report.pdf', type: 'PDF', color: '#f59e0b', bg: '#fffbeb', x: 73 },
        { id: 2, label: 'video.mp4', type: 'VID', color: '#ef4444', bg: '#fef2f2', x: 87 },
    ]

    const delay = (ms) => new Promise(r => setTimeout(r, ms))

    const runLoop = async () => {
        cancelRef.current = false
        setIsRunning(true)
        while (!cancelRef.current) {
            setCollectedIds([])
            setActiveFileId(null)
            setRobotX(3)
            setFacingRight(true)
            await delay(600)
            if (cancelRef.current) break
            for (const file of FILES) {
                if (cancelRef.current) break
                setFacingRight(true)
                setRobotX(file.x - 5)
                await delay(900)
                if (cancelRef.current) break
                setActiveFileId(file.id)
                await delay(380)
                setActiveFileId(null)
                setCollectedIds(prev => [...prev, file.id])
                await delay(180)
            }
            if (cancelRef.current) break
            setFacingRight(false)
            setRobotX(3)
            await delay(1000)
            if (cancelRef.current) break
            await delay(700)
        }
        setIsRunning(false)
    }

    useEffect(() => {
        runLoop()
        return () => { cancelRef.current = true }
    }, [])

    return (
        <div style={{ marginTop: 20, borderRadius: 20, overflow: 'hidden', background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.95)', boxShadow: '0 4px 24px rgba(99,102,241,0.09)' }}>
           
            <div style={{ padding: '16px 22px', borderBottom: '1px solid rgba(99,102,241,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                    <p style={{ fontWeight: 700, fontSize: 14, color: '#1e293b', margin: 0 }}>File Collection Bot</p>
                    <p style={{ fontSize: 12, color: '#94a3b8', margin: '2px 0 0' }}>
                        {`Collecting files... ${collectedIds.length} / ${FILES.length} picked up`}
                    </p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '5px 12px', borderRadius: 99, fontSize: 11, fontWeight: 700, background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.18)', color: '#6366f1' }}>
                    <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#6366f1', display: 'inline-block', animation: 'liveDot 1s ease-in-out infinite' }} />
                    Live
                </div>
            </div>

            <div style={{ padding: '0 22px 22px' }}>
                <div style={{ position: 'relative', height: 160, marginTop: 8, borderRadius: 16, background: 'linear-gradient(180deg,rgba(238,242,255,0.5) 0%,rgba(245,243,255,0.3) 100%)', border: '1px solid rgba(99,102,241,0.08)', overflow: 'hidden' }}>

                    
                    <div style={{ position: 'absolute', bottom: 28, left: 16, right: 16, height: 2, background: 'linear-gradient(90deg,rgba(99,102,241,0.3),rgba(168,85,247,0.2),rgba(99,102,241,0.3))', borderRadius: 99 }} />

                 
                    <div style={{ position: 'absolute', bottom: 30, left: 14, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
                        <div style={{ width: 32, height: 28, borderRadius: 8, background: collectedIds.length === FILES.length ? 'linear-gradient(135deg,#10b981,#06b6d4)' : 'rgba(99,102,241,0.12)', border: `1.5px solid ${collectedIds.length === FILES.length ? 'transparent' : 'rgba(99,102,241,0.2)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.5s ease', boxShadow: collectedIds.length === FILES.length ? '0 4px 14px rgba(16,185,129,0.4)' : 'none' }}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" fill={collectedIds.length === FILES.length ? 'white' : '#6366f1'} opacity={collectedIds.length === FILES.length ? 1 : 0.6} />
                            </svg>
                        </div>
                        {collectedIds.length > 0 && !facingRight && (
                            <div style={{ display: 'flex', gap: 2, flexWrap: 'wrap', maxWidth: 60, justifyContent: 'center' }}>
                                {collectedIds.map(id => {
                                    const f = FILES[id]
                                    return <div key={id} style={{ fontSize: 9, fontWeight: 800, color: f.color, background: f.bg, border: `1px solid ${f.color}30`, borderRadius: 4, padding: '1px 4px', animation: 'dropIn 0.35s cubic-bezier(0.34,1.56,0.64,1)' }}>{f.type}</div>
                                })}
                            </div>
                        )}
                    </div>

                  
                    {FILES.map((f) => {
                        const picked = collectedIds.includes(f.id)
                        const beingPicked = activeFileId === f.id
                        return (
                            <div key={f.id} style={{ position: 'absolute', bottom: 30, left: `${f.x}%`, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, transition: 'all 0.4s cubic-bezier(0.34,1.56,0.64,1)', opacity: picked ? 0 : 1, transform: beingPicked ? 'translateY(-14px) scale(1.15)' : 'translateY(0) scale(1)', pointerEvents: 'none' }}>
                                <div style={{ width: 34, height: 40, borderRadius: 7, background: f.bg, border: `1.5px solid ${f.color}40`, boxShadow: beingPicked ? `0 8px 20px ${f.color}50` : `0 2px 8px ${f.color}20`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2, transition: 'box-shadow 0.3s ease' }}>
                                    <div style={{ width: 18, height: 2, borderRadius: 1, background: `${f.color}60` }} />
                                    <div style={{ width: 14, height: 2, borderRadius: 1, background: `${f.color}40` }} />
                                    <div style={{ width: 16, height: 2, borderRadius: 1, background: `${f.color}40` }} />
                                    <div style={{ fontSize: 7, fontWeight: 800, color: f.color, background: `${f.color}15`, borderRadius: 3, padding: '1px 4px', marginTop: 1 }}>{f.type}</div>
                                </div>
                                <span style={{ fontSize: 8, color: '#94a3b8', fontWeight: 500, whiteSpace: 'nowrap' }}>{f.label}</span>
                            </div>
                        )
                    })}

                    
                    <div style={{ position: 'absolute', bottom: 24, left: `calc(${robotX}% + 10px)`, width: 30, height: 6, borderRadius: '50%', background: 'rgba(99,102,241,0.2)', filter: 'blur(4px)', transition: 'left 0.85s cubic-bezier(0.4,0,0.2,1)' }} />

                    
                    <div style={{ position: 'absolute', bottom: 30, left: `${robotX}%`, transition: 'left 0.85s cubic-bezier(0.4,0,0.2,1)', transform: `scaleX(${facingRight ? 1 : -1})`, zIndex: 5 }}>
                        <svg width="44" height="58" viewBox="0 0 44 58" fill="none">
                            <line x1="22" y1="2" x2="22" y2="9" stroke="#818cf8" strokeWidth="2" strokeLinecap="round" />
                            <circle cx="22" cy="2" r="2.5" fill={isRunning ? '#fbbf24' : '#a855f7'} style={{ filter: isRunning ? 'drop-shadow(0 0 4px #fbbf24)' : 'none' }} />
                            <rect x="7" y="9" width="30" height="20" rx="7" fill="url(#bH)" />
                            <rect x="9" y="11" width="26" height="6" rx="3" fill="rgba(255,255,255,0.15)" />
                            <rect x="11" y="15" width="8" height="6" rx="3" fill="white" opacity="0.95" />
                            <rect x="25" y="15" width="8" height="6" rx="3" fill="white" opacity="0.95" />
                            <circle cx={isRunning ? 16 : 15} cy="18" r="2.2" fill="#4f46e5" />
                            <circle cx={isRunning ? 30 : 29} cy="18" r="2.2" fill="#4f46e5" />
                            <circle cx={isRunning ? 17 : 16} cy="17" r="0.8" fill="white" />
                            <circle cx={isRunning ? 31 : 30} cy="17" r="0.8" fill="white" />
                            <path d={isRunning ? 'M13 26 Q22 30 31 26' : 'M13 26 Q22 28 31 26'} stroke="white" strokeWidth="1.8" strokeLinecap="round" fill="none" />
                            <rect x="9" y="31" width="26" height="17" rx="6" fill="url(#bB)" />
                            <line x1="14" y1="35" x2="14" y2="44" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                            <line x1="30" y1="35" x2="30" y2="44" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                            <circle cx="22" cy="39.5" r="3.5" fill={isRunning ? '#fbbf24' : '#a5b4fc'} opacity="0.9" style={{ filter: isRunning ? 'drop-shadow(0 0 5px #fbbf24)' : 'none' }} />
                            <circle cx="22" cy="39.5" r="1.8" fill="white" opacity="0.5" />
                            <rect x="0" y={isRunning ? 30 : 33} width="8" height="5" rx="2.5" fill="#818cf8" style={{ transition: 'y 0.3s ease' }} />
                            <rect x="36" y="33" width="8" height="5" rx="2.5" fill="#818cf8" />
                            <rect x="11" y="48" width="9" height="10" rx="4" fill="#6366f1" style={{ transformOrigin: '15px 48px', animation: isRunning ? 'botLegL 0.4s ease-in-out infinite alternate' : 'none' }} />
                            <rect x="24" y="48" width="9" height="10" rx="4" fill="#6366f1" style={{ transformOrigin: '28px 48px', animation: isRunning ? 'botLegR 0.4s ease-in-out infinite alternate' : 'none' }} />
                            <defs>
                                <linearGradient id="bH" x1="7" y1="9" x2="37" y2="29" gradientUnits="userSpaceOnUse">
                                    <stop offset="0%" stopColor="#818cf8" /><stop offset="100%" stopColor="#6366f1" />
                                </linearGradient>
                                <linearGradient id="bB" x1="9" y1="31" x2="35" y2="48" gradientUnits="userSpaceOnUse">
                                    <stop offset="0%" stopColor="#6366f1" /><stop offset="100%" stopColor="#4338ca" />
                                </linearGradient>
                            </defs>
                        </svg>

                       
                        {collectedIds.length > 0 && facingRight && (
                            <div style={{ position: 'absolute', bottom: 56, left: '50%', transform: `translateX(-50%) scaleX(${facingRight ? 1 : -1})`, display: 'flex', gap: 3, filter: 'drop-shadow(0 4px 8px rgba(99,102,241,0.3))' }}>
                                {collectedIds.map(id => {
                                    const f = FILES[id]
                                    return <div key={id} style={{ width: 18, height: 22, borderRadius: 4, background: f.bg, border: `1.5px solid ${f.color}50`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 6, fontWeight: 800, color: f.color, animation: 'floatFiles 1.2s ease-in-out infinite alternate', animationDelay: `${id * 0.15}s` }}>{f.type}</div>
                                })}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <style>{`
        @keyframes botLegL   { from { transform: rotate(-18deg); } to { transform: rotate(18deg); } }
        @keyframes botLegR   { from { transform: rotate(18deg);  } to { transform: rotate(-18deg); } }
        @keyframes floatFiles { from { transform: translateY(0px); } to { transform: translateY(-4px); } }
        @keyframes dropIn    { from { opacity:0; transform:translateY(-10px) scale(0.8); } to { opacity:1; transform:translateY(0) scale(1); } }
        @keyframes liveDot   { 0%,100% { opacity:1; transform:scale(1); } 50% { opacity:0.3; transform:scale(0.6); } }
      `}</style>
        </div>
    )
}

export default function Profile() {
    const currentUser = getUser()
    const [form, setForm] = useState({ name: '', gender: '', occupation: '' })
    const [photoPreview, setPhotoPreview] = useState(null)
    const [photoBase64, setPhotoBase64] = useState(null)
    const [exists, setExists] = useState(false)
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [saved, setSaved] = useState(false)
    const [error, setError] = useState('')
    const photoRef = useRef(null)

    useEffect(() => {
        api.get('/profile')
            .then(({ data }) => {
                setForm({ name: data.name || '', gender: data.gender || '', occupation: data.occupation || '' })
                if (data.photo && typeof data.photo === 'string') {
                    setPhotoPreview(`data:image/jpeg;base64,${data.photo}`)
                    setPhotoBase64(data.photo)
                }
                setExists(true)
            })
            .catch((err) => {
                const s = err?.response?.status
                if (s === 404 || s === 500) setExists(false)
                else setError('Failed to load profile.')
            })
            .finally(() => setLoading(false))
    }, [])

    const handlePhotoChange = (e) => {
        const file = e.target.files[0]
        if (!file) return
        const reader = new FileReader()
        reader.onload = (ev) => {
            setPhotoPreview(ev.target.result)
            setPhotoBase64(ev.target.result.split(',')[1])
        }
        reader.readAsDataURL(file)
    }

    const handleSave = async (e) => {
        e.preventDefault()
        setSaving(true); setError(''); setSaved(false)
        try {
            const payload = { name: form.name, gender: form.gender, occupation: form.occupation, ...(photoBase64 && { photo: photoBase64 }) }
            if (exists) { await api.put('/profile', payload) }
            else { await api.post('/profile', payload); setExists(true) }
            setSaved(true)
            setTimeout(() => setSaved(false), 3000)
        } catch (err) {
            const msg = err?.response?.data
            setError(typeof msg === 'string' ? msg : msg?.message || 'Failed to save profile.')
        } finally { setSaving(false) }
    }

    const filled = [form.name, form.gender, form.occupation, photoPreview].filter(Boolean).length
    const pct = Math.round((filled / 4) * 100)
    const initial = form.name ? form.name[0].toUpperCase() : currentUser?.email?.[0]?.toUpperCase() ?? 'U'
    const isEmpty = !form.name && !form.gender && !form.occupation

    if (loading) {
        return (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', flexDirection: 'column', gap: 16 }}>
                <div style={{ width: 56, height: 56, borderRadius: 18, background: 'linear-gradient(135deg,#6366f1,#a855f7)', boxShadow: '0 8px 25px rgba(99,102,241,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Loader style={{ width: 24, height: 24, color: 'white' }} className="animate-spin" />
                </div>
                <p style={{ color: '#94a3b8', fontSize: 14, fontWeight: 500 }}>Loading your profile...</p>
            </div>
        )
    }

    return (
        <div className="page-enter" style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ marginBottom: 28 }}>
                <h1 style={{ fontSize: 22, fontWeight: 800, color: '#0f172a', margin: 0 }}>Profile</h1>
                <p style={{ fontSize: 13, color: '#94a3b8', marginTop: 4 }}>Manage your personal information and account settings.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: 24, alignItems: 'start' }}>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    <div style={{ borderRadius: 24, overflow: 'hidden', background: 'rgba(255,255,255,0.88)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.95)', boxShadow: '0 8px 32px rgba(99,102,241,0.1)' }}>
                       
                        <div style={{ height: 100, position: 'relative', background: 'linear-gradient(135deg,#4f46e5 0%,#7c3aed 50%,#a855f7 100%)' }}>
                            <div style={{ position: 'absolute', top: -20, right: -20, width: 80, height: 80, borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }} />
                            <div style={{ position: 'absolute', bottom: -10, left: 20, width: 50, height: 50, borderRadius: '50%', background: 'rgba(255,255,255,0.06)' }} />
                        </div>
                        <div style={{ padding: '0 24px 24px' }}>
                         
                            <div style={{ display: 'flex', justifyContent: 'center', marginTop: -44, marginBottom: 16 }}>
                                <div style={{ position: 'relative' }}>
                                    {photoPreview ? (
                                        <img src={photoPreview} alt="Profile" style={{ width: 96, height: 96, borderRadius: 22, objectFit: 'cover', border: '4px solid white', boxShadow: '0 8px 24px rgba(0,0,0,0.18)', display: 'block' }} />
                                    ) : (
                                        <div style={{ width: 96, height: 96, borderRadius: 22, background: 'linear-gradient(135deg,#6366f1,#a855f7)', border: '4px solid white', boxShadow: '0 8px 24px rgba(99,102,241,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, fontWeight: 800, color: 'white' }}>
                                            {initial}
                                        </div>
                                    )}
                                    <button type="button" onClick={() => photoRef.current?.click()}
                                        style={{ position: 'absolute', bottom: -4, right: -4, width: 28, height: 28, borderRadius: 9, border: 'none', cursor: 'pointer', background: 'linear-gradient(135deg,#6366f1,#a855f7)', boxShadow: '0 4px 12px rgba(99,102,241,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'transform 0.2s' }}
                                        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.15)'}
                                        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
                                        <Camera style={{ width: 13, height: 13, color: 'white' }} />
                                    </button>
                                    <input ref={photoRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handlePhotoChange} />
                                </div>
                            </div>
                            <div style={{ textAlign: 'center', marginBottom: 16 }}>
                                <p style={{ fontWeight: 800, fontSize: 16, color: '#0f172a', margin: 0 }}>{form.name || 'Your Name'}</p>
                                <p style={{ fontSize: 12, color: '#94a3b8', marginTop: 3 }}>{form.occupation || 'Add your occupation'}</p>
                                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, marginTop: 8, padding: '5px 12px', borderRadius: 99, background: 'rgba(99,102,241,0.07)', border: '1px solid rgba(99,102,241,0.15)' }}>
                                    <Mail style={{ width: 11, height: 11, color: '#6366f1' }} />
                                    <span style={{ fontSize: 11, color: '#6366f1', fontWeight: 600 }}>{currentUser?.email}</span>
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: 8 }}>
                                <StatChip label="Gender" value={form.gender} color="#8b5cf6" />
                                <StatChip label="Status" value="Active" color="#10b981" />
                            </div>
                            <div style={{ marginTop: 16 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                                    <span style={{ fontSize: 11, color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Completion</span>
                                    <span style={{ fontSize: 11, fontWeight: 700, color: pct === 100 ? '#10b981' : '#6366f1' }}>{pct}%</span>
                                </div>
                                <div style={{ height: 6, borderRadius: 99, background: 'rgba(99,102,241,0.1)' }}>
                                    <div style={{ height: '100%', borderRadius: 99, transition: 'width 0.5s ease', width: `${pct}%`, background: pct === 100 ? 'linear-gradient(90deg,#10b981,#06b6d4)' : 'linear-gradient(90deg,#6366f1,#a855f7)' }} />
                                </div>
                            </div>
                        </div>
                    </div>
                    {isEmpty && <EmptyBanner />}
                </div>

                <div style={{ borderRadius: 24, overflow: 'hidden', background: 'rgba(255,255,255,0.88)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.95)', boxShadow: '0 8px 32px rgba(99,102,241,0.1)' }}>
                    <div style={{ padding: '20px 28px', display: 'flex', alignItems: 'center', gap: 12, borderBottom: '1px solid rgba(99,102,241,0.07)', background: 'linear-gradient(135deg,rgba(99,102,241,0.03),rgba(168,85,247,0.02))' }}>
                        <div style={{ width: 38, height: 38, borderRadius: 12, flexShrink: 0, background: 'linear-gradient(135deg,rgba(99,102,241,0.12),rgba(168,85,247,0.08))', border: '1px solid rgba(99,102,241,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Pencil style={{ width: 16, height: 16, color: '#6366f1' }} />
                        </div>
                        <div>
                            <p style={{ fontWeight: 700, color: '#1e293b', fontSize: 15, margin: 0 }}>Edit Information</p>
                            <p style={{ fontSize: 12, color: '#94a3b8', margin: '2px 0 0' }}>Update your personal details below</p>
                        </div>
                        {saved && (
                            <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 6, padding: '6px 14px', borderRadius: 99, fontSize: 12, fontWeight: 600, background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)', color: '#059669' }}>
                                <CheckCircle2 style={{ width: 13, height: 13 }} /> Saved
                            </div>
                        )}
                    </div>

                    <form onSubmit={handleSave} style={{ padding: 28 }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
                            <Field label="Full Name" icon={UserCircle2}>
                                <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Enter your full name" style={inputStyle}
                                    onFocus={e => { e.target.style.borderColor = '#6366f1'; e.target.style.boxShadow = '0 0 0 3px rgba(99,102,241,0.1)'; e.target.style.background = '#fff' }}
                                    onBlur={e => { e.target.style.borderColor = '#e2e8f0'; e.target.style.boxShadow = 'none'; e.target.style.background = 'rgba(248,250,252,0.8)' }} />
                            </Field>
                            <Field label="Gender" icon={Users}>
                                <select value={form.gender} onChange={(e) => setForm({ ...form, gender: e.target.value })} style={{ ...inputStyle, cursor: 'pointer' }}
                                    onFocus={e => { e.target.style.borderColor = '#6366f1'; e.target.style.boxShadow = '0 0 0 3px rgba(99,102,241,0.1)'; e.target.style.background = '#fff' }}
                                    onBlur={e => { e.target.style.borderColor = '#e2e8f0'; e.target.style.boxShadow = 'none'; e.target.style.background = 'rgba(248,250,252,0.8)' }}>
                                    <option value="">Select gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Prefer not to say">Prefer not to say</option>
                                </select>
                            </Field>
                            <Field label="Occupation" icon={Briefcase}>
                                <input type="text" value={form.occupation} onChange={(e) => setForm({ ...form, occupation: e.target.value })} placeholder="e.g. Software Engineer" style={inputStyle}
                                    onFocus={e => { e.target.style.borderColor = '#6366f1'; e.target.style.boxShadow = '0 0 0 3px rgba(99,102,241,0.1)'; e.target.style.background = '#fff' }}
                                    onBlur={e => { e.target.style.borderColor = '#e2e8f0'; e.target.style.boxShadow = 'none'; e.target.style.background = 'rgba(248,250,252,0.8)' }} />
                            </Field>
                            <Field label="Email Address" icon={Mail}>
                                <input type="email" value={currentUser?.email || ''} readOnly style={{ ...inputStyle, background: 'rgba(241,245,249,0.8)', color: '#94a3b8', cursor: 'not-allowed' }} />
                            </Field>
                        </div>

                        <div style={{ height: 1, background: 'rgba(99,102,241,0.07)', margin: '4px 0 20px' }} />

                        {error && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px', borderRadius: 14, marginBottom: 16, fontSize: 13, background: 'rgba(239,68,68,0.07)', border: '1px solid rgba(239,68,68,0.18)', color: '#dc2626' }}>
                                <AlertCircle style={{ width: 16, height: 16, flexShrink: 0 }} /> {error}
                            </div>
                        )}

                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <button type="submit" disabled={saving}
                                style={{ padding: '11px 32px', borderRadius: 14, border: 'none', cursor: saving ? 'not-allowed' : 'pointer', opacity: saving ? 0.7 : 1, background: 'linear-gradient(135deg,#4f46e5,#7c3aed)', boxShadow: '0 6px 20px rgba(99,102,241,0.4)', color: 'white', fontWeight: 700, fontSize: 14, display: 'inline-flex', alignItems: 'center', gap: 8, transition: 'all 0.2s ease', fontFamily: 'inherit' }}
                                onMouseEnter={e => { if (!saving) { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 10px 28px rgba(99,102,241,0.5)' } }}
                                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(99,102,241,0.4)' }}>
                                {saving ? <><Loader style={{ width: 15, height: 15 }} className="animate-spin" /> Saving...</> : <><Save style={{ width: 15, height: 15 }} /> Save Changes</>}
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <FileRobot />
        </div>
    )
}
