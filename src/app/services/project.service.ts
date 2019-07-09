import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

import {Project} from '../models/Project';
import {environment} from 'src/environments/environment';

const HTTP_OPTIONS = {
  headers: new HttpHeaders({
    'Content-type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})

export class ProjectService {
  AllProjects$: BehaviorSubject<Project[]> = new BehaviorSubject<Project[]>(null);
  AllProjects: Project[];
  CurrentProject$: BehaviorSubject<Project> = new BehaviorSubject<Project>(null);
  CurrentProject: Project;
  projFilter: string;

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
  createProject(project: FormData): Observable<Project> {
    return this.httpClient.post(environment.url + '/project/', project);
  }

  deleteProjectById(id): Observable<any> {
    return this.httpClient.delete<any>(environment.url + `/project/id/${id}`);
  }
}
