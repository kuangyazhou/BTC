const modal = {
  // 用户id							user_id 
  // 	账号							account
  // 	名称							name
  // 	密码							password（新增需要输入值，修改没有变动，则不需传值）
  // 	确认密码						repassword
  // 	账号类型						account_type	现金（1） or 信用（0）  ( 新增可选择，修改则不允许变更）
  // 	自己及下级总占成				share_sum  (0~100，步长为5的倍数，整数）
  // 	信用额度						credit	
  // 			限制：account_type 为 信用（0）时，可输入且需要提供数值（0~999999999），account_type为 现（1）时，不可输入
  // 	盈亏限制						win_loss_limit	盈亏限制
  // 	建仓手续费比率					open_service_fee_percentage (0~100,2位小数) 【存在默认值】
  // 	平仓手续费比率					close_service_fee_percentage (0~100,2位小数) 【存在默认值】
  // 	单笔冻结保证金					deposit_frozen_percentage (0~100,2位小数) 【存在默认值】 account_type 为 1时，则不可修改
  // 	单笔占用保证金					deposit_used_percentage (0~100,2位小数) 【存在默认值】 account_type 为 1时，则不可修改
  // 	点差返佣						order_diff_dicount_percentage (0~100,2位小数) 
  // 	单笔最小交易量					single_min_transaction 【存在默认值】
  // 	单笔最大交易量					single_max_transaction 【存在默认值】
  // 	最大买持货量					max_buy_limit 【存在默认值】
  // 	最大卖持货量					max_sale_limit 【存在默认值】
  // 	最大净持货量					max_net_limit 【存在默认值】
  // 	建仓挂单买入					open_order_buy (0 or 1)【存在默认值】
  // 	建仓挂单卖出					open_order_sale (0 or 1)【存在默认值】
  // 	建仓挂单撤销					open_order_undo (0 or 1)【存在默认值】
  // 	平仓挂单买入					close_order_buy (0 or 1)【存在默认值】
  // 	平仓挂单卖出					close_order_sale (0 or 1)【存在默认值】
  // 	平仓挂单撤销
}
