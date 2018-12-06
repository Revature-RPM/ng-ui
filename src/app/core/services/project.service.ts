import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from '../models/Project';
import { environment } from 'src/environments/environment';

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
    return this.httpClient.get<Project[]>('http://localhost:8080/spring-mvc/projects', HTTP_OPTIONS);
  }

  createProject(formData: FormData): Observable<Project> {
    return this.httpClient.post('endpoint', formData);
  }
  
  setCurrentProject(project: Project) {
    this.CurrentProject = project;
  }
}
