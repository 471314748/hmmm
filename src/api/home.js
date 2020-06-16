import instance from '@/utils/request.js'
// 获取用户信息
function getUserInfo (params) {
  return instance({
    url: '/info',
    method: 'get',
    // 注意点get请求是用params这个参数
    params // params: params
  })
}
// 退出登录
function exitLogin () {
  return instance({
    url: '/logout',
    method: 'get'
  })
}
export { getUserInfo, exitLogin }
