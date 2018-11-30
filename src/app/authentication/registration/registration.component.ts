import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { User } from '../../core/models/User';
import { LoggedInService, UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit, OnDestroy {
  isValid = true;
  sessionUser = localStorage.getItem('user');
  subscription: Subscription;
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
    this.subscription = this.userService.register(this.user).subscribe((user) => {
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        this.loggedIn.loggedIn.next(true);
        this.router.navigate(['']);
      }
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}