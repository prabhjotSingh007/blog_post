<script setup lang="ts"></script>

<template>
    <main class="container-fluid px-3 px-md-5 py-5">

        <div class="row g-4">

            <!-- Header / Actions Row -->
            <div class="col-12">
                <div class="d-flex flex-column flex-md-row
                        justify-content-between align-items-start align-items-md-center
                        gap-3 mb-4 pb-3 border-bottom">

                    <div>
                        <h1 class="display-5 fw-bold mb-0">
                            Add New Blog Post
                        </h1>

                        <p class="text-secondary mt-2 mb-0">
                            Drafting as <strong>Author Name</strong>
                        </p>
                    </div>

                    <div class="d-flex flex-wrap gap-2 align-items-center">

                        <button class="btn btn-outline-primary">
                            Save Draft
                        </button>

                        <button class="btn btn-outline-secondary d-flex align-items-center gap-2">
                            <span class="material-symbols-outlined fs-6">
                                visibility
                            </span>
                            Preview
                        </button>

                        <button class="btn btn-primary d-flex align-items-center gap-2">
                            <span class="material-symbols-outlined fs-6">
                                publish
                            </span>
                            Publish
                        </button>

                    </div>
                </div>
            </div>


            <!-- Editor Area -->
            <div class="col-12 col-md-8">

                <div class="d-flex flex-column gap-4">

                    <!-- Title Input -->
                    <div class="bg-white rounded-3">
                        <input type="text"
                            class="form-control form-control-lg border-0 border-bottom rounded-0 px-3 py-4 shadow-none"
                            placeholder="Enter an insightful title here...">
                    </div>


                    <!-- Slug Preview -->
                    <div class="d-flex align-items-center gap-2 px-3 text-secondary small">

                        <span class="material-symbols-outlined fs-6">
                            link
                        </span>

                        <span>theinsightfulreader.com/post/</span>

                        <span class="text-muted fst-italic">
                            enter-an-insightful-title-here
                        </span>

                    </div>


                    <!-- Rich Text Editor -->
                    <div class="card border rounded-4 overflow-hidden editor-card">

                        <!-- Editor Toolbar -->
                        <div class="bg-light border-bottom p-3">

                            <div class="d-flex flex-wrap align-items-center gap-1">

                                <button class="btn btn-sm btn-light">
                                    <span class="material-symbols-outlined fs-6">
                                        format_bold
                                    </span>
                                </button>

                                <button class="btn btn-sm btn-light">
                                    <span class="material-symbols-outlined fs-6">
                                        format_italic
                                    </span>
                                </button>

                                <button class="btn btn-sm btn-light">
                                    <span class="material-symbols-outlined fs-6">
                                        format_underlined
                                    </span>
                                </button>

                                <span class="toolbar-divider"></span>

                                <button class="btn btn-sm btn-light">
                                    <span class="material-symbols-outlined fs-6">
                                        format_h1
                                    </span>
                                </button>

                                <button class="btn btn-sm btn-light">
                                    <span class="material-symbols-outlined fs-6">
                                        format_h2
                                    </span>
                                </button>

                                <button class="btn btn-sm btn-light">
                                    <span class="material-symbols-outlined fs-6">
                                        format_quote
                                    </span>
                                </button>

                                <span class="toolbar-divider"></span>

                                <button class="btn btn-sm btn-light">
                                    <span class="material-symbols-outlined fs-6">
                                        format_list_bulleted
                                    </span>
                                </button>

                                <button class="btn btn-sm btn-light">
                                    <span class="material-symbols-outlined fs-6">
                                        format_list_numbered
                                    </span>
                                </button>

                                <span class="toolbar-divider"></span>

                                <button class="btn btn-sm btn-light">
                                    <span class="material-symbols-outlined fs-6">
                                        link
                                    </span>
                                </button>

                                <button class="btn btn-sm btn-light">
                                    <span class="material-symbols-outlined fs-6">
                                        image
                                    </span>
                                </button>

                            </div>
                        </div>


                        <!-- Editor Canvas -->
                        <textarea class="form-control border-0 rounded-0 shadow-none p-4 editor-canvas"
                            placeholder="Start crafting your essay here..."></textarea>

                    </div>


                    <!-- Excerpt -->
                    <div class="card border rounded-4 p-4">

                        <h3 class="h5 fw-semibold mb-2">
                            Excerpt
                        </h3>

                        <p class="small text-secondary mb-3">
                            A brief summary for previews and SEO.
                        </p>

                        <textarea class="form-control" rows="3" placeholder="Write a captivating summary..."></textarea>

                    </div>

                </div>

            </div>


            <!-- Sidebar -->
            <aside class="col-12 col-md-4">

                <div class="d-flex flex-column gap-4">

                    <!-- Publishing Options -->
                    <div class="card rounded-4 border shadow-sm p-4">

                        <h3 class="h5 fw-semibold mb-4 d-flex align-items-center gap-2">

                            <span class="material-symbols-outlined fs-5">
                                settings
                            </span>

                            Post Settings

                        </h3>


                        <!-- Status -->
                        <div class="mb-4">

                            <label class="form-label fw-semibold">
                                Status
                            </label>

                            <select class="form-select">
                                <option value="draft">Draft</option>
                                <option value="pending">Pending Review</option>
                                <option value="published">Published</option>
                            </select>

                        </div>


                        <!-- Visibility -->
                        <div class="mb-4">

                            <label class="form-label fw-semibold">
                                Visibility
                            </label>

                            <div class="d-flex flex-column gap-2">

                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="visibility" id="public"
                                        value="public" checked>

                                    <label class="form-check-label" for="public">
                                        Public
                                    </label>
                                </div>

                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="visibility" id="private"
                                        value="private">

                                    <label class="form-check-label" for="private">
                                        Private
                                    </label>
                                </div>

                            </div>

                        </div>


                        <hr class="my-4">


                        <!-- Category -->
                        <div class="mb-4">

                            <label class="form-label fw-semibold">
                                Category
                            </label>

                            <select class="form-select">

                                <option selected disabled value="">
                                    Select a category...
                                </option>

                                <option value="tech">Technology</option>
                                <option value="design">Design</option>
                                <option value="culture">Culture</option>
                                <option value="science">Science</option>

                            </select>

                            <button class="btn btn-link btn-sm text-primary text-decoration-none
                                   px-0 mt-2 d-inline-flex align-items-center gap-1">
                                <span class="material-symbols-outlined fs-6">
                                    add
                                </span>
                                Add New Category
                            </button>

                        </div>


                        <!-- Tags -->
                        <div class="mb-4">

                            <label class="form-label fw-semibold">
                                Tags
                            </label>

                            <div class="input-group">

                                <input type="text" class="form-control" placeholder="Add a tag...">

                                <button class="btn btn-light">
                                    <span class="material-symbols-outlined fs-6">
                                        add
                                    </span>
                                </button>

                            </div>


                            <div class="d-flex flex-wrap gap-2 mt-3">

                                <span class="badge rounded-pill bg-light text-secondary
                                         border d-flex align-items-center gap-1 px-2 py-2">

                                    UX Design

                                    <span class="material-symbols-outlined fs-6">
                                        close
                                    </span>

                                </span>


                                <span class="badge rounded-pill bg-light text-secondary
                                         border d-flex align-items-center gap-1 px-2 py-2">

                                    Research

                                    <span class="material-symbols-outlined fs-6">
                                        close
                                    </span>

                                </span>

                            </div>

                        </div>


                        <hr class="my-4">


                        <!-- Featured Image -->
                        <div>

                            <label class="form-label fw-semibold">
                                Featured Image
                            </label>

                            <div class="upload-box rounded-4 p-4 text-center">

                                <span class="material-symbols-outlined upload-icon">
                                    add_photo_alternate
                                </span>

                                <p class="small text-secondary mb-1">
                                    Click to upload or drag &amp; drop
                                </p>

                                <p class="small text-muted mb-1">
                                    SVG, PNG, JPG or GIF (max. 10MB)
                                </p>

                                <p class="small text-primary fw-semibold mb-0">
                                    16:9 aspect ratio recommended
                                </p>

                            </div>

                        </div>

                    </div>

                </div>

            </aside>

        </div>

    </main>




</template>

<style scoped>
.editor-card {
    height: 500px;
}

.editor-canvas {
    flex: 1 1 auto;
    resize: none;
    min-height: 0;
}

.editor-canvas:focus,
.form-control:focus,
.form-select:focus {
    box-shadow: 0 0 0 0.15rem rgba(13, 110, 253, 0.15);
}

.toolbar-divider {
    width: 1px;
    height: 24px;
    background-color: #dee2e6;
    margin: 0 8px;
}

.upload-box {
    border: 2px dashed #ced4da;
    cursor: pointer;
    transition: all 0.2s ease;
}

.upload-box:hover {
    border-color: var(--bs-primary);
    background-color: rgba(13, 110, 253, 0.03);
}

.upload-icon {
    font-size: 42px;
    color: #adb5bd;
    display: block;
    margin-bottom: 8px;
    transition: color 0.2s ease;
}

.upload-box:hover .upload-icon {
    color: var(--bs-primary);
}

.article-card {
    transition: transform 0.2s ease;
}

.kinetic-lift {
    transition: all 0.2s ease;
}

.kinetic-lift:hover {
    transform: translateY(-2px);
}

@media (min-width: 768px) {
    main {
        min-height: calc(100vh - 80px);
    }
}
</style>