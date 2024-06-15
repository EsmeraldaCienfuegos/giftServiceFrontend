import { UserWeb } from "./UserWeb";

export class Notification{
    idNotification:number=0
    emissionDate: Date = new Date(Date.now())
    message:string=""
    usEr: UserWeb=new UserWeb();
}