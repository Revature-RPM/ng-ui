import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NgMetaService} from 'ngmeta'; // TODO use to change title to 'Edit | RPM' or something
import {Subscription} from 'rxjs';
import {Project} from 'src/app/models/Project';
import {ProjectService} from 'src/app/services/project.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/User';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { nodeValue } from '@angular/core/src/view';

@Component({
 selector: 'app-edit-project',
 templateUrl: './project-edit.component.html',
 styleUrls: ['./project-edit.component.scss']
})

/* This component adds functionality to edit a project. However, the server is adding an extra header to the response causing the following
   error: The 'Access-Control-Allow-Origin' header contains multiple values 'http://localhost:4200, http://localhost:4200', but only one is allowed.
   This needs to be addressed on the server to move forward. */

export class ProjectEditComponent implements OnInit {
 techStackList = ['Java/J2EE', 'PEGA', 'JavaScript MVC', '.Net', 'React.js', 'Java', 'iOS9'];

 public editForm: FormGroup;
 /* This field is initially true since the project contents for a particular project are placed in the form fields using two-way binding when
       ngOnInit() is called and the project is retrieved by id from the server */
 validForm: Boolean = true;

 // projectToUpdate will hold project information for a specific project returned by id and
 // is bound to the information that users enter in the form
 projectToUpdate: Project;
 originalProject: Project;
 user: User;

 /**
  * title, questionType, and result are all passed to a dialog when the user chooses either the group member or the links input field
  * title and questionType represent the information which will displayed in an input dialog
  * result will hold the user's response, either a group member or a link to be validated as a Github repository link
  * 
  */
 title = 'New Group Member';
 questionType = 'Enter the name of the group member';
 result;

 groupMember = '';

 subscription: Subscription; // will be used to subscribe to the results of an observable

 constructor(private router: Router,
   private projectService: ProjectService,
   private route: ActivatedRoute,
	 private userService: UserService,
   //private ngmeta: NgMetaService,
   ) { }

 ngOnInit() {

  this.projectService.CurrentProject$.asObservable().subscribe(
    project => {
      this.projectToUpdate = JSON.parse(JSON.stringify(project));
      this.originalProject = project;
    })
	this.userService.user.asObservable().subscribe(
		user => {
			this.user = user;
		}
  );
  this.editForm = new FormGroup({
    projectName: new FormControl(this.projectToUpdate.name, [Validators.required, Validators.maxLength(40)]),
    batchName: new FormControl(this.projectToUpdate.batch, [Validators.required, Validators.maxLength(40)]),
    trainerName: new FormControl(this.projectToUpdate.trainer, [Validators.required]),
    techStack: new FormControl(this.projectToUpdate.techStack, [Validators.required]),
    description: new FormControl(this.projectToUpdate.description, [Validators.required]),
    groupMembers: new FormControl(this.projectToUpdate.groupMembers, [Validators.required])
  })
  //this.ngmeta.setHead({ title: 'Edit Project | RPM' });
 }

 public validField = (controlName: string, errorName: string) => {
   return this.editForm.controls[controlName].hasError(errorName)
 }

 /**
  * This method determines if the entire form is valid when focus is removed from an input field
  * @param nameField : the template variable for the name input field which holds validation information
  * @param batchField : the template variable for the batch input field which holds validation information
  * @param trainerField : the template variable for the trainer name input field which holds validation information
  * @param descriptionField : the template variable for the description input field which holds validation information
  * @param techStackField : the template variable for the technology stack input field which holds validation information
  * 
  */
//  checkForValidField(nameField, batchField, trainerField, descriptionField, techStackField) {
//    if (!nameField.valid || !batchField.valid || !trainerField.valid || !descriptionField.valid || !techStackField.valid) {
//      this.validForm = false;
//    } else {
//      this.validForm = true;
//    }
//  }

 /**
  * This method is bound to the event that the form is submitted;
  * The updated project is sent to a service where it is sent to the server with an http put method
  * 
  */
 submitForm() {
   console.log(this.projectToUpdate);
   this.projectToUpdate.status = 'PendingEdit';
   this.projectToUpdate.oldProject = null;
   this.projectToUpdate.oldProject = this.originalProject;  //Setting the original project inside the updated project
   this.projectToUpdate.oldProject.oldProject = null;
   this.projectService.submitEditRequest(this.projectToUpdate).subscribe();
   this.router.navigate(['projects/'+this.user.id]);
 }

 back() {
   sessionStorage.setItem('lastPage', 'edit');
   this.router.navigate(['projects/'+this.user.id]);
 }

 /**
  * These methods allow for the removal and addition of users to projects when editing.
  * 
  */
 removeGroupMember(e) {// project : Project
   const updatedArr = this.projectToUpdate.groupMembers;
   const nameToRemove = e.target.textContent;
   const index = updatedArr.indexOf(nameToRemove);
   updatedArr.splice(index, 1);
   this.projectToUpdate.groupMembers = updatedArr;
 }

 addGroupMember() {
   console.log(this.groupMember);
   console.log(document.querySelector("#addMember").value);
   this.groupMember = document.querySelector('#addMember').value;
   const updatedArr = this.projectToUpdate.groupMembers;
   const nameToAdd = this.groupMember;
   updatedArr.push(nameToAdd);
   this.projectToUpdate.groupMembers = updatedArr;
   document.querySelector('#addMember').value = '';
   this.groupMember = '';
 }

 cancelEdit() {
   this.router.navigate(['projects/'+this.user.id]);
 }

}