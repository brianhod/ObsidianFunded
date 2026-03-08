import React, { useState } from "react";

type FormState = {
    firstName: string;
    lastName: string;
    title: string;
    dob: string;
    country: string;
    email: string;
    phoneCode: string;
    phoneNumber: string;
    password: string;
    confirmPassword: string;
    referralCode: string;
    agreeTerms: boolean;
    confirmId: boolean;
    marketingOptIn: boolean;
};

export default function ObsidianRegistration() {
    const [form, setForm] = useState<FormState>({
        firstName: "",
        lastName: "",
        title: "",
        dob: "",
        country: "",
        email: "",
        phoneCode: "+1",
        phoneNumber: "",
        password: "",
        confirmPassword: "",
        referralCode: "",
        agreeTerms: false,
        confirmId: false,
        marketingOptIn: false,
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
        <div
            className="min-h-screen bg-[#020202] text-slate-100 selection:bg-cyan-400/30"
            style={{
                background:
                    "radial-gradient(circle at 20% 30%, rgba(6, 228, 249, 0.05) 0%, transparent 40%), radial-gradient(circle at 80% 70%, rgba(255, 255, 255, 0.03) 0%, transparent 40%), #020202",
                fontFamily: "Inter, sans-serif",
            }}
        >
            <div className="flex min-h-screen w-full flex-col items-center justify-center p-4 md:p-8">
                <div className="flex w-full max-w-[800px] flex-col items-center gap-8">
                    <div className="group flex flex-col items-center gap-2">
                        <div className="size-14 text-cyan-400">
                            <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                <g clipPath="url(#clip0_6_535)">
                                    <path
                                        clipRule="evenodd"
                                        d="M47.2426 24L24 47.2426L0.757355 24L24 0.757355L47.2426 24ZM12.2426 21H35.7574L24 9.24264L12.2426 21Z"
                                        fill="currentColor"
                                        fillRule="evenodd"
                                    />
                                </g>
                                <defs>
                                    <clipPath id="clip0_6_535">
                                        <rect fill="white" height="48" width="48" />
                                    </clipPath>
                                </defs>
                            </svg>
                        </div>
                        <h1 className="text-xl font-black tracking-[0.2em] text-white">OBSIDIAN FUNDED</h1>
                    </div>

                    <div className="w-full rounded-xl border border-cyan-400/20 bg-[rgba(15,33,35,0.7)] p-6 shadow-2xl backdrop-blur-xl md:p-12">
                        <div className="mb-10 text-center">
                            <h2 className="text-3xl font-black uppercase italic tracking-tight text-white md:text-4xl">
                                Create Your Account
                            </h2>
                            <p className="mt-2 text-sm font-semibold uppercase tracking-widest text-cyan-400/70">
                                Join the elite trading community
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <Field label="First Name">
                                <TextInput name="firstName" placeholder="John" type="text" value={form.firstName} onChange={handleChange} />
                            </Field>

                            <Field label="Last Name">
                                <TextInput name="lastName" placeholder="Doe" type="text" value={form.lastName} onChange={handleChange} />
                            </Field>

                            <Field label="Title">
                                <SelectInput
                                    name="title"
                                    value={form.title}
                                    onChange={handleChange}
                                    options={[
                                        { value: "", label: "Select Title" },
                                        { value: "mr", label: "Mr." },
                                        { value: "mrs", label: "Mrs." },
                                        { value: "ms", label: "Ms." },
                                        { value: "mx", label: "Mx." },
                                    ]}
                                />
                            </Field>

                            <Field label="Date of Birth">
                                <TextInput name="dob" type="date" value={form.dob} onChange={handleChange} className="[color-scheme:dark]" />
                            </Field>

                            <Field label="Country" className="md:col-span-2">
                                <SelectInput
                                    name="country"
                                    value={form.country}
                                    onChange={handleChange}
                                    options={[
                                        { value: "", label: "Select Country" },
                                        { value: "us", label: "United States" },
                                        { value: "uk", label: "United Kingdom" },
                                        { value: "ca", label: "Canada" },
                                        { value: "au", label: "Australia" },
                                        { value: "de", label: "Germany" },
                                    ]}
                                />
                            </Field>

                            <Field label="Email Address" className="md:col-span-2">
                                <TextInput
                                    name="email"
                                    placeholder="trader@obsidian.com"
                                    type="email"
                                    value={form.email}
                                    onChange={handleChange}
                                />
                            </Field>

                            <Field label="Phone Number" className="md:col-span-2">
                                <div className="flex gap-2">
                                    <select
                                        name="phoneCode"
                                        value={form.phoneCode}
                                        onChange={handleChange}
                                        className="w-24 rounded-lg border border-slate-700/50 bg-slate-900/50 px-2 py-3 text-white outline-none transition-all focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                                    >
                                        <option value="+1">+1</option>
                                        <option value="+44">+44</option>
                                        <option value="+61">+61</option>
                                        <option value="+49">+49</option>
                                    </select>
                                    <TextInput
                                        name="phoneNumber"
                                        placeholder="555-0123"
                                        type="tel"
                                        className="flex-1"
                                        value={form.phoneNumber}
                                        onChange={handleChange}
                                    />
                                </div>
                            </Field>

                            <Field label="Password">
                                <PasswordInput
                                    name="password"
                                    placeholder="••••••••"
                                    value={form.password}
                                    onChange={handleChange}
                                    visible={showPassword}
                                    onToggle={() => setShowPassword((prev) => !prev)}
                                />
                            </Field>

                            <Field label="Confirm Password">
                                <PasswordInput
                                    name="confirmPassword"
                                    placeholder="••••••••"
                                    value={form.confirmPassword}
                                    onChange={handleChange}
                                    visible={showConfirmPassword}
                                    onToggle={() => setShowConfirmPassword((prev) => !prev)}
                                />
                            </Field>

                            <Field label="Referral Code" hint="(Optional)" className="md:col-span-2">
                                <TextInput
                                    name="referralCode"
                                    placeholder="Enter code"
                                    type="text"
                                    value={form.referralCode}
                                    onChange={handleChange}
                                />
                            </Field>

                            <div className="space-y-4 py-4 md:col-span-2">
                                <CheckboxRow>
                                    <input
                                        type="checkbox"
                                        name="agreeTerms"
                                        checked={form.agreeTerms}
                                        onChange={handleChange}
                                        className="size-5 rounded border-slate-700 bg-slate-900 text-cyan-400 transition-all focus:ring-cyan-400"
                                    />
                                    <span>
                                        I certify that I am at least 18 years old and I agree to the{" "}
                                        <a className="text-cyan-400 hover:underline" href="#">
                                            User Agreement
                                        </a>{" "}
                                        and{" "}
                                        <a className="text-cyan-400 hover:underline" href="#">
                                            Privacy Policy
                                        </a>
                                        .
                                    </span>
                                </CheckboxRow>

                                <CheckboxRow>
                                    <input
                                        type="checkbox"
                                        name="confirmId"
                                        checked={form.confirmId}
                                        onChange={handleChange}
                                        className="size-5 rounded border-slate-700 bg-slate-900 text-cyan-400 transition-all focus:ring-cyan-400"
                                    />
                                    <span>
                                        I confirm that I hold a valid government-issued photo ID for account verification purposes.
                                    </span>
                                </CheckboxRow>

                                <CheckboxRow>
                                    <input
                                        type="checkbox"
                                        name="marketingOptIn"
                                        checked={form.marketingOptIn}
                                        onChange={handleChange}
                                        className="size-5 rounded border-slate-700 bg-slate-900 text-cyan-400 transition-all focus:ring-cyan-400"
                                    />
                                    <span>
                                        Send me obsidian trading insights, market updates, and exclusive funding opportunities.
                                    </span>
                                </CheckboxRow>
                            </div>

                            <div className="pt-4 md:col-span-2">
                                <button
                                    type="submit"
                                    className="w-full rounded-lg bg-cyan-400 py-5 text-xl font-black uppercase tracking-[0.1em] text-[#020202] shadow-[0_0_15px_rgba(6,228,249,0.3)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_0_25px_rgba(6,228,249,0.6)]"
                                >
                                    Get Funded
                                </button>
                            </div>
                        </form>

                        <div className="mt-12 flex flex-col items-center gap-6 border-t border-slate-800/50 pt-8">
                            <p className="text-sm text-slate-400">
                                Already have an account?{" "}
                                <a className="font-bold text-cyan-400 hover:underline" href="#">
                                    LOGIN HERE
                                </a>
                            </p>

                            <div className="flex w-full max-w-sm items-center gap-4">
                                <div className="h-px flex-1 bg-slate-800" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-600">
                                    Alternative Access
                                </span>
                                <div className="h-px flex-1 bg-slate-800" />
                            </div>

                            <div className="flex flex-wrap justify-center gap-4">
                                <button className="flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-900 px-6 py-3 transition-colors hover:border-cyan-400">
                                    <img
                                        alt="Google Logo"
                                        className="size-5"
                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCWqmU-MKbOom6o0ACgGw9UiBorVrlFmsHJFCRUy7MwHANZXbeozky7dOi48qxI-YfqFWij8rGOsFCFRjxD9SH1p0hguP8VKLCO5K4vN61kwH8FZQ40Qiy1vrVNj6G34ewY2BUxUCEZdLd1pny3iTK6gTpymmn0WHcMdYpGagR2KQUyrnkzKPVBSDLWDN1cXhOQNmY7GkBUXZaSWKcbX1wiE7SGSOjEGSibiATzJXZgT9fkACVnv5V_sgscy_Bwtj2uR-21fnm0yQp9"
                                    />
                                    <span className="text-xs font-bold uppercase tracking-wider">Google</span>
                                </button>

                                <button className="flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-900 px-6 py-3 transition-colors hover:border-cyan-400">
                                    <span className="text-xl"></span>
                                    <span className="text-xs font-bold uppercase tracking-wider">Apple ID</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    <footer className="mb-12 flex flex-wrap justify-center gap-x-8 gap-y-2 text-[10px] font-bold uppercase tracking-widest text-slate-600">
                        <a className="transition-colors hover:text-cyan-400" href="#">
                            Support
                        </a>
                        <a className="transition-colors hover:text-cyan-400" href="#">
                            Terms of Service
                        </a>
                        <a className="transition-colors hover:text-cyan-400" href="#">
                            Risk Disclosure
                        </a>
                        <span>© 2024 OBSIDIAN FUNDED LTD.</span>
                    </footer>
                </div>
            </div>
        </div>
    );
}

function Field({
    label,
    hint,
    className = "",
    children,
}: {
    label: string;
    hint?: string;
    className?: string;
    children: React.ReactNode;
}) {
    return (
        <div className={`flex flex-col gap-2 ${className}`}>
            <label className="ml-1 text-xs font-bold uppercase tracking-wider text-slate-400">
                {label}{" "}
                {hint ? <span className="font-normal italic text-slate-500">{hint}</span> : null}
            </label>
            {children}
        </div>
    );
}

function TextInput({ className = "", ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
    return (
        <input
            {...props}
            className={`w-full rounded-lg border border-slate-700/50 bg-slate-900/50 px-4 py-3 text-white outline-none transition-all placeholder:text-slate-600 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 focus:shadow-[0_0_10px_rgba(6,228,249,0.4)] ${className}`}
        />
    );
}

function SelectInput({
    options = [],
    className = "",
    ...props
}: React.SelectHTMLAttributes<HTMLSelectElement> & {
    options: { value: string; label: string }[];
}) {
    return (
        <select
            {...props}
            className={`w-full rounded-lg border border-slate-700/50 bg-slate-900/50 px-4 py-3 text-white outline-none transition-all focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 ${className}`}
        >
            {options.map((option) => (
                <option key={`${option.value}-${option.label}`} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
}

function PasswordInput({
    visible,
    onToggle,
    className = "",
    ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
    visible: boolean;
    onToggle: () => void;
}) {
    return (
        <div className="relative">
            <TextInput {...props} type={visible ? "text" : "password"} className={`pr-12 ${className}`} />
            <button
                type="button"
                onClick={onToggle}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 transition hover:text-cyan-400"
                aria-label={visible ? "Hide password" : "Show password"}
            >
                {visible ? "🙈" : "👁️"}
            </button>
        </div>
    );
}

function CheckboxRow({ children }: { children: React.ReactNode }) {
    return <label className="group flex cursor-pointer items-start gap-3 text-sm leading-tight text-slate-300 transition-colors hover:text-white">{children}</label>;
}
