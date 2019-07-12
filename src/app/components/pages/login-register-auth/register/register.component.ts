import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { NgMetaService } from 'ngmeta';
import { first } from 'rxjs/operators';
import { SnackbarService } from 'src/app/services/snackbar.service';


/**
 * This component was built to allow registration and validation for registering users.
 * The validation that is performed is to ensure there are no characters in the username,
 * no underscores at the beginning or end of the username,
 * names are at least 2 characters long, and passwords are validated by typing twice and ensuring
 * they match. Usernames and passwords must be at least 8 characters long. No next buttons
 * can be hit unless the forms are valid.
 * @author Ryan Beevers (1810-Oct08-Java-USF)
 * @author Slavik Gleanco
 * @author Kelly Young (190422-Java-USF)
 */
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})

export class RegisterComponent implements OnInit {

  formGroup1: FormGroup;
  formGroup2: FormGroup;

  emailIsAvailable: boolean;
  usernameIsAvailable: boolean;
  user: User = {};
  loginUser: User = {};
  submitted: boolean = false;

  constructor(private userService: UserService,
    private router: Router,
    private _formBuilder: FormBuilder,
    private ngmeta: NgMetaService,
    private snackbarService: SnackbarService) { }

  /**
   * Function that:
   * Is bound to this class. Acts as a custom validator.
   * Used to check if there's a difference between the password and confirmpassword fields.
   * If they are not equal, an error will be displayed.
   * 
   * @param AC - A formGroup field value.
   * @author unknown, Documentation: Justin Kerr (190422-USF)
   */
  static passMatchValidator(AC: AbstractControl) {
    const password = AC.get('password').value;
    const confirmPassword = AC.get('confirmPassword').value;
    if (password !== confirmPassword) {
      AC.get('confirmPassword').setErrors({ MatchPassword: true });
    } else {
      return null;
    }
  }

  /**
   * On component instantiation:
   * Takes the two existing formGroups and sets their corresponding validators.
   * @author unknown, Documentation: Justin Kerr (190422-USF)
   */
  ngOnInit() {
    this.formGroup1 = this._formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]]
    });
    this.formGroup2 = this._formBuilder.group({
        username: ['', [Validators.required, Validators.minLength(8)]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(8)]]
      },
      { validator: RegisterComponent.passMatchValidator });
  }

  /**
   * Getter functions that provide easy access to formGroup fields
   * @author Justin Kerr (190422-USF)
   */
  get form1() { return this.formGroup1.controls; }
  get form2() { return this.formGroup2.controls; }

  /**
   * Function that:
   * Fills the component's user variable with values from the formGroup.
   * (On retrospection, this user variable can be declared as a local function variable)
   * Calls and subscribes to the user service register method with this user variable.
   * Takes the returned user from the subscribtion and sets a new loginUser to log in with.
   * (A new user is necessary because the returned user has too many properties)
   * (On retrospection, this loginUser variable can be declared as a local function variable)
   * Calls and subscribes to the user service login method. (only taking the first returned user with the *first* operator, similar to a promise)
   * Finally redirects the user to the project-grid-page component if registration is successful.
   * 
   * @author Justin Kerr (190422-USF)
   */
  register() {
    this.user.firstName = this.form1.firstName.value;
    this.user.lastName = this.form1.lastName.value;
    this.user.email = this.form1.email.value;
    this.user.username = this.form2.username.value;
    this.user.password = this.form2.password.value;

    this.userService.register(this.user).pipe(first()).subscribe(
      user => {
        if (user) {
          this.loginUser.username = user.username;
          this.loginUser.password = user.password;
          this.userService.login(this.loginUser).pipe(first()).subscribe(
            (user) => {
              this.router.navigate(['projects']);
            });
        }
      });
  }

/**
 * Currently not used function that needs to be reworked slightly and re-implemented.
 */
  checkIfEmailIsInUse() {

    this.userService.checkIfEmailIsInUse(this.form1.email).subscribe(
      result => {
        if (!result['emailIsInUse']) this.emailIsAvailable = true;
        else this.emailIsAvailable = false;
      },
      error => {
        this.snackbarService.openSnackBar('Internal server error!', 'dismiss');
      }
    )
  }

/**
 * Currently not used function that needs to be reworked slightly and re-implemented.
 */
  checkIfUsernameIsAvailable() {

    this.userService.checkIfUsernameIsAvailable(this.form2.username).subscribe(
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