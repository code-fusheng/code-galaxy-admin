import axios from '@/utils/axios';
var prefix_name = 'user-server/admin/menu';

export interface Page {
  pageSize: number;
  sortColumn: String;
  params: Object;
  sortMethod: String;
}

export const listMenu = () =>
  axios({
    url: `/${prefix_name}/listMenu`,
    method: 'get'
  });

export const getMenuIdsByRoleId = (id: number) =>
  axios({
    url: `/${prefix_name}/getMenuIdsByRoleId/${id}`,
    method: 'get'
  });

export const pageMenu = (data: any) =>
  axios({
    url: `/${prefix_name}/pageMenu`,
    method: 'post',
    data
  });
