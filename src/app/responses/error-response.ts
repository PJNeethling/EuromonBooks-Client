export interface ErrorResponse {
    error:string;
    errorCode: number;
}

export interface ErrorResponseDetails {
    code:number;
    message: string;
}

export interface Error {
    error: ErrorResponseDetails;
}
