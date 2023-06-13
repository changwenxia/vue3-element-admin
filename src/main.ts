import { createApp } from "vue";
import { createPinia } from "pinia";

import 'virtual:svg-icons-register';
import 'uno.css';
import "./style.css";
import App from "./App.vue";
import router from '@/router';
import {setupDirective} from '@/directive';
import i18n from '@/lang/index';

const app = createApp(App);
// 全局注册 自定义指令(directive)
setupDirective(app);

app.use(createPinia()).use(router).use(i18n).mount("#app");
