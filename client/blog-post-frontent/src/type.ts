export interface User {
    id?: string | number,
    name: string,
    email: string,
    password: string
}


export interface Pagination {
    limit: number,
    currentPage: number
}

export enum UserRole {
    Admin = "ADMIN",
    USER = "USER",
    Viewer = "VIEWER"
}


export interface Pagination {
    limit: number;
    currentPage: number;
    total: number,
    totalPage: number
}


export interface BlogCard {
    id: number,
    createdByID: number,
    categoryId: number,
    name: string,
    description: string,
    status: string,
    created_at: string,
    updated_at: string,
    deleted_at: null | string
}