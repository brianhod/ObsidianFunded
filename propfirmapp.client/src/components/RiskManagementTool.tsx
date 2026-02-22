import React from "react";

interface FeatureItem {
    icon: string;
    text: string;
}

const features: FeatureItem[] = [
    {
        icon: "analytics",
        text: "Calculating real-time risk exposure on open trades based on their predefined stop-loss levels",
    },
    {
        icon: "balance",
        text: "Displaying risk-to-reward and profit-taking ratios, guiding traders toward disciplined exits",
    },
    {
        icon: "notification_important",
        text: "Providing live alerts when price approaches or hits the take-profit (TP) or stop-loss (SL) levels",
    },
    {
        icon: "security",
        text: "Promoting consistency and capital preservation by enforcing structured risk parameters",
    },
];

const RiskManagementTool: React.FC = () => {
    return (
        <div className="relative min-h-screen w-full flex flex-col bg-black text-white overflow-x-hidden">
            {/* Hero Section */}
            <main className="flex-1 flex flex-col items-center justify-center px-4 py-20">
                <div className="w-full max-w-[960px] flex flex-col gap-12">
                    <div className="text-center space-y-4">
                        <h1 className="text-5xl md:text-6xl font-black">
                            Risk Management{" "}
                            <span className="text-cyan-400">Tool</span>
                        </h1>
                        <p className="text-white/60 text-lg max-w-2xl mx-auto">
                            Advanced algorithmic safeguards for the modern professional trader.
                        </p>
                    </div>

                    {/* Glass Panel */}
                    <div className="bg-white/5 backdrop-blur-xl border border-cyan-400/20 rounded-xl p-8 md:p-12 hover:border-cyan-400/40 transition-all">
                        <div className="flex flex-col gap-10">
                            <div className="flex items-center gap-3 border-b border-white/5 pb-6">
                                <span className="material-symbols-outlined text-cyan-400 text-3xl">
                                    verified_user
                                </span>
                                <h2 className="text-2xl font-bold">
                                    Proprietary Protection Benefits
                                </h2>
                            </div>

                            <div className="grid gap-6">
                                {features.map((feature, index) => (
                                    <div
                                        key={index}
                                        className="flex items-start gap-4 p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-transparent hover:border-cyan-400/20"
                                    >
                                        <span className="material-symbols-outlined text-cyan-400 mt-1">
                                            {feature.icon}
                                        </span>
                                        <p className="text-white/90 text-lg leading-relaxed">
                                            {feature.text}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            {/* CTA Panel */}
                            <div className="mt-4 p-6 rounded-lg bg-cyan-400/5 border border-cyan-400/20">
                                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                                    <p className="text-lg italic text-white flex-1">
                                        "By making risk visible and actionable, this tool aims to reduce emotionally driven decisions, improve trading discipline, and ultimately increase trader longevity and profitability within the firm."
                                    </p>

                                    <button className="flex items-center justify-center gap-2 rounded-lg h-12 px-6 bg-cyan-400 text-black font-bold transition-all hover:bg-cyan-300 hover:shadow-lg">
                                        Launch Tool
                                        <span className="material-symbols-outlined">
                                            rocket_launch
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer Stats */}
                    <div className="flex flex-wrap justify-center items-center gap-12 opacity-40 hover:opacity-70 transition-opacity">
                        {["Real-Time Data", "Secure Protocol", "Low Latency"].map(
                            (label, i) => (
                                <div key={i} className="flex items-center gap-2">
                                    <span className="material-symbols-outlined">monitoring</span>
                                    <span className="text-sm font-bold uppercase tracking-widest">
                                        {label}
                                    </span>
                                </div>
                            )
                        )}
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="border-t border-white/5 px-6 py-10 text-center text-white/40 text-sm">
                ©  {new Date().getFullYear()} OBSIDIAN FUNDED. All rights reserved.
            </footer>
        </div>
    );
};

export default RiskManagementTool;
