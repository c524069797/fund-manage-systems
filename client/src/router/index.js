import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Notfound from '../views/404.vue'
import Home from '../views/Home.vue'
import Infoshow  from '../views/Infoshow.vue'
import FundList from '../views/FundList.vue'
Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes:[
    {
      path: '/',
      redirect: '/index',
    },
    {
      path: '/index',
      name: '/index',
      component: Index,
      children:[{
        path:'',
        component:Home
      },
    {
      path:'/home',
      name:'home',
      component:Home,
    }, {
      path:'/infoshow',
      name:'infoshow',
      component:Infoshow,
    }, {
      path:'/fundlist',
      name:'fundlist',
      component:FundList
    }]
  },
    {
      path:'/register',
      name:'register',
      component:Register
    },
    {
      path:'*',
      name:'/404',
      component:Notfound
    },
    {
      path:'/login',
      name:'login',
      component:Login
    },
    
  ]
});
//路由守衛
router.beforeEach((to,from,next )=>
{
  const isLogin=localStorage.eleToken?true:false;
  if(to.path=='/login'||to.path=='/register')
  {
    next();
  }
  else
  {
    isLogin?next():next('/login');
  }
})
export default router;
