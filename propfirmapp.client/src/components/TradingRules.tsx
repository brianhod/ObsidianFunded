import React, { useMemo, useState } from "react";

type EvalMode = "oneStep" | "step2";

type PhaseCard = {
    title: string;
    badgeText: string;
    badgeClassName: string;
    profitTarget: React.ReactNode;
    minDays: string;
};

type LossBlock = {
    icon: string;
    title: string;
    bullets: React.ReactNode[];
};

const MaterialIcon: React.FC<{ name: string; className?: string }> = ({ name, className }) => (
    <span className={`material-symbols-outlined ${className ?? ""}`.trim()} aria-hidden="true">
        {name}
    </span>
);

const PageShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className="bg-[#0a0a0a] text-white font-display antialiased overflow-x-hidden min-h-screen">
            {/* Background layers */}
            <div
                className="fixed inset-0 -z-10 opacity-[0.15]"
                aria-hidden="true"
                style={{
                    background:
                        "radial-gradient(circle at 50% 50%, #111818 0%, #0a0a0a 100%), url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
                }}
            />
            <div
                className="fixed -z-10 rounded-full"
                aria-hidden="true"
                style={{
                    width: 600,
                    height: 600,
                    top: -200,
                    right: -200,
                    background: "radial-gradient(circle, rgba(6, 228, 249, 0.08) 0%, rgba(0, 0, 0, 0) 70%)",
                }}
            />

            {/* Font + Material Symbols (optional if you already load globally) */}
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            <link
                href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
                rel="stylesheet"
            />
            <link
                href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght@100..700&display=swap"
                rel="stylesheet"
            />

            {/* Local CSS for scrollbar + “glass” */}
            <style>{`
        .liquid-glass {
          background: rgba(15, 25, 26, 0.7);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.8);
        }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(255, 255, 255, 0.05); }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #06e4f9; border-radius: 10px; }
        .section-title {
          color: #06e4f9;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }
      `}</style>

            <div className="relative flex min-h-screen flex-col">{children}</div>
        </div>
    );
};

/** ✅ Moved out of ToggleTabs to avoid react/no-unstable-nested-components */
type TabButtonProps = {
    v: EvalMode;
    label: string;
    description: string;
    value: EvalMode;
    onChange: (v: EvalMode) => void;
};

const TabButton: React.FC<TabButtonProps> = ({ v, label, description, value, onChange }) => {
    const active = value === v;

    return (
        <button
            type="button"
            onClick={() => onChange(v)}
            className={[
                "flex-1 text-left rounded-xl border px-5 py-4 transition",
                active ? "border-[#06e4f9]/40 bg-[#06e4f9]/10" : "border-white/10 bg-white/5 hover:bg-white/10",
            ].join(" ")}
            aria-pressed={active}
        >
            <div className="flex items-center justify-between gap-3">
                <div className="text-sm font-extrabold tracking-tight">{label}</div>
                <div
                    className={[
                        "text-[10px] uppercase font-black tracking-[0.25em] px-2 py-1 rounded",
                        active ? "bg-[#06e4f9]/15 text-[#06e4f9]" : "bg-white/10 text-white/60",
                    ].join(" ")}
                >
                    {active ? "Active" : "View"}
                </div>
            </div>
            <div className="mt-2 text-xs text-white/60 leading-relaxed">{description}</div>
        </button>
    );
};

const ToggleTabs: React.FC<{
    value: EvalMode;
    onChange: (v: EvalMode) => void;
}> = ({ value, onChange }) => {
    return (
        <div className="w-full max-w-[960px] px-4 lg:px-0 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <TabButton
                    v="oneStep"
                    value={value}
                    onChange={onChange}
                    label="1-STEP – Evaluation"
                    description="Single Student Phase (Phase I). Passing qualifies you as a Master (Funded) Trader."
                />
                <TabButton
                    v="step2"
                    value={value}
                    onChange={onChange}
                    label="STEP 2 – Evaluation"
                    description="Two phases: Student (Phase I) + Practitioner (Phase II). Both must be passed."
                />
            </div>
        </div>
    );
};

