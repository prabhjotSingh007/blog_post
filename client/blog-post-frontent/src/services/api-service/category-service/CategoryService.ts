import axiosInterceptor from "../../axios-interceptor/interceptor";


export const CreateCategory = async (title: string) => {
    try {
        let resposne = await axiosInterceptor.post('/category/create', { categoryName: title });
        return resposne
    } catch (err: any) {
        throw new Error(err.message)
    }
}

export const GetAllBlogList = async () => {
    try {
        let resposne = await axiosInterceptor.get('/category/all');
        return resposne
    } catch (err: any) {
        throw new Error(err.message)
    }
}