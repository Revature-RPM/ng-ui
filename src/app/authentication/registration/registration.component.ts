import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

import { User } from 'src/app/core/models/User';
import { LoggedInService, UserService } from '../../core/services/user.service';
import {FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import {AbstractControl} from '@angular/forms';

@Component({
  selector: 'app-registration', 
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})

export class RegistrationComponent implements OnInit{
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
      firstName: [
        Validators.required,
        Validators.minLength
      ],
      lastName:[
        Validators.required,
        Validators.minLength
      ],
      email:[
        Validators.required,
        Validators.minLength
      ]
    });
    this.secondFormGroup = this._formBuilder.group({
      username: [
        Validators.required,
        Validators.minLength
      ],
      password: [
        Validators.required,
        Validators.minLength
      ],
      verifiedPassword: ['', Validators.required]
  },{
    validator: RegistrationComponent.MatchPassword // your validation method
  });

  }
  emailPattern = "^[a-zA-Z0-9_.+-]+(?:(?:[a-zA-Z0-9-]+\.)?[a-zA-Z]+\.)?@(revature)\.com$";
  usernamePattern = "^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$";

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

  static MatchPassword(AC: AbstractControl) {
    let password = AC.get('password').value; // to get value in input tag
    let confirmPassword = AC.get('verifiedPassword').value; // to get value in input tag
     if(password != confirmPassword) {
         console.log('false');
         AC.get('verifiedPassword').setErrors( {MatchPassword: true} )
     } else {
         console.log('true');
         return null
     }
 }

}

