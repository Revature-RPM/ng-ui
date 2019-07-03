export interface Project {
    id?: any;
    name?: string;
    batch?: string;
    trainer?: string;
    groupMembers?: string[];
    screenShots?: any[];
    zipLinks?: string[];
    techStack?: string;
    status?: string;
    description?: string;
    approvingProject?: boolean;
    projectApproved?: boolean;
    projectDeclined?: boolean;
    dataModel?: any[];
 }

 export class Project {
    id?: any;
    name?: string;
    batch?: string;
    trainer?: string;
    groupMembers?: string[];
    screenShots?: any[];
    zipLinks?: string[];
    techStack?: string;
    status?: string;
    description?: string;
    approvingProject?: boolean;
    projectApproved?: boolean;
    projectDeclined?: boolean;
    dataModel?: any[];

    constructor(id, name, batch, trainer, groupMembers, screenShots, zipLinks, techStack, status, description, 
        approvingProject, projectApproved, projectDeclined, dataModel) {
        this.id = id;
        this.name = name;
        this.batch = batch;
        this.trainer = trainer;
        this.groupMembers = groupMembers;
        this.screenShots = screenShots;
        this.zipLinks = zipLinks;
        this.techStack = techStack;
        this.status = status;
        this.description = description;
        this.approvingProject = approvingProject;
        this.projectApproved = projectApproved;
        this.projectDeclined = projectDeclined;
        this.dataModel = dataModel;
    }
 }
