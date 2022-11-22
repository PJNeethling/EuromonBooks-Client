import { ErrorItemResponse } from '../responses/error-item-response';

export interface ErrorResponse {
    error:string;
    errorCode: number;
}

export interface ErrorResponseDetails {
    code:number;
    message: string;
    errors: ErrorItemResponse[];
}

export interface Error {
    error: ErrorResponseDetails;
}
