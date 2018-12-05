import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/core/models/Project';
import { Router } from '@angular/router';
import { ProjectServiceService } from 'src/app/core/services/project-service.service';
import { User } from 'src/app/core/models/User';
import { MatDialog } from '@angular/material';
import { NgForm, NgModel, Form } from '@angular/forms';
@Component({
  selector: 'app-project-submission',
  templateUrl: './project-submission.component.html',
  styleUrls: ['./project-submission.component.scss']
})
export class ProjectSubmissionComponent implements OnInit {

  projectToUpload: Project = {};
  constructor(private router: Router, private projectService: ProjectServiceService) {}

  ngOnInit() {
  
  }

  submitForm(){
    var formData = new FormData(); 
    formData.append('name', this.projectToUpload.name);
    formData.append('batch', this.projectToUpload.batch);
    formData.append('fullName', this.projectToUpload.fullName);
    formData.append('techStack', this.projectToUpload.techStack);
    formData.append('description', this.projectToUpload.description);
    formData.append('status', 'pending');

    for(let i = 0; i < this.projectToUpload.groupMembers.length; i++){
      formData.append('groupMembers', this.projectToUpload.groupMembers[i]);
    }

    for (let j = 0; j < this.projectToUpload.screenShots.length; j++){
      formData.append('screenShots', this.projectToUpload.screenShots[j]);
    }

    for (let k = 0; k < this.projectToUpload.zipLinks.length; k++){
      formData.append('zipLinks', this.projectToUpload.zipLinks[k]);
    }
   
    this.projectService.createProject(formData).subscribe(project => {
       this.router.navigate(['/projects/home']);
    })
  }
}
