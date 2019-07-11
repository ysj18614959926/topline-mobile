import request from '@/utils/request'
export const getArticles = ({ channelId, timestamp }) => {
  return request({
    url: '/app/v1_1/articles',
    methods: 'GET',
    params: {
      channel_id: channelId,
      timestamp,
      with_top: 1
    }
  })
}
