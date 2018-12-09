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

  // projectToUpload is bound to the information that users enter in the form
  projectToUpload: Project = {};

  // validScreenshots and validGithubURL determine if information has been entered correctly and if the form can be submitted
  validScreenshots: boolean = false;
  validGithubURL: boolean = false;
  invalidLink: boolean = false; // triggers an error message is set to true

  /**
   * title, questionType, and result are all passed to a dialog when the user chooses either the group member or the links input field
   * title and questionType represent the information which will displayed in an input dialog
   * result will hold the user's response, either a group member or a link to be validated as a Github repository link
   * @author Shawn Bickel (1810-Oct08-Java-USF)
   */
  title: string;
  questionType: string;
  result: string;


  /**
   * groupMemberString and zipLinkString are both bound to the user's input of the group member field and the zip links field
   * When a new group member or zip link is added, then that information is concatenated to the string. 
   * Because of two-way binding, the result is placed in either the group member field or the zip links field
   * @author Shawn Bickel (1810-Oct08-Java-USF)
   */
  groupMemberString: string;
  zipLinksString: string;

/**
 * githubURLRegex: holds the regular expression to validate that an entered link is formatted correctly
 *    - a valid link is of the format: https://github.com/<github username>/<repository name>
 *    - the regular expression used to validate this is: ^(https:\/\/github\.com\/[^/]+\/[^/]+)
 *    - this expression is checking that the link contains https://github.com/at least one of <any character but a '/'>/at least one of <any character but a '/'>`
 * githubURL: a string to hold the user's input from the dialog
 *  @author Shawn Bickel (1810-Oct08-Java-USF)
 */
  githubURLRegex: RegExp;
  githubURL: string;

  constructor(private router: Router, private projectService: ProjectService, public dialog: MatDialog) {}

  ngOnInit() {
    this.projectToUpload.groupMembers = [];
    this.projectToUpload.screenShots = [];
    this.projectToUpload.zipLinks = [];
    this.groupMemberString = '';
    this.zipLinksString = '';
    this.githubURLRegex = new RegExp('^(https:\/\/github\.com\/[^/]+\/[^/]+)');  
  }

  /**
   * this method opens the dialog defined in the input-dialog component; 
   *    after the dialog is closed the user's data is placed in the groupMembers array or the zipLinks array depending on which field was clicked
   * @author Shawn Bickel (1810-Oct08-Java-USF)
   */
  openDialog(e): void {
    // determine which input was clicked, the group members field or the zip links field
    if (e.target.id == 'inputGroupMembers'){
      this.title = "New Group Member";
      this.questionType = "Enter the name of the group member";
    }else{
      this.title = "Repository Link";
      this.questionType = "Enter the Github URL of your repository";
    }

    // open the dialog contained in the InputDialogComponent passing the data to be displayed in the dialog
    const dialogRef = this.dialog.open(InputDialogComponent, {
      width: '250px',
      data: {title: this.title, questionType: this.questionType, result: this.result}
    });

    // when the dialog is closed, the data is returned as an observable
    dialogRef.afterClosed().subscribe(result => {
      // only proceed if the user entered information
      if (result !== undefined && result !== null){

        // if the user chose to add a group member, then place the input into the groupMembers array corresponding to the project to submit
        if (e.target.id == 'inputGroupMembers'){
          this.projectToUpload.groupMembers.push(result);
          this.groupMemberString += ' ' + result;
        }else{
         this.githubURL = result;
         console.log(this.githubURL);

         // find the exact match in the string corresponding to the github repository regular expression
         let regexArr = this.githubURL.match(this.githubURLRegex);
         console.log(regexArr);
         console.log(this.githubURLRegex.test(this.githubURL));


         /**
          * If the string contains no matches related to the regex or if the length of the input is greater than the match, then the link is not valid.
          * If the matched portion of the URL is only a subset of the entire URL, then we know that the URL is not valid.
          * The length of a valid URL will equal the length of the match found in the string corresponding the the regular expression.
          * All links are unique
          */
          if (this.githubURLRegex.test(this.githubURL) == false || this.githubURL.length != regexArr[0].length){
            this.invalidLink = true;
            return;
          }

          //  All links are unique
          if (this.projectToUpload.zipLinks.includes(result)){
            return;
          }

          console.log("this is a correctly formatted link");

          // at this point, the URL will be valid and will be placed in the array corresponding to the zip links array of the project to be submitted
          this.validGithubURL = true;
          this.invalidLink = false;
          this.projectToUpload.zipLinks.push(result);
          this.zipLinksString += ' ' + result;
        }
      }
    });
  }

   /**
	 * This method is bound to the event that the form is submitted;
   * all the data of the form is placed as key/value pairs into a FormData object;
   * this FormData object is then sent to the server as a post request to create a new project
	 * @author Shawn Bickel (1810-Oct08-Java-USF)
	 */
  submitForm() {
    // FormData is used to hold form fields and their values as key/value pairs to easily transfer data in a form 
    const formData = new FormData();
   
    // append the data of the form as key/value pairs using field names on the server as keys and data in the form as values
    formData.append('name', this.projectToUpload.name);
    formData.append('batch', this.projectToUpload.batch);
    formData.append('userFullName', this.projectToUpload.userFullName);
    formData.append('techStack', this.projectToUpload.techStack);
    formData.append('description', this.projectToUpload.description);
    formData.append('status', 'pending');

    console.log(this.projectToUpload.groupMembers);
    console.log(this.projectToUpload.zipLinks);
    console.log(this.projectToUpload.screenShots);


    // elements of an array are appended to the FormData object using the same key name
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

    // the FormData object is then sent to a service where it is submitted to the server as an http post request
    // this.projectService.createProject(formData).subscribe(project => {
    //    this.router.navigate(['/home']);
    // });


    // this.router.navigate(['/home']);
  }

  /**
   * When the file input is triggered, the event is passed to this method which uses the properties of the event to retrieve the files chosen and place them in the 
   *      array corresponding to the screenShots array of the project to be submitted
   * 
   * @param e the event corresponding to the user choosing a screenshot to uplodad
   */
  onFileSelected(e){
    console.log(e);
    for (let i = 0; i < e.target.files.length; i++){
      this.projectToUpload.screenShots.push(e.target.files[i]);
      this.validScreenshots = true;
    }
  }
}
