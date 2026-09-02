import axiosInterceptor from "../../axios-interceptor/interceptor";


export const CreateCategory = async (title: string) => {
    try {
        let resposne = await axiosInterceptor.post('/category/create', { categoryName: title });
        return resposne
    } catch (err: any) {
        throw new Error(err.message)
    }
}

export const GetAllCategoryList = async () => {
    try {
        let resposne = await axiosInterceptor.get('/category/');
        return resposne
    } catch (err: any) {
        throw new Error(err.message)
    }
}


export const UpadateCategory = async (data: any) => {
    try {
        let resposne = await axiosInterceptor.put('/category/update', data);
        return resposne
    } catch (err: any) {
        throw new Error(err.message)
    }
}

export const DeleteCategory = async (categoryId: any) => {
    try {
        let resposne = await axiosInterceptor.post('/category/delete', { categoryId });
        return resposne
    } catch (err: any) {
        throw new Error(err.message)
    }
}