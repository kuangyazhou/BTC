import Mock from 'mockjs'

import {
  Modal,
  proxy
} from './account';

Mock.mock('http://123.com', {
  'name|3': 'fei', //这个定义数据的模板形式下面会介绍
  'age|20-30': 25,
})

Mock.mock('http://account/addProxy', Modal);
Mock.mock('http://account/underProxy', proxy);


export default Mock
