import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';
import { first } from 'rxjs/operators';

import { User } from 'src/app/core/models/User';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {

  form: FormGroup;
  user: User;
  setReadOnly = true;
  disableButton = true;
  filledPassword = true;
  emailPattern = '^[a-zA-Z0-9_.+-]+(?:(?:[a-zA-Z0-9-]+\.)?[a-zA-Z]+\.)?@(revature)\.com$';

  // source: <https://scotch.io/@ibrahimalsurkhi/match-password-validation-with-angular-2>
  // enable validation error when password is not matched
  static MatchPassword(AC: AbstractControl) {
    const password = AC.get('password').value; // to get value in input tag
    const confirmPassword = AC.get('confirmPassword').value; // to get value in input tag
    if (password != confirmPassword) {
      AC.get('confirmPassword').setErrors({ MatchPassword: true });
    } else {
      return null;
    }
  }

  static RevatureEmail(AC: AbstractControl) {
    const email = AC.get('email').value; // to get value in input tag
    const emailPattern = '^[a-zA-Z0-9_.+-]+(?:(?:[a-zA-Z0-9-]+\.)?[a-zA-Z]+\.)?@(revature)\.com$'; // regex for Revature email
    if (!email.match(emailPattern)) {
      AC.get('email').setErrors({ RevatureEmail: true });
    } else {
      return null;
    }
  }

  constructor(private userService: UserService, private router: Router, private fb: FormBuilder) { }

  ngOnInit() {
    const tempUser: User = {
      id: 1,
      firstName: 'Yuki',
      lastName: 'Mano',
      username: 'YukiMano',
      password: 'password',
      role: 'trainer',
      email: 'ym@revature.com',
    };

    window.localStorage.setItem('user', JSON.stringify(tempUser));

    // pre-fill the profile information with logged-in user information
    this.user = JSON.parse(window.localStorage.getItem('user'));

    this.fillFormGroup(this.user.firstName, this.user.lastName, this.user.email, this.user.username, this.user.password);
  }

  // call user-service to update the profile information
  updateProfile() {
    if (this.form.valid) {
      const updatedUserInfo: User = {
        id: this.user.id,
        firstName: this.form.get('firstName').value.trim(),
        lastName: this.form.get('lastName').value.trim(),
        email: this.form.get('email').value.trim(),
        username: this.form.get('username').value.trim(),
        password: this.form.get('password').value,
        role: this.user.role,
      };

      // this line should be put in user service
      // window.localStorage.setItem('user', JSON.stringify(updatedUserInfo));
      // this.user = JSON.parse(window.localStorage.getItem('user'));

      // this.fillFormGroup(this.user.firstName, this.user.lastName, this.user.email, this.user.username, this.user.password);

      console.log(updatedUserInfo);


      this.userService.updateProfile(updatedUserInfo).pipe(first()).subscribe((user) => {
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.fillFormGroup(this.user.firstName, this.user.lastName, this.user.email, this.user.username, this.user.password);
          console.log(this.user);
        }
      });

    }
  }

  // pre-fill the form with intial inputs
  cancelEditProfile() {
    this.disableButton = true;

    this.user = JSON.parse(window.localStorage.getItem('user'));

    this.fillFormGroup(this.user.firstName, this.user.lastName, this.user.email, this.user.username, this.user.password);
  }

  // pre-fill the form
  fillFormGroup(firstName: string, lastName: string, email: string, username: string, password: string) {
    this.form = this.fb.group({
      firstName: [firstName.trim(), [Validators.required, Validators.minLength]],
      lastName: [lastName.trim(), [Validators.required, Validators.minLength]],
      email: [email.trim(), [Validators.required, Validators.email]],
      username: [username.trim(), [Validators.required, Validators.minLength]],
      password: [password, [Validators.required, Validators.minLength]],
      confirmPassword: ['', [Validators.required, Validators.minLength]],
    }, {
        validator: [
          ProfileComponent.MatchPassword, // match password validation
          ProfileComponent.RevatureEmail, // must be Revature email
        ]
      });
  }

  // disable button if all input validations of the form are not satisfied
  formFilled() {
    if (this.form.valid) {
      this.disableButton = false;
    } else {
      this.disableButton = true;
    }
  }

  retypeConfirmPassword() {
    this.form.get('confirmPassword').setValue('');
  }

}

/*
TO-DO

- usernme must be uniqued (call to the db) --> mat-error when username is not uniqued
- email must be uniqued (call to the db) *not required* --> mat-error when email is not uniqued

- create a function in user-service which call to the server side and set the data into local storage

+ more space in between inputs for mat-error (optional)
+ min-length && maxlength validation for username and password (optional)
+ email must be @revature.com (optional)
*/
