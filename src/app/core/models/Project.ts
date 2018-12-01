import { User } from './User';

export interface Project {
    Name?: String;
    Batch?: String;
    Trainers?: User[];
    GroupMembers?: String[];
    Screenshots?: String[];
    TeamImage?: String;
    RepoLinks?: String[];
    TeckStack?: String[];
    Status?: String;
 }
