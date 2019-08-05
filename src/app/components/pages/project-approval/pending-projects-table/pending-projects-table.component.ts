import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';
import { Router } from '@angular/router';
import { Project } from 'src/app/models/Project';

@Component({
  selector: 'app-pending-projects-table',
  templateUrl: './pending-projects-table.component.html',
  styleUrls: ['./pending-projects-table.component.scss']
})
export class PendingProjectsTableComponent implements OnInit {

  dataSource: Project[];
  selected: boolean;
  displayedColumns: string[] = ['Trainer', 'Project', 'Status of Request'];
  displayedColumnsData: string[] = ['trainer', 'name', 'status'];

  constructor(private router: Router, private projectService: ProjectService) { }

  ngOnInit() {
    this.selected = false;
    this.projectService.getProjectsByStatus('Pending').subscribe(response => {
      this.dataSource = response;
    });
  }

  swapProject(row): void {
    this.selected = true;
    console.log(this.selected);
    this.projectService.CurrentProject$.next(row);
  }

}
