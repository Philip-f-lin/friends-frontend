import { createApp } from 'vue'
import App from './App.vue'
import {Button, NavBar, Icon, Tabbar, TabbarItem, Empty} from 'vant';
import * as VueRouter from 'vue-router';
import routes from "./config/route.ts";
import '../global.css'

const app = createApp(App);


// 使用 Vant 組件
app.use(Button);
app.use(NavBar);
app.use(Icon);
app.use(Tabbar);
app.use(TabbarItem);
app.use(Empty);


// 創建 router 實例
const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes,
})

// 使用 router
app.use(router);
app.mount('#app');
