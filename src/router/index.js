import Vue from "vue";
import VueRouter from "vue-router";
import Auth from '../views/Auth.vue'
import AuthLogin from '../views/AuthLogin.vue'
import AuthRegister from '../views/AuthRegister.vue'
import AuthForgetPassword from '../views/AuthForgetPassword.vue'
import Home from '../views/Home.vue'


import store from "../store";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        meta:{
            requireAuth: true
        }
    },
    {
        path: '/auth',
        name: 'Auth',
        component: Auth,
        children:[
            {
                path: 'login',
                name: 'AuthLogin',
                component: AuthLogin,
                meta:{
                    requireAuth: false
                }
            },
            {
                path: 'register',
                name: 'AuthRegister',
                component: AuthRegister,
                meta:{
                    requireAuth: false
                }
            },
            {
                path: 'forget-password',
                name: 'AuthForgetPassword',
                component: AuthForgetPassword,
                meta:{
                    requireAuth: false
                }
            }
        ]
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

function checkAuth(){
    return store.getters.isAuthenticated
}

router.beforeEach((to,from,next) =>{
    const requireAuth = to.matched.some(record => record.meta.requireAuth)
    const isLogged = checkAuth()

    if(requireAuth && !isLogged){
        next('/auth/login')
    }else if(!requireAuth && isLogged){
        if(to.path == '/auth/login'){
            next('/')
        }else{
            next()
        }
    }else{
        next()
    }
})

export default router