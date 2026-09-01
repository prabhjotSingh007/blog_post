<script setup lang="ts">
import { onMounted, ref } from 'vue';
import NavigationBtn from '../../components/navigation-btn/NavigationBtn.vue';
import Heading from '../../components/static-component/heading/Heading.vue';
import { AllBlogList, type BlogListPagination } from '../../services/api-service/blog-service/BlogService.ts';
import { hideLoader, showLoader } from '../../services/loader-service/loder-service.ts';



const blogList = ref<any[]>([]);
const pagination = ref<BlogListPagination>({
    limit: 10,
    currentPage: 1,
    categoryId: '',
})


const getAllblogList = async () => {
    try {
        showLoader();
        let response: any = await AllBlogList(pagination.value);
        console.log(response)
        blogList.value = response?.data
    } catch (err: any) {
        console.log(err)
    } finally {
        hideLoader()
    }
}


onMounted(() => {
    getAllblogList()
})
</script>

<template>

    <Heading title="My Blog" />
    <div class="my-3 d-flex justify-content-end">
        <NavigationBtn title="Add Blog" navigation-path="/add-blog" />
    </div>





</template>


<style></style>