export interface User {
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
}