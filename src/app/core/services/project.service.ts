import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Project } from '../models/Project';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

const HTTP_OPTIONS = {
  headers: new HttpHeaders({
    'Content-type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  CurrentProject: Project;

  constructor(private httpClient: HttpClient) { }

  getAllProjects(): Observable<Project[]> {
    return this.httpClient.get<Project[]>(environment.url + '/project/', HTTP_OPTIONS);
  }

  getProjectById(id): Observable<Project> {
    return this.httpClient.get<Project>(environment.url + `/project/id/${id}`, HTTP_OPTIONS);
  }

  updateProject(project: Project, id): Observable<Project> {
    return this.httpClient.put(environment.url + `/project/${id}`, project, HTTP_OPTIONS);
  }

  /*
   *  TODO project-service needs to get rid of the trailing slash
   */
  createProject = (project: Project) => {
    console.log(project);
    return this.httpClient.post(environment.url + '/project/', { project }, { observe: 'response' }).pipe(
      map( resp => {
        let respBody = resp.body as Project;
  
        let project = new Project(
          null,
          respBody.name,
          respBody.batch,
          respBody.trainer,
          respBody.groupMembers,
          respBody.screenShots,
          respBody.zipLinks,
          respBody.techStack,
          null,
          respBody.description,
          null,
          null,
          null,
          respBody.dataModel
        );
      })
    );
  }

  setCurrentProject(project: Project) {
    this.CurrentProject = project;
  }

  deleteProjectById(id): Observable<any> {
    return this.httpClient.delete<any>(environment.url + `/project/id/${id}`);
  }
}
