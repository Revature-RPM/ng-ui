import {Component, OnInit} from '@angular/core';
import {ProjectService} from '../../../../services/project.service';
import {Project} from '../../../../models/Project';
import {Router} from '@angular/router';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-project-grid-page',
  templateUrl: './project-grid-page.component.html',
  styleUrls: ['./project-grid-page.component.scss']
})
export class ProjectGridPageComponent implements OnInit{

  project: Project;
  user: User;

  constructor(private projectService: ProjectService,
              private userService: UserService,
              private router: Router ) { }

  ngOnInit() {
    this.projectService.CurrentProject$.subscribe(
      proj => {
        if (proj) {
          this.project = proj;
        }
      });
    if (localStorage.getItem('user')) {
      this.user = JSON.parse(localStorage.getItem('user'));
    } else {
      this.userService.user.asObservable().subscribe ( user => {
        if (user) {
          this.user = user;
        }
      }
    );}
  }


  updateProject() {
    if (this.project) {
      this.router.navigate(['/updateform']);
    }
    console.log('this is called');
  }

  /**
   * Iff a project is selected, 
   *  updates the view to the codebase view.
   *
   *  @author Michael James | Ashton Sullivan 1906-Java-USF
   */
  viewCodeBase() {
    if (this.project) {
      this.router.navigate(['/codebase']);
    }
  }
}
