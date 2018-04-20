import request from '@/utils/request';

//会员资金管理
export function memberMoney(data) {
  const {
    account = '',
      page = 1
  } = data;
  return request({
    method: 'get',
    url: `/index.php?r=btc/received/index&account=${account}&page=${page}`
  })
}

//会员持仓单
export function memberNet(data) {
  // id:时间顺序,hn:持仓数量,sll:止损价,spl:止盈价,op:建仓价,od:持有天数,flw:浮动盈亏
  // asc正序,desc倒序
  const {
    user_id = '',
      account = '',
      ofield = '',
      sort = 'desc',
      page = 1
  } = data;
  return request({
    method: 'get',
    url: `/index.php?r=btc/received/get-holds&user_id=${user_id}&account=${account}&ofield=${ofield}&byfield=${sort}&page=${page}`
  })
}

// 'order_id'             
// 'user_id'              		 //会员ID
// 'user_account'         		  //会员账号
// 'user_name'            	 //会员名称
// 'order_number'         	 //成交单号
// 'hold_order_number'    	//持仓单号
// 'order_times'          	//成交时间
// 'product_name'             //商品名称
// 'order_type'           	//订单类型（0：建仓:1：平仓）
// 'order_direction'      		//买卖方向（1：买入，-1：卖出）
// 'deal_number'          		//成交量
// 'deal_price'                   //成交金额
// 'open_price'                  //建仓价格
// 'hold_price'              //持仓价格
// 'close_price'            //平仓价格
// 'win_loss_amount'              //实际盈亏 平仓单的实际盈亏
// 'service_fee'                  //手续费
// 'overnight_fee'                //过夜费
// 'share_amount_num'          //占成数量
// 'share_service_fee'         //占成手续费
// 'share_overnight_fee'      //占成过夜费
// 'deal_type'              //成交类型（0：用户委托，1：系统强制平仓，2：后台强制平仓）
//会员成交单
export function memberDeal(data) {
  //（0：建仓，1：平仓）
  const {
    type = 0,
      account = '',
      ordernum = '',
      page = 1
  } = data;
  return request({
    method: 'get',
    url: `/index.php?r=btc/received/get-order-deals&otype=${type}&account=${account}&ordernum=${ordernum}&page=${page}`,
  })
}

//持仓单查询(信用/现金)
export function netSearch(data) {
  // 0：信用，1：现金
  const {
    type = '',
      account = '',
      ordernum = '',
      otype = '',
      page = 1
  } = data;
  return request({
    method: 'get',
    url: `/index.php?r=btc/received/get-order-hold-type&type=${type}&account=${account}&ordernum=${ordernum}&otype=${otype}&page=${page}`
  })
}


//会员委托单审核
export function entrust(data) {
  // 委托单大小审核分组，0为正常，1小单，2为大单 ，3为特殊分组
  const {
    size = 0,
      ofield = 'ep',
      sort = 'desc',
      ordernum = '',
      account = '',
      etype = '',
      otype = '',
      page = 1
  } = data;
  return request({
    method: "get",
    url: `/index.php?r=btc/received/get-review-entrusteds&rnum_size=${size}&ofield=${ofield}&byfield=${sort}&account=${account}&ordernum=${ordernum}&etype=${etype}&otype=${otype}&page=${page}`
  })
}

//会员委托单修改点差
export function updateSpread(data) {
  // user_id order_diff buy
  return request({
    data,
    method: 'post',
    url: '/index.php?r=btc/received/edit-order-diff'
  })
}


//强制平仓
export function forceClose(data) {
  return request({
    data,
    method: 'post',
    url: '/index.php?r=btc/order/force-close-deal-order'
  })
}

//审核
// order_id 订单id
// entrusted_price 委托价格
// entrust_number 委托数量
// review_status 0审核失败 1通过
export function review(data) {
  return request({
    data,
    method: 'post',
    url: '/index.php?r=btc/order/review-entrust-order'
  })
}

//补仓操作
export function rapl(data) {
  return request({
    data,
    method: 'post',
    url: 'index.php?r=btc/received/member-repair'
  })
}
