import request from '@/utils/request'
export const getArticles = ({ channelId, timestamp }) => {
  return request({
    url: '/app/v1_1/articles',
    method: 'GET',
    params: {
      channel_id: channelId,
      timestamp,
      with_top: 1
    }
  })
}

// 用户不喜欢
export const userDisLike = artId => {
  return request({
    url: '/app/v1_0/article/dislikes',
    method: 'POST',
    data: {
      target: artId
    }
  })
}

// 举报
export const userReport = (target, type) => {
  return request({
    url: '/app/v1_0/article/reports',
    method: 'POST',
    data: {
      target,
      type,
      remark: ''
    }
  })
}
