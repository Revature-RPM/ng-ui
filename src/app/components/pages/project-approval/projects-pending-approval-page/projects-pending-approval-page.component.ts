import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-projects-pending-approval-page',
  templateUrl: './projects-pending-approval-page.component.html',
  styleUrls: ['./projects-pending-approval-page.component.scss']
})

/**
 * This component is the parent component to the pending-projects-table, pending-edit-requests-table,
 * and selected project viewer components. This component's purpose is to collect
 * the project emmitted by the child component and set it as the current project.
 * @author Mikaela Enters
 * @author Donald Henderson
 */
export class ProjectsPendingApprovalPageComponent implements OnInit {

  selected = false;

  constructor(private projectService: ProjectService) {
  }

  ngOnInit() {
  }

  onSwapProject(row): void {
    this.selected = true;
    this.projectService.CurrentProject$.next(row);
  }

}
