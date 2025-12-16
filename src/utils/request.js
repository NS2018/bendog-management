import axios from "axios";
import store from "../store";

const request = axios.create({
    baseURL: process.env.NODE_ENV === 'production'
        ? process.env.VUE_APP_API_BASE_URL  // 生产环境用真实地址
        : '/api', // 开发环境走代理
    timeout: 10000,
});

// 请求拦截器：自动加 token
request.interceptors.request.use(config => {
    const token = store.state.auth.token; // 从 Vuex 读取
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default request