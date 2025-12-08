import Vue from "vue";
import VueRouter from "vue-router";
import Auth from '../views/Auth.vue'
import AuthLogin from '../views/AuthLogin.vue'
import AuthRegister from '../views/AuthRegister.vue'
import AuthForgetPassword from '../views/AuthForgetPassword.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        redirect: '/auth/login'
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
            },
            {
                path: 'register',
                name: 'AuthRegister',
                component: AuthRegister,
            },
            {
                path: 'forget-password',
                name: 'AuthForgetPassword',
                component: AuthForgetPassword,
            }
        ]
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router