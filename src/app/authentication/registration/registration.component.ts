import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgMetaService } from 'ngmeta';
import { first } from 'rxjs/operators';

import { User } from 'src/app/core/models/User';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})

export class RegistrationComponent implements OnInit {
  user: User = {};
  isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  emailPattern = '^[a-zA-Z0-9_.+-]+(?:(?:[a-zA-Z0-9-]+\.)?[a-zA-Z]+\.)?@(revature)\.com$';
  usernamePattern = '^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$';
  confirmPassword: string; 

  static MatchPassword(AC: AbstractControl) {
    const password = AC.get('password').value; // to get value in input tag
    const confirmPassword = AC.get('confirmPassword').value; // to get value in input tag
    if (password != confirmPassword) {
      AC.get('confirmPassword').setErrors({ MatchPassword: true });
    } else {
      return null;
    }
  }

  constructor(private userService: UserService,
              private router: Router,
              private _formBuilder: FormBuilder,
              private ngmeta: NgMetaService) { }

  ngOnInit() {
    if (localStorage.getItem('user') !== null) {
      this.router.navigate(['']);
    } else {
      this.ngmeta.setHead({ title: 'Register | RPM' });
    }
    this.firstFormGroup = this._formBuilder.group({
      firstName: [
        Validators.required,
        Validators.minLength
      ],
      lastName: [
        Validators.required,
        Validators.minLength
      ],
      email: [
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
      confirmPassword: [
        Validators.required,
        Validators.minLength
      ]
    }, {
      validator: RegistrationComponent.MatchPassword // match password validation
    });
  }

  register() {
    console.log(this.user);
    this.userService.register(this.user).pipe(first()).subscribe((user) => {
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        this.router.navigate(['/auth/login']);
      }
    });
  }
}
