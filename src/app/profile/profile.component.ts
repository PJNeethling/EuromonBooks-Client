import { Component, OnInit } from '@angular/core';
import { UserResponse } from '../responses/user-response';
import { UserService } from '../services/user.service';
import { TokenService } from '../services/token.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  uUid: string = '';
  user: UserResponse = {
    userName: '',
    email: '',
    firstName: '',
    lastName: '',
    creationDate: new Date()
  }
  constructor(private userService: UserService, private tokenService: TokenService) { }

  ngOnInit(): void {
    let session = this.tokenService.getSession();
    this.uUid = session?.uUid|| '';
    this.userService.getUserInfo(this.uUid).subscribe(
      {
        next: (data => {
          this.user = data;
        }),
        error: (() => {
          console.log('failed to get the use info');
        })
      }

    );
  }

}