const PhaseCards: React.FC<{ cards: PhaseCard[]; extraNote?: React.ReactNode }> = ({ cards, extraNote }) => {
    return (
        <section className={`grid grid-cols-1 ${cards.length === 3 ? "md:grid-cols-3" : "md:grid-cols-2"} gap-4`}>
            {cards.map((c) => (
                <div key={c.badgeText} className="bg-white/5 border border-white/10 p-6 md:p-8 rounded-xl space-y-3">
                    <div className="flex items-start justify-between gap-4">
                        <h3 className="section-title text-[10px] font-bold">{c.title}</h3>
                        <span className={c.badgeClassName}>{c.badgeText}</span>
                    </div>

                    <div className="space-y-2">
                        <div className="text-white/40 text-xs uppercase font-bold tracking-widest">Profit Target</div>
                        <div className="text-3xl md:text-4xl font-black text-white">{c.profitTarget}</div>
                    </div>

                    <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                        <span className="text-xs text-white/60">Min Trading Days</span>
                        <span className="text-sm font-bold text-[#06e4f9]">{c.minDays}</span>
                    </div>
                </div>
            ))}

            {extraNote ? (
                <div
                    className={`${cards.length === 3 ? "md:col-span-3" : "md:col-span-2"
                        } flex items-center gap-2 text-white/40 text-xs`}
                >
                    <MaterialIcon name="check_circle" className="text-sm" />
                    <span>{extraNote}</span>
                </div>
            ) : null}
        </section>
    );
};

const LossLimits: React.FC<{ blocks: LossBlock[] }> = ({ blocks }) => {
    return (
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {blocks.map((b) => (
                <div key={b.title} className="space-y-4">
                    <h3 className="section-title text-sm font-bold flex items-center gap-2">
                        <MaterialIcon name={b.icon} />
                        {b.title}
                    </h3>
                    <ul className="text-white/70 space-y-2 text-sm leading-relaxed list-disc ml-4">
                        {b.bullets.map((li, idx) => (
                            <li key={idx}>{li}</li>
                        ))}
                    </ul>
                </div>
            ))}
        </section>
    );
};

const NewsWeekend: React.FC = () => {
    return (
        <section className="space-y-6">
            <h3 className="section-title text-sm font-bold flex items-center gap-2">
                <MaterialIcon name="newspaper" />
                News &amp; Weekend Trading
            </h3>

            <div className="bg-white/5 rounded-lg p-6 space-y-4 border border-white/10">
                <p className="text-white/80 text-sm">Holding trades during news and weekends is allowed.</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="bg-black/40 p-4 rounded border border-white/5">
                        <p className="text-white/50 mb-2 uppercase font-bold tracking-tighter">Restriction</p>
                        <p className="text-white/90">
                            Profits are excluded for trades opened or closed ±5 minutes of high-impact news, unless opened 5 hours
                            before.
                        </p>
                    </div>
                    <div className="bg-black/40 p-4 rounded border border-white/5">
                        <p className="text-white/50 mb-2 uppercase font-bold tracking-tighter">Execution</p>
                        <p className="text-white/90">Applies to all order types. Restricted trades are auto-closed.</p>
                    </div>
                </div>

                <div className="flex items-center gap-3 py-2 border-t border-white/10">
                    <span className="text-xs text-white/50">Official Source:</span>
                    <span className="text-xs text-[#06e4f9] font-bold">FOREX FACTORY</span>
                    <span className="mx-2 text-white/20">|</span>
                    <span className="text-xs text-red-400/80 font-medium italic">Intentional news trading is prohibited.</span>
                </div>
            </div>
        </section>
    );
};

const ProhibitedStrategies: React.FC<{ title: string; lastItemLabel: string }> = ({ title, lastItemLabel }) => {
    const items = [
        "Gap trading",
        "HFT",
        "Server spamming",
        "Latency arbitrage",
        "Toxic flow",
        "Hedging",
        "Arbitrage strategies",
        "Tick scalping",
        "Execution abuse",
        "Opposite account trading",
        "Copy trading",
        lastItemLabel,
    ];

    return (
        <section className="space-y-6">
            <h3 className="section-title text-sm font-bold flex items-center gap-2">
                <MaterialIcon name="gavel" />
                {title}
            </h3>

            <div className="space-y-4">
                <p className="text-white/80 text-sm">
                    Trade freely, including holding over news or weekends and using EAs only for trade or risk management.
                </p>

                <div className="bg-red-500/5 border border-red-500/20 rounded-lg p-6">
                    <p className="text-red-400 text-xs font-bold mb-4 uppercase tracking-[0.2em]">Strictly Prohibited Strategies:</p>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-y-3 gap-x-6 text-xs text-white/60">
                        {items.map((x) => (
                            <div key={x} className="flex items-center gap-2">
                                <span className="size-1 bg-red-500 rounded-full" />
                                {x}
                            </div>
                        ))}
                    </div>

                    <p className="mt-6 pt-4 border-t border-red-500/20 text-red-400 text-[10px] font-bold uppercase">
                        Violations result in immediate account closure.
                    </p>
                </div>
            </div>
        </section>
    );
};

