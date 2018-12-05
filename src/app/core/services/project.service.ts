import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Project } from '../models/Project';

const HTTP_OPTIONS = {
  headers: new HttpHeaders({
    'Content-type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
<<<<<<< HEAD:src/app/core/services/project-service.service.ts
export class ProjectServiceService {
  CurrentProject: Project;
=======
export class ProjectService {

>>>>>>> 058c0817660304d5ce32fe5dfff2b4cb07bba413:src/app/core/services/project.service.ts
  constructor(private httpClient: HttpClient) { }

  getAllProjects(): Observable<Project[]> {
    return this.httpClient.get<Project[]>('http://localhost:8080/spring-mvc/projects', HTTP_OPTIONS);
  }

<<<<<<< HEAD:src/app/core/services/project-service.service.ts
  createProject(formData: FormData):  Observable<Project>{
    return this.httpClient.post('endpoint', formData);
  }
  setCurrentProject(project: Project){
    this.CurrentProject = project;
=======
  createProject(formData: FormData):  Observable<Project> {
    return this.httpClient.post('endpoint', formData, HTTP_OPTIONS);
>>>>>>> 058c0817660304d5ce32fe5dfff2b4cb07bba413:src/app/core/services/project.service.ts
  }
}