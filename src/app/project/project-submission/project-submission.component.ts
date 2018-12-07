import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Project } from 'src/app/core/models/Project';
import { ProjectService } from 'src/app/core/services/project.service';
import { isGitUrl } from 'is-git-url';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';


@Component({
  selector: 'app-project-submission',
  templateUrl: './project-submission.component.html',
  styleUrls: ['./project-submission.component.scss']
})
export class ProjectSubmissionComponent implements OnInit {

  projectToUpload: Project = {};

  constructor(private router: Router, private projectService: ProjectService, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.projectToUpload.groupMembers = [];
    this.projectToUpload.screenShots = [];
    this.projectToUpload.zipLinks = [];    
  }

   /**
	 * This method is bound to the event that the form is submitted; all the data of the form is placed as key/value pairs into a FormData object;
   * the keys and values are reprsentations of the form fields in the form and their values respectively; this FormData object is then sent to 
   * the server as a post request to create a new project 
	 * @author Shawn Bickel (1810-Oct08-Java-USF)
	 */
  submitForm() {
    const formData = new FormData();
    console.log(formData);
    console.log(this.projectToUpload.groupMembers);
    console.log(this.projectToUpload.screenShots);
    console.log(this.projectToUpload.zipLinks);
    formData.append('name', this.projectToUpload.name);
    formData.append('batch', this.projectToUpload.batch);
    formData.append('fullName', this.projectToUpload.fullName);
    formData.append('techStack', this.projectToUpload.techStack);
    formData.append('description', this.projectToUpload.description);
    formData.append('status', 'pending');

    for (let i = 0; i < this.projectToUpload.groupMembers.length; i++) {
      formData.append('groupMembers', this.projectToUpload.groupMembers[i]);
    }

    for (let j = 0; j < this.projectToUpload.screenShots.length; j++) {
      formData.append('screenShots', this.projectToUpload.screenShots[j]);
    }

    for (let k = 0; k < this.projectToUpload.zipLinks.length; k++) {
      formData.append('zipLinks', this.projectToUpload.zipLinks[k]);
    }

    // this.projectService.createProject(formData).subscribe(project => {
    //    this.router.navigate(['/projects/home']);
    // });


    this.router.navigate(['/projects/home']);
  }

  onFileSelected(e){
    for (let i = 0; i < e.target.files.length; i++){
      this.projectToUpload.screenShots.push(e.target.files[i]);
    }
  }
}
