// vueform.config.js

import { defineConfig } from '@vueform/vueform'
import vueform from '@vueform/vueform/themes/vueform'
import en from '@vueform/vueform/locales/en'

export default defineConfig({
  theme: vueform,
  locales: { en },
  locale: 'en',
})