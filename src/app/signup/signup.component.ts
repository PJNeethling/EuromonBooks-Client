import { Component, OnInit } from '@angular/core';
import { SignupRequest } from '../requests/signup-request';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupRequest: SignupRequest = {
    //email: "",
    userName: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    ts: new Date().toISOString()
  };
  loading: boolean = false;
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
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
      error: err => {
        this.loading = false;
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    });
  }

}
