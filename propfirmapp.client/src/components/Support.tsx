import React, { useMemo, useState, type JSX } from "react";

type TicketSubject =
    | "General Inquiry"
    | "Technical Issue"
    | "Billing Support"
    | "Trading Violation";

type FaqItem = {
    icon: string;
    question: string;
    answer: React.ReactNode;
};

export default function TraderSupportCenter(): JSX.Element {
    const [search, setSearch] = useState("");
    const [subject, setSubject] = useState<TicketSubject>("General Inquiry");
    const [message, setMessage] = useState("");

    const accountId = "#8829102";

    const particles = useMemo(
        () => [
            { top: "110%", left: "10%", size: 2, duration: 15, delay: 0, cyan: false },
            { top: "110%", left: "20%", size: 3, duration: 25, delay: 2, cyan: true },
            { top: "110%", left: "35%", size: 1, duration: 18, delay: 5, cyan: false },
            { top: "110%", left: "50%", size: 2, duration: 22, delay: 1, cyan: true },
            { top: "110%", left: "70%", size: 2, duration: 16, delay: 3, cyan: false },
            { top: "110%", left: "85%", size: 3, duration: 20, delay: 6, cyan: true },
            { top: "110%", left: "95%", size: 1, duration: 19, delay: 4, cyan: false },
            { top: "40%", left: "15%", size: 2, duration: 25, delay: -10, cyan: false },
            { top: "60%", left: "75%", size: 2, duration: 20, delay: -5, cyan: true },
        ],
        []
    );

    const faqs: FaqItem[] = [
        {
            icon: "trending_down",
            question: "How is daily drawdown calculated?",
            answer: (
                <p>
                    Daily drawdown is calculated based on the <strong>higher value</strong>{" "}
                    between your balance and equity at the start of the trading day (5:00 PM EST).
                    The limit is strictly 5% of your initial account balance. If your equity falls
                    below this threshold at any point during the day, the account will be breached.
                </p>
            ),
        },
        {
            icon: "payments",
            question: "When can I request my first payout?",
            answer: (
                <p>
                    You become eligible for your first payout <strong>14 days</strong> after placing
                    your first trade on the funded account. Subsequent payouts can be requested on a
                    bi-weekly basis. Ensure all trades are closed before submitting a request via the
                    &apos;Withdrawals&apos; tab.
                </p>
            ),
        },
        {
            icon: "gavel",
            question: "Are expert advisors (EAs) allowed?",
            answer: (
                <p>
                    Yes, EAs are allowed provided they do not use prohibited strategies such as tick
                    scalping, latency arbitrage, or reverse arbitrage. High-frequency trading bots
                    that exploit demo server feeds are strictly prohibited and will result in account
                    termination.
                </p>
            ),
        },
    ];

    const onStartChat = () => {
        // Hook this up to your chat provider (Intercom, Crisp, Zendesk, etc.)
        // eslint-disable-next-line no-alert
        alert("Start Chat clicked");
    };

    const onSendRequest = () => {
        // Hook this up to your ticketing backend.
        // eslint-disable-next-line no-alert
        alert(`Ticket submitted\n\nSubject: ${subject}\nAccount: ${accountId}\nMessage: ${message}`);
    };

    return (
        <div className="dark bg-[#05070a] text-white font-display overflow-hidden selection:bg-[#00f0ff] selection:text-black">
            {/* Local styles that were in the HTML <style> tag */}
            <style>{`
        :root { color-scheme: dark; }
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: rgba(5, 7, 10, 0.5); }
        ::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.1); border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(0, 240, 255, 0.3); }

        .particles-container {
          position: fixed;
          top: 0; left: 0;
          width: 100%; height: 100%;
          z-index: -1;
          background: #05070a;
          background-image:
            radial-gradient(at 0% 0%, rgba(0, 240, 255, 0.05) 0px, transparent 50%),
            radial-gradient(at 100% 100%, rgba(188, 19, 254, 0.05) 0px, transparent 50%);
          overflow: hidden;
        }
        .particle {
          position: absolute;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.3);
          animation: float 20s infinite linear;
        }
        .particle.cyan {
          background: rgba(0, 240, 255, 0.4);
          box-shadow: 0 0 4px rgba(0, 240, 255, 0.4);
        }
        @keyframes float {
          0% { transform: translateY(0) translateX(0) scale(1); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-100vh) translateX(50px) scale(0); opacity: 0; }
        }
        details > summary { list-style: none; }
        details > summary::-webkit-details-marker { display: none; }
      `}</style>

            {/* Particles background */}
            <div className="particles-container" aria-hidden="true">
                {particles.map((p, idx) => (
                    <div
                        key={idx}
                        className={`particle ${p.cyan ? "cyan" : ""}`}
                        style={{
                            top: p.top,
                            left: p.left,
                            width: `${p.size}px`,
                            height: `${p.size}px`,
                            animationDuration: `${p.duration}s`,
                            animationDelay: `${p.delay}s`,
                        }}
                    />
                ))}
            </div>

            <div className="flex h-screen w-full relative z-10">
                <main className="flex flex-1 flex-col h-full overflow-hidden relative">
                    <div className="flex-1 overflow-y-auto p-8 scroll-smooth relative z-10">
                        <div className="max-w-[1200px] mx-auto flex flex-col gap-8">
                            {/* Hero Search */}
                            <div className="rounded-2xl p-10 relative overflow-hidden flex flex-col items-center justify-center border border-white/10 bg-[rgba(18,24,38,0.6)] backdrop-blur-[12px] shadow-[0_4px_30px_rgba(0,0,0,0.3)]">
                                <div className="absolute inset-0 bg-gradient-to-b from-[#00f0ff]/5 to-transparent pointer-events-none" />
                                <h2 className="text-3xl font-bold text-white mb-2 relative z-10">
                                    How can we help you today?
                                </h2>
                                <p className="text-slate-400 mb-8 relative z-10">
                                    Search our knowledge base for answers to common questions
                                </p>

                                <div className="relative w-full max-w-2xl z-10 group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <span className="material-symbols-outlined text-slate-400 group-focus-within:text-[#00f0ff] transition-colors">
                                            search
                                        </span>
                                    </div>

                                    <input
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        className="w-full bg-black/30 border border-white/10 text-white transition-all duration-300 ease-out focus:border-[#00f0ff] focus:shadow-[0_0_10px_rgba(0,240,255,0.2)] focus:outline-none pl-12 pr-4 py-4 rounded-xl text-lg placeholder-gray-500 focus:ring-0"
                                        placeholder="Search for 'drawdown', 'payouts', 'rules'..."
                                        type="text"
                                    />

                                    <div className="absolute inset-y-0 right-0 pr-2 flex items-center">
                                        <kbd className="hidden sm:inline-block px-2 py-1 text-xs font-semibold text-gray-500 bg-white/5 border border-white/10 rounded">
                                            CMD+K
                                        </kbd>
                                    </div>
                                </div>
                            </div>

                            {/* Cards */}
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                {/* Live Support */}
                                <div className="rounded-2xl p-8 relative overflow-hidden group hover:border-[#00f0ff]/50 transition-all duration-500 flex flex-col justify-between items-center text-center lg:col-span-1 border border-white/10 bg-[rgba(18,24,38,0.6)] backdrop-blur-[12px] shadow-[0_4px_30px_rgba(0,0,0,0.3)]">
                                    <div className="absolute inset-0 bg-gradient-to-br from-[#00f0ff]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                    <div className="relative mb-6 mt-4">
                                        <div className="absolute inset-0 rounded-full bg-[#00f0ff]/20 blur-xl animate-pulse" />
                                        <div className="relative size-20 rounded-full bg-black/40 border border-[#00f0ff]/30 flex items-center justify-center text-[#00f0ff] shadow-[0_0_15px_rgba(0,240,255,0.3)] group-hover:scale-110 transition-transform duration-300">
                                            <span className="material-symbols-outlined text-4xl">support_agent</span>
                                        </div>
                                        <div className="absolute top-0 right-0 size-4 bg-[#0aff60] rounded-full border-2 border-black shadow-[0_0_10px_rgba(10,255,96,0.3)] animate-pulse" />
                                    </div>

                                    <div className="relative z-10 mb-8">
                                        <h3 className="text-2xl font-bold text-white mb-2">Live Support</h3>
                                        <p className="text-slate-400 text-sm">
                                            Connect with our support team instantly. Available 24/7 for urgent inquiries.
                                        </p>
                                    </div>

                                    <button
                                        onClick={onStartChat}
                                        className="relative z-10 w-full py-3 rounded-xl bg-[#00f0ff] text-black font-bold text-sm tracking-wide hover:bg-white transition-colors shadow-[0_0_20px_rgba(0,240,255,0.4)] flex items-center justify-center gap-2"
                                        type="button"
                                    >
                                        <span className="material-symbols-outlined text-[20px]">chat_bubble</span>
                                        Start Chat
                                    </button>
                                </div>

                                {/* Ticket */}
                                <div className="rounded-2xl p-8 lg:col-span-2 relative border border-white/10 bg-[rgba(18,24,38,0.6)] backdrop-blur-[12px] shadow-[0_4px_30px_rgba(0,0,0,0.3)]">
                                    <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
                                        <span className="material-symbols-outlined text-[#bc13fe]">mail</span>
                                        <h3 className="text-xl font-bold text-white">Submit a Ticket</h3>
                                    </div>

                                    <form
                                        className="flex flex-col gap-5"
                                        onSubmit={(e) => {
                                            e.preventDefault();
                                            onSendRequest();
                                        }}
                                    >
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                            <div className="flex flex-col gap-2">
                                                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                                                    Subject
                                                </label>
                                                <select
                                                    value={subject}
                                                    onChange={(e) => setSubject(e.target.value as TicketSubject)}
                                                    className="bg-black/30 border border-white/10 text-white transition-all duration-300 ease-out focus:border-[#00f0ff] focus:shadow-[0_0_10px_rgba(0,240,255,0.2)] focus:outline-none w-full rounded-lg px-4 py-2.5 text-sm focus:ring-0"
                                                >
                                                    <option className="bg-[#05070a] text-white">General Inquiry</option>
                                                    <option className="bg-[#05070a] text-white">Technical Issue</option>
                                                    <option className="bg-[#05070a] text-white">Billing Support</option>
                                                    <option className="bg-[#05070a] text-white">Trading Violation</option>
                                                </select>
                                            </div>

                                            <div className="flex flex-col gap-2">
                                                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                                                    Account ID
                                                </label>
                                                <input
                                                    className="bg-black/30 border border-white/10 text-white transition-all duration-300 ease-out focus:border-[#00f0ff] focus:shadow-[0_0_10px_rgba(0,240,255,0.2)] focus:outline-none w-full rounded-lg px-4 py-2.5 text-sm focus:ring-0 opacity-70 cursor-not-allowed"
                                                    readOnly
                                                    type="text"
                                                    value={accountId}
                                                />
                                            </div>
                                        </div>

                                        <div className="flex flex-col gap-2">
                                            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                                                Message
                                            </label>
                                            <textarea
                                                value={message}
                                                onChange={(e) => setMessage(e.target.value)}
                                                className="bg-black/30 border border-white/10 text-white transition-all duration-300 ease-out focus:border-[#00f0ff] focus:shadow-[0_0_10px_rgba(0,240,255,0.2)] focus:outline-none w-full rounded-lg px-4 py-3 text-sm focus:ring-0 resize-none"
                                                placeholder="Describe your issue in detail..."
                                                rows={5}
                                            />
                                        </div>

                                        <div className="flex justify-between items-center mt-2">
                                            <div className="flex items-center gap-2 text-slate-400 text-xs">
                                                <span className="material-symbols-outlined text-[16px]">info</span>
                                                Typically replies in &lt; 2 hours
                                            </div>

                                            <button
                                                className="px-8 py-2.5 rounded-lg bg-white/5 border border-[#bc13fe]/50 text-[#bc13fe] font-bold text-sm hover:bg-[#bc13fe] hover:text-white hover:border-[#bc13fe] transition-all duration-300 shadow-[0_0_10px_rgba(188,19,254,0.3)] flex items-center gap-2"
                                                type="submit"
                                            >
                                                Send Request
                                                <span className="material-symbols-outlined text-[18px]">send</span>
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>

                            {/* FAQs */}
                            <div className="flex flex-col gap-6 pb-8">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-xl font-bold text-white">Common Questions</h3>
                                    <a
                                        className="text-sm text-[#00f0ff] hover:text-white transition-colors flex items-center gap-1"
                                        href="#"
                                    >
                                        View Full Knowledge Base
                                        <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                                    </a>
                                </div>

                                <div className="flex flex-col gap-4">
                                    {faqs.map((faq) => (
                                        <details
                                            key={faq.question}
                                            className="group rounded-xl overflow-hidden border border-white/5 open:border-[#00f0ff]/30 transition-all duration-300 bg-[rgba(18,24,38,0.6)] backdrop-blur-[12px] shadow-[0_4px_30px_rgba(0,0,0,0.3)]"
                                        >
                                            <summary className="flex cursor-pointer items-center justify-between p-5 text-white hover:bg-white/5 transition-colors">
                                                <span className="font-bold flex items-center gap-3">
                                                    <span className="material-symbols-outlined text-[#00f0ff]">{faq.icon}</span>
                                                    {faq.question}
                                                </span>
                                                <span className="transition group-open:rotate-180">
                                                    <span className="material-symbols-outlined text-slate-400">expand_more</span>
                                                </span>
                                            </summary>

                                            <div className="px-5 pb-5 pt-0 text-slate-400 text-sm leading-relaxed border-t border-white/5 mt-2 pt-4">
                                                {faq.answer}
                                            </div>
                                        </details>
                                    ))}
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="flex items-center justify-between py-6 border-t border-white/10 mt-auto">
                                <p className="text-xs text-slate-400">Obsidian Funded © 2024. All rights reserved.</p>
                                <div className="flex gap-6">
                                    <a className="text-xs text-slate-400 hover:text-[#00f0ff] transition-colors" href="#">
                                        Privacy Policy
                                    </a>
                                    <a className="text-xs text-slate-400 hover:text-[#00f0ff] transition-colors" href="#">
                                        Terms of Service
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
