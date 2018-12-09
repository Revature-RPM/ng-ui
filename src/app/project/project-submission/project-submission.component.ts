import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Project } from 'src/app/core/models/Project';
import { ProjectService } from 'src/app/core/services/project.service';

import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { InputDialogComponent } from './input-dialog/input-dialog.component';

export interface DialogData {
  title: string;
  questionType: string;
  result: string;
}

@Component({
  selector: 'app-project-submission',
  templateUrl: './project-submission.component.html',
  styleUrls: ['./project-submission.component.scss']
})
export class ProjectSubmissionComponent implements OnInit {

  projectToUpload: Project = {};
  validForm: boolean = false;
  validGithubURL: boolean = false;
  title: string;
  questionType: string;
  result: string;
  groupMemberString: string;
  zipLinksString: string;
  githubURLRegex: RegExp;
  githubURL: string;

  constructor(private router: Router, private projectService: ProjectService, public dialog: MatDialog) {}

  ngOnInit() {
    this.projectToUpload.groupMembers = [];
    this.projectToUpload.screenShots = [];
    this.projectToUpload.zipLinks = [];
    this.groupMemberString = '';
    this.zipLinksString = '';
    // (\/[\d\w-]+)(\/[\d\w-]+)(\/){0,0}
    this.githubURLRegex = new RegExp('^(https:\/\/github\.com\/[^/]+\/[^/]+)');  
  }

  /**
   * this method opens the dialog defined in the input-dialog component; 
   *    after the dialog is closed the user's data is placed in the groupMembers array or the zipLinks array depending on which field was clicked
   * @author Shawn Bickel (1810-Oct08-Java-USF)
   */
  openDialog(e): void {
    if (e.target.id == 'inputGroupMembers'){
      this.title = "New Group Member";
      this.questionType = "Enter the name of the group member";
    }else{
      this.title = "Repository Link";
      this.questionType = "Enter the Github URL of your repository";
    }
    const dialogRef = this.dialog.open(InputDialogComponent, {
      width: '250px',
      data: {title: this.title, questionType: this.questionType, result: this.result}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined && result !== null){
        if (e.target.id == 'inputGroupMembers'){
          this.projectToUpload.groupMembers.push(result);
          this.groupMemberString += ' ' + result;
        }else{
         this.githubURL = result;
         console.log(this.githubURL);
         let regexArr = this.githubURL.match('^(https:\/\/github\.com\/[^/]+\/[^/]+)');
         console.log(regexArr);
         console.log(this.githubURLRegex.test(this.githubURL));
          if (this.githubURLRegex.test(this.githubURL) == false || this.githubURL.length != regexArr[0].length){
            this.validGithubURL = false;
            return;
          }
          console.log("this is a correctly formatted link");
          this.validGithubURL = true;
          this.projectToUpload.zipLinks.push(result);
          this.zipLinksString += ' ' + result;
        }
      }
    });
  }

   /**
	 * This method is bound to the event that the form is submitted;
   * all the data of the form is placed as key/value pairs into a FormData object;
   * the keys and values are reprsentations of the form fields in the form and their values respectively;
   * this FormData object is then sent to the server as a post request to create a new project
	 * @author Shawn Bickel (1810-Oct08-Java-USF)
	 */
  submitForm() {
    const formData = new FormData();
   
    
    formData.append('name', this.projectToUpload.name);
    formData.append('batch', this.projectToUpload.batch);
    formData.append('userFullName', this.projectToUpload.userFullName);
    formData.append('techStack', this.projectToUpload.techStack);
    formData.append('description', this.projectToUpload.description);
    formData.append('status', 'pending');

    console.log(this.projectToUpload.groupMembers);
    console.log(this.projectToUpload.zipLinks);
    console.log(this.projectToUpload.screenShots);


    for (let i = 0; i < this.projectToUpload.groupMembers.length; i++) { 
      formData.append('groupMembers', this.projectToUpload.groupMembers[i]);
    }

    for (let j = 0; j < this.projectToUpload.screenShots.length; j++) { 
      formData.append('screenShots', this.projectToUpload.screenShots[j]);
    }

    for (let k = 0; k < this.projectToUpload.zipLinks.length; k++) { 
      formData.append('zipLinks', this.projectToUpload.zipLinks[k]);
    }
   
    console.log(this.projectToUpload.groupMembers);
    console.log(this.projectToUpload.zipLinks);
    console.log(this.projectToUpload.screenShots);

    // this.projectService.createProject(formData).subscribe(project => {
    //    this.router.navigate(['/home']);
    // });


    // this.router.navigate(['/home']);
  }

  onFileSelected(e){
    for (let i = 0; i < e.target.files.length; i++){
      this.projectToUpload.screenShots.push(e.target.files[i]);
      this.validForm = true;
    }
  }
}
