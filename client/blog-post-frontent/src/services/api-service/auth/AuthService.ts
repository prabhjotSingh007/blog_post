import type { User } from "../../../type";
import axiosInterceptor from "../../axios-interceptor/interceptor";


export const Login = async (user: User) => {
    try {
        let response = await axiosInterceptor.post('/api/vi/auth/login', user);
        return response
    } catch (err: any) {
        throw new Error(err?.message)
    }
}


export const Register = async (data: any) => {
    try {
        let response = await axiosInterceptor.post('/api/vi/auth/register', data);
        return response
    } catch (err: any) {
        throw new Error(err?.message)
    }
}