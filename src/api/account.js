import request from '@/utils/request';

export function topAgent(data) {
  return request({
    data,
    method: "get",
    url: '/index.php?r=btc/user/add-top-agent'
  })
}

export function saveAgent(data) {
  return request({
    data,
    method: "post",
    url: '/index.php?r=btc/user/save-top-agent'
  })
}
