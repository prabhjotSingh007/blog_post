import Cookies from 'js-cookie';
import type { User } from '../../type';


const getUserFromCookies = () => {
    const user = Cookies.get("Blog_Post_user");
    return user ? JSON.parse(user) : null
}

const saveUserInCookes = (user: User) => {
    Cookies.set("Blog_Post_user", JSON.stringify(user), { expires: 1 })
}

const clearUserFromCookies = () => {
    Cookies.remove("Blog_Post_user")
}


export { getUserFromCookies, saveUserInCookes, clearUserFromCookies }