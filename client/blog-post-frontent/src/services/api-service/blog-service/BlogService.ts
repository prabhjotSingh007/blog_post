import type { Pagination } from "../../../type";
import axiosInterceptor from "../../axios-interceptor/interceptor";


export const HomePageBlog = async () => {
    try {
        let response = await axiosInterceptor.get('/api/vi/blog/home');
        return response
    } catch (err: any) {
        throw new Error(err?.message)
    }
}

interface BlogListPagination extends Pagination {
    categoryId?: string | number
}

export const AllBlogList = async (pagination: BlogListPagination) => {
    try {
        let response = await axiosInterceptor.get(`/api/vi/blog/all?limit=${pagination?.limit}&currentPage=${pagination?.currentPage}&categoryId=${pagination?.categoryId}`);
        return response
    } catch (err: any) {
        throw new Error(err?.message)
    }
}