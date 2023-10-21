export interface Post{
    id: number,
    topic_id: number,
    author_id: number,
    title: string,
    content: string,
    created_at: Date,
    updated_at: Date,
}