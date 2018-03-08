import Vue from 'vue'
import Router from 'vue-router'

const Login = () => import('@/components/login/login');
const Register = () => import('@/components/login/register');
const Home = () => import('@/components/Home');
const Account = () => import('@/components/account/index');
const Arguments = () => import('@/components/arguments/index');
const Money = () => import('@/components/money/index');
const Notice = () => import('@/components/notice/index');
const Product = () => import('@/components/product/index');
const Receive = () => import('@/components/receive/index');
const StateMent = () => import('@/components/statement/index');

const notFound = () => import('@/components/404/index');

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: Login,
      component: Login
    }, {
      path: '/',
      component: Login
    },
    {
      path: '/reg',
      component: Register
    },
    {
      path: '/home',
      component: Home,
      children: [
        {
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
          component: Arguments
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
        { path: '*', component: notFound }
      ]
    },
    { path: '*', component: notFound }
  ]
})
