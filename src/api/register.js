import instance from '@/utils/request.js'
// 注册验证码
function getPhoneCode (data) {
  return instance({
    url: '/sendsms',
    method: 'post',
    data: data
  })
}
// 注册功能
function register (data) {
  return instance({
    url: '/register',
    method: 'post',
    data: data
  })
}

// export default getPhoneCode
export { getPhoneCode, register }
