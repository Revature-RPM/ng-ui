import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { NgMetaService } from 'ngmeta';
import { Subscription } from 'rxjs';

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

validForm: Boolean = true;

// projectToUpdate will hold project information for a specific project returned by id and is bound to the information that users enter in the form
projectToUpdate: Project = {};

/**
 * title, questionType, and result are all passed to a dialog when the user chooses either the group member or the links input field
 * title and questionType represent the information which will displayed in an input dialog
 * result will hold the user's response, either a group member or a link to be validated as a Github repository link
 * @author Shawn Bickel (1810-Oct08-Java-USF)
 */
title: string = "New Group Member";
questionType: string = "Enter the name of the group member";
result: string;


/**
 * groupMemberString is bound to the user's input of the group member field 
 * When a new group memberk is added, then that information is concatenated to the string. 
 * Because of two-way binding, the result is placed in the group member field 
 * @author Shawn Bickel (1810-Oct08-Java-USF)
 */
groupMemberString: string;

subscription: Subscription; // will be used to subscribe to the results of an observable

constructor(private router: Router,
  private ngmeta: NgMetaService,
  private projectService: ProjectService,
  private route: ActivatedRoute,
  private dialog: MatDialog,
  private snackBar: MatSnackBar) {}

ngOnInit() {
  if (localStorage.getItem('user') === null) {
    this.router.navigate(['/auth/login']);
  } else {
    this.ngmeta.setHead({ title: 'Edit Project | RPM' });
    this.projectToUpdate.groupMembers = [];
    this.projectToUpdate.screenShots = [];
    this.projectToUpdate.zipLinks = [];
    this.groupMemberString = '';
  }
   /**
   * This will retrieve the path variable which corresponds to the id of the project to be edited.
   * ActivatedRoute has an observable called 'params' which provides a means to do this.
   * Once the project id is retrieved from the path, it can be passed to the project service to obtain the project to update.
   * 
   *  @author Shawn Bickel (1810-Oct08-Java-USF)
   */
  this.subscription = this.route.params.subscribe(params => {
    this.projectService.getProjectById(params['id']).subscribe(projectById => {
      console.log(projectById);
        this.projectToUpdate = projectById;
        
        for (let i = 0; i < this.projectToUpdate.groupMembers.length; i++){
            this.groupMemberString += ' ' + this.projectToUpdate.groupMembers[i];
        }
    });   
 });
}

/**
 * This method determines if the entire form is valid when focus is removed from an input field
 * @param nameField : the template variable for the name input field which holds validation information
 * @param batchField : the template variable for the batch input field which holds validation information
 * @param trainerField : the template variable for the trainer name input field which holds validation information
 * @param descriptionField : the template variable for the description input field which holds validation information
 * @param techStackField : the template variable for the technology stack input field which holds validation information
 *  @author Shawn Bickel (1810-Oct08-Java-USF)
 */
checkForValidField(nameField, batchField, trainerField, descriptionField, techStackField){
  if (!nameField.valid || !batchField.valid || !trainerField.valid || !descriptionField.valid || !techStackField.valid){
    this.validForm = false;
  }else{
    this.validForm = true;
  }
}

ngOnDestroy() {
  this.subscription.unsubscribe();
}

/**
 * this method opens the dialog defined in the input-dialog component; 
 *    after the dialog is closed the user's data is placed in the groupMembers array or the zipLinks array depending on which field was clicked
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
    if (result !== undefined && result !== null){
      // if the user chose to add a group member, then place the input into the groupMembers array corresponding to the project to submit
      this.projectToUpdate.groupMembers.push(result);
      this.groupMemberString = this.projectToUpdate.groupMembers.join(', '); 
    } 
  });
}
 /**
 * This method is bound to the event that the form is submitted;
 * The updated project is sent to a service where it is sent to the server with an http put method
 * @author Shawn Bickel (1810-Oct08-Java-USF)
 */
submitForm() {
  console.log('in submit form');
  console.log(this.projectToUpdate);
  this.projectService.updateProject(this.projectToUpdate, this.projectToUpdate.id).subscribe(project => {});
  this.snackBar.open('The edited changes may take time to appear', '', {
    duration: 5000,
  });
  this.router.navigate(['/home']);
}
}

