export default {
	gethead(level){
		return [
			//
			//	{
			//		label:'一级代理',
			//		value:'user_account',
			//		level:[0,1,2,3,4,5]  //等级显示权限，包含显示
			//	},
			//	{
			//		label:'名称',
			//		value:'user_name',
			//		level:[0,1,2,3,4,5]
			//	},

			//	{
			//		label: '日期',
			//		value: 'to_date',
			//		level: [6]
			//	},
			{
				label: '注数',
				value: 'order_count',
				key:1,
				level: [0, 1, 2, 3, 4, 5, 6],
				class:'class0'
			},
			{
				label: '下注金额',
				value: 'sum_amount',
				key:2,
				level: [0, 1, 2, 3, 4, 5, 6],
				class:'class0'
			},
			{
				label: '会员奖金',
				value: 'member_bonus',
				key:3,
				level: [5],
				class:'class1'
			},
			{
				label: '会员手续费',
				value: 'member_service_fee',
				level: [5],
				key:4,
				class:'class1'
			},
			{
				label: '会员过夜费',
				value: 'member_overnight_fee',
				level: [5],
				key:5,
				class:'class1'
			},
			{
				label: '会员盈亏',
				value: 'win_member',
				level: [0, 1, 2, 3, 4, 5,6],
				key:6,
				class:'class0'
			},
			{
				label: '占成上缴',
				value: 'share_up_sum_user',
				level: [0, 1, 2, 3, 4],
				key:7,
				class:'class2'
			},
			{
				label: ['一级代理金额','二级代理金额','三级代理金额','四级代理金额','五级代理金额'][level],
				value: 'share_up_bonus_user',
				level: [0, 1, 2, 3, 4],
				key:8,
				class:'class2'
			},
			{
				label: ['一级代理手续费','二级代理手续费','三级代理手续费','四级代理手续费','五级代理手续费'][level],
				value: 'sum_service_fee_user',
				level: [0, 1, 2, 3, 4],
				key:9,
				class:'class2'
			},
			{
				label: ['一级代理过夜费','二级代理过夜费','三级代理过夜费','四级代理过夜费','五级代理过夜费'][level],
				value: 'sum_overnight_fee_user',
				level: [0, 1, 2, 3, 4],
				key:10,
				class:'class2'
			},
			{
				label: '一级代理点差返佣',
				value: 'order_diff_discount_user',
				level: [0],
				key:11,
				class:'class2'
			},
			{
				label: ['一级代理上缴','二级代理上缴','三级代理上缴','四级代理上缴','五级代理上缴'][level],
				value: 'payment_user',
				level: [0, 1, 2, 3, 4],
				key:12,
				class:'class2'
			},
			{
				label: '占成%',
				value: 'share_parent_precentage',
				level: [0, 1, 2, 3, 4, 5],
				key:13,
				class:'class3'
			},
			{
				label: '本级占成',
				value: 'sum_share_parent',
				level: [0, 1, 2, 3, 4, 5],
				key:14,
				class:'class3'
			},
			{
				label: ['','一级代理奖金','二级代理奖金','三级代理奖金','四级代理奖金','五级代理奖金'][level],
				value: 'bonus_parent',
				level: [1, 2, 3, 4, 5],
				key:15,
				class:'class3'
			},
			{
				label: '手续费',
				value: 'sum_service_fee_parent',
				level: [0, 1, 2, 3, 4, 5],
				key:16,
				class:'class3'
			},
			{
				label: '过夜费',
				value: 'sum_overnight_fee_parent',
				level: [0, 1, 2, 3, 4, 5],
				key:17,
				class:'class3'
			},
			{
				label: '一级代理点差返佣',
				value: 'order_diff_discount_parent',
				level: [1],
				key:18,
				class:'class3'
			},
			{
				label: ['后台盈亏','一级代理盈亏','二级代理盈亏','三级代理盈亏','四级代理盈亏','五级代理盈亏'][level],
				value: 'win_parent',   //负数显示红色
				level: [0, 1, 2, 3, 4, 5],
				key:19,
				class:'class3'
			},
			{
				label: '上级占成',
				value: 'share_up_sum_grand',
				level: [1, 2, 3, 4, 5],
				key:20,
				class:'class4'
			},
			{
				label: ['','后台金额','一级代理金额','二级代理金额','三级代理金额','四级代理金额'][level],
				value: 'share_up_bonus_grand',
				level: [1, 2, 3, 4, 5],
				key:21,
				class:'class4'
			},
			{
				label: ['','后台手续费','一级代理手续费','二级代理手续费','三级代理手续费','四级代理手续费'][level],
				value: 'sum_service_fee_grand',
				level: [1, 2, 3, 4, 5],
				key:22,
				class:'class4'
			},{
				label: ['','后台过夜费','一级代理过夜费','二级代理过夜费','三级代理过夜费','四级代理过夜费'][level],
				value: 'sum_overnight_fee_grand',
				level: [1, 2, 3, 4, 5],
				key:23,
				class:'class4'
			},
			{
				label: '后台点差返佣',
				value: 'order_diff_discount_grand',
				level: [1],
				key:24,
				class:'class4'
			},
			{
				label: ['','上缴后台','上缴一级代理','上缴二级代理','上缴三级代理','上缴四级代理'][level],
				value: 'payment_grand',
				level: [1, 2, 3, 4, 5],
				key:25,
				class:'class4'
			}
		]
	}
}