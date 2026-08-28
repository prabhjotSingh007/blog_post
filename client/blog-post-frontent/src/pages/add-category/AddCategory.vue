<script setup lang="ts">
import { onBeforeMount, reactive, ref } from 'vue';
import Heading from '../../components/static-component/heading/Heading.vue';
import AddCategoryModal from '../../components/add-category-modal/AddCategoryModal.vue';
import { GetAllBlogList } from '../../services/api-service/category-service/CategoryService.ts';
import { hideLoader, showLoader } from '../../services/loader-service/loder-service.ts';
import { showError } from '../../services/toster-service/toster.ts';

const showCategoryAddModal = ref<boolean>(false);

let categoryList = reactive<any[]>([]);

onBeforeMount(() => {
    getAllCategoryList()

})

const getAllCategoryList = async () => {

    try {
        showLoader()
        let response = await GetAllBlogList();
        console.log(response);
        categoryList = response?.data

    } catch (err: any) {
        console.log(err);
        showError(err?.message ?? "Error in fetching category list")
    } finally {
        hideLoader()
    }

}


const handleDataShare = (data: any) => {
    console.log(data)
    categoryList.unshift(data)
}

const handleOpenModal = () => {
    showCategoryAddModal.value = true
}

</script>

<template>

    <Heading title="All Category" />
    <div class="my-3 d-flex justify-content-end">

        <button @click="handleOpenModal" class="btn btn-outline-primary rounded-pill px-4 py-2 align-self-start mt-2">
            Add Category
        </button>
    </div>


    <div class="categoryList">
        <div class="list_item d-flex justify-content-between align-items-center ">
            <div class="cate">
                namae
            </div>

            <div class="btns d-flex justify-content-end align-items-center"></div>
        </div>
    </div>


    <AddCategoryModal :open-modal="showCategoryAddModal" @update-modal-state="() => showCategoryAddModal = false"
        @share-data="handleDataShare" />

</template>


<style></style>