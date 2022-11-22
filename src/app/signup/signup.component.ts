import { Component, OnInit } from '@angular/core';
import { SignupRequest } from '../requests/signup-request';
import { UserService } from '../services/user.service';
import { ErrorResponseDetails } from '../responses/error-response';
import { Error } from '../responses/error-response';
import { ErrorItemResponse } from '../responses/error-item-response';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupRequest: SignupRequest = {
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    ts: new Date().toISOString()
  };
  loading: boolean = false;
  isSuccessful = false;
  isSignUpFailed = false;
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

  constructor(private userService: UserService) { }
  ngOnInit(): void {
  }
  onSubmit(): void {
    this.loading = true;
    this.userService.signup(this.signupRequest).subscribe({
      next: data => {
        this.loading = false;
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      error: ((error: Error)  => {
        this.loading = false;
        this.error = error;
        this.isSignUpFailed = true;
      })
    });
  }

}
