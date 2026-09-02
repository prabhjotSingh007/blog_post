<script setup lang="ts">
import type { BlogCard } from '../../type';


interface BlogCardProps {
    cardData: BlogCard
}

const props = defineProps < BlogCardProps > ()

</script>

<template>
    <div class="d-flex flex-column gap-5">

        <!-- Article Card 1 -->
        <article class="article-card" style="cursor: pointer;">
            <div class="d-flex flex-column flex-md-row gap-4">

                <!-- Image -->
                <div class="article-image-wrapper overflow-hidden rounded-3
                        w-100 w-md-33">
                    <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDeUiAsye0CJJyNpQBk_PbxR68pv-krODBOK5wi7aZsmlwOk88G00OLnwpjJZ-pMyluJmpMKzhVlUaa0jazcTx_3Rr_il4TQrWupr6KROtMJe-PDDLSXXfsRJRkXFjAfBvr-gIZN8pgnAEeJAlu1jbSNeRjBJiMmYJL5JXbDzU-tv4A_tnuZ5170vmVe-uQcvLVYEZvkgZtPRLcOHs0E3gtBjl7eMmHYVsNRy5ixg2e1jm8iDfrYE_E"
                        class="w-100 h-100 object-fit-cover article-image"
                        alt="Abstract visualization of data flowing through digital networks.">
                </div>

                <!-- Content -->
                <div class="d-flex flex-column justify-content-center w-100 w-md-66">

                    <div class="mb-2">
                        <span class="text-primary text-uppercase small fw-semibold">
                            Data Science
                        </span>
                    </div>

                    <h3 class="mb-3 article-title">
                        Predictive Models in E-Commerce
                    </h3>

                    <p class="text-secondary mb-3">
                        How machine learning algorithms are reshaping consumer
                        expectations and optimizing supply chain logistics globally.
                    </p>

                    <div class="d-flex align-items-center gap-3 text-secondary small fw-semibold">
                        <span>Alex Rivera</span>
                        <span>•</span>
                        <span>5 min read</span>
                    </div>

                </div>
            </div>
        </article>
        <!-- View All Button -->
    </div>


</template>

<style scoped>
/* Bootstrap doesn't have w-1/3 and w-2/3 utilities */
.w-md-33 {
    width: 100%;
}

.w-md-66 {
    width: 100%;
}

.article-image-wrapper {
    aspect-ratio: 16 / 9;
}

.article-image {
    transition: transform 0.5s ease;
}

.article-card:hover .article-image {
    transform: scale(1.05);
}

.article-title {
    transition: color 0.3s ease;
}

.article-card:hover .article-title {
    color: var(--bs-primary) !important;
}

/* Equivalent to md: */
@media (min-width: 768px) {
    .w-md-33 {
        width: 33.333333%;
    }

    .w-md-66 {
        width: 66.666667%;
    }

    .article-image-wrapper {
        aspect-ratio: 1 / 1;
    }
}
</style>
