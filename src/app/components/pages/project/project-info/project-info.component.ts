import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../../../services/project.service';
import { Project } from '../../../../models/Project';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-info',
  templateUrl: './project-info.component.html',
  styleUrls: ['./project-info.component.scss']
})

/**
 *  This component is responsible for displaying project metatdata
 *  It subscribes to the ProjectService.currentProject taking
 *  its initial value and updating as needed via an observable.
 *
 *  @author Rodel Flores | Ian Baker 190422-Java-USF
 */

export class ProjectInfoComponent implements OnInit {

  project: Project;
  yourProject = false;

  constructor(private projectService: ProjectService, private router: Router) {}

  ngOnInit() {
    this.projectService.CurrentProject$.asObservable().subscribe(
      proj => {
        if (proj) {
          this.project = proj;
        }
      });
      if (localStorage.getItem('viewprojects') == 'user') this.yourProject = true;
      else this.yourProject = false;
  }

  updateProject() {
    if (this.project) this.router.navigate(['/updateform']);
  }

  devString() {
    let members = this.project.groupMembers;
    let returnString = '';
    
    if (members.length > 0) {
      returnString += members[0];
    }

    for (let i = 1; i < members.length; i++) {
      returnString += ', ' + members[i];
    }

    return returnString;
  }

}
