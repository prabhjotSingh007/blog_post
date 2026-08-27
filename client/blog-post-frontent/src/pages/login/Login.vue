<script setup>
import './style.css'
import { Login } from '../../services/api-service/auth/AuthService';
import { email, required, Validator } from '@vueform/vueform';
import { ref, onMounted, watch } from 'vue';
import { showWarning, showSuccess, showError } from '../../services/toster-service/toster'
import { hideLoader, showLoader } from '../../services/loader-service/loder-service';
import { saveUserInCookes } from '../../services/cookies-service/CookiesService';
import { useRouter } from 'vue-router'
// const formData = ref({
//     email: '',
//     password: ''
// })

const showPassword = ref(false);
const form$ = ref(null)

const router = useRouter()
const handleFormSubmit = async (formData, form$, ...args) => {
    console.log(formData, "formData")
    console.log(form$, "form$")
    const [password, email] = [form$.get("password"), form$.get("email")]
    if (!password || !email) {
        showWarning("Error in field")
        return
    }
    try {
        showLoader()
        const response = await Login({ password: password, email: email });
        console.log(response);
        const user = response?.data;
        saveUserInCookes(user)
        showSuccess(response?.message ?? "User created successfully")
        router.push('/')
        hideLoader()
    } catch (err) {
        hideLoader()
        showError(err?.message ?? "Error")
    }

}



const togglePassword = () => {

    showPassword.value = !showPassword.value

}

</script>

<template>

    <div class="loginForm">
        <div class="content">
            <!-- <form @submit.prevent="handleFormSubmit()">
                <h2>Login</h2>
                <div class="input-box">
                    <input type="email" v-model="formData.email" placeholder="Email" />
                    <i class="ri-user-fill"></i>
                </div>
                <div class="input-box">
                    <input :type="showPassword ? 'text' : 'password'" v-model="formData.password" id="password"
                        placeholder="Password" />
                    <i :class="showPassword ? 'fa-eye' : 'fa-eye-slash'"
                        class="toggle-password fa-solid text-black cursor pointer"
                        @click="showPassword = !showPassword; console.log(showPassword)"></i>
                </div>

                <button type="submit" class="btnn">Login</button>

                <div class="remember text-center d-flex justify-content-center">
                    <RouterLink to="/register" class="link-underline-primary link-offset-3">Register</RouterLink>
                </div>

            </form> -->
            <h2>Login</h2>

            <Vueform :display-errors="false" validate-on="" ref="form$" @submit="handleFormSubmit" :endpoint="false">
                <TextElement placeholder="Email" name="email" :rules="['required', 'email']" input-type="email"
                    :add-class="{
                        inputContainer: 'input-box',
                        input: '',
                    }" />

                <div class="password-wrapper ">
                    <TextElement placeholder="Password" name="password" :rules="['required']"
                        :input-type="showPassword ? 'text' : 'password'" :add-class="{
                            inputContainer: 'input-box',
                            input: '',
                        }" />

                    <i :class="[
                        'fa-solid',
                        showPassword ? 'fa-eye' : 'fa-eye-slash',
                        'text-black',
                        'cursor',
                        'pointer eye_btn'
                    ]" @click.prevent="togglePassword"></i>
                </div>

                <ButtonElement :submits="true" button-label="Login" buttonClass="btnn" />

                <div class="remember text-center d-flex justify-content-center password-wrapper ">
                    <RouterLink to="/register" class="link-underline-primary link-offset-3">Register</RouterLink>
                </div>
            </Vueform>
        </div>
    </div>


</template>

<style scoped></style>