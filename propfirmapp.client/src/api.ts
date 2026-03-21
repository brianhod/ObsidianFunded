const API_BASE = "https://app.obsidianfunded.com";
//const API_BASE = "http://localhost:5177";

export interface ErrorResponse {
    message?: string | null;
}

export interface LoginRequest {
    userName?: string | null;
    password?: string | null;
}

export interface LoginResponse {
    accessToken?: string | null;
    refreshToken?: string | null;
    expiresIn?: number;
    tokenType?: string | null;
    message?: string | null;
}

export interface RefreshRequest {
    refreshToken?: string | null;
}

export interface RevokeRequest {
    refreshToken?: string | null;
}

export interface RegisterRequest {
    userName?: string | null;
    title?: string | null;
    firstName?: string | null;
    lastName?: string | null;
    dateofBirth?: string;
    email?: string | null;
    password?: string | null;
    phoneNumberPrefix?: string | null;
    phoneNumber?: string | null;
    referalCode?: string | null;
    over18?: boolean;
    detailsCorrect?: boolean;
    recieveMarketingMaterial?: boolean;
}

export interface RegisterResponse {
    id?: string;
    userName?: string | null;
    email?: string | null;
    message?: string | null;
}

async function parseResponse<T>(response: Response): Promise<T | null> {
    const text = await response.text();

    if (!text) return null;

    try {
        return JSON.parse(text) as T;
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

function saveTokens(data: LoginResponse): void {
    if (data.accessToken) {
        localStorage.setItem("accessToken", data.accessToken);
    }

    if (data.refreshToken) {
        localStorage.setItem("refreshToken", data.refreshToken);
    }
}

export function clearTokens(): void {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
}

async function request<TResponse>(
    path: string,
    options: RequestInit = {}
): Promise<TResponse> {
    const response = await fetch(`${API_BASE}${path}`, {
        headers: {
            "Content-Type": "application/json",
            ...(options.headers || {}),
        },
        ...options,
    });

    const data = await parseResponse<TResponse | ErrorResponse>(response);

    if (!response.ok) {
        const message =
            (data as ErrorResponse | null)?.message || `Request failed: ${response.status}`;
        throw new Error(message);
    }

    return (data ?? {}) as TResponse;
}

export async function registerUser(
    payload: RegisterRequest
): Promise<RegisterResponse> {
    return request<RegisterResponse>("/api/user/register", {
        method: "POST",
        body: JSON.stringify(payload),
    });
}

export async function loginUser(
    payload: LoginRequest
): Promise<LoginResponse> {
    const data = await request<LoginResponse>("/api/auth/login", {
        method: "POST",
        body: JSON.stringify(payload),
    });

    saveTokens(data);
    return data;
}

export async function refreshAuthToken(): Promise<LoginResponse> {
    const payload: RefreshRequest = {
        refreshToken: getRefreshToken(),
    };

    const data = await request<LoginResponse>("/api/auth/refresh", {
        method: "POST",
        body: JSON.stringify(payload),
    });

    saveTokens(data);
    return data;
}

export async function revokeToken(): Promise<unknown> {
    const payload: RevokeRequest = {
        refreshToken: getRefreshToken(),
    };

    const data = await request<unknown>("/api/auth/revoke", {
        method: "POST",
        body: JSON.stringify(payload),
    });

    clearTokens();
    return data;
}

export async function getAdminArea<T = unknown>(): Promise<T> {
    return request<T>("/api/admin/admin-area", {
        method: "GET",
        headers: {
            Authorization: `Bearer ${getAccessToken()}`,
        },
    });
}

export async function getAdminPolicy<T = unknown>(): Promise<T> {
    return request<T>("/api/admin/admin-policy", {
        method: "GET",
        headers: {
            Authorization: `Bearer ${getAccessToken()}`,
        },
    });
}