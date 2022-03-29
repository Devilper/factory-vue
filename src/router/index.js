import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Home from '../views/Home.vue'
Vue.use(Router)

const routes = [
  {
    path: "/",
    name: "Home",
    redirect: "/login", // 重定向
    component: Home
  },
  {
    path: "/about",
    name: "About",
    component: () => import('../views/About.vue')
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../components/Login.vue")
  }
]

const router = new Router({
    routes
})

export default router