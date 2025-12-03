import axios from "axios";

const request = axios.create({
    baseURL: process.env.VUE_APP_API_BASE_URL || 'http://localhost:3000/api',
    timeout: 10000,
})

export default request