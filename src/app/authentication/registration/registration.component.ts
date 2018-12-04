import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

import { User } from 'src/app/core/models/User';
import { LoggedInService, UserService } from '../../core/services/user.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-registration', 
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],

})
export class RegistrationComponent implements OnInit {
  isValid = true;
  // sessionUser = localStorage.getItem('user');
  sessionUser = false;
  user: User = {};
  isChecked = true;
  isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;


  constructor(private loggedIn: LoggedInService,
              private userService: UserService,
              private router: Router,
              private _formBuilder: FormBuilder) { }

  ngOnInit() {
    if (this.sessionUser) {
      this.router.navigate(['']);
    }
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
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