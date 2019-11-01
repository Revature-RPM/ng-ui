import {Component, OnInit} from '@angular/core';
import { Router} from '@angular/router';
import {NgMetaService} from 'ngmeta'; // TODO use to change title to 'Edit | RPM' or something
import {Subscription} from 'rxjs';
import {Project} from 'src/app/models/Project';
import {ProjectService} from 'src/app/services/project.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/User';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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

 //Set form to FormGroup
 public editForm: FormGroup;

 // projectToUpdate will hold project information for a specific project returned by id and
 // is bound to the information that users enter in the form
 projectToUpdate: Project;
 originalProject: Project;
 user: User;
 
//This is a two-way binding variable with our form to use in the addGroupMember()
 groupMember = '';

 subscription: Subscription; // will be used to subscribe to the results of an observable

 constructor(private router: Router,
   private snackbarService: SnackbarService,
   private projectService: ProjectService,
	 private userService: UserService
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
 }

 /**
  * Method checks to see if mat-error should be displayed.
  * Returns a Boolean.
  */
 public validField = (controlName: string, errorName: string) => {
   return this.editForm.controls[controlName].hasError(errorName)
 }

 /**
  * This method is bound to the event that the form is submitted;
  * The updated project is sent to a service where it is sent to the server with an http put method
  * On success will set the current project to be watched to the updated project.
  */
 submitForm() {
  this.projectToUpdate.status = 'Pending';
  this.projectToUpdate.oldProject = null;
  this.projectToUpdate.oldProject = this.originalProject;  //Setting the original project inside the updated project
  this.projectToUpdate.oldProject.oldProject = null;
  this.projectService.submitEditRequest(this.projectToUpdate).subscribe(
    (res) => {
      this.snackbarService.openSnackBar("Your update was successful", "Success");
      this.projectService.CurrentProject$.next(this.projectToUpdate);
      window.history.back();
    },
    (err) => {
      console.log("Error obj from project edit", err);
      this.snackbarService.openSnackBar("Something went wrong. Try again", "Failed");
    }
  );
  

 }

 back() {
   window.history.back();
 }

 /**
  * These methods allow for the removal and addition of users to projects when editing.
  * 
  */
 removeGroupMember(name: string) {
   const updatedArr = this.projectToUpdate.groupMembers;
   const nameToRemove = name;
   console.log('removing ', nameToRemove);
   //const nameToRemove = e.target.textContent;
   const index = updatedArr.indexOf(nameToRemove);
   updatedArr.splice(index, 1);
   this.projectToUpdate.groupMembers = updatedArr;
 }

 addGroupMember() {
   console.log('adding ',this.groupMember);
   const updatedArr = this.projectToUpdate.groupMembers;
   const nameToAdd = this.groupMember;
   updatedArr.push(nameToAdd);
   this.projectToUpdate.groupMembers = updatedArr;
   this.groupMember = '';
 }

 cancelEdit() {
   this.router.navigate(['projects/'+this.user.id]);
 }

}