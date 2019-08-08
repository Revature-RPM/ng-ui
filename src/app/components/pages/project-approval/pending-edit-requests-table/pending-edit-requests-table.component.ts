import { Component, OnInit, Output, EventEmitter  } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';
import { Router } from '@angular/router';
import { Project } from 'src/app/models/Project';

@Component({
  selector: 'app-pending-edit-requests-table',
  templateUrl: './pending-edit-requests-table.component.html',
  styleUrls: ['./pending-edit-requests-table.component.scss']
})
export class PendingEditRequestsTableComponent implements OnInit {

  @Output() swapProject = new EventEmitter<{row: any}>();

  dataSource: Project[];
  selected: boolean;
  displayedColumns: string[] = ['Trainer', 'Project', 'Status of Request'];
  displayedColumnsData: string[] = ['trainer', 'name', 'status'];

  constructor(private router: Router, private projectService: ProjectService) { }

  ngOnInit() {
    this.selected = false;
    this.projectService.getProjectsByStatus('PendingEdit').subscribe(response => {
      this.dataSource = response;
    });
  }

  onSwapProject(row): void {
    this.swapProject.emit(row);
  }

}
