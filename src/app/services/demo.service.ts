import {Injectable} from '@angular/core';
import {ProjectService} from './project.service';
import {Project} from '../models/Project';

@Injectable({
  providedIn: 'root'
})
export class DemoService {

  demoMode = false;

  demoProject1 = {
    id: 9999,
  name: 'Cannons and Goblins',
  batch: '190422-Java-USF',
  trainer: 'Wezley Singleton',
  groupMembers: ['Justin Kerr', 'Daniel Shaffer', 'Aaron Rea', 'PJ Valenzuela'],
  screenShots: null, // Here is where put the URLs
  zipLinks: null, // For demo projects we leave this null.
  techStack: 'Java/J2EE',
  status: 'Approved',
  description: 'DESC HERE', //TODO Add real description here
  approvingProject: true,
  projectApproved: true,
  projectDeclined: false,
  dataModel: 'None'
};

  let demoProject2 = new Project(9999, 'Cannons and Goblins', '190422-Java-USF', 'Wezley Singleton', ['Justin Kerr', 'Daniel' +
  ' Shaffer', 'Aaron Rea', 'PJ Valenzuela'], null, null, 'Java/J2EE', 'Approved', 'DESC HERE', true, true, false, 'None');

  demoProjects = [this.demoProject1]; //Add all subsequent demo projects here

constructor(private projectService: ProjectService){}

populateDemos() {
    for (let project of this.demoProjects) {
      this.projectService.AllProjects.push(project);
    }
}
}
