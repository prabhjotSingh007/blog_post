import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
const options: any = {
    theme: "light",
    dangerouslyHTMLString: true,
    autoClose: 3000
}

export const showSuccess = (msg: string) => {
    toast(msg, { ...options, type: "success" })
}

export const showWarning = (msg: string) => {
    toast(msg, { ...options, type: "warning" })
}

export const showError = (msg: string) => {
    toast(msg, { ...options, type: "error" })
}

