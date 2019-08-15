import {Component, OnInit} from '@angular/core';
import {ProjectService} from '../../../../services/project.service';
import {Project} from '../../../../models/Project';
import {Router} from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-project-grid-page',
  templateUrl: './project-grid-page.component.html',
  styleUrls: ['./project-grid-page.component.scss']
})
export class ProjectGridPageComponent implements OnInit{

  project: Project;
  user: User;

  constructor(private projectService: ProjectService, private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.projectService.CurrentProject$.subscribe(
      proj => {
        if (proj) {
          this.project = proj;
        }
      });

      this.userService.user.asObservable().subscribe(
        user => {
          this.user = user;
      });
  }


  updateProject() {
    if (this.project) this.router.navigate(['/updateform']);
  }
}
