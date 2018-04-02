import request from '@/utils/request';

// 新增一级代理
export function topAgent(data) {
  return request({
    data,
    method: "get",
    url: '/index.php?r=btc/user/add-top-agent'
  });
}

// 保存一级代理
export function saveAgent(data) {
  return request({
    data,
    method: "post",
    url: '/index.php?r=btc/user/save-top-agent'
  });
}

// 修改一级代理
export function modifyTopAgent(data) {
  const {
    user_id
  } = data;
  return request({
    data,
    method: 'get',
    url: `/index.php?r=btc/user/modify-top-agent&user_id=${user_id}`
  })
}

//上级帐号列表
export function preList(data) {
  let {
    pre
  } = data;
  return request({
    method: 'get',
    url: `/index.php?r=btc/user/superior-list&level=${pre}`
  })
}

//新增修改下级帐号
export function editNext(data) {
  const {
    level,
    parent_id = '',
    user_id = ''
  } = data;
  return request({
    method: 'get',
    url: `/index.php?r=btc/user/edit-account&level=${level}&parent_id=${parent_id}&user_id=${user_id}`
  })
}

//保存下级帐号
export function saveNext(data) {
  return request({
    data,
    method: 'post',
    url: `/index.php?r=btc/user/save-account`
  })
}

// 帐号默认列表
export function initList(data) {
  let {
    level = '',
      page = 1,
      parent_id = '',
      keyword = ''
  } = data;
  return request({
    method: 'get',
    url: `/index.php?r=btc/user/index&level=${level}&page=${page}&parent_id=${parent_id}&keyword=${keyword}`
  })
}

//管理员列表
export function adminLisit(data) {
  return request({
    method: 'get',
    url: `/index.php?r=btc/admin/index`
  })
}

//新增修改管理员
export function addAdmin(data) {
  const {
    user_id = ''
  } = data;
  return request({
    method: 'get',
    url: `/index.php?r=btc/admin/edit&user_id=${user_id}`
  })
}

//保存管理员
export function saveAdmin(data) {
  return request({
    data,
    method: 'post',
    url: `/index.php?r=btc/admin/save`
  })
}

//注册会员
export function addMember(data) {
  return request({
    data,
    method: 'post',
    url: `/index.php?r=btc/member/register`
  })
}

//帐号停用/启用/删除
export function accountOperate(data) {
  return request({
    data,
    method: 'post',
    url: `/index.php?r=btc/user/status`
  })
}

//子管理员启用/停用/删除
export function adminOperate(data) {
  return request({
    data,
    method: 'post',
    url: `/index.php?r=btc/admin/status`
  })
}

//修改密码
export function editPwd(data) {
  return request({
    data,
    method: 'post',
    url: `/index.php?r=btc/user/edit-password`
  })
}
