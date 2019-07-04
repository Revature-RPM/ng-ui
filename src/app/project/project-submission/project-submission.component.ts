import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { NgMetaService } from 'ngmeta';

import { EditDialogComponent } from './edit-dialog/edit-dialog.component';
import { Project } from 'src/app/core/models/Project';
import { ProjectService } from 'src/app/core/services/project.service';
import { UserService } from 'src/app/core/services/user.service';
import { User } from 'src/app/core/models/User';
import { SnackbarService } from 'src/app/core/services/snackbar.service';
import { FormBuilder } from '@angular/forms';


// this interface represents data to be held and returned from an input dialog
export interface DialogData {
  title: string;
  questionType: string;
  result: string;
  values: string[];
}

@Component({
  selector: 'app-project-submission',
  templateUrl: './project-submission.component.html',
  styleUrls: ['./project-submission.component.scss']
})

export class ProjectSubmissionComponent implements OnInit {

  projectToUpload: Project = {};
  user: User;

  /**
   * groupMemberString and zipLinkString are both bound to the user's input of the group member field and the zip links field
   * When a new group member or zip link is added, then that information is concatenated to the string.
   * Because of two-way binding, the result is placed in either the group member field or the zip links field
   * @author Shawn Bickel (1810-Oct08-Java-USF)
   */
  groupMemberString: string = '';
  zipLinksString: string = '';

  //Other fields
  screenshotPicList = [];
  techStackList = ['Java/J2EE', 'PEGA', 'JavaScript MVC', '.Net', 'React.js', 'Java', 'iOS9'];
  submitting = false;
  githubURL: string;
  githubURLRegex: RegExp = new RegExp('^(https:\/\/github\.com\/[^/]+\/[^/]+)');
  invalidLink: boolean;

  constructor(
    private router: Router,
    private ngmeta: NgMetaService,
    private dialog: MatDialog,
    private projectService: ProjectService,
    private userService: UserService,
    private snackbar: SnackbarService,
    private formBuilder: FormBuilder
  ) { }

  // The logic for stripping expired JWTs and rerouting to the login page is now in the JWTInterceptor.
  ngOnInit() {
    this.ngmeta.setHead({ title: 'Submit | RPM' });
    this.user = this.userService.user;

    this.projectToUpload.trainer = this.userService.user.firstName + ' ' + this.userService.user.lastName;
    this.projectToUpload.groupMembers = [];
    this.projectToUpload.screenShots = [];
    this.projectToUpload.zipLinks = [];
    this.projectToUpload.dataModel = [];
  }

  /**
 * This method opens the dialog defined in the edit-dialog component, which is decided by
 * the field id of which you access this method from using an if/else If statement.
 * After the dialog is closed, the user's updated data is placed in the groupMembers array.
 * 
 * @param e: the event of clicking either the group member or zip links fields, which both trigger the dialog to open
 * @author Sean Doyle (1810-Oct22-Java-USF)
 * @author Justin Kerr, Rodel Flores
 */
  openEditableDialog(e) {

    let title, questionType, width, values;

    if (e.target.id === 'inputGroupMembers') {
      title = 'New Group Member';
      questionType = 'Enter the name of the group member';
      width = 300;
      values = this.projectToUpload.groupMembers;
    }
    else if (e.target.id === 'inputGithubLink') {
      title = 'Repository Link';
      questionType = 'Enter the Github URL of your repository';
      width = 500;
      values = this.projectToUpload.zipLinks;
    }

    const dialogRef = this.dialog.open(EditDialogComponent, {
      width: width + 'px',
      data: { title: title, questionType: questionType, values: values }
    });

    dialogRef.afterClosed().subscribe(

      result => {
        if (result) {
          if (e.target.id === 'inputGroupMembers') {
            this.projectToUpload.groupMembers = result;
            this.groupMemberString = this.projectToUpload.groupMembers.join(', ');
          } else {

            result.forEach(
              element => {
                if (this.githubURLRegex.test(element)) {
                  if (!this.projectToUpload.zipLinks.includes(element)) {
                    this.projectToUpload.zipLinks.push(element);
                  }
                }
              });

            if (this.projectToUpload.zipLinks.length > 0) this.zipLinksString = this.projectToUpload.zipLinks.join('\n');
          }
        }
      });
  }

  /**
   * When the file input is triggered, the event is passed to this method
   * which uses the properties of the event to retrieve the files chosen and
   * place them in the array corresponding to the screenShots/dataModel array of the project to be submitted
   * 
   * This method will now check for file size and if the file is too large, open a snackbar message and
   * not add the file to the project
   *
   * @param e the event corresponding to the user choosing a file to uplodad
   * @editor Justin Kerr
   */
  imagePath;
  imgURL : any;

  onFileSelected(e, inputfield) {
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = (_event) => {
    this.screenshotPicList.push(reader.result);
    }    

    for (let i = 0; i < e.target.files.length; i++) {

      if (e.target.files[i].size > 10485760) { // 10 MiB
        this.snackbar.openSnackBar('File too large', 'dismiss');
        return;
      }
      if (inputfield === 'scs') {
        this.projectToUpload.screenShots.push(e.target.files[i]);
      }
      else if (inputfield === 'dms') this.projectToUpload.dataModel.push(e.target.files[i]);
    }

  }

  /**
   * Finds the index of the file within projectToUpload that was previously uploaded to the form
   * and removes it using a basic splice method
   * Also removes the picture from the screenshot picture list
   * 
   * Currently if you remove a file and try to add the same one back, it won't be added back.
   * If you try to add another file and then retry adding the previous file, it WILL be added back.
   *
   * @param file: the file that was uploaded to the form
   * @author Justin Kerr
   */
  removeData(file: File, inputfield) {
    let list;
    let piclist;
    if(inputfield === 'scs') {
      list = this.projectToUpload.screenShots;
      piclist = this.screenshotPicList;
    }
    if(inputfield === 'dms') {
      list = this.projectToUpload.dataModel;
      piclist = null;
    }
    
    const index: number = list.indexOf(file);
    if (index !== -1) {
      list.splice(index, 1);
      if(piclist) piclist.splice(index, 1);
    }
  }

  /**
   * This method is bound to the submission of the form
   * All the data of the form is placed as key/value pairs into a FormData object
   * This FormData object is then sent to the project service for communication with the server
   * @author Shawn Bickel (1810-Oct08-Java-USF)
   * @author Justin Kerr, Rodel Flores
   */
  submitForm() {
    let formData = new FormData();
    formData.append('name', this.projectToUpload.name);
    formData.append('batch', this.projectToUpload.batch);
    formData.append('trainer', this.projectToUpload.trainer);
    formData.append('techStack', this.projectToUpload.techStack);
    formData.append('description', this.projectToUpload.description);
    formData.append('status', 'pending');

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

    for (let l = 0; l < this.projectToUpload.dataModel.length; l++) {
      formData.append('dataModel', this.projectToUpload.dataModel[l]);

    }
    console.log(formData);

    this.projectService.createProject(formData).subscribe(
      project => {
        this.snackbar.openSnackBar('The new project will be visible momentarily.', 'Dismiss');
        this.router.navigate(['/home']);
      },
      error => {
        if (error.status === 400) {
          this.snackbar.openSnackBar('Bad Request - Please try again.', 'Dismiss');
        }
        if (error.status === 500) {
          this.snackbar.openSnackBar('Internal server error!', 'Dismiss');
        }
      });
  }
}