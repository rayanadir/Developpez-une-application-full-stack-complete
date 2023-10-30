import { Topic } from "./topic.interface";
import { User } from "./user.interface";

export interface Post{
    id: number,
    topic: Topic,
    author: User,
    title: string,
    content: string,
    topic_id: number,
    createdAt: Date,
    updatedAt: Date,
}