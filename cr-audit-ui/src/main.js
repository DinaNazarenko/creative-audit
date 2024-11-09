import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { autoAnimatePlugin } from "@formkit/auto-animate/vue";
import axios from 'axios'

import App from './App.vue'
import router from './router'

axios.defaults.baseURL = 'http://localhost:4000'

const app = createApp(App)

app.use(createPinia())
app.use(autoAnimatePlugin);
app.use(router)

app.mount('#app')
