import Vue from 'vue'
import Router from 'vue-router'

const _import = require('./_import_' + process.env.NODE_ENV);

// console.log(_import('account/account'));

const Login = resolve => require(['@/components/login/login'], resolve);

const userLogin = resolve => require(['@/components/userLogin/login'], resolve);

const userRegister = resolve => require(['@/components/userLogin/register'], resolve);

const Index = resolve => require(['@/components/index/index.vue'], resolve);

const Welcome = resolve => require(['@/components/index/routes/welcome.vue'], resolve);

const UserCenter = resolve => require(['@/components/index/routes/userCenter/index.vue'], resolve);

const Pay1 = resolve => require(['@/components/index/routes/userCenter/pay1.vue'], resolve);

const Pay2 = resolve => require(['@/components/index/routes/userCenter/pay2.vue'], resolve);

const Pay3 = resolve => require(['@/components/index/routes/userCenter/pay3.vue'], resolve);

const OnlinePay1 = resolve => require(['@/components/index/routes/userCenter/onlinePay1.vue'], resolve);

const OnlinePay2 = resolve => require(['@/components/index/routes/userCenter/onlinePay2.vue'], resolve);

const WechatPay = resolve => require(['@/components/index/routes/userCenter/wechatPay.vue'], resolve);

const QQPay = resolve => require(['@/components/index/routes/userCenter/qqPay.vue'], resolve);

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
      component: Index,
      children: [{
        path: '/welcome',
        component: Welcome,

      }, {
        path: '/',
        name: 'Trade',
        component: Trade,

      }, {
        path: '/userlogin',
        name: userLogin,
        component: userLogin
      }, {
        path: '/userReg',
        component: userRegister
      }, {
        path: '/userCenter',
        component: UserCenter,
        children: [{
            path: '/',
            component: Pay1
          }, {
            path: '/pay1',
            component: Pay1
          },
          {
            path: '/pay2',
            component: Pay2
          },
          {
            path: '/pay3',
            component: Pay3
          },
          {
            path: '/onlinePay1',
            component: OnlinePay1
          },
          {
            path: '/onlinePay2',
            component: OnlinePay2
          },
          {
            path: '/wechatPay',
            component: WechatPay
          },
          {
            path: '/qqPay',
            component: QQPay
          }

        ]
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
