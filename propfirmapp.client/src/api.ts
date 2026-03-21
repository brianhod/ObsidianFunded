const API_BASE = "https://app.obsidianfunded.com";

export interface ErrorResponse {
    message?: string;
}

export interface LoginRequest {
    userName?: string;
    password?: string;
}

export interface LoginResponse {
    accessToken?: string;
    refreshToken?: string;
    expiresIn?: number;
    tokenType?: string;
    message?: string;
}

export interface RefreshRequest {
    refreshToken?: string;
}

export interface RevokeRequest {
    refreshToken?: string;
}

export interface RegisterRequest {
    userName?: string;
    title?: string;
    firstName?: string;
    lastName?: string;
    dateofBirth?: string;
    email?: string;
    password?: string;
    phoneNumberPrefix?: string;
    phoneNumber?: string;
    referalCode?: string;
    over18?: boolean;
    detailsCorrect?: boolean;
    recieveMarketingMaterial?: boolean;
}

export interface RegisterResponse {
    id?: string;
    userName?: string;
    email?: string;
    message?: string;
}

async function safeJson<T>(response: Response): Promise<T | null> {
    const text = await response.text();
    try {
        return text ? (JSON.parse(text) as T) : null;
    } catch {
        return null;
    }
}

function getAccessToken(): string | null {
    return localStorage.getItem("accessToken");
}

function getRefreshToken(): string | null {
    return localStorage.getItem("refreshToken");
}

function setTokens(accessToken?: string, refreshToken?: string): void {
    if (accessToken) localStorage.setItem("accessToken", accessToken);
    if (refreshToken) localStorage.setItem("refreshToken", refreshToken);
}

function clearTokens(): void {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
}

export async function registerUser(payload: RegisterRequest): Promise<RegisterResponse> {

    const res = await fetch(`${API_BASE}/api/user/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });

    const data = await safeJson<RegisterResponse | ErrorResponse>(res);

    if (!res.ok) {
        throw new Error((data as ErrorResponse)?.message || "Registration failed");
    }

    return (data as RegisterResponse) ?? {};
}

export async function loginUser(payload: LoginRequest): Promise<LoginResponse> {

    const url = `${API_BASE}/api/auth/login`;
    console.log("Request URL:", url);

    try {
        const res = await fetch(`${API_BASE}/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        const data = await safeJson<LoginResponse | ErrorResponse>(res);

        if (!res.ok) {
            throw new Error((data as ErrorResponse)?.message || "Login failed");
        }

        const loginData = (data as LoginResponse) ?? {};
        setTokens(loginData.accessToken, loginData.refreshToken);
        return loginData;

    } catch (error) {
        console.error("loginUser failed:", error);

        if (error instanceof TypeError) {
            throw new Error("Network error or CORS issue");
        }

        console.error("loginUser failed:", error);
        throw error;
    }
    
}

export async function refreshAuthToken(): Promise<LoginResponse | Record<string, never>> {
    const payload: RefreshRequest = {
        refreshToken: getRefreshToken() ?? undefined,
    };

    const res = await fetch(`${API_BASE}/api/auth/refresh`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });

    const data = await safeJson<LoginResponse | ErrorResponse>(res);

    if (!res.ok) {
        throw new Error((data as ErrorResponse)?.message || "Token refresh failed");
    }

    const refreshData = (data as LoginResponse) ?? {};
    setTokens(refreshData.accessToken, refreshData.refreshToken);

    return refreshData;
}

export async function revokeToken(): Promise<Record<string, never> | ErrorResponse> {
    const payload: RevokeRequest = {
        refreshToken: getRefreshToken() ?? undefined,
    };

    const res = await fetch(`${API_BASE}/api/auth/revoke`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });

    const data = await safeJson<ErrorResponse>(res);

    if (!res.ok) {
        throw new Error(data?.message || "Token revoke failed");
    }

    clearTokens();
    return data ?? {};
}

export async function getAdminArea<T = unknown>(): Promise<T> {
    const token = getAccessToken();

    const res = await fetch(`${API_BASE}/api/admin/admin-area`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const data = await safeJson<T | ErrorResponse>(res);

    if (!res.ok) {
        throw new Error((data as ErrorResponse)?.message || "Failed to fetch admin area");
    }

    return data as T;
}

export async function getAdminPolicy<T = unknown>(): Promise<T> {
    const token = getAccessToken();

    const res = await fetch(`${API_BASE}/api/admin/admin-policy`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const data = await safeJson<T | ErrorResponse>(res);

    if (!res.ok) {
        throw new Error((data as ErrorResponse)?.message || "Failed to fetch admin policy");
    }

    return data as T;
}