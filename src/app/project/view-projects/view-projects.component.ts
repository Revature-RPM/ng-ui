import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/core/models/Project';
import { Subscription } from 'rxjs';
import { ProjectServiceService } from 'src/app/core/services/project-service.service';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];


@Component({
  selector: 'app-view-projects',
  templateUrl: './view-projects.component.html',
  styleUrls: ['./view-projects.component.scss']
})
export class ViewProjectsComponent implements OnInit {
  
  items = Array.from({length: 100000}).map((_, i) => `Item #${i}`);

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;
  
  projects: Project[];
  subscription: Subscription;
  constructor(private viewProjectsService: ProjectServiceService) { }

    /**
	 * this is a lifecycle method called once by Angular after ngOnChanges(); it should be used to perform intialization logic; 
   * the content of the method includes a call to a service to consume information from an endpoint concerning projects; an observable 
   * is subscribed to and the returned projects are placed in an array to be displayed in a grid view.
	 * @author Shawn Bickel (1810-Oct08-Java-USF)
	 */
  ngOnInit() {
    this.subscription = this.viewProjectsService.getAllProjects()
          .subscribe((projectResponse) => {
            this.projects = projectResponse;
            console.log("got projects")
            console.log( projectResponse)
            });
  }

   /**
	 * this is a lifecycle method called once by Angular before the component is destroyed;
   * it is usually used to close resources such as unsubscribing from the observable's data stream;
   * resources should be released to avoid memory leaks
	 * @author Shawn Bickel (1810-Oct08-Java-USF)
	 */
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
