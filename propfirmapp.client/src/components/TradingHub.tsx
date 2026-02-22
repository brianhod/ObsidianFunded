const TradingHub: React.FC = () => {


    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col font-display relative overflow-hidden">

            {/* Background Glow */}
            <div className="fixed inset-0 z-0 opacity-40 pointer-events-none">
                <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px]" />
            </div>

            <div className="relative z-10 flex flex-col min-h-screen">

                {/* Header */}
                <header className="flex items-center px-6 py-6 lg:px-12">
                    <div className="flex items-center gap-3">
                        <div className="size-8 text-primary">
                            <svg fill="none" viewBox="0 0 48 48">
                                <path
                                    fill="currentColor"
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M47.2426 24L24 47.2426L0.757355 24L24 0.757355L47.2426 24ZM12.2426 21H35.7574L24 9.24264L12.2426 21Z"
                                />
                            </svg>
                        </div>
                        <h2 className="text-white text-xl font-extrabold tracking-tighter uppercase">
                            Obsidian Funded
                        </h2>
                    </div>
                </header>

                {/* Main */}
                <main className="flex-1 flex items-center justify-center px-4 py-12">
                    <div className="w-full max-w-[440px]">

                        <div className="bg-[#0f2323]/60 backdrop-blur-xl border border-primary/20 shadow-2xl rounded-xl p-8 lg:p-10">

                        </div>

                    </div>
                </main>

                {/* Footer */}
                <footer className="px-6 py-8 text-center">
                    <p className="text-slate-600 text-xs font-medium uppercase tracking-widest">
                        © {new Date().getFullYear()} Obsidian Funded Group. All Rights Reserved.
                    </p>
                </footer>
            </div>
        </div>
    );
};

export default TradingHub;
