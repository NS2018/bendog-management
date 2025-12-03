import Vue from "vue";
import VueRouter from "vue-router";
import AuthLogin from '../views/AuthLogin.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        redirect: '/auth'
    },
    {
        path: '/auth',
        name: 'Auth',
        component: AuthLogin
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router