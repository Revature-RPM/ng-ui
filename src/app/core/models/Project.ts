import { User } from './User';

export interface Project {
    name?: string;
    batch?: string;
    trainers?: User[];
    groupMembers?: string[];
    screenshots?: string[];
    teamImage?: string;
    repoLinks?: string[];
    teckStack?: string[];
    status?: string;
    description?: string;
 }