const ReminderFooter: React.FC<{ subtitleLines: string[]; uppercase?: boolean }> = ({ subtitleLines, uppercase }) => {
    return (
        <section className="py-12 border-t border-white/10 flex flex-col items-center text-center gap-6">
            <div className="space-y-2">
                <h4 className="text-white/40 text-xs font-bold uppercase tracking-[0.4em]">Reminder</h4>
                <div
                    className={[
                        "text-5xl lg:text-6xl font-black text-[#06e4f9] tracking-tighter",
                        uppercase ? "uppercase" : "",
                    ].join(" ")}
                >
                    YOUR IDEAS, OUR RISK.
                </div>
            </div>

            <div className="max-w-md text-white/60 text-sm space-y-1">
                {subtitleLines.map((l) => (
                    <p key={l}>{l}</p>
                ))}
            </div>
        </section>
    );
};

export default function ObsidianEvaluationRulesHub(): React.ReactElement  {
    const [mode, setMode] = useState<EvalMode>("oneStep");

    const config = useMemo(() => {
        if (mode === "oneStep") {
            const phaseCards: PhaseCard[] = [
                {
                    title: "Student Phase (Phase I)",
                    badgeText: "Phase I",
                    badgeClassName: "bg-white/10 text-white text-[10px] px-2 py-1 rounded font-bold uppercase",
                    profitTarget: <span className="text-[#06e4f9]">10%</span>,
                    minDays: "3 Days",
                },
                {
                    title: "Profit Target",
                    badgeText: "Target",
                    badgeClassName: "bg-[#06e4f9]/10 text-[#06e4f9] text-[10px] px-2 py-1 rounded font-bold uppercase",
                    profitTarget: <span className="text-[#06e4f9]">10%</span>,
                    minDays: "3 Days",
                },
                {
                    title: "Min. Trading Days",
                    badgeText: "Days",
                    badgeClassName: "bg-white/10 text-white text-[10px] px-2 py-1 rounded font-bold uppercase",
                    profitTarget: <span className="text-white">3 Days</span>,
                    minDays: "3 Days",
                },
            ];

            const losses: LossBlock[] = [
                {
                    icon: "analytics",
                    title: "Maximum Daily Loss (3%)",
                    bullets: [
                        <>Daily loss limit: 3% of starting equity or balance (higher value).</>,
                        <>Includes floating and closed PnL.</>,
                        <>Resets at 00:00 CE(S)T/server time.</>,
                    ],
                },
                {
                    icon: "account_balance_wallet",
                    title: "Maximum Loss (6%)",
                    bullets: [
                        <>Total loss limit: 6% of initial account size.</>,
                        <>Equity or balance must never fall below this limit.</>,
                        <span className="text-[#06e4f9] font-medium" key="ex">
                            Example: $100,000 account → $94,000 minimum.
                        </span>,
                    ],
                },
            ];

            return {
                headerTitle: "1-STEP – OBSIDIAN FUNDED Evaluation",
                headerBody:
                    "The OBSIDIAN FUNDED 1-Step Evaluation includes one Student Phase (Phase I). Passing this phase qualifies you as a Master (Funded) Trader.",
                introA:
                    "A solid trading system and risk management are required. After reaching the profit target, the account is manually reviewed within 2 working days.",
                introB: "Any rule breach results in immediate position closure, account termination, and loss of rewards.",
                phaseCards,
                phaseExtraNote: "No rule violations permitted during this phase.",
                losses,
                strategyTitle: "Trading Rules",
                lastProhibited: "Third-party account mgmt",
                reminderLines: ["Skill and discipline are required.", "You cannot cheat your way in."],
                reminderUppercase: false,
            };
        }

        // STEP 2
        const phaseCards: PhaseCard[] = [
            {
                title: "Student Phase (Phase I)",
                badgeText: "Phase I",
                badgeClassName: "bg-[#06e4f9]/10 text-[#06e4f9] text-[10px] px-2 py-1 rounded font-bold uppercase",
                profitTarget: (
                    <>
                        8% <span className="text-lg text-white/40">or</span> 10%
                    </>
                ),
                minDays: "3 Days",
            },
            {
                title: "Practitioner Phase (Phase II)",
                badgeText: "Phase II",
                badgeClassName: "bg-white/10 text-white text-[10px] px-2 py-1 rounded font-bold uppercase",
                profitTarget: <>5%</>,
                minDays: "3 Days",
            },
        ];

        const losses: LossBlock[] = [
            {
                icon: "analytics",
                title: "Maximum Daily Loss (5%)",
                bullets: [
                    <>Daily loss limit: 5% of starting equity or balance (higher value).</>,
                    <>Includes floating and closed PnL.</>,
                    <>Resets at 00:00 CE(S)T/server time.</>,
                ],
            },
            {
                icon: "account_balance_wallet",
                title: "Maximum Loss (10%)",
                bullets: [
                    <>Total loss limit: 10% of initial account size.</>,
                    <>Equity or balance must never fall below this limit.</>,
                    <span className="text-[#06e4f9] font-medium italic" key="ex">
                        Example: $100,000 account → $90,000 minimum.
                    </span>,
                ],
            },
        ];

        return {
            headerTitle: "STEP 2 – OBSIDIAN FUNDED Evaluation",
            headerBody:
                "The OBSIDIAN FUNDED Evaluation has two phases: Student (Phase I) and Practitioner (Phase II). Both must be passed to become a Master (Funded) Trader.",
            introA:
                "A consistent trading strategy and risk management are required. After reaching the Phase II profit target, the account is manually reviewed by the Risk Team within 2 working days.",
            introB: "Any rule breach results in immediate position closure, account termination, and loss of rewards.",
            phaseCards,
            phaseExtraNote: undefined,
            losses,
            strategyTitle: "Trading Strategy Rules",
            lastProhibited: "Third-party account management",
            reminderLines: ["Skill, discipline, and consistency are required.", "You cannot cheat your way in."],
            reminderUppercase: true,
        };
    }, [mode]);

    return (
        <PageShell>
            <main className="flex-1 flex flex-col items-center justify-start py-12 px-4 lg:px-0">
                <ToggleTabs value={mode} onChange={setMode} />

                <div className="liquid-glass w-full max-w-[960px] rounded-xl overflow-hidden flex flex-col h-[80vh] mt-6">
                    {/* Panel Header */}
                    <div className="p-8 lg:p-12 border-b border-white/10 flex flex-col gap-4">
                        <h2 className="text-4xl lg:text-5xl font-black tracking-tight text-white">
                            {mode === "step2" ? <span className="uppercase">{config.headerTitle}</span> : config.headerTitle}
                        </h2>
                        <p className="text-white/60 text-lg leading-relaxed max-w-3xl">{config.headerBody}</p>
                    </div>

                    {/* Content (scrollable) */}
                    <div className="flex-1 overflow-y-auto custom-scrollbar p-8 lg:p-12 space-y-12">
                        {/* Intro */}
                        <section className="space-y-4">
                            <p className="text-white/80 leading-relaxed">{config.introA}</p>
                            <p className="text-white/80 leading-relaxed italic border-l-2 border-[#06e4f9]/40 pl-4">
                                {config.introB}
                            </p>
                        </section>

                        {/* Phases */}
                        <PhaseCards cards={config.phaseCards} extraNote={config.phaseExtraNote} />

                        {/* Loss limits */}
                        <LossLimits blocks={config.losses} />

                        {/* News & Weekend */}
                        <NewsWeekend />

                        {/* Trading rules */}
                        <ProhibitedStrategies title={config.strategyTitle} lastItemLabel={config.lastProhibited} />

                        {/* Reminder */}
                        <ReminderFooter subtitleLines={config.reminderLines} uppercase={config.reminderUppercase} />
                    </div>

                    {/* Sticky bottom */}
                    <div className="bg-[#0a0a0a]/90 border-t border-white/10 p-4 flex justify-between items-center text-[10px] text-white/30 uppercase font-bold tracking-widest">
                        <span>Obsidian Funded © 2024</span>
                    </div>
                </div>
            </main>

            <footer className="w-full py-8 text-center text-white/20 text-[10px] uppercase tracking-[0.5em]">
                Institutional Grade Proprietary Trading Infrastructure
            </footer>
        </PageShell>
    );
}
