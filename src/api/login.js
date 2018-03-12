import request from '@/utils/request';

export function login(account, password) {
  const data = {
    account,
    password
  };
  return request({
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    // transformRequest: [
    //   function (data) {
    //     let ret = "";
    //     for (let it in data) {
    //       ret +=
    //         encodeURIComponent(it) +
    //         "=" +
    //         encodeURIComponent(data[it]) +
    //         "&";
    //     }
    //     return ret;
    //   }
    // ],
    data,
    method: "post",
    url: "/index.php?r=btc/default/login",
  })
}
