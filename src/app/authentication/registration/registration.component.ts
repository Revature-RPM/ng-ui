import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

import { User } from 'src/app/core/models/user';
import { LoggedInService, UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  isValid = true;
  sessionUser = localStorage.getItem('user');
  user: User = {};

  isCheckedYes = true;
  isCheckedNo = false;


  constructor(private loggedIn: LoggedInService,
              private userService: UserService,
              private router: Router) { }

  ngOnInit() {
    if (this.sessionUser) {
      this.router.navigate(['']);
    }
  }

  register() {
    console.log(this.user);
    this.userService.register(this.user).pipe(first()).subscribe((user) => {
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        this.loggedIn.loggedIn.next(true);
        this.router.navigate(['']);
      }
    });
  }
}
