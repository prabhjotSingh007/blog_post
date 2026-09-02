import type { Pagination } from "../../../type";
import axiosInterceptor from "../../axios-interceptor/interceptor";


export const HomePageBlog = async () => {
    try {
        let response = await axiosInterceptor.get('/blogs/home');
        return response
    } catch (err: any) {
        throw new Error(err?.message)
    }
}

export interface BlogListPagination extends Pagination {
    categoryId: string | number | null,
    userId?: string | number
}

export const AllBlogList = async (pagination: BlogListPagination) => {
    try {
        let response = await axiosInterceptor.get(`/blogs?limit=${pagination?.limit}&currentPage=${pagination?.currentPage}&categoryId=${pagination?.categoryId}&userId=${pagination?.userId}`);
        return response
    } catch (err: any) {
        throw new Error(err?.message)
    }
}

export const CreateBlog = async (data: any) => {
    try {
        let resposne = await axiosInterceptor.post('/blogs/create', data, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        return resposne
    } catch (err: any) {
        throw new Error(err.message)
    }
}

