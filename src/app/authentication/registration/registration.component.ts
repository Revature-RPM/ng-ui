import { Component, OnInit, Input } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgMetaService } from 'ngmeta';
import { first } from 'rxjs/operators';

import { User } from 'src/app/core/models/User';
import { UserService } from 'src/app/core/services/user.service';
import { SnackbarService } from 'src/app/core/services/snackbar.service';

/**
 * This component was built to allow registration and validation for registering users.
 * The validation that is performed is to ensure there are no characters in the username,
 * no underscores at the beginning or end of the username,
 * names are at least 2 characters long, and passwords are validated by typing twice and ensuring
 * they match. Usernames and passwords must be at least 8 characters long. No next buttons
 * can be hit unless the forms are valid.
 * @author Ryan Beevers (1810-Oct08-Java-USF)
 * @author Slavik Gleanco
 */
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

  loginUser: User = {};
  registering = false;
  authenticating = false;

  emailPattern = '^[a-zA-Z0-9_.+-]+(?:(?:[a-zA-Z0-9-]+\.)?[a-zA-Z]+\.)?@([a-zA-Z]+)\.[a-zA-Z]+$';
  emailRegex = new RegExp('^[a-zA-Z0-9_.+-]+(?:(?:[a-zA-Z0-9-]+\.)?[a-zA-Z]+\.)?@([a-zA-Z]+)\.[a-zA-Z]+$');
  usernamePattern = '^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$';
  usernameRegex = new RegExp('^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$');
  confirmPassword: string;

  emailCheck = false;
  emailIsAvailable = false;
  usernameCheck = false;
  usernameIsAvailable = false;

  // this method is called to ensure password was typed correctly
  static MatchPassword(AC: AbstractControl) {
    const password = AC.get('password').value;
    const confirmPassword = AC.get('confirmPassword').value;
    if (password !== confirmPassword) {
      AC.get('confirmPassword').setErrors({ MatchPassword: true });
    } else {
      return null;
    }
  }

  constructor(private userService: UserService,
    private router: Router,
    private _formBuilder: FormBuilder,
    private ngmeta: NgMetaService,
    private snackbarService: SnackbarService) { }

  ngOnInit() {
    if (localStorage.getItem('jwt')) this.router.navigate(['\home']);

    else {
      this.ngmeta.setHead({ title: 'Register | RPM' });

      // all the different validators to ensure form is properly filled
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
  }

  // registration method takes the validated fields packages into a JSON and sends the observable
  register() {
    console.log(this.user);
    this.registering = true;
    this.userService.register(this.user).pipe(first()).subscribe(
      (user) => {
        if (user) {
          this.registering = false;
          this.authenticating = true;
          this.loginUser.username = user.username;
          this.loginUser.password = user.password;
          this.userService.login(this.loginUser).pipe(first()).subscribe(
            (user) => {
              this.authenticating = false;
              this.router.navigate(['/home']);
            });
        }
      });
  }

  /*
 * Function to check the user email is unique
 */
  checkIfEmailIsInUse() {

    if (!this.emailRegex.test(this.user.email)) {
      return;
    }
      this.emailCheck = true;

      this.userService.checkIfEmailIsInUse(this.user.email).subscribe(
        result => {
          if (!result['emailIsInUse']) this.emailIsAvailable = true;
          else this.emailIsAvailable = false;
        },
        error => {
          this.snackbarService.openSnackBar('Internal server error!', 'dismiss');
        }
      )
  }

  /*Function to be called when focus is deselected from username input form
    Checks to see if username for registration is available
  */
  checkIfUsernameIsAvailable() {

    if (!this.usernameRegex.test(this.user.username)) {
      return;
    }
      this.usernameCheck = true;

      this.userService.checkIfUsernameIsAvailable(this.user.username).subscribe(
        result => {
          if (result['usernameIsAvailable']) this.usernameIsAvailable = true;
          this.emailIsAvailable = false;
        },
        error => {
          this.snackbarService.openSnackBar('Internal server error!', 'dismiss');
        }
      )
    }

}
