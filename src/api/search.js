import request from '@/utils/request'
export const searchResultsList = ({ q, page, perPage }) => {
  return request({
    url: '/app/v1_0/search',
    method: 'GET',
    params: {
      page,
      q,
      per_page: perPage
    }
  })
}
