<script setup>
</script>

<template>
    <footer class="bg-light w-100 py-5 border-top mt-auto">
        <div class="container">
            <div class="row g-4">

                <!-- Brand & Copyright -->
                <div class="col-12 col-md-6 d-flex flex-column justify-content-between">

                    <div class="fw-bold fs-5 text-dark mb-4">
                        The Insightful Reader
                    </div>

                    <p class="text-secondary mb-0 mt-2 mt-md-0">
                        © 2024 The Insightful Reader. Built for clarity.
                    </p>

                </div>

                <!-- Footer Links -->
                <div class="col-12 col-md-6 d-flex justify-content-start justify-content-md-end
                        align-items-end gap-4">

                    <a href="#" class="text-secondary text-decoration-none footer-link">
                        Twitter
                    </a>

                    <a href="#" class="text-secondary text-decoration-none footer-link">
                        LinkedIn
                    </a>

                    <a href="#" class="text-secondary text-decoration-none footer-link">
                        RSS
                    </a>

                    <a href="#" class="text-secondary text-decoration-none footer-link">
                        Privacy Policy
                    </a>

                </div>

            </div>
        </div>
    </footer>

</template>

<style scoped>
footer {
    background-color: #f8f9fa;
    border-color: #dee2e6 !important;
}

[data-bs-theme="dark"] footer {
    background-color: #111318;
    border-color: #343a40 !important;
}

[data-bs-theme="dark"] footer .text-dark {
    color: #f8f9fa !important;
}

[data-bs-theme="dark"] footer .text-secondary {
    color: #adb5bd !important;
}

.footer-link {
    transition: all 0.2s ease;
}

.footer-link:hover {
    color: var(--bs-primary) !important;
    transform: translateY(-2px);
}
</style>