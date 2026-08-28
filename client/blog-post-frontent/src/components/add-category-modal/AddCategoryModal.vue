<script setup lang="ts">
import useVuelidate from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import { computed, reactive, ref, watch } from 'vue';
import { showError, showSuccess } from '../../services/toster-service/toster';
import { CreateCategory } from '../../services/api-service/category-service/CategoryService';
import { hideLoader, showLoader } from '../../services/loader-service/loder-service';

interface PropsType {
    openModal: boolean
}

const emits = defineEmits<{
    (e: 'updateModalState', value: boolean): void,
    (e: 'shareData', value: any): void
}>()

const props = defineProps<PropsType>()


const modalBtnRef = ref<HTMLButtonElement | any>(null)

console.log(modalBtnRef)

const initalValue = reactive({
    title: ""
}
)

const rule = computed(() => ({
    title: { required, },

}))

const validate = useVuelidate(rule, initalValue)

const handleSumbit = async () => {
    console.log(initalValue)
    // Trigger validation on all fields
    const isFormValid = await validate.value.$validate();
    if (!isFormValid) {
        showError("Validation Error")
        return
    }

    try {
        showLoader()
        let response: any = await CreateCategory(initalValue.title);
        console.log(response)
        emits('shareData', response?.data)
        emits('updateModalState', false)

        hideLoader();
        showSuccess(response?.message ?? "Category Created Successfully")
    } catch (err: any) {
        hideLoader();

        showError(
            err?.response?.data?.message ??
            err?.message ??
            "Something went wrong"
        );

        console.log("FULL ERROR:", err);
        console.log("STATUS:", err?.response?.status);
        console.log("DATA:", err?.response?.data);
        console.log("MESSAGE:", err?.response?.data?.message);
    }
}

const closeModal = () => {
    emits('updateModalState', false)
}



watch(() => props.openModal, (newValue: boolean, oldValue: boolean) => {
    console.log(oldValue)
    console.log(newValue)
    if (newValue) modalBtnRef.value?.click()

})

</script>

<template>
    <!-- Button trigger modal -->
    <button ref="modalBtnRef" type="button" class="btn btn-primary visually-hidden" v-show="false"
        data-bs-toggle="modal" data-bs-target="#staticBackdrop">

    </button>

    <!-- Modal -->
    <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
        aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="staticBackdropLabel">Add Category</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="mb-3">
                        <label for="categoryName" class="form-label">Email address</label>
                        <input type="text" class="form-control" id="categoryName" placeholder=""
                            v-model="initalValue.title" :class="{ error: validate.title.$error }">

                        <div class="input-errors" v-if="validate.title.$error">
                            <div class="error-msg">Title Filed is required</div>
                        </div>
                    </div>

                </div>
                <div class="modal-footer">
                    <button type="button" @click="closeModal" class="btn btn-secondary"
                        data-bs-dismiss="modal">Close</button>
                    <button type="button" @click="handleSumbit" class="btn btn-primary">Add Category</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>