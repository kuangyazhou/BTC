import Mock from 'mockjs'

import {
	Modal,
	proxy
} from './account';

import { userInfo, productInfo } from './userInfo'

Mock.mock('http://123.com', {
	'name|3': 'fei', //这个定义数据的模板形式下面会介绍
	'age|20-30': 25,
})

Mock.mock('http://account/addProxy', Modal);
Mock.mock('http://account/underProxy', proxy);
Mock.mock('http://account/userInfo', userInfo);
Mock.mock('http://account/productInfo', productInfo);
export default Mock