import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { NgMetaService } from 'ngmeta'; // TODO use to change title to 'Edit | RPM' or something
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';

import { Project } from 'src/app/core/models/Project';
import { ProjectService } from 'src/app/core/services/project.service';
import { InputDialogComponent } from '../project-submission/input-dialog/input-dialog.component';

export interface DialogData {
  title: string;
  questionType: string;
  result: string;
}

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.scss']
})
export class EditProjectComponent implements OnInit {

  // projectToUpdate will hold project information for a specific project returned by id and is bound to the information that users enter in the form
  projectToUpdate: Project = {};

  /**
   * title, questionType, and result are all passed to a dialog when the user chooses either the group member or the links input field
   * title and questionType represent the information which will displayed in an input dialog
   * result will hold the user's response, either a group member or a link to be validated as a Github repository link
   * @author Shawn Bickel (1810-Oct08-Java-USF)
   */
  title = 'New Group Member';
  questionType = 'Enter the name of the group member';
  result: string;


  /**
   * groupMemberString and zipLinkString are both bound to the user's input of the group member field and the zip links field
   * When a new group member or zip link is added, then that information is concatenated to the string.
   * Because of two-way binding, the result is placed in either the group member field or the zip links field
   * @author Shawn Bickel (1810-Oct08-Java-USF)
   */
  groupMemberString: string;

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

  subscription: Subscription; // will be used to subscribe to the results of an observable

  constructor(private router: Router, private projectService: ProjectService, private route: ActivatedRoute, public dialog: MatDialog) {}

  ngOnInit() {
    this.projectToUpdate.groupMembers = [];
    this.projectToUpdate.screenShots = [];
    this.projectToUpdate.zipLinks = [];
    this.groupMemberString = '';
    /**
     * This will retrieve the path variable which corresponds to the id of the project to be edited.
     * ActivatedRoute has an observable called 'params' which provides a means to do this.
     * Once the project id is retrieved from the path, it can be passed to the project service to obtain the project to update.
     */
    this.subscription = this.route.params.subscribe(params => {
      this.projectService.getProjectById(params['id']).pipe(first()).subscribe(projectById => {
        this.projectToUpdate = projectById;

        for (let i = 0; i < this.projectToUpdate.groupMembers.length; i++) {
          this.groupMemberString += ' ' + this.projectToUpdate.groupMembers[i];
        }
        this.projectToUpdate.zipLinks.length = 0;
        this.projectToUpdate.screenShots.length = 0;
        this.projectToUpdate.zipLinks.push('');
        const dummyFile = new File(['foo'], 'dummy.txt');
        this.projectToUpdate.screenShots.push(dummyFile);
      });
  });
  }

  /**
   * this method opens the dialog defined in the input-dialog component;
   * after the dialog is closed the user's data is placed in the groupMembers array or the zipLinks array depending on which field was clicked
   * @param e: the event of clicking either the group member or zip links fields, which both trigger the dialog to open
   * @author Shawn Bickel (1810-Oct08-Java-USF)
   */
  openDialog(e): void {
    // open the dialog contained in the InputDialogComponent passing the data to be displayed in the dialog
    const dialogRef = this.dialog.open(InputDialogComponent, {
      width: '250px',
      data: {title: this.title, questionType: this.questionType, result: this.result}
    });

    // when the dialog is closed, the data is returned as an observable
    dialogRef.afterClosed().subscribe(result => {
      // only proceed if the user entered information
      if (result !== undefined && result !== null) {
        // if the user chose to add a group member, then place the input into the groupMembers array corresponding to the project to submit
        this.projectToUpdate.groupMembers.push(result);
        this.groupMemberString += result + ' ';
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
    formData.append('name', this.projectToUpdate.name);
    formData.append('batch', this.projectToUpdate.batch);
    formData.append('fullName', this.projectToUpdate.userFullName);
    formData.append('techStack', this.projectToUpdate.techStack);
    formData.append('description', this.projectToUpdate.description);
    formData.append('status', 'pending');

    // elements of an array are appended to the FormData object using the same key name
    for (let i = 0; i < this.projectToUpdate.groupMembers.length; i++) {
      formData.append('groupMembers', this.projectToUpdate.groupMembers[i]);
    }

    // the FormData object is then sent to a service where it is submitted to the server as an http post request
    this.projectService.updateProject(formData, this.projectToUpdate.id).subscribe(project => {
      this.router.navigate(['/home']);
    });
  }
}
