import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './Router/router.js'
import CanvasJSChart from '@canvasjs/vue-charts';

const app = createApp(App)
app.use(CanvasJSChart);
app.use(router)
app.mount('#app')