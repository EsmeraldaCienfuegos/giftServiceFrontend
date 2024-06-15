import { UserWeb } from "./UserWeb";
import { Entrepreneurship } from "./entrepreneurship";

export class Conversation{
    idConversation: number = 0;
    textConversation: string = '';
    dateConversation: Date = new Date();
    entrepreneurship: Entrepreneurship = new Entrepreneurship();
    users: UserWeb = new UserWeb();
}