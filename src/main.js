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
//配置基础地址

Vue.prototype.$axios = axios;
//请求拦截器
axios.interceptors.request.use(config =>{
  config.headers.Authorization = window.sessionStorage.getItem('token');
  return config;
})

import api from './router/api.js'
Vue.prototype.api = api.BASEURL

import EleImport from 'vue-ele-import'
Vue.component(EleImport.name, EleImport)


Vue.filter('format', function(date) {
  var json_date = new Date(date).toJSON();
  return new Date(new Date(json_date) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})



