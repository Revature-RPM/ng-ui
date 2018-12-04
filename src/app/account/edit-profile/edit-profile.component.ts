import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/models/User';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

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

    this.form = this.fb.group({
      firstname: [this.user.firstname, Validators.required],
      lastname: [this.user.lastname, Validators.required],
      email: [this.user.email, [Validators.required, Validators.email]],
      username: [this.user.username, Validators.required],
      password: [this.user.password, Validators.required],
      retypePassword: ['', Validators.required],
    });
  }

  fname: string = '    blah   ';

  updateProfile() {
    console.log(this.fname.trim());

    let updatedUserInfo: User = {
      id: this.user.id,
      firstname: this.form.get('firstname').value,
      lastname: this.form.get('lastname').value,
      email: this.form.get('email').value,
      username: this.form.get('username').value,
      password: this.form.get('password').value,
      userRole: this.user.userRole,
    }; 

    // this line should be put in user service 
    window.localStorage.setItem('user', JSON.stringify(updatedUserInfo));

    
    console.log(updatedUserInfo);
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