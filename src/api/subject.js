import instance from '@/utils/request.js'
// 获取数据
function getSubjectData(params) {
  return instance({
      url: "/subject/list",
      method: "get",
      params      
  })
}
// 上传数据
function setSubjectStatus(data) {
  return instance({
      url: "/subject/status",
      method: "post",
      data     
  })
}
// 删除数据
function delSubjectData(data) {
  return instance({
      url: "/subject/remove",
      method: "post",
      data     
  })
}
// 新增数据
function addSubjectData(data) {
  return instance({
      url: "/subject/add",
      method: "post",
      data     
  })
}
// 编辑数据
function editSubjectData(data) {
  return instance({
      url: "/subject/edit",
      method: "post",
      data     
  })
}
export { getSubjectData, setSubjectStatus, delSubjectData, addSubjectData, editSubjectData }
