import axios from '../../utils/axios'
var prefix_name = 'sys-server/admin/dict/data'

export interface page {
  pageSize: number
  sortColumn: String
  params: Object
  sortMethod: String
}

export interface dictDataDto {
  dictCode: String
  dictLabel: String
  dictValue: String
  dictType: String
  dictSort: number
  remark: String
}

// 添加字典数据
export const saveDictData = (data: any) =>
  axios({
    url: `/${prefix_name}/saveDictData`,
    method: 'post',
    data
  })

// 批量删除字典数据
export const deleteDictData = (data: any) =>
  axios({
    url: `/${prefix_name}/deleteDictData`,
    method: 'delete',
    data
  })

// 修改字典数据
export const updateDictData = (data: any) =>
  axios({
    url: `/${prefix_name}/updateDictData`,
    method: 'put',
    data
  })

// 根据Code获取字典数据详情
export const infoDictData = (code: number) =>
  axios({
    url: `/${prefix_name}/infoDictData/${code}`,
    method: 'get'
  })

// 分页查询字典数据列表
export const pageDictData = (data: page) =>
  axios({
    url: `/${prefix_name}/pageDictData`,
    method: 'post',
    data
  })
