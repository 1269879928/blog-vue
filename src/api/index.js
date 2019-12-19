import { axios } from '../utils/request'
export function articles (parameter) {
  return axios({
    url: `/index/${parameter.id}?pageNo=${parameter.pageNo}&pageSize=${parameter.pageSize}`,
    method: 'get',
    data: parameter
  })
}
export function side (parameter) {
  return axios({
    url: `/side`,
    method: 'get',
    data: parameter
  })
}
export function getAritcleWithTagId (parameter) {
  return axios({
    url: `/index/tag/${parameter.id}?pageNo=${parameter.pageNo}&pageSize=${parameter.pageSize}`,
    method: 'get',
    data: parameter
  })
}
export function getAritcleWithArchiveId (parameter) {
  return axios({
    url: `/index/archive/${parameter.id}?pageNo=${parameter.pageNo}&pageSize=${parameter.pageSize}`,
    method: 'get',
    data: parameter
  })
}
