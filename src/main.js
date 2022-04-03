// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import VueRouter from 'vue-router'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false

Vue.use(ElementUI)

import "./assets/css/global.css";
import "./assets/fonts/iconfont.css";
// 导入 axios
import axios from 'axios';
Vue.prototype.$axios = axios;
//配置基础地址
axios.defaults.baseURL = 'http://127.0.0.1:8000/api/';
//请求拦截器
axios.interceptors.request.use(config =>{
  config.headers.Authorization = window.sessionStorage.getItem('token');
  return config;
})


import EleImport from 'vue-ele-import'
Vue.component(EleImport.name, EleImport)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})



