import { Link } from 'react-router-dom'
import {
    FolderOpen, ScanLine, BarChart2, Shuffle,
    ShieldCheck, Zap, FolderSync, ArrowRight, CheckCircle2
} from 'lucide-react'

const features = [
    { icon: ScanLine, title: 'Smart Scanning', desc: 'Point to any folder and instantly get a full breakdown of every file inside it.' },
    { icon: BarChart2, title: 'AI-Powered Analysis', desc: 'Files are classified into Images, Documents, Videos, Archives and more via ML.' },
    { icon: Shuffle, title: 'One-Click Segregation', desc: 'Choose destination paths per category and let the app move everything in seconds.' },
    { icon: ShieldCheck, title: 'Path Validation', desc: 'Only pre-approved paths can be used as destinations — no accidental moves.' },
    { icon: Zap, title: 'Blazing Fast', desc: 'Built on Vite + React with a Spring Boot backend. Everything feels instant.' },
    { icon: FolderSync, title: 'Always in Sync', desc: 'Your settings and allowed paths are persisted and tied to your account.' },
]

const steps = [
    { num: '01', title: 'Create an account', desc: 'Register in seconds with just your email and password.' },
    { num: '02', title: 'Add allowed paths', desc: 'Go to Settings and add the destination folders you trust.' },
    { num: '03', title: 'Scan a folder', desc: 'Enter any folder path on your machine and hit Scan & Analyze.' },
    { num: '04', title: 'Segregate', desc: 'Pick destinations per category and start the segregation.' },
]

const highlights = ['No manual sorting', 'ML-powered classification', 'Secure path validation', 'Works on any folder']

