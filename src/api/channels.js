import request from '@/utils/request'
export const getChannels = () => {
  return request({
    url: '/app/v1_0/user/channels',
    methods: 'GET'
  })
}
export const getAllChannels = () => {
  return request({
    url: '/app/v1_0/channels',
    methods: 'GET'
  })
}
