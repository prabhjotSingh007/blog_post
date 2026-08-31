<script setup lang="ts">
import { onBeforeMount, onMounted, reactive, ref } from 'vue';
import Heading from '../../components/static-component/heading/Heading.vue';
import AddCategoryModal from '../../components/add-category-modal/AddCategoryModal.vue';
import { DeleteCategory, GetAllBlogList } from '../../services/api-service/category-service/CategoryService.ts';
import { hideLoader, showLoader } from '../../services/loader-service/loder-service.ts';
import { showError, showSuccess } from '../../services/toster-service/toster.ts';
import ConfirmationModal from '../../components/confirmation-modal/ConfirmationModal.vue';

const showCategoryAddModal = ref<boolean>(false);
const showConfirmationModal = ref<boolean>(false);
const deleteCategoryId = ref<string | number | null>(null)
const shareCategoryDataToUpdate = ref<any | null>(null)

let categoryList = ref<any[]>([]);

onBeforeMount(() => {
    getAllCategoryList()

})

const getAllCategoryList = async () => {

    try {
        showLoader()
        let response = await GetAllBlogList();
        console.log(response);
        categoryList.value = response?.data;
        console.log(categoryList);

    } catch (err: any) {
        console.log(err);
        showError(err?.message ?? "Error in fetching category list")
    } finally {
        hideLoader()
    }

}


const handleDataShare = (data: any) => {
    console.log(data)
    if (!shareCategoryDataToUpdate.value) {
        categoryList.value.unshift(data)
    } else {
        categoryList.value = categoryList.value.map((e: any) => e.id == shareCategoryDataToUpdate.value.id ? data : e)
    }
}

const handleOpenModal = () => {
    showCategoryAddModal.value = true
}

const handleOpenConfirmation = (id: string | null) => {

    showConfirmationModal.value = true
    deleteCategoryId.value = id
}


const handleConfirmationModalDataShare = async (data: boolean) => {
    if (!data) {
        showConfirmationModal.value = false
        deleteCategoryId.value = null
        return
    }

    try {
        showLoader();
        let resposne: any = await DeleteCategory(deleteCategoryId.value);
        console.log(resposne);
        showSuccess(resposne?.message ?? "Category delete Successfully");
        categoryList.value = categoryList.value.filter((e: any) => e.id !== deleteCategoryId.value);
        deleteCategoryId.value = null;
        showConfirmationModal.value = false;
    } catch (err) {
        console.log(err)
    } finally {
        hideLoader();

    }

}


const handleShareDataToUpdate = (category: any) => {
    shareCategoryDataToUpdate.value = category;
    showCategoryAddModal.value = true
}





</script>

<template>

    <Heading title="All Category" />
    <div class="my-3 d-flex justify-content-end mb-4">

        <button @click="handleOpenModal" class="btn btn-outline-primary rounded-pill px-4 py-2 align-self-start mt-2">
            Add Category
        </button>
    </div>


    <div class="categoryList mt-2">
        <div class="text-center py-2" v-if="categoryList.length == 0">
            <p class="text-center"> No Category Added yet</p>
        </div>
        <div class="list_items" v-if="categoryList.length > 0">
            <div class="list_item d-flex justify-content-between align-items-center py-2  border-bottom"
                :class="{ 'border-bottom-0': index == (categoryList.length - 1) }"
                v-for="(category, index) in categoryList" :key="category.id">
                <div class="cate">
                    {{ category?.name }}
                </div>

                <div class="btns d-flex justify-content-end align-items-center gap-2">
                    <button class="btn rounded-pill btn btn-secondary" @click="handleShareDataToUpdate(category)">
                        Update</button>
                    <button class="btn rounded-pill btn btn-danger" @click="handleOpenConfirmation(category?.id)">
                        Delete</button>

                </div>
            </div>
        </div>

    </div>


    <AddCategoryModal :open-modal="showCategoryAddModal" @update-modal-state="() => { showCategoryAddModal = false }"
        @share-data="handleDataShare" :to-update-category="shareCategoryDataToUpdate" />

    <ConfirmationModal :show-modal="showConfirmationModal" @on-confrimation="handleConfirmationModalDataShare" />

</template>


<style></style>