import { ICategory } from "./category.table.type";

export interface INewsSearch {
    id: number;
    title: string;
    slug: string;
    description: string;
    content: string;
    image?: any;
    created_at: string;
    updated_at: string;
    published_at: string;
    category_title: string;
    author_name: string;
}
export interface INewsBySlug {
    id: number;
    title: string;
    slug: string;
    description: string;
    content: string;
    image?: any;
    created_at: string;
    updated_at: string;
    published_at: string;
    status: number;
    category_title: string;
    author_name: string;
    category: ICategory;
    author: Author;
}

interface Author {
    id: number;
    member_id: number;
    name: string;
    email: string;
    email_verified_at?: any;
    created_at: string;
    updated_at: string;
}