import React, { useEffect, useMemo, useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';

const Layout: React.FC = () => {
    const location = useLocation();
    const [mobileOpen, setMobileOpen] = useState(false);

    const navItems = useMemo(
        () => [
            { label: 'Dashboard', path: '/', icon: 'dashboard' },
            { label: 'Evaluation', path: '/purchase', icon: 'shopping_cart' },
            { label: 'Trading Rules', path: '/rules', icon: 'description' },
            { label: 'Tools', path: '/risktools', icon: 'construction' },
            { label: 'Terms', path: '/terms', icon: 'gavel' },
            { label: 'Support', path: '/support', icon: 'support_agent' },
        ],
        []
    );

    const isActive = (path: string) => {
        if (path === '/') return location.pathname === '/';
        return location.pathname === path || location.pathname.startsWith(path + '/');
    };

    useEffect(() => {
        setMobileOpen(false);
    }, [location.pathname]);

    useEffect(() => {
        if (!mobileOpen) return;
        const prev = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = prev;
        };
    }, [mobileOpen]);

    return (
        <div className="relative z-10 flex flex-col min-h-screen selection:bg-primary/30 selection:text-white">
            {/* Background Particles */}
            <div className="particles-container">
                <div className="particle particle-bokeh w-32 h-32 top-[10%] left-[5%] opacity-20"></div>
                <div className="particle particle-bokeh w-48 h-48 top-[60%] left-[80%] opacity-30"></div>
                <div className="particle particle-bokeh w-40 h-40 top-[40%] left-[30%] opacity-10"></div>
                <div className="particle particle-bokeh w-64 h-64 top-[-10%] left-[70%] opacity-20"></div>
                <div className="particle particle-neon w-1 h-1 top-[15%] left-[25%] opacity-60"></div>
                <div className="particle particle-neon w-1.5 h-1.5 top-[45%] left-[65%] opacity-40"></div>
                <div className="particle particle-neon w-1 h-1 top-[85%] left-[15%] opacity-50"></div>
                <div className="particle particle-neon w-2 h-2 top-[22%] left-[88%] opacity-30"></div>
                <div className="particle particle-neon w-1 h-1 top-[70%] left-[55%] opacity-70"></div>
                <div className="particle particle-sharp w-0.5 h-0.5 top-[12%] left-[18%] opacity-80"></div>
                <div className="particle particle-sharp w-0.5 h-0.5 top-[25%] left-[42%] opacity-60"></div>
                <div className="particle particle-sharp w-1 h-1 top-[38%] left-[8%] opacity-90"></div>
                <div className="particle particle-sharp w-0.5 h-0.5 top-[52%] left-[24%] opacity-70"></div>
                <div className="particle particle-sharp w-1 h-1 top-[75%] left-[48%] opacity-80"></div>
                <div className="particle particle-sharp w-0.5 h-0.5 top-[88%] left-[32%] opacity-60"></div>
                <div className="particle particle-sharp w-0.5 h-0.5 top-[5%] left-[62%] opacity-70"></div>
                <div className="particle particle-sharp w-1 h-1 top-[18%] left-[75%] opacity-50"></div>
                <div className="particle particle-sharp w-0.5 h-0.5 top-[32%] left-[92%] opacity-80"></div>
            </div>

            {/* Mobile overlay */}
            <button
                aria-label="Close menu"
                onClick={() => setMobileOpen(false)}
                className={`fixed inset-0 z-40 bg-black/60 transition-opacity md:hidden ${mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                    }`}
            />

            {/* Mobile drawer */}
            <aside
                className={`fixed top-0 left-0 z-50 h-full w-[82%] max-w-[320px] md:hidden
        bg-black/90 backdrop-blur border-r border-white/10
        transition-transform duration-200 ease-out
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}
                role="dialog"
                aria-modal="true"
                aria-label="Mobile navigation"
            >
                <div className="flex items-center justify-between px-5 py-5 border-b border-white/10">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 flex items-center justify-center bg-black border border-primary/40 rounded-lg shadow-[0_0_15px_rgba(6,228,249,0.2)]">
                            <svg className="text-primary w-5 h-5" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    clipRule="evenodd"
                                    d="M47.2426 24L24 47.2426L0.757355 24L24 0.757355L47.2426 24ZM12.2426 21H35.7574L24 9.24264L12.2426 21Z"
                                    fill="currentColor"
                                    fillRule="evenodd"
                                />
                            </svg>
                        </div>
                        <div className="text-white font-extrabold tracking-tight uppercase font-display">
                            Obsidian Funded
                        </div>
                    </div>

                    <button
                        onClick={() => setMobileOpen(false)}
                        className="w-10 h-10 rounded-lg border border-white/10 hover:bg-white/5 transition flex items-center justify-center"
                        aria-label="Close"
                    >
                        <span className="material-symbols-outlined text-white/80">close</span>
                    </button>
                </div>

                <nav className="px-3 py-4">
                    {navItems.map((item) => {
                        const active = isActive(item.path);
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition
                  ${active ? 'bg-primary/15 text-primary border border-primary/20' : 'text-white/80 hover:bg-white/5'}`}
                            >
                                <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                                <span className="text-sm font-semibold tracking-wide">{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="mt-auto px-4 pb-6">
                    <Link
                        to="/support"
                        className="block text-center text-xs uppercase tracking-widest text-white/70 border border-white/10 px-3 py-2.5 rounded hover:bg-white/5 transition"
                    >
                        Support
                    </Link>
                </div>
            </aside>

            <header className="relative z-20 flex items-center justify-between px-6 py-6 lg:px-12 w-full">
                <div className="flex items-center gap-3">
                    {/* Mobile hamburger */}
                    <button
                        onClick={() => setMobileOpen(true)}
                        className="md:hidden w-10 h-10 rounded-lg border border-white/10 hover:bg-white/5 transition flex items-center justify-center"
                        aria-label="Open menu"
                    >
                        <span className="material-symbols-outlined text-white/80">menu</span>
                    </button>

                    <div className="w-10 h-10 flex items-center justify-center bg-black border border-primary/40 rounded-lg shadow-[0_0_15px_rgba(6,228,249,0.2)]">
                        <svg className="text-primary w-6 h-6" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                            <path
                                clipRule="evenodd"
                                d="M47.2426 24L24 47.2426L0.757355 24L24 0.757355L47.2426 24ZM12.2426 21H35.7574L24 9.24264L12.2426 21Z"
                                fill="currentColor"
                                fillRule="evenodd"
                            />
                        </svg>
                    </div>
                    <h2 className="text-white text-xl font-extrabold tracking-tighter uppercase font-display">
                        Obsidian Funded
                    </h2>
                </div>

                {/* Desktop nav */}
                <nav className="hidden md:flex items-center gap-8">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`text-xs uppercase tracking-[0.2em] font-bold transition-all flex items-center gap-2 ${isActive(item.path) ? 'text-primary' : 'text-white/40 hover:text-white/80'
                                }`}
                        >
                            <span className="material-symbols-outlined text-[18px]">{item.icon}</span>
                            {item.label}
                        </Link>
                    ))}
                </nav>

                <div className="flex items-center gap-4">
            

                    <div className="w-8 h-8 rounded bg-primary/20 border border-primary/30 flex items-center justify-center text-primary font-bold text-xs">
                        JD
                    </div>
                </div>
            </header>

            <main className="relative z-10 flex-1 flex flex-col items-center justify-start px-4 pb-20 pt-4">
                <Outlet />
            </main>
            <footer className="relative z-10 py-10 px-10 text-center text-[10px] text-white/20 uppercase tracking-[0.4em] font-display">
                © 2024 Obsidian Funded Management Group. All Rights Reserved. Proprietary Performance Analytics.
            </footer>
        </div>
    );
};

export default Layout;
