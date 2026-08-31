
import { helpers } from "@vuelidate/validators";

// Validates allowed image formats
export const imageMimeType = (allowedTypes: any[]) => {
    return helpers.withMessage(`nvalid file type. Only  ${allowedTypes.join(', ')}   are allowed.`,
        (value: any) => {
            if (!value) return true
            return allowedTypes.includes(value.type)
        }
    )
}

// Validates maximum file size (e.g., 5MB = 5 * 1024 * 1024 bytes)
export const allowedSize = (maxBytes: number) => {
    return helpers.withMessage(`File size cannot exceed ${(maxBytes / 1024 / 1024).toFixed(1)} MB`,
        (value: any) => {
            if (!value) return true // Let 'required' validator handle empty fields
            return value.size <= maxBytes
        }
    )
}


export const createUrl = (file: File) => {
    return URL.createObjectURL(file)
}

