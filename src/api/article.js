import { axios } from '../utils/request'
export function detail (parameter) {
  return axios({
    url: `/detail/${parameter.id}`,
    method: 'get',
    data: parameter
  })
}
