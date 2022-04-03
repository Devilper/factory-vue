import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Home from '../views/Home.vue'
Vue.use(Router)

const routes = [
  {
    path: "/",
    redirect: "/login", // 重定向
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../components/Login.vue")
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    redirect: '/about',
    children: [
      {
        path: '/about',
        name: 'About',
        component:()=>import('../views/About.vue')
     },
      {
         path: '/user',
         name: 'User',
         component:()=>import('../components/user/User.vue')
      },
      {
        path: '/dept',
        name: 'Dept',
        component:()=>import('../components/user/Dept.vue')
     },
     {
      path: '/permission',
      name: 'Perm',
      component:()=>import('../components/permission/Perm.vue')
     },
     {
      path: '/role',
      name: 'Role',
      component:()=>import('../components/permission/Role.vue')
      },
      {
      path: '/menu',
      name: 'Menu',
      component:()=>import('../components/permission/Menu.vue')
      },
      {
      path: '/salary',
      name: 'Salary',
      component:()=>import('../components/finance/Salary.vue')
      },
      {
      path: '/unit',
      name: 'Unit',
      component:()=>import('../components/assert/Unit.vue')
      },
      {
      path: '/repair',
      name: 'Repair',
      component:()=>import('../components/assert/Repair.vue')
      },
    ]
  }
]

const router = new Router({
    routes
})

router.beforeEach((to, form, next)=>{
  if (to.path=='/login'){
    next()
  }else{
    const token = window.sessionStorage.getItem('token');
    if(!token){
      next('/login')
    }else{
      next()
    }
  }
})
export default router