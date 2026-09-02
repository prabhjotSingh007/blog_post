<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import NavigationBtn from '../../components/navigation-btn/NavigationBtn.vue';
import Heading from '../../components/static-component/heading/Heading.vue';
import { AllBlogList, type BlogListPagination } from '../../services/api-service/blog-service/BlogService.ts';
import { hideLoader, showLoader } from '../../services/loader-service/loder-service.ts';
import PaginationComp from '../pagination/PaginationComp.vue';
import { useUser } from '../../services/cookies-service/CookiesService.ts';

const { currentUser } = useUser()

const blogList = ref<any[]>([]);
const pagination = ref<BlogListPagination>({
    limit: 10,
    currentPage: 1,
    categoryId: null,
    total: 1,
    totalPage: 1,
    userId: currentUser?.value?.id
})


const getAllblogList = async () => {
    try {
        showLoader();
        let response: any = await AllBlogList(pagination.value);
        console.log(response);
        blogList.value = response?.data;
        pagination.value = { ...pagination.value, ...response?.pagination };
        console.log(pagination.value);
    } catch (err: any) {
        console.log(err)
    } finally {
        hideLoader()
    }
}


onMounted(() => {
    getAllblogList()
})


const handlePageChange = (data: number) => {
    pagination.value.currentPage = data
}


watch(() => pagination.value.currentPage, () => {
    getAllblogList()
})

</script>

<template>

    <Heading title="My Blog" />
    <div class="my-3 d-flex justify-content-end">
        <NavigationBtn title="Add Blog" navigation-path="/add-blog" />
    </div>




    <PaginationComp :page-count="pagination.totalPage" @page-change="handlePageChange" />


</template>


<style></style>