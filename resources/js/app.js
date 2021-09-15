require('./bootstrap')
import { createApp } from 'vue';
import router from './routes'
import App from './components/App.vue'
import store from './store/index'
import axios from 'axios'

axios.defaults.withCredentials = true
axios.defaults.baseURL = "http://127.0.0.1:8000/"

store.dispatch("getUser").then(() => {
  createApp(App).use(router).use(store).mount('#app')
})
