import type { Pagination } from "../../../type";
import axiosInterceptor from "../../axios-interceptor/interceptor";


export const HomePageBlog = async () => {
    try {
        let response = await axiosInterceptor.get('/blog/home');
        return response
    } catch (err: any) {
        throw new Error(err?.message)
    }
}

export interface BlogListPagination extends Pagination {
    categoryId: string | number,
}

export const AllBlogList = async (pagination: BlogListPagination) => {
    try {
        let response = await axiosInterceptor.get(`/blog/all?limit=${pagination?.limit}&currentPage=${pagination?.currentPage}&categoryId=${pagination?.categoryId}`);
        return response
    } catch (err: any) {
        throw new Error(err?.message)
    }
}

export const CreateBlog = async (data: any) => {
    try {
        let resposne = await axiosInterceptor.post('/blog/create', data, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        return resposne
    } catch (err: any) {
        throw new Error(err.message)
    }
}

