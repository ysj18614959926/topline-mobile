import request from '@/utils/request'
export const getChannels = () => {
  return request({
    url: '/app/v1_0/user/channels',
    methods: 'GET'
  })
}
