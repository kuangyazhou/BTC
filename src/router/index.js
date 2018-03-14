import Vue from 'vue'
import Router from 'vue-router'

const Login = resolve => require(['@/components/login/login'], resolve);

const userLogin = resolve => require(['@/components/userLogin/login'], resolve);

const Index = resolve => require(['@/components/index/index.vue'], resolve);

const Register = resolve => require(['@/components/login/register'], resolve);

const Home = resolve => require(['@/components/Home'], resolve);

const Account = resolve => require(['@/components/account/index'], resolve);
 
const Arguments = resolve => require(['@/components/arguments/index'], resolve);

const Money = resolve => require(['@/components/money/index'], resolve);

const Notice = resolve => require(['@/components/arguments/index'], resolve);

const Product = resolve => require(['@/components/product/index'], resolve);
 
const Receive = resolve => require(['@/components/receive/index'], resolve);
 
const StateMent = resolve => require(['@/components/statement/index'], resolve);
  

const notFound = resolve => require(['@/components/404/index'], resolve);

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
      path: '/userlogin',
      name: userLogin,
      component: userLogin
    }, {
      path: '/',
      component: userLogin
    },{
      path: '/login',
      name: Login,
      component: Login
    },
    {
      path: '/reg',
      component: Register
    },
    {
      path: '/index',
      name: 'Index',
      component: Index
    },
    {
      path: '/home',
      component: Home,
      children: [{
          path: '/',
          component: Account,
        },
        {
          path: '/account',
          name: 'Account',
          component: Account
        },
        {
          path: '/arguments',
          name: 'Arguments',
          component: Arguments,
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
          component: Money
        },
        {
          path: '/notice',
          name: 'Notice',
          component: Notice
        },
        {
          path: '/product',
          name: 'Product',
          component: Product
        },
        {
          path: '/receive',
          name: 'Receive',
          component: Receive
        },
        {
          path: '/stateMent',
          name: 'StateMent',
          component: StateMent
        },
        {
          path: '*',
          component: notFound
        }
      ]
    },
    {
      path: '*',
      component: notFound
    }
  ]
})
