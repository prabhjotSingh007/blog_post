<script setup lang="ts">
import { useVuelidate } from '@vuelidate/core'
import { required, } from '@vuelidate/validators'
import { computed, reactive, ref, watch } from 'vue';
import { showWarning } from '../../services/toster-service/toster';
import { allowedSize, createUrl, imageMimeType } from '../../utils/validator';

const blogImage = ref<string>("")

const initalValue = reactive({
    title: '',
    blog: '',
    status: '',
    categoryId: "",
    blog_image: "",

})


const rules = computed(() => ({
    title: { required, },
    blog: { required },
    status: { required },
    categoryId: { required },
    blog_image: {
        required,
        maxSize: allowedSize(5 * 1024 * 1024), // 5MB limit
        fileType: imageMimeType(['image/jpeg', 'image/png', 'image/webp'])
    }
}))


const validate = useVuelidate(rules, initalValue);

watch(() => initalValue.status, (nevalue: any) => {
    console.log(nevalue)
})


// 4. Handle form submission
const submitForm = async () => {

    console.log(initalValue)
    // Trigger validation on all fields
    const isFormValid = await validate.value.$validate()
    if (!isFormValid) {
        showWarning("Validation Error")
        return
    }

}


// 3. Handle file change event
const handleFileChange = (event: any) => {
    const file = event.target.files[0]

    if (file) {
        initalValue.blog_image = file
    }
    // Explicitly tell Vuelidate that the field has been modified
    validate.value.blog_image.$touch()
    const hasImageError = validate.value.blog_image.$error;
    if (!hasImageError) {
        blogImage.value = createUrl(file)
    }
}


</script>

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

                        <button class="btn btn-primary d-flex align-items-center gap-2" @click="submitForm">
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
                        <input type="text" v-model="initalValue.title"
                            class="form-control form-control-lg border-0 border-bottom rounded-0 px-3 py-4 shadow-none"
                            :class="{ error: validate.title.$error }" placeholder="Enter an insightful title here...">
                        <div class="input-errors" v-if="validate.title.$error">
                            <div class="error-msg">Title Filed is required</div>
                        </div>
                    </div>


                    <!-- Slug Preview -->
                    <div class="d-flex align-items-center gap-2 px-3 text-secondary small">

                        <span class="material-symbols-outlined fs-6">
                            Slug will be :
                        </span>


                        <span class="text-muted fst-italic" v-if="!validate.title.$error">
                            {{ initalValue.title.split(/[,;$#@!%& |]/).join("-") }}
                        </span>

                    </div>




                    <!-- Excerpt -->

                    <h3 class="h5 fw-semibold mb-2">
                        Blog Text
                    </h3>

                    <textarea class="form-control" :class="{ error: validate.blog.$error }" rows="3"
                        placeholder="Write a captivating summary..." v-model="initalValue.blog"></textarea>

                    <div class="input-errors" v-if="validate.blog.$error">
                        <div class="error-msg">Blog Filed is required</div>
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



                        <!-- Visibility -->
                        <div class="mb-4">

                            <label class="form-label fw-semibold">
                                Visibility
                            </label>

                            <div class="d-flex flex-column gap-2">

                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="visibility" id="public"
                                        value="public" v-model="initalValue.status">

                                    <label class="form-check-label" for="public">
                                        Public
                                    </label>
                                </div>

                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="visibility" id="private"
                                        value="private" v-model="initalValue.status">

                                    <label class="form-check-label" for="private">
                                        Private
                                    </label>
                                </div>

                                <div class="input-errors" v-if="validate.status.$error">
                                    <div class="error-msg">Status is required</div>
                                </div>

                            </div>

                        </div>


                        <hr class="my-4">


                        <!-- Category -->
                        <div class="mb-4">

                            <label class="form-label fw-semibold">
                                Category
                            </label>

                            <select class="form-select " :class="{ error: validate.categoryId.$error }"
                                v-model="initalValue.categoryId">

                                <option selected disabled value="">
                                    Select a category...
                                </option>

                                <option value="tech">Technology</option>
                                <option value="design">Design</option>
                                <option value="culture">Culture</option>
                                <option value="science">Science</option>

                            </select>

                            <div class="input-errors" v-if="validate.categoryId.$error">
                                <div class="error-msg">Category is required</div>
                            </div>

                        </div>




                        <hr class="my-4">


                        <!-- Featured Image -->
                        <div>

                            <label class="form-label fw-semibold">
                                Featured Image
                            </label>

                            <label for="image_upload" class="upload-box rounded-4 p-4 text-center d-block">

                                <span class="material-symbols-outlined upload-icon">
                                    <i class="fa-solid fa-upload"></i>
                                </span>

                                <p class="small text-secondary mb-1">
                                    Click to upload or drag &amp; drop
                                </p>

                                <p class="small text-muted mb-1">
                                    SVG, PNG, JPG or GIF (max. 5MB)
                                </p>

                            </label>

                            <input id="image_upload" type="file" accept="image/jpeg, image/png, image/webp" hidden
                                @change="handleFileChange" :class="{ 'input-error': validate.blog_image.$error }" />


                            <div v-if="validate.blog_image.$error" class="error-messages">
                                <p v-for="error in validate.blog_image.$errors" :key="error.$uid">
                                    {{ error.$message }}
                                </p>
                            </div>


                            <div class="d-flex justify-content-center align-items-center" v-if="blogImage">

                                <img class="rounded w-100" alt="blog_image" :src="blogImage">

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