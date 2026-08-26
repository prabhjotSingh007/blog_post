<script setup lang="ts">
const props = defineProps<{ title: string, navigationPath?: string }>()
</script>


<template>
    <RouterLink :to="navigationPath ?? '/'"
        class="btn btn-outline-primary rounded-pill px-4 py-2 align-self-start mt-2">
        {{ title }}
    </RouterLink>

</template>


<style scoped></style>