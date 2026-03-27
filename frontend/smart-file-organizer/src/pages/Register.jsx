import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { FolderOpen, Eye, EyeOff, ArrowRight } from 'lucide-react'

export default function Register() {
    const navigate = useNavigate()
    const [form, setForm] = useState({ email: '', password: '', confirm: '' })
    const [showPw, setShowPw] = useState(false)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        if (form.password !== form.confirm) { setError('Passwords do not match.'); return }
        if (form.password.length < 6) { setError('Password must be at least 6 characters.'); return }
        setLoading(true)
        try {
            await axios.post('http://localhost:8080/auth/register', { email: form.email, password: form.password })
            navigate('/login')
        } catch (err) {
            setError(err?.response?.data || 'Registration failed.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex">
            {/* Left panel */}
            <div className="hidden lg:flex lg:w-[45%] bg-[#0f1117] flex-col justify-between p-12 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(99,102,241,0.2),_transparent_60%)] pointer-events-none" />
                <div className="relative">
                    <Link to="/" className="flex items-center gap-2.5">
                        <div className="w-9 h-9 bg-indigo-500 rounded-xl flex items-center justify-center">
                            <FolderOpen className="w-5 h-5 text-white" />
                        </div>
                        <span className="font-bold text-white text-lg">SmartOrganizer</span>
                    </Link>
                </div>
                <div className="relative space-y-4">
                    <h2 className="text-3xl font-bold text-white leading-snug">
                        Start organizing<br />smarter today.
                    </h2>
                    <p className="text-slate-400 text-base leading-relaxed max-w-sm">
                        Join thousands of users who let AI handle their file chaos.
                    </p>
                </div>
                <p className="relative text-xs text-slate-600">© {new Date().getFullYear()} SmartOrganizer</p>
            </div>

            {/* Right panel */}
            <div className="flex-1 flex items-center justify-center p-6 bg-slate-50">
                <div className="w-full max-w-sm">
                    <Link to="/" className="flex items-center gap-2 mb-8 lg:hidden">
                        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                            <FolderOpen className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-bold text-slate-900">SmartOrganizer</span>
                    </Link>

                    <div className="mb-8">
                        <h1 className="text-2xl font-bold text-slate-900">Create your account</h1>
                        <p className="text-slate-500 text-sm mt-1">Free forever. No credit card required.</p>
                    </div>

                    {error && (
                        <div className="mb-5 flex items-start gap-3 p-3.5 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm">
                            <div className="w-4 h-4 rounded-full bg-red-200 flex items-center justify-center shrink-0 mt-0.5">
                                <span className="text-red-600 text-[10px] font-bold">!</span>
                            </div>
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">Email address</label>
                            <input
                                type="email" required value={form.email}
                                onChange={(e) => setForm({ ...form, email: e.target.value })}
                                className="w-full border border-slate-200 bg-white rounded-xl px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow"
                                placeholder="you@example.com"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
                            <div className="relative">
                                <input
                                    type={showPw ? 'text' : 'password'} required value={form.password}
                                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                                    className="w-full border border-slate-200 bg-white rounded-xl px-4 py-2.5 pr-10 text-sm text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow"
                                    placeholder="Min 6 characters"
                                />
                                <button type="button" onClick={() => setShowPw(!showPw)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors">
                                    {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">Confirm password</label>
                            <input
                                type="password" required value={form.confirm}
                                onChange={(e) => setForm({ ...form, confirm: e.target.value })}
                                className="w-full border border-slate-200 bg-white rounded-xl px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow"
                                placeholder="••••••••"
                            />
                        </div>
                        <button
                            type="submit" disabled={loading}
                            className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-2.5 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md mt-2"
                        >
                            {loading
                                ? <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" /></svg>
                                : <> Create Account <ArrowRight className="w-4 h-4" /></>
                            }
                        </button>
                    </form>

                    <p className="mt-6 text-center text-sm text-slate-500">
                        Already have an account?{' '}
                        <Link to="/login" className="text-indigo-600 hover:text-indigo-700 font-semibold transition-colors">Sign in</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
