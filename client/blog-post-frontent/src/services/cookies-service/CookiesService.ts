import Cookies from 'js-cookie';
import type { User } from '../../type';
import { onMounted, ref } from 'vue';

const currentUser = ref<User | null>(null)

const getUserFromCookies = () => {
    const user = Cookies.get("Blog_Post_user");
    currentUser.value = user ? JSON.parse(user) : null
    return currentUser
}

const saveUserInCookes = (user: User) => {
    Cookies.set("Blog_Post_user", JSON.stringify(user), { expires: 1 })
    currentUser.value = user
}

const clearUserFromCookies = () => {
    Cookies.remove("Blog_Post_user")
    currentUser.value = null


}

onMounted(() => {
    getUserFromCookies()
})

export const useUser = () => {
    return {
        currentUser
    }
}


export { getUserFromCookies, saveUserInCookes, clearUserFromCookies }