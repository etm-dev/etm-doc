//扣费
//注册代理人 100 ETM
//注册资产 500 ETM
//发行资产 0.1 ETM
//转账 0.1 ETM

let etmjs = require('etm-js');
let axios = require('axios');


axios.defaults.headers = {
  'Content-Type': 'application/json',
  'magic': 'personal',
  'version': ''
}
//主链
let url = 'http://etm.red:8096/api/signatures'
//侧链

//设置二级密码的账户
let secret = 'found razor spring fish surprise liar else argue tongue crouch fatal lucky';


//设置二级密码
function setSignature() {
  return JSON.stringify({
    'secret':secret,
    'secondSecret':'test001'
  });
}


axios.put(url, setSignature()).then(res => {
  console.log(res);
}).catch(err => {
  console.error(err);
})
