import { App, createApp } from 'vue'
import RootEl from './App.vue'
import Router from './router';
import "./assets/common.css";
// import 'vant/lib/index.css';
import 'vant/es/toast/style';
import 'vant/es/dialog/style';
import 'vant/es/notify/style';
import 'vant/es/image-preview/style';

const Ins: App<Element> = createApp(RootEl);
Ins.use(Router);
Ins.mount('#app');
