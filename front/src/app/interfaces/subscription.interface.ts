import { Topic } from "./topic.interface";
import { User } from "./user.interface";

export interface Subscription{
    id:number,
    user:User,
    topic:Topic
}