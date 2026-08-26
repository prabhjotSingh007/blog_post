<script setup>
</script>

<template>
    <section class="mb-5 position-relative overflow-hidden rounded-4 d-flex align-items-end"
        style="height: 614px; min-height: 400px; cursor: pointer;">

        <!-- Background Image -->
        <div class="position-absolute top-0 start-0 w-100 h-100 bg-cover bg-center transition-transform" style="
            background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuAAYTzxH8S7teSqud6Z--ZAAN4D5hUvG4K0DcbFPVvg2mU1ArmTo4rys-2VyUwRF9fY53_gj3PtWK5bFuq1KEMNov2r0kptWFfqsTaEeLFQgq2-28I-6q6pjDpUvOIZKuCjCAhnihj5r6eXOlIZiOf3Qa2TSmJb26ZOtFNerPc_Hjb-GOS7nwR_3sYRqG4srs6j6aZyWU506h_Q17uI6H3zfYHXrf9HrMLEJ98wHVIOBjMbuGxEBncF');
            background-size: cover;
            background-position: center;
            transition: transform 0.7s ease;
         ">
        </div>

        <!-- Gradient Overlay -->
        <div class="position-absolute top-0 start-0 w-100 h-100" style="
            background: linear-gradient(
                to top,
                rgba(0, 0, 0, 0.80),
                rgba(0, 0, 0, 0.40),
                transparent
            );
         ">
        </div>

        <!-- Content -->
        <div class="position-relative z-1 p-4 p-md-5" style="max-width: 768px;">

            <!-- Tags -->
            <div class="d-flex gap-2 mb-3">

                <span class="badge rounded-pill text-uppercase px-3 py-2"
                    style="background-color: #0d6efd; color: #fff;">
                    Featured
                </span>

                <span class="badge rounded-pill text-uppercase px-3 py-2 bg-light bg-opacity-75 text-dark"
                    style="backdrop-filter: blur(8px);">
                    Technology
                </span>

            </div>

            <!-- Heading -->
            <h1 class="text-white fw-bold mb-3" style="font-size: clamp(2rem, 4vw, 3.5rem); line-height: 1.1;">
                The Architecture of Tomorrow: Building Resilient Systems
            </h1>

            <!-- Description -->
            <p class="text-light mb-4 d-none d-md-block fs-5">
                Exploring the intricate balance between scalable infrastructure
                and sustainable design patterns in modern software engineering.
            </p>

            <!-- Author / Date -->
            <div class="d-flex align-items-center gap-3 text-light text-uppercase small fw-semibold">

                <span>By Sarah Jenkins</span>

                <span class="rounded-circle bg-light" style="width: 4px; height: 4px;">
                </span>

                <span>Oct 12, 2024</span>

            </div>

        </div>
    </section>



</template>

<style>
/* Bootstrap doesn't have a native bg-cover utility */
.bg-cover {
    background-size: cover;
}

.bg-center {
    background-position: center;
}

/* Hover effect equivalent to group-hover:scale-105 */
section:hover>.transition-transform {
    transform: scale(1.05);
}

section:hover h1 {
    color: #9ec5fe !important;
    transition: color 0.3s ease;
}
</style>