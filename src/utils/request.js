import axios from 'axios'
import store from '@/store'
import JSONBig from 'json-bigint'
export const request = axios.create({
  // baseURL: 'http://toutiao.course.itcast.cn/'
  baseURL: 'http://ttapi.research.itcast.cn/'
})
request.interceptors.request.use(function (config) {
  const { user } = store.state
  if (user) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

request.interceptors.response.use(function (response) {
  return response.data || response
}, function (error) {
  return Promise.reject(error)
})

request.defaults.transformResponse = [function (data) {
  return JSONBig.parse(data) || data
}]
export default request
