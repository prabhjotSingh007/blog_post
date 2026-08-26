<script setup>
import { RouterView } from 'vue-router';
import Loader from '../../components/loader/Loader.vue';
import { useLoader, showLoader } from '../../services/loader-service/loder-service';
import { watch, onMounted } from 'vue';
import NavBar from '../../components/navbar/NavBar.vue';
import Footer from '../../components/footer/Footer.vue';

const { isLoading } = useLoader()


</script>

<template>

    <Loader v-if="isLoading" />

    <NavBar />
    <div class="main_content container">
        <RouterView />
    </div>
    <Footer />

</template>


<style scoped>
.main_content {
    min-height: 800px;
    padding-top: 150px;
}
</style>