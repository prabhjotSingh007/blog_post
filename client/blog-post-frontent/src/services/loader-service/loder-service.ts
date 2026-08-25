import { ref } from 'vue'

const isLoading = ref(false)

export const showLoader = () => {
    isLoading.value = true
    console.log("showloader")
    console.log(isLoading.value)

}

export const hideLoader = () => {
    isLoading.value = false
}

export const useLoader = () => {
    return {
        isLoading,
        showLoader,
        hideLoader
    }
}