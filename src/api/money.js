import request from '@/utils/request';
import file from '@/utils/file';

//充值提现设置编辑数据
export function recharge(data) {
  return request({
    method: 'get',
    url: `/index.php?r=btc/amount-manage/pay-setup`
  })
}

//充值提现数据列表
// account 会员账号
// ordernum 交易编号
// starttime 开始时间
// endtime 结束时间
// type 交易类型（0：充值，1：提现，2：补账）
// status 订单状态（0：待审核，1：成功，2：失败）
// opstatus 操作状态（0：待处理，1：已完成）
export function chargeList(data) {
  const {
    account = '',
      ordernum = '',
      starttime = '',
      endtime = '',
      type = '',
      status = '',
      opstatus = '',
      page = 1
  } = data;
  return request({
    method: 'get',
    url: `/index.php?r=btc/amount-manage/history&account=${account}&ordernum=${ordernum}&starttime=${starttime}&endtime=${endtime}&type=${type}&status=${status}&opstatus=${opstatus}&page=${page}`
  })
}

// 充值提现详情
export function chartDetail(data) {
  const {
    id = ''
  } = data;
  return request({
    method: 'get',
    url: `/index.php?r=btc/amount-manage/info&id=${id}`
  })
}
//收款设置编辑数据
export function collection(data) {
  const {
    id = ''
  } = data;
  return request({
    method: 'get',
    url: `/index.php?r=btc/amount-manage/pay-way-edit&id=${id}`
  })
}

//收款设置删除
export function collectionDel(data) {
  const {
    id = ''
  } = data;
  return request({
    method: 'get',
    url: `/index.php?r=btc/amount-manage/pay-way-del&id=${id}`
  })
}

//收款设置停用
export function collectionOnOff(data) {
  const {
    id = ''
  } = data;
  return request({
    // data,
    method: 'get',
    url: `index.php?r=btc/amount-manage/pay-way-status&id=${id}`
  })
}

//收款设置列表数据
// 1 支付宝 2微信 3银行卡
export function collectionList(data) {
  const {
    page = 1
  } = data;
  return request({
    method: 'get',
    url: `/index.php?r=btc/amount-manage/pay-way-list&page=${page}`
  })
}

//充值提现设置修改
export function chargeUpdate(data) {
  return request({
    data,
    method: 'post',
    url: '/index.php?r=btc/amount-manage/pay-setup'
  })
}
// 补账
export function fillBill(data) {
  const {
    id
  } = data;
  return request({
    data,
    method: 'post',
    url: `/index.php?r=btc/amount-manage/repair-amount&id=${id}`
  })
}
// 审核操作
export function reviewMoney(data) {
  const {
    id
  } = data;
  return request({
    data,
    method: 'post',
    url: `/index.php?r=btc/amount-manage/check&id=${id}`
  })
}
// 收款设置新增
export function collectionCreate(data) {
  const {id}=data;
  return file({
    data,
    method: 'post',
    url: '/index.php?r=btc/amount-manage/pay-way-add'
  })
}

// 收款设置编辑提交
export function collectionUpdate(data) {
  return file({
    data,
    method: 'post',
    url: '/index.php?r=btc/amount-manage/pay-way-edit'
  })
}
