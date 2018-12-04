import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/models/User';

import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {

  form: FormGroup;
  user: User; 
  setReadOnly: boolean = true;
  disableButton: boolean = true;

  constructor(private router: Router, private fb: FormBuilder) { }

  ngOnInit() {
    let tempUser: User = {
      id: 1,
      firstname: 'Yuki',
      lastname: 'Mano',
      username: 'ysm',
      password: 'password',
      userRole: 'trainer',
      email: 'ym@gmail.com',
    }

    window.localStorage.setItem('user', JSON.stringify(tempUser)); 

    this.user = JSON.parse(window.localStorage.getItem('user'));

    this.fillFormGroup(this.user.firstname, this.user.lastname, this.user.email, this.user.username, this.user.password);

    console.log(this.form.valid);
  }

  updateProfile() {
    let updatedUserInfo: User = {
      id: this.user.id,
      firstname: this.form.get('firstname').value.trim(),
      lastname: this.form.get('lastname').value.trim(),
      email: this.form.get('email').value.trim(),
      username: this.form.get('username').value.trim(),
      password: this.form.get('password').value,
      userRole: this.user.userRole,
    }; 

    // this line should be put in user service 
    window.localStorage.setItem('user', JSON.stringify(updatedUserInfo));
    this.user = JSON.parse(window.localStorage.getItem('user'));

    this.fillFormGroup(this.user.firstname, this.user.lastname, this.user.email, this.user.username, this.user.password);
    
    console.log(updatedUserInfo);
  }

  cancelEditProfile() {
    this.disableButton = true;

    this.user = JSON.parse(window.localStorage.getItem('user'));

    this.fillFormGroup(this.user.firstname, this.user.lastname, this.user.email, this.user.username, this.user.password);
  }

  fillFormGroup(firstname: string, lastname: string, email: string, username: string, password: string) {
    this.form = this.fb.group({
      firstname: [firstname.trim(), Validators.required],
      lastname: [lastname.trim(), Validators.required],
      email: [email.trim(), [Validators.required, Validators.email]],
      username: [username.trim(), Validators.required],
      password: [password, Validators.required],
      confirmPassword: ['', Validators.required],
    }, {
      validator: ProfileComponent.MatchPassword // match password validation
    });
  }

  // all input fields must be filled 
  formFilled(){
    if(this.form.valid){
      this.disableButton = false;
    }
    else{
      this.disableButton = true;
    }
  }


  // https://scotch.io/@ibrahimalsurkhi/match-password-validation-with-angular-2
  static MatchPassword(AC: AbstractControl) {
    let password = AC.get('password').value; // to get value in input tag
    let confirmPassword = AC.get('confirmPassword').value; // to get value in input tag
     if(password != confirmPassword) {
         AC.get('confirmPassword').setErrors( {MatchPassword: true} )
     } else {
         return null
     }
 }

}

/*
TO-DO

validdation:
- confrim password only works when 'password' is filled first then 'confirm password'; not vice versa

- usernme must be uniqued (call to the db) --> mat-error when username is not uniqued 
- email must be uniqued (call to the db) *not required* --> mat-error when email is not uniqued 

- create a function in user-service which call to the server side and set the data into local storage

*/