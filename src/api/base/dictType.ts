import axios from '../../utils/axios';
var prefix_name = 'sys-server/admin/dict/type';

export interface page {
  pageSize: number;
  sortColumn: String;
  params: Object;
  sortMethod: String;
}

export interface dictTypeDto {
  dictId: String;
  dictName: String;
  dictType: number;
  remark: String;
}

// 添加字典类型
export const saveDictType = (data: any) =>
  axios({
    url: `/${prefix_name}/saveDictType`,
    method: 'post',
    data
  });

// 批量删除字典类型
export const deleteDictType = (data: any) =>
  axios({
    url: `/${prefix_name}/deleteDictType`,
    method: 'delete',
    data
  });

// 修改字典类型
export const updateDictType = (data: any) =>
  axios({
    url: `/${prefix_name}/updateDictType`,
    method: 'put',
    data
  });

// 根据Id获取字典类型详情
export const infoDictType = (id: number) =>
  axios({
    url: `/${prefix_name}/infoDictType/${id}`,
    method: 'get'
  });

// 分页查询字典类型列表
export const pageDictType = (data: page) =>
  axios({
    url: `/${prefix_name}/pageDictType`,
    method: 'post',
    data
  });
