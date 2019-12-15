import { axios } from '../utils/request'
export function search (parameter) {
  return axios({
    url: `/search/${parameter.searchText}`,
    method: 'get',
    data: parameter
  })
}
