export interface TokenResponse {
    accessToken: string;
    refreshToken: string;
    firstName: string;
    userId: number
}

export interface CustomTokenResponse {
    token: string;
    uUid: string;
}