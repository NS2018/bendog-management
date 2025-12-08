import Vue from "vue";
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        token: localStorage.getItem('token') || ''
    },
    getters:{
        isAuthenticated: state => !!state.token
    },
    mutations:{
        SET_TOKEN(state,token){
            state.token = token
            localStorage.setItem('token',token)
        },
        CLEAR_TOKEN(state){
            state.token = ''
            localStorage.removeItem('token')
        }
    }
})