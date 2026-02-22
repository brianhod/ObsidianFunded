import React, { useState } from "react";

const Registration: React.FC = () => {
    const [form, setForm] = useState({
        fullName: "",
        email: "",
        country: "",
        password: "",
        terms: false,
    });

    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value, type } = e.target;
        const checked =
            type === "checkbox" ? (e.target as HTMLInputElement).checked : false;

        setForm((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form Submitted:", form);
    };

    return (
        <div className="bg-background-dark text-white min-h-screen font-display flex flex-col overflow-x-hidden">
            {/* Custom Styles */}
            <style>{`
        .particles-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
          overflow: hidden;
          background: radial-gradient(circle at 50% 50%, #0a1b1d 0%, #000 100%);
        }
        .particle {
          position: absolute;
          background: #06e4f9;
          border-radius: 50%;
          opacity: 0.3;
          filter: blur(1px);
        }
        .liquid-glass {
          background: rgba(15, 33, 35, 0.7);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(6, 228, 249, 0.2);
          box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.8);
        }
        .primary-glow {
          box-shadow: 0 0 15px rgba(6, 228, 249, 0.4);
          transition: all 0.3s ease;
        }
        .primary-glow:hover {
          box-shadow: 0 0 25px rgba(6, 228, 249, 0.6);
          transform: translatey(-1px);
        }
        select {
          appearance: none;
          background-position: right 0.5rem center;
          background-repeat: no-repeat;
          background-size: 1.5em 1.5em;
        }
      `}</style>

            {/* Particle Background */}
            <div className="particles-container">
                <div className="particle w-1 h-1 top-1/4 left-1/4" />
                <div className="particle w-2 h-2 top-1/3 left-2/3 opacity-20" />
                <div className="particle w-1 h-1 top-3/4 left-1/2" />
                <div className="particle w-0.5 h-0.5 top-1/2 left-10 opacity-40" />
                <div className="particle w-1.5 h-1.5 top-20 right-20 opacity-10" />
                <div className="particle w-1 h-1 bottom-10 right-1/4" />
            </div>

            <div className="relative z-10 flex flex-col min-h-screen">
                {/* Header */}
                <header className="flex items-center justify-between px-6 py-6 lg:px-20">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 flex items-center justify-center bg-black border border-primary/40 rounded-lg">
                            <svg
                                className="text-primary w-6 h-6"
                                fill="none"
                                viewBox="0 0 48 48"
                            >
                                <path
                                    clipRule="evenodd"
                                    fillRule="evenodd"
                                    d="M47.2426 24L24 47.2426L0.757355 24L24 0.757355L47.2426 24ZM12.2426 21H35.7574L24 9.24264L12.2426 21Z"
                                    fill="currentColor"
                                />
                            </svg>
                        </div>
                        <h2 className="text-white text-xl font-extrabold tracking-tighter">
                            OBSIDIAN FUNDED
                        </h2>
                    </div>
                    <span className="hidden md:block text-xs text-primary/60 font-medium uppercase tracking-widest">
                        Master Class Protocol v2.4
                    </span>
                </header>

                {/* Main */}
                <main className="flex-1 flex items-center justify-center px-4 py-12">
                    <div className="w-full max-w-[520px] liquid-glass rounded-xl p-8 md:p-10">
                        <div className="text-center mb-8">
                            <h1 className="text-3xl font-bold mb-2">
                                Join the Master Class
                            </h1>
                            <p className="text-primary/70 text-sm">
                                Create your proprietary trading account
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* Full Name */}
                            <input
                                name="fullName"
                                placeholder="Full Name"
                                value={form.fullName}
                                onChange={handleChange}
                                className="w-full bg-black/40 border border-white/10 rounded-lg h-14 px-4 text-white"
                            />

                            {/* Email */}
                            <input
                                name="email"
                                type="email"
                                placeholder="Email Address"
                                value={form.email}
                                onChange={handleChange}
                                className="w-full bg-black/40 border border-white/10 rounded-lg h-14 px-4 text-white"
                            />

                            <div className="grid md:grid-cols-2 gap-4">
                                {/* Country */}
                                <select
                                    name="country"
                                    value={form.country}
                                    onChange={handleChange}
                                    className="w-full bg-black/40 border border-white/10 rounded-lg h-14 px-4 text-white"
                                >
                                    <option value="">Select Country</option>
                                    <option value="us">United States</option>
                                    <option value="uk">United Kingdom</option>
                                    <option value="ca">Canada</option>
                                    <option value="de">Germany</option>
                                </select>

                                {/* Password */}
                                <div className="relative">
                                    <input
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Password"
                                        value={form.password}
                                        onChange={handleChange}
                                        className="w-full bg-black/40 border border-white/10 rounded-lg h-14 px-4 pr-12 text-white"/>
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40">
                                        {showPassword ? "🙈" : "👁️"}
                                    </button>
                                </div>
                            </div>

                            {/* Terms */}
                            <label className="flex items-center gap-2 text-xs text-white/60">
                                <input
                                    type="checkbox"
                                    name="terms"
                                    checked={form.terms}
                                    onChange={handleChange}
                                />
                                I agree to the Terms and Conditions
                            </label>

                            <button
                                type="submit"
                                className="w-full h-14 bg-primary text-black font-extrabold uppercase rounded-lg primary-glow"
                            >
                                Create Account
                            </button>
                        </form>
                    </div>
                </main>

                <footer className="py-6 text-center text-xs text-white/20 uppercase">
                    © {new Date().getFullYear()} Obsidian Funded Management Group
                </footer>
            </div>
        </div>
    );
};

export default Registration;
