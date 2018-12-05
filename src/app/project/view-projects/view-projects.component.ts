import { Component, OnDestroy, OnInit } from '@angular/core';
import { Project } from 'src/app/core/models/Project';
import { Subscription } from 'rxjs';
import { ProjectService } from 'src/app/core/services/project.service';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}


@Component({
  selector: 'app-view-projects',
  templateUrl: './view-projects.component.html',
  styleUrls: ['./view-projects.component.scss']
})
export class ViewProjectsComponent implements OnInit, OnDestroy {
  projects: Project[];
  subscription: Subscription;
  constructor(private viewProjectsService: ProjectService) { }

  ngOnInit() {
    this.subscription = this.viewProjectsService.getAllProjects()
          .subscribe((projectResponse) => {
            this.projects = projectResponse;
            console.log('got projects');
            console.log( projectResponse);
            });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
