<script setup>
import { onMounted } from 'vue';
import { AllBlogList, HomePageBlog } from '../../services/api-service/blog-service/BlogService';
import { hideLoader, showLoader } from '../../services/loader-service/loder-service';
import Banner from '../../components/home-page/banner/Banner.vue';
import Heading from '../../components/static-component/heading/Heading.vue';
import BlogCard from '../../components/blog-card/BlogCard.vue';
import NavigationBtn from '../../components/navigation-btn/NavigationBtn.vue';

onMounted(() => {
    getHomePageBlog()
})

const getHomePageBlog = async () => {
    try {
        showLoader()
        const repsonse = await HomePageBlog();
        console.log(repsonse);
        hideLoader()

    } catch (err) {
        hideLoader()
        console.log(err)
    }
}

</script>

<template>
    <Banner />

    <div class="mt-4  ">
        <Heading title='Latest Blog' />
    </div>
    <div class="blog_cards">
        <BlogCard />
        <div class="my-3">
            <NavigationBtn title="View more" navigation-path="/latest-blog" />
        </div>
    </div>

</template>

<style scoped></style>