<script setup lang="ts">
import { useVuelidate } from '@vuelidate/core'
import { required, } from '@vuelidate/validators'
import { computed, onMounted, reactive, ref, watch } from 'vue';
import { showError, showSuccess, showWarning } from '../../services/toster-service/toster';
import { allowedSize, createUrl, imageMimeType } from '../../utils/validator';
import { hideLoader, showLoader } from '../../services/loader-service/loder-service';
import { GetAllCategoryList } from '../../services/api-service/category-service/CategoryService';
import { CreateBlog } from '../../services/api-service/blog-service/BlogService';

const blogImage = ref<string>("")
const categoryList = ref<any[]>([])

const initalValue: any = reactive({
    name: '',
    description: '',
    status: '',
    categoryId: "",
    blog_image: "",

})

const FormInitalValue: any = {
    name: '',
    description: '',
    status: '',
    categoryId: "",
    blog_image: "",

}

const rules = computed(() => ({
    name: { required, },
    description: { required },
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

    const formData: any = new FormData();
    Object.keys((initalValue as any)).forEach((e: any) => {
        formData.append(e, initalValue[e])
    })

    console.log(formData)

    try {
        showLoader()
        let response: any = await CreateBlog(formData);
        console.log(response)
        validate.value.$reset();
        Object.assign(initalValue, FormInitalValue);
        showSuccess(response?.message ?? "Successfully created Blog")
        blogImage.value = ''
    } catch (err: any) {
        console.log(err);
        showError(err?.message ?? "Error in posting blog")
    } finally {
        hideLoader();

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
    console.log(validate.value.blog_image)
    if (!hasImageError) {
        blogImage.value = createUrl(file)
    }
}


onMounted(() => {
    getCategoryList()
})

const getCategoryList = async () => {
    try {
        showLoader()
        let response = await GetAllCategoryList();
        console.log(response);
        categoryList.value = response?.data
    } catch (err: any) {
        console.log(err);
        showError(err?.message ?? "Error in fetching Category List")
    } finally {
        hideLoader()
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
                        <input type="text" v-model="initalValue.name"
                            class="form-control form-control-lg border-0 border-bottom rounded-0 px-3 py-4 shadow-none"
                            :class="{ error: validate.name.$error }" placeholder="Enter an insightful title here...">
                        <div class="input-errors" v-if="validate.name.$error">
                            <div class="error-msg">Title Filed is required</div>
                        </div>
                    </div>


                    <!-- Slug Preview -->
                    <div class="d-flex align-items-center gap-2 px-3 text-secondary small">

                        <span class="material-symbols-outlined fs-6">
                            Slug will be :
                        </span>


                        <span class="text-muted fst-italic" v-if="!validate.name.$error">
                            {{ initalValue.name.split(/[,;$#@!%& |]/).join("-") }}
                        </span>

                    </div>




                    <!-- Excerpt -->

                    <h3 class="h5 fw-semibold mb-2">
                        Blog Text
                    </h3>

                    <textarea class="form-control" :class="{ error: validate.description.$error }" rows="3"
                        placeholder="Write a captivating summary..." v-model="initalValue.description"></textarea>

                    <div class="input-errors" v-if="validate.description.$error">
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
                                    <input class="form-check-input" type="radio" name="visibility" id="Active"
                                        value="Active" v-model="initalValue.status">
                                    <label class="form-check-label" for="Active">
                                        Active
                                    </label>
                                </div>

                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="visibility" id="Inactive"
                                        value="Inactive" v-model="initalValue.status">

                                    <label class="form-check-label" for="Inactive">
                                        Inactive
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

                                <option :value="category?.id" v-for="category in categoryList" :key="category?.id">{{
                                    category?.name }}</option>


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