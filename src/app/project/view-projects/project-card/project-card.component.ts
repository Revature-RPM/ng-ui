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

  @Input() project: Project;
  admin = true;
  approved = false;
  loggedInUser: User;
  currentimage: string;
<<<<<<< HEAD
  constructor(private projectservice: ProjectServiceService, private router: Router) {
      
   }
=======
>>>>>>> 058c0817660304d5ce32fe5dfff2b4cb07bba413

  constructor() { }

  ngOnInit() {
    console.log(this.project.techStack[0]);
  }

  changeImage() {
  }
  openCodeBase(){
    this.projectservice.setCurrentProject(this.project);
    this.router.navigate(['projects/codebase']);
  }
}
