<script setup>
import '../login/style.css'

import { email, required, Validator } from '@vueform/vueform';
import { ref, onMounted, watch } from 'vue';
import { showWarning, showSuccess } from '../../services/toster-service/toster'
import { Register } from '../../services/api-service/auth/AuthService';
import { hideLoader, showLoader } from '../../services/loader-service/loder-service';
import { saveUserInCookes } from '../../services/cookies-service/CookiesService';
import { useRouter } from 'vue-router'

const showPassword = ref(false);
const showConFirmPassword = ref(false)
const form$ = ref(null)

const router = useRouter()

const handleFormSubmit = async (formData, form$, ...args) => {
    console.log(formData, "formData")
    console.log(form$, "form$")
    const [name, password, email] = [form$.get("name"), form$.get("password"), form$.get("email")]
    console.log(name, password)
    if (!name || !password || !email) {
        showWarning("Error in field")
        return
    }
    try {
        showLoader()
        const response = await Register({ name: name, password: password, email: email });
        console.log(response)
        const user = response?.data;
        saveUserInCookes(user)
        showSuccess(response?.message ?? "User created successfully")
        router.push('/')
        hideLoader()
    } catch (err) {
        hideLoader()
        showError(err?.message ?? "Error")
        console.log(err)
    }

}


const togglePassword = () => {
    showPassword.value = !showPassword.value
}
const toggleConfirmPassword = () => {
    showConFirmPassword.value = !showConFirmPassword.value
}



</script>

<template>

    <div class="loginForm">
        <div class="content">
            <h2>Register</h2>

            <Vueform :display-errors="false" validate-on="" ref="form$" @submit="handleFormSubmit" :endpoint="false">

                <TextElement placeholder="Full Name" name="name" label="Name" :rules="['required']" input-type="text"
                    :add-class="{
                        inputContainer: 'input-box',
                        input: '',
                    }" />

                <TextElement placeholder="Email" name="email" label="Email" :rules="['required', 'email']"
                    input-type="email" :add-class="{
                        inputContainer: 'input-box',
                        input: '',
                    }" />

                <div class="password-wrapper ">
                    <TextElement placeholder="Password" name="password" label="Password" :rules="['required']"
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


                <div class="password-wrapper ">
                    <TextElement placeholder="Password" name="confirmPassword" label="Confirm Password" :rules="[
                        'required',
                        'same:password',
                    ]" :input-type="showConFirmPassword ? 'text' : 'password'" :add-class="{
                        inputContainer: 'input-box',
                        input: '',
                    }" />

                    <i :class="[
                        'fa-solid',
                        showConFirmPassword ? 'fa-eye' : 'fa-eye-slash',
                        'text-black',
                        'cursor',
                        'pointer eye_btn'
                    ]" @click.prevent="toggleConfirmPassword"></i>
                </div>


                <ButtonElement :submits="true" button-label="Create account" buttonClass="btnn" />


            </Vueform>
        </div>
    </div>


</template>

<style scoped>
.loginForm {
    min-height: 100vh;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-image: url("https://i.postimg.cc/RFqSM2rc/bg.jpg");
    background-size: cover;
    background-position: center;
}

.eye_btn {
    position: absolute;
    z-index: 1;
    right: 8px;
    top: 10px;
}

.password-wrapper {
    grid-column: span 12/span 12;
    position: relative;
}

.content {
    width: 400px;
    background: transparent;
    border: 2px solid rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(13px);
    padding: 20px;
    border-radius: 12px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    padding: 30px 35px;
}

.content h2 {
    font-size: 38px;
    font-weight: 700;
    text-align: center;
}

.content .input-box {
    position: relative;
    width: 100%;
    height: 55px;
    margin: 30px 0;
}

.content .input-box input {
    background: transparent;
    width: 100%;
    height: 100%;
    border: 2px solid rgba(255, 255, 255, 0.2);
    border-radius: 30px;
    padding: 20px 45px 20px 20px;
    font-size: 16px;
}

input::placeholder {
    color: #fff;
    font-size: 16px;
}

.input-box i {
    position: absolute;
    top: 50%;
    right: 18px;
    transform: translateY(-50%);
    font-size: 18px;
    color: #fff;
}

.content .remember {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: -16px 0 16px;
}

.remember label input {
    accent-color: #fff;
    margin-right: 4px;
}

.remember a {
    color: #fff;
    text-decoration: none;
}

.remember a:hover {
    text-decoration: underline;
}

.btnn {
    display: inline-block;
    background: #fff;
    color: #0a2862;
    width: 100%;
    border-radius: 30px;
    font-size: 16px;
    height: 45px;
    font-weight: 600;
    text-align: center;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    margin-bottom: 30px;
    margin-top: 16px;
}

.button {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 20px;
    text-align: center;
}

.button a {
    color: #fff;
    font-size: 16px;
    font-weight: 500;
    text-decoration: none;
}

.button a i {
    font-size: 20px;
    margin-right: 8px;
}

.button a:hover {
    opacity: 0.8;
}

input[type="checkbox"] {
    display: inline-block;
    width: 15px;
    height: 15px;
    cursor: pointer;
}

input::-ms-reveal,
input::-ms-clear {
    display: none;
}

input::-webkit-credentials-auto-fill-button,
input::-webkit-clear-button,
input::-webkit-inner-spin-button,
input::-webkit-contacts-auto-fill-button {
    display: none !important;
    visibility: hidden !important;
    pointer-events: none;
    height: 0;
    width: 0;
    margin: 0;
    padding: 0;
}

.toggle-password {
    cursor: pointer;
}
</style>