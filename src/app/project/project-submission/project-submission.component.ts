import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/core/models/Project';
import { Router } from '@angular/router';
import { ProjectServiceService } from 'src/app/core/services/project-service.service';
import { User } from 'src/app/core/models/User';

@Component({
  selector: 'app-project-submission',
  templateUrl: './project-submission.component.html',
  styleUrls: ['./project-submission.component.scss']
})
export class ProjectSubmissionComponent implements OnInit {

  projectToUpload: Project = {};
  trainer: User;
  constructor(private router: Router, projectService: ProjectServiceService) {
    
   }

  ngOnInit() {
  }

  submitForm(form){
    console.log(form['form']);
  }

  openDialog(){
    console.log("hello");
  }

}
