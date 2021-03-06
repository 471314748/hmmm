import axios from 'axios'
import { Message } from 'element-ui'
import { getToken, removeToken } from './token'
import router from '../router/index'

// 创建实例时设置配置的默认值
var instance = axios.create({
  baseURL: process.env.VUE_APP_URL,
  // 跨域携带token
  withCredentials: true
})

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // 请求拦截器中，如果有token，请求中添加token
  if (getToken()) {
    config.headers.token = getToken()
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  // return response
  if (response.data.code === 200) {
    return response.data
  } else if (response.data.code === 206) {
    Message.error(response.data.message)
    router.push('/')
    removeToken()
    return response.data
  } else {
    Message.error(response.data.message)
    // return Promise.reject('error')
    return response.data
  }
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error)
})

export default instance
