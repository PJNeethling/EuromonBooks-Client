import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenResponse } from '../responses/token-response';
import { CustomTokenResponse } from '../responses/token-response';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private userService: UserService) { }

  saveSession(tokenResponse: CustomTokenResponse) {
  console.log(tokenResponse);
    // window.localStorage.setItem('AT', tokenResponse.accessToken);
    // window.localStorage.setItem('RT', tokenResponse.refreshToken);
    // if (tokenResponse.userId) {
    //   window.localStorage.setItem('ID', tokenResponse.userId.toString());
    //   window.localStorage.setItem('FN', tokenResponse.firstName);
    // }

    window.localStorage.setItem('AT', tokenResponse.token);
    window.localStorage.setItem('ID', tokenResponse.uUid);
  }

  getSession(): CustomTokenResponse | null {
    if (window.localStorage.getItem('AT')) {
      const tokenResponse: CustomTokenResponse = {
        token: window.localStorage.getItem('AT') || '',
        uUid: window.localStorage.getItem('ID') || ''
      };
      //firstName: window.localStorage.getItem('FN') || '',
      //refreshToken: window.localStorage.getItem('RT') || '',

      return tokenResponse;
    }
    return null;
  }

  logout() {
    window.localStorage.clear();
  }

  isLoggedIn(): boolean {
    let session = this.getSession();
    if (!session) {
      return false;
    }

    // check if token is expired
    const jwtToken = JSON.parse(atob(session.token.split('.')[1]));
    const tokenExpired = Date.now() > (jwtToken.exp * 1000);

    return !tokenExpired;

  }

  // refreshToken(session: TokenResponse): Observable<TokenResponse> {

  //   return this.userService.refreshToken(session);
  // }
  
}
