import request from '@/utils/request';

export function notice(data) {
  const {
    page = 1,
      title,
      status,
      time_start,
      time_end
  } = data;
  return request({
    method: 'get',
    url: `/index.php?r=btc/notice/list&page=${page}&title=${title}&statu=${status}&time_start=${time_start}&time_end=${time_end}`
  })
}
