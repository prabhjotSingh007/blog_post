<script setup>
import { onMounted, watch, ref } from 'vue';
import { getUserFromCookies } from '../../services/cookies-service/CookiesService';


const user = ref(null);

onMounted(() => {
    user.value = getUserFromCookies();
})

watch(() => user.value, (newValue, oldValue) => {
    console.log(newValue, "newValue")
})

</script>

<template>
    <header class="bg-body bg-opacity-75 border-bottom fixed-top w-100"
        style="backdrop-filter: blur(16px); z-index: 1050;">
        <nav class="d-flex justify-content-between align-items-center mx-auto px-3 py-3" style="max-width: 1200px;">

            <!-- Logo -->
            <div class="fw-bold fs-5 text-body">
                The Insightful Reader
            </div>

            <!-- Navigation -->
            <div class="d-none d-md-flex gap-4 align-items-center">

                <a href="#"
                    class="text-primary fw-bold text-decoration-none border-bottom border-2 border-primary pb-1">
                    Latest
                </a>

                <a href="#" class="text-secondary text-decoration-none">
                    Topics
                </a>

                <a href="#" class="text-secondary text-decoration-none">
                    Zen Mode
                </a>

                <a href="#" class="text-secondary text-decoration-none">
                    About
                </a>

            </div>

            <!-- Actions -->
            <div class="d-flex align-items-center gap-3">

                <!-- Search -->
                <button type="button" class="btn btn-link text-secondary p-0 text-decoration-none" aria-label="Search">
                    <span class="material-symbols-outlined">search</span>
                </button>

                <!-- Subscribe -->
                <button v-if="!user" type="button" class="btn btn-primary rounded-pill px-4 py-2 fw-semibold shadow-sm">
                    Login
                </button>


                <li v-if="user" class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button"
                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <img src="https://placeholder.com" class="rounded-circle" height="32" alt="Avatar">
                    </a>
                    <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink">
                        <a class="dropdown-item" href="#">My Profile</a>
                        <a class="dropdown-item" href="#">Settings</a>
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item" href="#">Logout</a>
                    </div>
                </li>

            </div>

        </nav>
    </header>


</template>


<style scoped></style>