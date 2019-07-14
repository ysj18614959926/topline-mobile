import { request } from '@/utils/request'
export const userLogin = ({ mobile, code }) => {
  return request({
    url: '/app/v1_0/authorizations',
    method: 'POST',
    data: {
      mobile,
      code
    }
  })
}

// 用户搜索
export const userSearch = (q) => {
  return request({
    url: '/app/v1_0/suggestion',
    method: 'GET',
    params: {
      q
    }
  })
}
