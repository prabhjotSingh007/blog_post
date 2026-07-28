import { createApp } from 'vue'
import './style.css'
import '@vueform/vueform/dist/vueform.css';
import App from './App.vue'
import router from './router/route.ts'
import Vueform from '@vueform/vueform'
import VueformConfig from '../vueform.config.ts'
// createApp(App).use(router, Vueform, VueformConfig).mount('#app')
const app = createApp(App)
app.use(router)
app.use(Vueform, VueformConfig)
app.mount('#app')
