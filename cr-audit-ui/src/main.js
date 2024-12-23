import './assets/main.css'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

import { createApp } from 'vue'
import { createPinia, setActivePinia } from 'pinia'
import { updateStorage } from 'pinia-plugin-persist'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import axios from 'axios'

import App from './App.vue'
import router from './router'

axios.defaults.baseURL = 'http://localhost:4000'

const pinia = createPinia()
setActivePinia(pinia)

updateStorage(pinia, {
  paths: ['tableSettings'],
  storage: window.localStorage,
  debug: false, // Информация об отладке
})

const app = createApp(App)

app.component('VueDatePicker', VueDatePicker)
app.use(createPinia())
app.use(autoAnimatePlugin)
app.use(router)

app.mount('#app')
