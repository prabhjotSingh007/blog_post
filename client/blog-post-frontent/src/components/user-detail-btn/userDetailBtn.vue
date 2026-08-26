<script setup>
import { getUserFromCookies } from '../../services/cookies-service/CookiesService';


const user = getUserFromCookies()

</script>

<template>

    <div class="dropdown">
        <button class="btn rounded-5 dropdown-toggle bg-primary text-white" type="button" data-bs-toggle="dropdown"
            aria-expanded="false">
            User
        </button>
        <ul class="dropdown-menu">
            <li><button class="dropdown-item" type="button">{{ user.name }}</button></li>
            <li><button class="dropdown-item" type="button">{{ user.email }}</button></li>
        </ul>
    </div>

</template>


<style></style>