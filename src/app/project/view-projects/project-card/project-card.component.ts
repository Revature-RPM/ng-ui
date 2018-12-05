import { Component, OnInit, Input  } from '@angular/core';
import { Project } from '../../../core/models/Project';
import { User } from '../../../core/models/User';
import { ProjectServiceService } from 'src/app/core/services/project-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss']
})
export class ProjectCardComponent implements OnInit {

  items = Array.from({length: 100000}).map((_, i) => `Item #${i}`);

  @Input() project: Project;
  admin: Boolean = true;
  approved: Boolean = false;  
  loggedInUser: User;
  currentimage: string;
  constructor(private projectservice: ProjectServiceService, private router: Router) {
      
   }

  ngOnInit() {
    // this.loggedInUser = JSON.parse(localStorage.getItem('user'));
    // if(this.loggedInUser.userRole === 'admin'){
    //   this.admin = true;
    // }else {
    //   this.admin = false;
    // }

    console.log(this.project.techStack[0])
  }
  changeImage(){
    // console.log("change image")
    // if(this.project){
    //   if(this.currentimage==this.project.teamImage)
    //     this.currentimage = this.project.screenshots[0];
    //   else
    //     this.currentimage=this.project.teamImage;
    // }
  }
  openCodeBase(){
    this.projectservice.setCurrentProject(this.project);
    this.router.navigate(['projects/codebase']);
  }
}
