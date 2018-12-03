import { Component, OnInit, Input  } from '@angular/core';
import { Project } from '../../../core/models/Project';
import { User } from '../../../core/models/User';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss']
})
export class ProjectCardComponent implements OnInit {

  @Input() project: Project;
  admin: Boolean = true;
  approved: Boolean = false;  
  loggedInUser: User;
  currentimage: string;
  constructor() {
      
   }

  ngOnInit() {
    // this.loggedInUser = JSON.parse(localStorage.getItem('user'));
    // if(this.loggedInUser.userRole === 'admin'){
    //   this.admin = true;
    // }else {
    //   this.admin = false;
    // }
    this.currentimage=this.project.teamImage;
  }
  changeImage(){
    console.log("change image")
    if(this.project){
      if(this.currentimage==this.project.teamImage)
        this.currentimage = this.project.screenshots[0];
      else
        this.currentimage=this.project.teamImage;
    }
  }
}
