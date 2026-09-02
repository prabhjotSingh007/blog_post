<script setup lang="ts">
import Paginate from "vuejs-paginate-next";

interface PaginationProps {
    pageCount: number,  //Total count of pages
}

const props = withDefaults(defineProps<PaginationProps>(), {
    pageCount: 1
})

const emits = defineEmits<{
    (e: 'pageChange', value: number): void
}>()

const handlePageChange = (data: any) => {
    emits("pageChange", data)
}


// watch(() => props.pageCount, (newValue: number, oldValue: number) => {
//     console.log(newValue)
// })

</script>


<template>
    <paginate :page-count="props.pageCount" :click-handler="handlePageChange" :prev-text="'Prev'" :next-text="'Next'"
        :container-class="'pagination_main'">
    </paginate>
</template>


<style scoped>
/* Adopt bootstrap pagination stylesheet. */
@import "https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css";

.pagination_main {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>