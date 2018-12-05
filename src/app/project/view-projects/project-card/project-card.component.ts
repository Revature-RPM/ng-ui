import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Project } from '../../../core/models/Project';
import { User } from '../../../core/models/User';
import { ProjectService } from 'src/app/core/services/project.service';

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
  
  constructor(private projectservice: ProjectService, private router: Router) {
  }

  ngOnInit() {
    console.log(this.project.techStack[0]);
  }
  
  changeImage(){
  }
  
  openCodeBase(){
    this.projectservice.setCurrentProject(this.project);
    this.router.navigate(['projects/codebase']);
  }
}
