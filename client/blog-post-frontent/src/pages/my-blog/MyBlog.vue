<script setup lang="ts">
import NavigationBtn from '../../components/navigation-btn/NavigationBtn.vue';
import Heading from '../../components/static-component/heading/Heading.vue';

</script>

<template>

    <Heading title="My Blog" />
    <div class="my-3 d-flex justify-content-end">
        <NavigationBtn title="Add Blog" navigation-path="/add-blog" />
    </div>

</template>


<style></style>