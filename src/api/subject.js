import instance from '@/utils/request.js'
// 搜索
function getsubjectData (params) {
  return instance({
    url: '/subject/list',
    method: 'get',
    params
  })
}
export { getsubjectData }