export default function Landing() {
    return (
        <div className="min-h-screen bg-white text-slate-900 antialiased">

            
            <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                            <FolderOpen className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-bold text-[15px] text-slate-900 tracking-tight">SmartOrganizer</span>
                    </div>
                    <nav className="hidden sm:flex items-center gap-1">
                        <a href="#features" className="text-sm text-slate-500 hover:text-slate-900 px-3 py-1.5 rounded-lg hover:bg-slate-50 transition-colors">Features</a>
                        <a href="#how" className="text-sm text-slate-500 hover:text-slate-900 px-3 py-1.5 rounded-lg hover:bg-slate-50 transition-colors">How it works</a>
                    </nav>
                    <div className="flex items-center gap-2">
                        <Link to="/login" className="text-sm font-medium text-slate-600 hover:text-slate-900 px-3 py-1.5 rounded-lg hover:bg-slate-50 transition-colors">
                            Sign In
                        </Link>
                        <Link to="/register" className="text-sm font-semibold bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors shadow-sm">
                            Get Started
                        </Link>
                    </div>
                </div>
            </header>

           
            <section className="relative overflow-hidden pt-20 pb-28 px-4 sm:px-6">
               
                <div className="absolute inset-0 bg-gradient-to-b from-indigo-50/60 via-white to-white pointer-events-none" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-100/40 rounded-full blur-3xl pointer-events-none" />

                <div className="relative max-w-4xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold px-3.5 py-1.5 rounded-full mb-6">
                        <Zap className="w-3 h-3" />
                        AI-Powered File Management
                    </div>

                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.1] tracking-tight text-slate-900 mb-5">
                        Stop sorting files<br />
                        <span className="text-indigo-600">manually.</span>
                    </h1>

                    <p className="text-lg sm:text-xl text-slate-500 max-w-2xl mx-auto mb-8 leading-relaxed">
                        SmartOrganizer scans your folders, classifies every file using machine learning,
                        and moves them to the right place — automatically.
                    </p>

                    {/* Highlights */}
                    <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mb-10">
                        {highlights.map((h) => (
                            <span key={h} className="flex items-center gap-1.5 text-sm text-slate-500">
                                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                                {h}
                            </span>
                        ))}
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                        <Link
                            to="/register"
                            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 shadow-lg shadow-indigo-200 hover:shadow-indigo-300 hover:-translate-y-0.5 w-full sm:w-auto justify-center"
                        >
                            Get Started Free <ArrowRight className="w-4 h-4" />
                        </Link>
                        <Link
                            to="/login"
                            className="flex items-center gap-2 bg-white border border-slate-200 hover:border-slate-300 text-slate-700 font-semibold px-6 py-3 rounded-xl transition-all duration-200 hover:-translate-y-0.5 w-full sm:w-auto justify-center"
                        >
                            Sign In
                        </Link>
                    </div>
                </div>

               
                <div className="relative max-w-5xl mx-auto mt-16">
                    <div className="rounded-2xl overflow-hidden shadow-2xl shadow-slate-200 border border-slate-200/80 ring-1 ring-slate-900/5">
                        
                        <div className="bg-slate-100 border-b border-slate-200 px-4 py-3 flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-red-400" />
                            <span className="w-3 h-3 rounded-full bg-yellow-400" />
                            <span className="w-3 h-3 rounded-full bg-green-400" />
                            <div className="ml-3 flex-1 max-w-xs">
                                <div className="bg-white border border-slate-200 rounded-md px-3 py-1 text-xs text-slate-400 text-center">
                                    localhost:5173/dashboard
                                </div>
                            </div>
                        </div>
                        
                        <div className="flex bg-slate-50" style={{ minHeight: 260 }}>
                            
                            <div className="w-52 bg-[#0f1117] p-4 space-y-1 shrink-0">
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="w-6 h-6 bg-indigo-500 rounded-md" />
                                    <div className="h-3 w-24 bg-white/20 rounded" />
                                </div>
                                {['Dashboard', 'Profile', 'Settings'].map((item, i) => (
                                    <div key={item} className={`flex items-center gap-2 px-3 py-2 rounded-lg ${i === 0 ? 'bg-indigo-500/20 border border-indigo-500/30' : ''}`}>
                                        <div className={`w-3.5 h-3.5 rounded ${i === 0 ? 'bg-indigo-400' : 'bg-white/20'}`} />
                                        <span className={`text-xs ${i === 0 ? 'text-indigo-300' : 'text-white/30'}`}>{item}</span>
                                    </div>
                                ))}
                            </div>
                            {/* Fake content */}
                            <div className="flex-1 p-6 space-y-5">
                                <div>
                                    <div className="h-5 w-48 bg-slate-200 rounded-md mb-1.5" />
                                    <div className="h-3 w-72 bg-slate-100 rounded" />
                                </div>
                                <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-3">
                                    <div className="h-3.5 w-40 bg-slate-200 rounded" />
                                    <div className="h-9 bg-slate-100 rounded-lg border border-slate-200" />
                                    <div className="h-9 w-36 bg-indigo-500 rounded-lg opacity-90" />
                                </div>
                                <div className="grid grid-cols-5 gap-2">
                                    {[
                                        { c: 'bg-blue-50 border-blue-100', n: '12' },
                                        { c: 'bg-amber-50 border-amber-100', n: '8' },
                                        { c: 'bg-rose-50 border-rose-100', n: '3' },
                                        { c: 'bg-green-50 border-green-100', n: '5' },
                                        { c: 'bg-slate-50 border-slate-200', n: '2' },
                                    ].map(({ c, n }, i) => (
                                        <div key={i} className={`${c} border rounded-xl p-3 text-center`}>
                                            <div className="text-base font-bold text-slate-600">{n}</div>
                                            <div className="h-2 w-10 bg-slate-200 rounded mx-auto mt-1" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Glow */}
                    <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-3/4 h-12 bg-indigo-300/30 blur-2xl rounded-full pointer-events-none" />
                </div>
            </section>

           
            <section id="features" className="py-24 px-4 sm:px-6 bg-white">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-14">
                        <p className="text-sm font-semibold text-indigo-600 uppercase tracking-widest mb-2">Features</p>
                        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">Everything you need</h2>
                        <p className="text-slate-500 mt-3 max-w-xl mx-auto">A complete file management workflow in one place.</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {features.map(({ icon: Icon, title, desc }) => (
                            <div
                                key={title}
                                className="group p-6 rounded-2xl border border-slate-100 hover:border-indigo-200 hover:shadow-lg hover:shadow-indigo-50 transition-all duration-200 bg-white cursor-default"
                            >
                                <div className="w-10 h-10 bg-indigo-50 group-hover:bg-indigo-100 rounded-xl flex items-center justify-center mb-4 transition-colors duration-200">
                                    <Icon className="w-5 h-5 text-indigo-600" />
                                </div>
                                <h3 className="font-semibold text-slate-900 mb-1.5">{title}</h3>
                                <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            
            <section id="how" className="py-24 px-4 sm:px-6 bg-slate-50">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-14">
                        <p className="text-sm font-semibold text-indigo-600 uppercase tracking-widest mb-2">Process</p>
                        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">How it works</h2>
                        <p className="text-slate-500 mt-3">Up and running in under a minute.</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {steps.map(({ num, title, desc }) => (
                            <div key={num} className="flex gap-5 bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow duration-200">
                                <span className="text-4xl font-black text-indigo-100 leading-none select-none shrink-0">{num}</span>
                                <div>
                                    <h3 className="font-semibold text-slate-900 mb-1">{title}</h3>
                                    <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

           
            <section className="py-24 px-4 sm:px-6 bg-indigo-600 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.1),_transparent_60%)] pointer-events-none" />
                <div className="relative max-w-2xl mx-auto text-center space-y-5">
                    <h2 className="text-3xl sm:text-4xl font-bold text-white">Ready to clean up your files?</h2>
                    <p className="text-indigo-200 text-lg">Create a free account and start organizing in minutes.</p>
                    <Link
                        to="/register"
                        className="inline-flex items-center gap-2 bg-white text-indigo-600 font-semibold px-8 py-3.5 rounded-xl hover:bg-indigo-50 transition-all duration-200 shadow-xl hover:-translate-y-0.5"
                    >
                        Get Started Free <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </section>

           
            <footer className="bg-slate-900 text-slate-400 py-10 px-4 sm:px-6">
                <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 bg-indigo-500 rounded-lg flex items-center justify-center">
                            <FolderOpen className="w-3.5 h-3.5 text-white" />
                        </div>
                        <span className="text-sm font-semibold text-white">SmartOrganizer</span>
                    </div>
                    <p className="text-xs text-slate-500">© {new Date().getFullYear()} SmartOrganizer. All rights reserved.</p>
                    <div className="flex items-center gap-5 text-sm">
                        <Link to="/login" className="hover:text-white transition-colors">Sign In</Link>
                        <Link to="/register" className="hover:text-white transition-colors">Register</Link>
                    </div>
                </div>
            </footer>
        </div>
    )
}
