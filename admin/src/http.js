import Vue from 'vue'
// import router from 'router'
import router from './router'

// axios文件，所有对axios的全局设置
import axios from 'axios'
// 创建一个新的axios对象，便于向多个端口发请求
// admin里发的所有请求都有/admin/api前缀
const http = axios.create({
    baseURL: 'http://localhost:3000/admin/api'
})

// 全局请求拦截器
http.interceptors.request.use(function (config) {
    // Do something before request is sent
    // 为请求加请求头，给服务器校验
    if (localStorage.token) {
        config.headers.Authorization = 'Bearer ' + localStorage.token
    }
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
})

// 全局响应拦截器，所有返回的响应会被判断，不需要再发送请求的页面监听
// 成功则继续返回，失败（状态码大于400）则弹窗（elementui挂载到vue原型的方法）
http.interceptors.response.use(res => {
    return res
}, err => {
    if (err.response.data.message) {
        Vue.prototype.$message({
            type: 'error',
            // 错误中有个错误对象，包含了响应数据
            message: err.response.data.message
        })
         // console.log(err.response.status);
        //  401代表未登录，跳转登录页
        if(err.response.status===401){
           router.push('/login');
           
        }
       
    }
    return Promise.reject(err)
})

export default http