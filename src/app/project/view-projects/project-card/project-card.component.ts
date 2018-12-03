import { Component, OnInit } from '@angular/core';
import { Project } from '../../../core/models/Project';
import { User } from '../../../core/models/User';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss']
})
export class ProjectCardComponent implements OnInit {

  project: Project;
  admin: Boolean = true;
  approved: Boolean = false;  
  loggedInUser: User;
  constructor() {

   }

  ngOnInit() {
    // this.loggedInUser = JSON.parse(localStorage.getItem('user'));
    // if(this.loggedInUser.userRole === 'admin'){
    //   this.admin = true;
    // }else {
    //   this.admin = false;
    // }
  }

}
