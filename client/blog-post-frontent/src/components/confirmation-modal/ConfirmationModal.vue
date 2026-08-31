<script setup lang="ts">
import { ref, watch } from 'vue';

interface porps {
    showModal: boolean,
}
const props = defineProps<porps>()

const modalRefBtn = ref<HTMLButtonElement | any>(null)

const emits = defineEmits<{
    (e: 'onConfrimation', value: boolean): void,
}>()


watch(() => props.showModal, (newValue: boolean, oldValue: boolean) => {
    console.log(newValue, "newValue", oldValue, "oldValue")
    if (newValue || !newValue) modalRefBtn.value?.click()

})



</script>

<template>
    <!-- Button trigger modal -->
    <button ref="modalRefBtn" type="button" class="btn btn-primary visually-hidden" v-show="false"
        data-bs-toggle="modal" data-bs-target="#ConfirmationModal">

    </button>

    <!-- Modal -->
    <div class="modal fade" id="ConfirmationModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
        aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="staticBackdropLabel">Confrimation</h1>
                </div>
                <div class="modal-body">
                    <p>Are you sure</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" @click="emits('onConfrimation', false)"
                        data-bs-dismiss="modal">No</button>
                    <button type="button" class="btn btn-primary" @click="emits('onConfrimation', true)">Yes</button>
                </div>
            </div>
        </div>
    </div>
</template>


<style scoped></style>