import type { User } from "../../../type";
import axiosInterceptor from "../../axios-interceptor/interceptor";


export const Login = async (user: User) => {
    try {
        let response = await axiosInterceptor.post('/api/vi/auth/login', user);
        return response
    } catch (err: any) {
        throw new Error(err)
    }
}


export const Register = async (user: User) => {
    try {
        let response = await axiosInterceptor.post('/api/vi/auth/register', user);
        return response
    } catch (err: any) {
        throw new Error(err)
    }
}