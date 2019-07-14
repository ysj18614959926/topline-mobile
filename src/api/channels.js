import request from '@/utils/request'
export const getChannels = () => {
  return request({
    url: '/app/v1_0/user/channels',
    method: 'GET'
  })
}
export const getAllChannels = () => {
  return request({
    url: '/app/v1_0/channels',
    methods: 'GET'
  })
}

// 添加用户频道
export const addChannels = channels => {
  return request({
    url: '/app/v1_0/user/channels',
    method: 'PATCH',
    data: {
      channels
    }
  })
}

// 删除用户频道
export const deleteChannel = channelId => {
  return request({
    url: `/app/v1_0/user/channels/${channelId}`,
    method: 'DELETE'
  })
}
