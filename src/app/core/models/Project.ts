import { User } from './User';

export interface Project {
    id?: number;
    name?: string;
    batch?: string;
    fullName?: string;
    groupMembers?: string[];
    screenShots?: string[];
    zipLinks?: string[];
    techStack?: string;
    status?: string;
    description?: string;
 }
