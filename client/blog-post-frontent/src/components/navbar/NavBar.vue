<script setup>
import { onMounted, watch, ref, handleError } from 'vue';
import { getUserFromCookies } from '../../services/cookies-service/CookiesService';
import { useRoute, useRouter } from 'vue-router';
import UserDetailBtn from '../user-detail-btn/userDetailBtn.vue';
import { UserRole } from '../../type.ts';
import { Logout } from '../../services/api-service/auth/AuthService.ts';
import { hideLoader, showLoader } from '../../services/loader-service/loder-service.ts';
import { showSuccess } from '../../services/toster-service/toster.ts';
import { useUser } from '../../services/cookies-service/CookiesService';

const { currentUser } = useUser()
const route = useRoute()
const router = useRouter()

console.log(route.fullPath)

// onMounted(() => {
//     user.value = getUserFromCookies();
// })

watch(() => currentUser, (newValue, oldValue) => {
    console.log(newValue, "newValue")
})


const handleLogOut = async () => {
    try {
        showLoader()
        const response = await Logout();
        console.log(response);
        hideLoader()
        showSuccess(response?.message ?? "Logout Successfully")
        router.push("/")
    } catch (err) {
        console.log(err);
        handleError(err?.message ?? "Logout Error")
    }
}

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
                <router-link to="/" class="text-secondary text-decoration-none"
                    exact-active-class="text-primary nav_active fw-bold text-decoration-none border-bottom border-2 border-primary pb-1">
                    Home
                </router-link>

                <router-link to="/latest-blog" class="text-secondary text-decoration-none"
                    exact-active-class=" nav_active text-primary fw-bold text-decoration-none border-bottom border-2 border-primary pb-1">
                    Latest blogs
                </router-link>
                <router-link to="/all-blog" class="text-secondary text-decoration-none"
                    exact-active-class="nav_active text-primary fw-bold text-decoration-none border-bottom border-2 border-primary pb-1">
                    All blogs
                </router-link>

                <router-link v-if="currentUser" to="/my-blog" class="text-secondary text-decoration-none"
                    exact-active-class="nav_active text-primary fw-bold text-decoration-none border-bottom border-2 border-primary pb-1">
                    My Blogs
                </router-link>

                <router-link v-if="currentUser && (currentUser?.role == UserRole.Admin)" to="/add-category"
                    class="text-secondary text-decoration-none"
                    exact-active-class="nav_active text-primary fw-bold text-decoration-none border-bottom border-2 border-primary pb-1">
                    Add Category
                </router-link>
            </div>

            <!-- Actions -->
            <div class="d-flex align-items-center gap-3">

                <!-- Search -->
                <button type="button" class="btn btn-link text-secondary p-0 text-decoration-none" aria-label="Search">
                    <span class="material-symbols-outlined">search</span>
                </button>

                <!-- Subscribe -->
                <router-link to="/login" v-if="!currentUser" type="button"
                    class="btn btn-primary rounded-pill px-4 py-2 fw-semibold shadow-sm">
                    Login
                </router-link>



                <UserDetailBtn v-if="currentUser" />

                <button @click="handleLogOut" v-if="currentUser"
                    class="btn btn-outline-primary rounded-pill px-4 py-2 align-self-start mt-2">
                    Log out
                </button>

            </div>

        </nav>
    </header>


</template>


<style scoped>
.nav_active {
    color: rgba(var(--bs-primary-rgb), var(--bs-text-opacity)) !important;
}
</style>