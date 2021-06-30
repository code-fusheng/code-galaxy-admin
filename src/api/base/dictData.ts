import axios from '../../utils/axios'
var prefix_name = 'base-admin-server/dict/data'

export interface page {
  pageSize: number,
  sortColumn: String,
  params: Object,
  sortMethod: String
}

export interface dictDataDto {
  dictCode: String,
  dictLabel: String,
  dictValue: String,
  dictType: String,
  dictSort: number,
  remark: String
}

// 添加字典数据
export const saveDictData = (data: any) => axios({
  url: `/${prefix_name}/saveDictData`,
  method: 'post',
  data
})

// 批量删除字典数据
export const deleteDictDataByCodes = (data: any) => axios({
  url: `/${prefix_name}/deleteDictDataByCodes`,
  method: 'delete',
  data
})

// 修改字典数据
export const updateDictData = (data: any) => axios({
  url: `/${prefix_name}/updateDictData`,
  method: 'put',
  data
})

// 根据Code获取字典数据详情
export const getDictDataByCode = (code: number) => axios({
  url: `/${prefix_name}/getDictDataByCode/${code}`,
  method: 'get'
})

// 分页查询字典数据列表
export const getDictDataByPage = (data: page) => axios({
  url: `/${prefix_name}/getDictDataByPage`,
  method: 'post',
  data
})

