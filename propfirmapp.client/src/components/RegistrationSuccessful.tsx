import React from "react";

// Inline SVG Icons (no external dependencies)
function ArrowRightIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            {...props}
        >
            <path d="M5 12h14" />
            <path d="m13 5 7 7-7 7" />
        </svg>
    );
}

function CheckCircleIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            {...props}
        >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <path d="m22 4-10 10-3-3" />
        </svg>
    );
}

export type RegistrationSuccessfulPageProps = {
    dashboardHref?: string;
    onGoToDashboard?: () => void;
    title?: string;
    subtitle?: string;
    description?: string;
    footerNote?: string;
    footerText?: string;
};

const RegistrationSuccessfulPage: React.FC<RegistrationSuccessfulPageProps> = ({
    dashboardHref = "#",
    onGoToDashboard,
    title = "Registration Successful",
    subtitle = "Welcome to the elite.",
    description =
    "Your account has been created. Please check your email to verify your address and start your challenge.",
    footerNote = "Verification link expires in 24 hours",
    footerText = "© " + new Date().getFullYear() +" Obsidian Funded Management Group. Secure Terminal.",
}) => {
    return (
        <div className="min-h-screen w-full bg-black text-white overflow-x-hidden">
            <div
                className="fixed inset-0 z-0"
                style={{
                    background:
                        "radial-gradient(circle at 50% 50%, #0a1b1d 0%, #000 100%)",
                }}
            />

            <div className="relative z-10 flex min-h-screen flex-col">
                <main className="flex flex-1 flex-col items-center justify-center px-4 py-12">
                    <div className="w-full max-w-[520px] rounded-xl border border-[rgba(6,228,249,0.2)] bg-[rgba(15,33,35,0.7)] p-8 text-center shadow-[0_8px_32px_rgba(0,0,0,0.8)] backdrop-blur-[20px] md:p-12">
                        <div className="mb-8 flex justify-center">
                            <div className="flex h-24 w-24 items-center justify-center rounded-full border-2 border-[rgba(6,228,249,0.3)] bg-[rgba(6,228,249,0.05)]">
                                <CheckCircleIcon
                                    className="h-14 w-14 text-[#06e4f9] drop-shadow-[0_0_15px_rgba(6,228,249,0.6)]"
                                />
                            </div>
                        </div>

                        <h1 className="mb-4 text-3xl font-extrabold uppercase tracking-[0.1em] md:text-4xl">
                            {title}
                        </h1>

                        <div className="mb-10 space-y-4">
                            <p className="text-lg font-bold uppercase tracking-widest text-[#06e4f9]">
                                {subtitle}
                            </p>
                            <p className="text-base leading-relaxed text-white/60">
                                {description}
                            </p>
                        </div>

                        {onGoToDashboard ? (
                            <button
                                type="button"
                                onClick={onGoToDashboard}
                                className="group flex h-14 w-full items-center justify-center gap-2 rounded-lg bg-[#06e4f9] font-extrabold uppercase tracking-widest text-black transition-all hover:-translate-y-[1px] hover:shadow-[0_0_30px_rgba(6,228,249,0.7)] shadow-[0_0_20px_rgba(6,228,249,0.5)]"
                            >
                                Go to Dashboard
                                <ArrowRightIcon className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                            </button>
                        ) : (
                            <a
                                href={dashboardHref}
                                className="group flex h-14 w-full items-center justify-center gap-2 rounded-lg bg-[#06e4f9] font-extrabold uppercase tracking-widest text-black transition-all hover:-translate-y-[1px] hover:shadow-[0_0_30px_rgba(6,228,249,0.7)] shadow-[0_0_20px_rgba(6,228,249,0.5)]"
                            >
                                Go to Dashboard
                                <ArrowRightIcon className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                            </a>
                        )}

                        <div className="mt-10 border-t border-white/10 pt-8">
                            <p className="text-xs uppercase tracking-widest text-white/40">
                                {footerNote}
                            </p>
                        </div>
                    </div>
                </main>

                <footer className="relative z-10 px-10 py-6 text-center text-[10px] uppercase tracking-[0.3em] text-white/20">
                    {footerText}
                </footer>
            </div>
        </div>
    );
};

export default RegistrationSuccessfulPage;
