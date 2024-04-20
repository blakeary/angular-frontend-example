export interface Page {
    id: number;
    category: number;
    title: string;
    slug: string;
    content: string;
    created_at: Date;
    updated_at: Date;
    is_published: boolean;
    published_by: number;
}
