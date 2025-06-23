import './assets/main.css'
import Button from './components/global_components/Button.vue';
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)
app.component('Button', Button)
app.use(router)
app.mount('#app')
