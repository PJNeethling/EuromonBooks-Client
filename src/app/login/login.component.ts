import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginRequest } from '../requests/login-request';
import { ErrorResponseDetails } from '../responses/error-response';
import { Error } from '../responses/error-response';
import { TokenService } from '../services/token.service';
import { UserService } from '../services/user.service';
import { ErrorItemResponse } from '../responses/error-item-response';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginRequest: LoginRequest = {
    userNameOrEmail: "",
    password: ""
  };

  loading: boolean = false;
  isLoggedIn = false;
  isLoginFailed = false;
  errorItem: ErrorItemResponse[] = [{
    message: ''
  }];

  errorDetails: ErrorResponseDetails = { 
    message: '', 
    code: 0,
    errors: this.errorItem
  };
  error: Error = { 
    error: this.errorDetails
  };

  constructor(private userService: UserService, private tokenService: TokenService, private router: Router) { }

  ngOnInit(): void {
    let isLoggedIn = this.tokenService.isLoggedIn();
    console.log(`isLoggedIn: ${isLoggedIn}`);
    if (isLoggedIn) {
      this.isLoggedIn = true;

      this.router.navigate(['books']);
    }
  }

  onSubmit(): void {
    this.loading = true;
    this.userService.login(this.loginRequest).subscribe({
      next: (data => {
        console.debug(`logged in successfully ${data}`);
        console.log(data);
        this.loading = false;
        this.tokenService.saveSession(data);
        this.isLoggedIn = true;
        this.isLoginFailed = false;
        this.reloadPage();
      }),
      error: ((error: Error) => {
        this.loading = false;
        this.error = error;
        this.isLoggedIn = false;
        this.isLoginFailed = true;
      })

    });
  }
  reloadPage(): void {
    window.location.reload();
  }
}