import instance from '@/utils/request.js'
// 注册验证码
function toLogin (data) {
  return instance({
    url: '/login',
    method: 'post',
    data: data
  })
}
export { toLogin }
// login
