import Vue from 'vue'
import Router from 'vue-router'

const _import = require('./_import_' + process.env.NODE_ENV);

// console.log(_import('account/account'));

const Login = resolve => require(['@/components/login/login'], resolve);

const userLogin = resolve => require(['@/components/userLogin/login'], resolve);

const userRegister = resolve => require(['@/components/userLogin/register'], resolve);

const Index = resolve => require(['@/components/index/index.vue'], resolve);

const Welcome = resolve => require(['@/components/index/routes/welcome.vue'], resolve);

const Order = resolve => require(['@/components/index/routes/order.vue'], resolve);

const UserNotice = resolve => require(['@/components/index/routes/userNotice.vue'], resolve);

const UserCenter = resolve => require(['@/components/index/routes/userCenter/index.vue'], resolve);

const Recharge = resolve => require(['@/components/index/routes/userCenter/Recharge/index.vue'], resolve);

const Pay1 = resolve => require(['@/components/index/routes/userCenter/Recharge/pay1.vue'], resolve);

const Pay2 = resolve => require(['@/components/index/routes/userCenter/Recharge/pay2.vue'], resolve);

const Pay3 = resolve => require(['@/components/index/routes/userCenter/Recharge/pay3.vue'], resolve);

const WithDraw = resolve => require(['@/components/index/routes/userCenter/withDraw/withDraw.vue'], resolve);

const CardList = resolve => require(['@/components/index/routes/userCenter/withDraw/cardList.vue'], resolve)

const Record = resolve => require(['@/components/index/routes/userCenter/withDraw/record.vue'], resolve)

const DrawingProgress = resolve => require(['@/components/index/routes/userCenter/withDraw/progress.vue'], resolve)

const AddCard = resolve => require(['@/components/index/routes/userCenter/withDraw/addCard.vue'], resolve)

const Trade = resolve => require(['@/components/index/routes/trade/index.vue'], resolve);

const Register = resolve => require(['@/components/login/register'], resolve);

// const Home = resolve => require(['@/components/Home'], resolve);

// const Account = resolve => require(['@/components/account/account'], resolve);

// const Arguments = resolve => require(['@/components/arguments/index'], resolve);

// const Money = resolve => require(['@/components/money/money'], resolve);

// const Notice = resolve => require(['@/components/notice/notice'], resolve);

// const Product = resolve => require(['@/components/product/index'], resolve);

// const Receive = resolve => require(['@/components/receive/receive'], resolve);

// const StateMent = resolve => require(['@/components/statement/index'], resolve);

// const notFound = resolve => require(['@/components/404/index'], resolve);

Vue.use(Router)

export default new Router({
	mode: 'history',
	routes: [{
			path: '/login',
			name: Login,
			component: Login
		},
		{
			path: '/reg',
			component: Register
		},
		{
			path: '/',
			meta: {
				member: true
			},
			component: Index,
			children: [{
				path: '/',
				component: Welcome,
				meta: {
					member: true,
					goIndex:'no'
				}

			}, {
				path: '/order',
				component: Order,
				meta: {
					member: true
				}

			}, {
				path: '/userNotice',
				component: UserNotice,
				meta: {
					member: true
				}

			}, {
				path: '/trade',
				name: 'Trade',
				meta: {
					member: true
				},
				component: Trade,

			}, {
				path: 'userlogin',
				name: userLogin,
				meta: {
					member: true
				},
				component: userLogin
			}, {
				path: '/userReg',
				meta: {
					member: true
				},
				component: userRegister
			}, {
				path: '/userCenter',
				meta: {
					member: true
				},
				component: UserCenter,
				children: [{
					path: '/',
					meta: {
						member: true
					},
					component: Recharge,
					children: [{
							path: '/',
							meta: {
								member: true
							},
							component: Pay1,

						}, {
							path: '/pay1',
							meta: {
								member: true
							},
							component: Pay1
						},
						{
							path: '/pay2',
							meta: {
								member: true
							},
							component: Pay2
						},
						{
							path: '/pay3',
							meta: {
								member: true
							},
							component: Pay3
						}
					]
				}, {
					path: '/withDraw',
					meta: {
						member: true
					},
					component: WithDraw
				}, {
					path: '/cardList',
					meta: {
						member: true
					},
					component: CardList
				}, {
					path: '/addCard',
					meta: {
						member: true
					},
					component: AddCard
				}, {
					path: '/record',
					meta: {
						member: true
					},
					component: Record
				}]
			}]
		},
		{
			path: '/home',
			component: _import('Home'),
			children: [{
					path: '/',
					component: _import('account/account'),
					meta: {
						requiresAuth: true
					},
				},
				{
					path: '/account',
					name: 'Account',
					component: _import('account/account'),
					meta: {
						requiresAuth: true
					},
				},
				{
					path: '/arguments',
					name: 'Arguments',
					component: _import('arguments/index'),
					// children: [
					//     {
					//         path: '/',
					//         component: Account,
					//     },
					//     { path: '*', component: notFound }
					// ]
				},
				{
					path: '/money',
					name: 'Money',
					component: _import('money/money')
				},
				{
					path: '/notice',
					name: 'Notice',
					component: _import('notice/notice')
				},
				{
					path: '/product',
					name: 'Product',
					component: _import('product/index')
				},
				{
					path: '/receive',
					name: 'Receive',
					component: _import('receive/receive')
				},
				{
					path: '/statement',
					name: 'StateMent',
					component: _import('statement/index')
				},
				{
					path: '*',
					component: _import('404/index')
				}
			]
		},
		{
			path: '*',
			component: _import('404/index')
		}
	]
})