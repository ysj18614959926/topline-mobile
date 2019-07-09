import axios from 'axios'
export const request = axios.create({
  baseURL: 'http://toutiao.course.itcast.cn/'
})
request.interceptors.request.use(function (config) {
  return config
}, function (error) {
  return Promise.reject(error)
})

request.interceptors.response.use(function (response) {
  return response.data || response
}, function (error) {
  return Promise.reject(error)
})
export default request
