
import { useState } from "react";
import type { FormEvent } from "react";


const Login: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Replace with real authentication logic
        console.log("Login attempt:", { email, password });
    };

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

                            {/* Title */}
                            <div className="flex flex-col items-center mb-8">
                                <div className="w-16 h-16 mb-4 bg-background-dark/50 p-3 rounded-xl border border-primary/20 flex items-center justify-center">
                                    <svg className="text-primary" fill="none" viewBox="0 0 48 48">
                                        <path
                                            fill="currentColor"
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M47.2426 24L24 47.2426L0.757355 24L24 0.757355L47.2426 24ZM12.2426 21H35.7574L24 9.24264L12.2426 21Z"
                                        />
                                    </svg>
                                </div>
                                <h1 className="text-white text-3xl font-bold text-center tracking-tight">
                                    Welcome Back
                                </h1>
                                <p className="text-slate-400 mt-2 text-sm">
                                    Access your proprietary trading terminal
                                </p>
                            </div>

                            {/* Form */}
                            <form className="space-y-5" onSubmit={handleSubmit}>

                                {/* Email */}
                                <div className="flex flex-col gap-2">
                                    <label className="text-slate-300 text-sm font-medium ml-1">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        placeholder="name@company.com"
                                        className="w-full bg-[#1b2727]/50 border border-[#3a5555] focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all duration-300 rounded-lg h-12 px-4 text-white placeholder:text-slate-500 outline-none"
                                    />
                                </div>

                                {/* Password */}
                                <div className="flex flex-col gap-2">
                                    <div className="flex justify-between items-center ml-1">
                                        <label className="text-slate-300 text-sm font-medium">
                                            Password
                                        </label>
                                        <a
                                            href="#"
                                            className="text-primary text-xs font-semibold hover:underline"
                                        >
                                            Forgot Password?
                                        </a>
                                    </div>

                                    <div className="flex w-full">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                            placeholder="Enter secure password"
                                            className="flex-1 bg-[#1b2727]/50 border border-[#3a5555] border-r-0 focus:border-primary rounded-l-lg h-12 px-4 text-white placeholder:text-slate-500 outline-none"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword((prev) => !prev)}
                                            className="px-4 bg-[#1b2727]/50 border border-[#3a5555] border-l-0 rounded-r-lg text-slate-400 hover:text-primary transition-colors"
                                        >
                                            {showPassword ? "Hide" : "Show"}
                                        </button>
                                    </div>
                                </div>

                                {/* Submit */}
                                <div className="pt-4">
                                    <button
                                        type="submit"
                                        className="w-full bg-primary text-background-dark font-bold text-base h-12 rounded-lg shadow-lg hover:brightness-110 active:scale-[0.98] transition-all"
                                    >
                                        Sign In to Terminal
                                    </button>
                                </div>
                            </form>

                            {/* Footer */}
                            <div className="mt-8 pt-6 border-t border-white/5 text-center">
                                <p className="text-slate-400 text-sm">
                                    New to Obsidian?
                                    <a href="#" className="text-primary font-bold hover:underline ml-1">
                                        Register Account
                                    </a>
                                </p>
                            </div>
                        </div>

                    </div>
                </main>

                {/* Footer */}
                <footer className="px-6 py-8 text-center">
                    <p className="text-slate-600 text-xs font-medium uppercase tracking-widest">
                        © 2024 Obsidian Funded Group. All Rights Reserved.
                    </p>
                </footer>
            </div>
        </div>
    );
};

export default Login;
