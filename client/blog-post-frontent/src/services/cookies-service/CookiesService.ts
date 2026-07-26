import Cookies from 'js-cookie';


const getUserFromCookies = () => {
    const user = Cookies.get("Blog_Post_user");
    return user ? JSON.parse(user) : null
}


export { getUserFromCookies }