import { Project } from 'src/app/models/Project';
import { of, BehaviorSubject, Observable } from 'rxjs';

/**
* A Mock of the ProjectService
* @author - Mike James 1906-Java
*/
export class MockProjectService {
    AllProjects$: BehaviorSubject<Project[]> = new BehaviorSubject<Project[]>(null);
    CurrentProject$: BehaviorSubject<Project> = new BehaviorSubject<Project>(null);
    CurrentProject: Project;
 
    constructor() {
         this.CurrentProject  = {
              name: 'Fake Project',
              batch: '3rd Batch Java',
              trainer: 'Nick',
              groupMembers: ['Mike', 'Molly', 'Sam'],
              techStack: 'Java',
              description: 'This is a fake project for testing',
              status: 'not pending',
              screenShots: ['aValue'],
              zipLinks: ['value'],
    };
 
    this.CurrentProject$.next(this.CurrentProject);
    this.AllProjects$.next([this.CurrentProject]);
    }

    getProjectByField(field: string, value?: string) {
         return this.AllProjects$.asObservable();
   }
 
    getAllProjects(): Observable<Project[]> {
         return this.AllProjects$.asObservable();
    }
 
    getAllApprovedProjects(): Observable<Project[]> {
         return this.AllProjects$.asObservable();
    }

    submitEditRequest(project: Project): Observable<Project> {
          return this.CurrentProject$.asObservable();
    }

    updateProject(project: Project, id: Number): Observable<Project> {
          return this.CurrentProject$.asObservable();
    }
}
