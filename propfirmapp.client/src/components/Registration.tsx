import React, { useState } from "react";
import { registerUser } from "../api";

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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const checked = type === "checkbox" ? (e.target as HTMLInputElement).checked : false;

        setForm((prev) => ({...prev, [name]: type === "checkbox" ? checked : value,}));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (form.password !== form.confirmPassword) {
            console.error("Passwords do not match");
            return;
        }

        if (!form.agreeTerms) {
            console.error("You must agree to the terms");
            return;
        }

        if (!form.confirmId) {
            console.error("You must confirm ID availability");
            return;
        }

        try {
            const result = await registerUser({
                userName: form.email,
                title: form.title,
                firstName: form.firstName,
                lastName: form.lastName,
                dateofBirth: form.dob,
                email: form.email,
                password: form.password,
                phoneNumberPrefix: form.phoneCode,
                phoneNumber: form.phoneNumber,
                referalCode: form.referralCode,
                over18: form.agreeTerms,
                detailsCorrect: form.confirmId,
                recieveMarketingMaterial: form.marketingOptIn,
            });

            console.log("Registration success:", result);
        } catch (error) {
            console.error("Registration failed:", error);
        }

        console.log("Form Submitted:", form);
    };
    const countryOptions =
        [
            { value: "", code: "", label: "Select Country" },
            { value: "af", code: "AF001", label: "Afghanistan" },
            { value: "ax", code: "AX001", label: "Åland Islands" },
            { value: "al", code: "AL001", label: "Albania" },
            { value: "dz", code: "DZ001", label: "Algeria" },
            { value: "as", code: "AS001", label: "American Samoa" },
            { value: "ad", code: "AD001", label: "Andorra" },
            { value: "ao", code: "AO001", label: "Angola" },
            { value: "ai", code: "AI001", label: "Anguilla" },
            { value: "aq", code: "AQ001", label: "Antarctica" },
            { value: "ag", code: "AG001", label: "Antigua and Barbuda" },
            { value: "ar", code: "AR001", label: "Argentina" },
            { value: "am", code: "AM001", label: "Armenia" },
            { value: "aw", code: "AW001", label: "Aruba" },
            { value: "au", code: "AU001", label: "Australia" },
            { value: "at", code: "AT001", label: "Austria" },
            { value: "az", code: "AZ001", label: "Azerbaijan" },
            { value: "bs", code: "BS001", label: "Bahamas" },
            { value: "bh", code: "BH001", label: "Bahrain" },
            { value: "bd", code: "BD001", label: "Bangladesh" },
            { value: "bb", code: "BB001", label: "Barbados" },
            { value: "by", code: "BY001", label: "Belarus" },
            { value: "be", code: "BE001", label: "Belgium" },
            { value: "bz", code: "BZ001", label: "Belize" },
            { value: "bj", code: "BJ001", label: "Benin" },
            { value: "bm", code: "BM001", label: "Bermuda" },
            { value: "bt", code: "BT001", label: "Bhutan" },
            { value: "bo", code: "BO001", label: "Bolivia" },
            { value: "bq", code: "BQ001", label: "Bonaire, Sint Eustatius and Saba" },
            { value: "ba", code: "BA001", label: "Bosnia and Herzegovina" },
            { value: "bw", code: "BW001", label: "Botswana" },
            { value: "bv", code: "BV001", label: "Bouvet Island" },
            { value: "br", code: "BR001", label: "Brazil" },
            { value: "io", code: "IO001", label: "British Indian Ocean Territory" },
            { value: "bn", code: "BN001", label: "Brunei Darussalam" },
            { value: "bg", code: "BG001", label: "Bulgaria" },
            { value: "bf", code: "BF001", label: "Burkina Faso" },
            { value: "bi", code: "BI001", label: "Burundi" },
            { value: "cv", code: "CV001", label: "Cabo Verde" },
            { value: "kh", code: "KH001", label: "Cambodia" },
            { value: "cm", code: "CM001", label: "Cameroon" },
            { value: "ca", code: "CA001", label: "Canada" },
            { value: "ky", code: "KY001", label: "Cayman Islands" },
            { value: "cf", code: "CF001", label: "Central African Republic" },
            { value: "td", code: "TD001", label: "Chad" },
            { value: "cl", code: "CL001", label: "Chile" },
            { value: "cn", code: "CN001", label: "China" },
            { value: "cx", code: "CX001", label: "Christmas Island" },
            { value: "cc", code: "CC001", label: "Cocos (Keeling) Islands" },
            { value: "co", code: "CO001", label: "Colombia" },
            { value: "km", code: "KM001", label: "Comoros" },
            { value: "cg", code: "CG001", label: "Congo" },
            { value: "cd", code: "CD001", label: "Congo, Democratic Republic of the" },
            { value: "ck", code: "CK001", label: "Cook Islands" },
            { value: "cr", code: "CR001", label: "Costa Rica" },
            { value: "ci", code: "CI001", label: "Côte d'Ivoire" },
            { value: "hr", code: "HR001", label: "Croatia" },
            { value: "cu", code: "CU001", label: "Cuba" },
            { value: "cw", code: "CW001", label: "Curaçao" },
            { value: "cy", code: "CY001", label: "Cyprus" },
            { value: "cz", code: "CZ001", label: "Czechia" },
            { value: "dk", code: "DK001", label: "Denmark" },
            { value: "dj", code: "DJ001", label: "Djibouti" },
            { value: "dm", code: "DM001", label: "Dominica" },
            { value: "do", code: "DO001", label: "Dominican Republic" },
            { value: "ec", code: "EC001", label: "Ecuador" },
            { value: "eg", code: "EG001", label: "Egypt" },
            { value: "sv", code: "SV001", label: "El Salvador" },
            { value: "gq", code: "GQ001", label: "Equatorial Guinea" },
            { value: "er", code: "ER001", label: "Eritrea" },
            { value: "ee", code: "EE001", label: "Estonia" },
            { value: "sz", code: "SZ001", label: "Eswatini" },
            { value: "et", code: "ET001", label: "Ethiopia" },
            { value: "fk", code: "FK001", label: "Falkland Islands (Malvinas)" },
            { value: "fo", code: "FO001", label: "Faroe Islands" },
            { value: "fj", code: "FJ001", label: "Fiji" },
            { value: "fi", code: "FI001", label: "Finland" },
            { value: "fr", code: "FR001", label: "France" },
            { value: "gf", code: "GF001", label: "French Guiana" },
            { value: "pf", code: "PF001", label: "French Polynesia" },
            { value: "tf", code: "TF001", label: "French Southern Territories" },
            { value: "ga", code: "GA001", label: "Gabon" },
            { value: "gm", code: "GM001", label: "Gambia" },
            { value: "ge", code: "GE001", label: "Georgia" },
            { value: "de", code: "DE001", label: "Germany" },
            { value: "gh", code: "GH001", label: "Ghana" },
            { value: "gi", code: "GI001", label: "Gibraltar" },
            { value: "gr", code: "GR001", label: "Greece" },
            { value: "gl", code: "GL001", label: "Greenland" },
            { value: "gd", code: "GD001", label: "Grenada" },
            { value: "gp", code: "GP001", label: "Guadeloupe" },
            { value: "gu", code: "GU001", label: "Guam" },
            { value: "gt", code: "GT001", label: "Guatemala" },
            { value: "gg", code: "GG001", label: "Guernsey" },
            { value: "gn", code: "GN001", label: "Guinea" },
            { value: "gw", code: "GW001", label: "Guinea-Bissau" },
            { value: "gy", code: "GY001", label: "Guyana" },
            { value: "ht", code: "HT001", label: "Haiti" },
            { value: "hm", code: "HM001", label: "Heard Island and McDonald Islands" },
            { value: "va", code: "VA001", label: "Holy See" },
            { value: "hn", code: "HN001", label: "Honduras" },
            { value: "hk", code: "HK001", label: "Hong Kong" },
            { value: "hu", code: "HU001", label: "Hungary" },
            { value: "is", code: "IS001", label: "Iceland" },
            { value: "in", code: "IN001", label: "India" },
            { value: "id", code: "ID001", label: "Indonesia" },
            { value: "ir", code: "IR001", label: "Iran" },
            { value: "iq", code: "IQ001", label: "Iraq" },
            { value: "ie", code: "IE001", label: "Ireland" },
            { value: "im", code: "IM001", label: "Isle of Man" },
            { value: "il", code: "IL001", label: "Israel" },
            { value: "it", code: "IT001", label: "Italy" },
            { value: "jm", code: "JM001", label: "Jamaica" },
            { value: "jp", code: "JP001", label: "Japan" },
            { value: "je", code: "JE001", label: "Jersey" },
            { value: "jo", code: "JO001", label: "Jordan" },
            { value: "kz", code: "KZ001", label: "Kazakhstan" },
            { value: "ke", code: "KE001", label: "Kenya" },
            { value: "ki", code: "KI001", label: "Kiribati" },
            { value: "kp", code: "KP001", label: "Korea, Democratic People's Republic of" },
            { value: "kr", code: "KR001", label: "Korea, Republic of" },
            { value: "kw", code: "KW001", label: "Kuwait" },
            { value: "kg", code: "KG001", label: "Kyrgyzstan" },
            { value: "la", code: "LA001", label: "Lao People's Democratic Republic" },
            { value: "lv", code: "LV001", label: "Latvia" },
            { value: "lb", code: "LB001", label: "Lebanon" },
            { value: "ls", code: "LS001", label: "Lesotho" },
            { value: "lr", code: "LR001", label: "Liberia" },
            { value: "ly", code: "LY001", label: "Libya" },
            { value: "li", code: "LI001", label: "Liechtenstein" },
            { value: "lt", code: "LT001", label: "Lithuania" },
            { value: "lu", code: "LU001", label: "Luxembourg" },
            { value: "mo", code: "MO001", label: "Macao" },
            { value: "mg", code: "MG001", label: "Madagascar" },
            { value: "mw", code: "MW001", label: "Malawi" },
            { value: "my", code: "MY001", label: "Malaysia" },
            { value: "mv", code: "MV001", label: "Maldives" },
            { value: "ml", code: "ML001", label: "Mali" },
            { value: "mt", code: "MT001", label: "Malta" },
            { value: "mh", code: "MH001", label: "Marshall Islands" },
            { value: "mq", code: "MQ001", label: "Martinique" },
            { value: "mr", code: "MR001", label: "Mauritania" },
            { value: "mu", code: "MU001", label: "Mauritius" },
            { value: "yt", code: "YT001", label: "Mayotte" },
            { value: "mx", code: "MX001", label: "Mexico" },
            { value: "fm", code: "FM001", label: "Micronesia, Federated States of" },
            { value: "md", code: "MD001", label: "Moldova, Republic of" },
            { value: "mc", code: "MC001", label: "Monaco" },
            { value: "mn", code: "MN001", label: "Mongolia" },
            { value: "me", code: "ME001", label: "Montenegro" },
            { value: "ms", code: "MS001", label: "Montserrat" },
            { value: "ma", code: "MA001", label: "Morocco" },
            { value: "mz", code: "MZ001", label: "Mozambique" },
            { value: "mm", code: "MM001", label: "Myanmar" },
            { value: "na", code: "NA001", label: "Namibia" },
            { value: "nr", code: "NR001", label: "Nauru" },
            { value: "np", code: "NP001", label: "Nepal" },
            { value: "nl", code: "NL001", label: "Netherlands" },
            { value: "nc", code: "NC001", label: "New Caledonia" },
            { value: "nz", code: "NZ001", label: "New Zealand" },
            { value: "ni", code: "NI001", label: "Nicaragua" },
            { value: "ne", code: "NE001", label: "Niger" },
            { value: "ng", code: "NG001", label: "Nigeria" },
            { value: "nu", code: "NU001", label: "Niue" },
            { value: "nf", code: "NF001", label: "Norfolk Island" },
            { value: "mk", code: "MK001", label: "North Macedonia" },
            { value: "mp", code: "MP001", label: "Northern Mariana Islands" },
            { value: "no", code: "NO001", label: "Norway" },
            { value: "om", code: "OM001", label: "Oman" },
            { value: "pk", code: "PK001", label: "Pakistan" },
            { value: "pw", code: "PW001", label: "Palau" },
            { value: "ps", code: "PS001", label: "Palestine, State of" },
            { value: "pa", code: "PA001", label: "Panama" },
            { value: "pg", code: "PG001", label: "Papua New Guinea" },
            { value: "py", code: "PY001", label: "Paraguay" },
            { value: "pe", code: "PE001", label: "Peru" },
            { value: "ph", code: "PH001", label: "Philippines" },
            { value: "pn", code: "PN001", label: "Pitcairn" },
            { value: "pl", code: "PL001", label: "Poland" },
            { value: "pt", code: "PT001", label: "Portugal" },
            { value: "pr", code: "PR001", label: "Puerto Rico" },
            { value: "qa", code: "QA001", label: "Qatar" },
            { value: "re", code: "RE001", label: "Réunion" },
            { value: "ro", code: "RO001", label: "Romania" },
            { value: "ru", code: "RU001", label: "Russian Federation" },
            { value: "rw", code: "RW001", label: "Rwanda" },
            { value: "bl", code: "BL001", label: "Saint Barthélemy" },
            { value: "sh", code: "SH001", label: "Saint Helena, Ascension and Tristan da Cunha" },
            { value: "kn", code: "KN001", label: "Saint Kitts and Nevis" },
            { value: "lc", code: "LC001", label: "Saint Lucia" },
            { value: "mf", code: "MF001", label: "Saint Martin (French part)" },
            { value: "pm", code: "PM001", label: "Saint Pierre and Miquelon" },
            { value: "vc", code: "VC001", label: "Saint Vincent and the Grenadines" },
            { value: "ws", code: "WS001", label: "Samoa" },
            { value: "sm", code: "SM001", label: "San Marino" },
            { value: "st", code: "ST001", label: "Sao Tome and Principe" },
            { value: "sa", code: "SA001", label: "Saudi Arabia" },
            { value: "sn", code: "SN001", label: "Senegal" },
            { value: "rs", code: "RS001", label: "Serbia" },
            { value: "sc", code: "SC001", label: "Seychelles" },
            { value: "sl", code: "SL001", label: "Sierra Leone" },
            { value: "sg", code: "SG001", label: "Singapore" },
            { value: "sx", code: "SX001", label: "Sint Maarten (Dutch part)" },
            { value: "sk", code: "SK001", label: "Slovakia" },
            { value: "si", code: "SI001", label: "Slovenia" },
            { value: "sb", code: "SB001", label: "Solomon Islands" },
            { value: "so", code: "SO001", label: "Somalia" },
            { value: "za", code: "ZA001", label: "South Africa" },
            { value: "gs", code: "GS001", label: "South Georgia and the South Sandwich Islands" },
            { value: "ss", code: "SS001", label: "South Sudan" },
            { value: "es", code: "ES001", label: "Spain" },
            { value: "lk", code: "LK001", label: "Sri Lanka" },
            { value: "sd", code: "SD001", label: "Sudan" },
            { value: "sr", code: "SR001", label: "Suriname" },
            { value: "sj", code: "SJ001", label: "Svalbard and Jan Mayen" },
            { value: "se", code: "SE001", label: "Sweden" },
            { value: "ch", code: "CH001", label: "Switzerland" },
            { value: "sy", code: "SY001", label: "Syrian Arab Republic" },
            { value: "tw", code: "TW001", label: "Taiwan, Province of China" },
            { value: "tj", code: "TJ001", label: "Tajikistan" },
            { value: "tz", code: "TZ001", label: "Tanzania, United Republic of" },
            { value: "th", code: "TH001", label: "Thailand" },
            { value: "tl", code: "TL001", label: "Timor-Leste" },
            { value: "tg", code: "TG001", label: "Togo" },
            { value: "tk", code: "TK001", label: "Tokelau" },
            { value: "to", code: "TO001", label: "Tonga" },
            { value: "tt", code: "TT001", label: "Trinidad and Tobago" },
            { value: "tn", code: "TN001", label: "Tunisia" },
            { value: "tr", code: "TR001", label: "Türkiye" },
            { value: "tm", code: "TM001", label: "Turkmenistan" },
            { value: "tc", code: "TC001", label: "Turks and Caicos Islands" },
            { value: "tv", code: "TV001", label: "Tuvalu" },
            { value: "ug", code: "UG001", label: "Uganda" },
            { value: "ua", code: "UA001", label: "Ukraine" },
            { value: "ae", code: "AE001", label: "United Arab Emirates" },
            { value: "gb", code: "GB001", label: "United Kingdom" },
            { value: "us", code: "US001", label: "United States" },
            { value: "um", code: "UM001", label: "United States Minor Outlying Islands" },
            { value: "uy", code: "UY001", label: "Uruguay" },
            { value: "uz", code: "UZ001", label: "Uzbekistan" },
            { value: "vu", code: "VU001", label: "Vanuatu" },
            { value: "ve", code: "VE001", label: "Venezuela" },
            { value: "vn", code: "VN001", label: "Viet Nam" },
            { value: "vg", code: "VG001", label: "Virgin Islands, British" },
            { value: "vi", code: "VI001", label: "Virgin Islands, U.S." },
            { value: "wf", code: "WF001", label: "Wallis and Futuna" },
            { value: "eh", code: "EH001", label: "Western Sahara" },
            { value: "ye", code: "YE001", label: "Yemen" },
            { value: "zm", code: "ZM001", label: "Zambia" },
            { value: "zw", code: "ZW001", label: "Zimbabwe" },
        ];

    return (
        <div
            className="min-h-screen bg-[#020202] text-slate-100 selection:bg-cyan-400/30"
            style={{background:"radial-gradient(circle at 20% 30%, rgba(6, 228, 249, 0.05) 0%, transparent 40%), radial-gradient(circle at 80% 70%, rgba(255, 255, 255, 0.03) 0%, transparent 40%), #020202",
                fontFamily: "Inter, sans-serif",}} >
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
                                        { value: "ms", label: "Ms." }
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
                                    options={countryOptions} />
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
                                <a className="font-bold text-cyan-400 hover:underline" href="https://app.obsidianfunded.com/login">
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
