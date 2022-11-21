import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginRequest } from '../requests/login-request';
import { SignupRequest } from '../requests/signup-request';
import { TokenResponse } from '../responses/token-response';
import { CustomTokenResponse } from '../responses/token-response';
import { UserResponse } from '../responses/user-response';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  login(loginRequest: LoginRequest): Observable<CustomTokenResponse> {
    return this.httpClient.post<CustomTokenResponse>(`${environment.apiUrl}/v1/login`, loginRequest);
  }

  signup(SignupRequest: SignupRequest) {
    return this.httpClient.post(`${environment.apiUrl}/v1/user/register`, SignupRequest, { responseType: 'json'}); // response type specified, because the API response here is just a plain text (email address) not JSON
  }

  logout() {
    return this.httpClient.post(`${environment.apiUrl}/users/signup`, null);
  }

  getUserInfo(uUid: string): Observable<UserResponse> {
    return this.httpClient.get<UserResponse>(`${environment.apiUrl}/v1/user/${uUid}`);
  }
}