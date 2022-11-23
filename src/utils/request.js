import axios from 'axios'
import { Message } from 'element-ui'
import { getToken } from '@/utils/auth.js'
const request = axios.create({
    baseURL: '/api',
    timeout: 3000
}) 

// 添加请求拦截器
request.interceptors.request.use(config => {
    config.headers['token'] = getToken('token')
    return config
},error => {
    return Promise.reject(error)
})

// 添加响应拦截器
request.interceptors.response.use(response => {
    let { status, message } = response
    if(status !==  200) {
        if(status === 401) {
            Message({message: message || 'error',type: 'error'})
            // 返回到登陆页面 todo
        }else {
            Message({message: message || 'error',type: 'error'})
        }
    }
    return response.data
},error => {
    return Promise.reject(error)
})

export default request