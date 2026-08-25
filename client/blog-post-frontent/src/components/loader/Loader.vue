<script>
</script>

<template>
    <div class="loader_container">
        <div class="inside_container">
            <div class="d-flex justify-content-center">
                <div class="spinner-border" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
        </div>

    </div>
</template>


<style scoped>
.loader_container {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: #0000004f;
    z-index: 100;
}

.loader_container .inside_container {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>