import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-projects-pending-approval-page',
  templateUrl: './projects-pending-approval-page.component.html',
  styleUrls: ['./projects-pending-approval-page.component.scss']
})
export class ProjectsPendingApprovalPageComponent implements OnInit {

  selected: boolean;

  constructor(private projectService: ProjectService) {
  }

  ngOnInit() {

  }

  onSwapProject(row): void {
    this.selected = true;
    console.log(this.selected);
    this.projectService.CurrentProject$.next(row);
  }

}
