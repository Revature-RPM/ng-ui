export interface Notification{
    notificationId?:number;
    dateCreated?:Date;
    isRead?:boolean;
    title?:string;
    fullDescription?:string;
    shortDescription?:string;
    userId?:number;
    contentType?:string;
    projectId?:number;
}