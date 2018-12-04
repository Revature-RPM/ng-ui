import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/models/User';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  }

  fname: string = '    blah   ';
  updateProfile() {
    console.log(this.fname.trim());

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

    this.fillFormGroup(this.user.firstname, this.user.lastname, this.user.email, this.user.username, this.user.password);
    
    console.log(updatedUserInfo);
  }

  cancelEditProfile() {
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
      retypePassword: ['', Validators.required],
    });
  }

}

/*

TO-DO

validdation:
- password and retype password must match 
- usernme must be uniqued (call to the db)
- email must be uniqued (call to the db) *not required*

- mat-error for every field input 

- disabled update button when all inputs are not filled 
- include 'cancel' button, which brings back to 'view' page and repopulate fields with local storage, which has not been changed 

- create a function in user-service which call to the server side and set the data into local storage

*/