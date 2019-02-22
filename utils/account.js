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
let url = 'http://etm.red:8096/peer/transactions'
//侧链
let dappUrl = 'http://etm.red:8096/api/dapps/5929ee23ea77968a7ec686c124ed3bad43c096e5b38a54eb7ab72ef7b635900d/transactions/signed'
let dappid = "5929ee23ea77968a7ec686c124ed3bad43c096e5b38a54eb7ab72ef7b635900d";

let secret = 'race forget pause shoe trick first abuse insane hope budget river enough';

let loginUrl = 'http://etm.red:8096/api/accounts/open2/'
let login2Url = 'http://etm.red:8096/api/accounts/open/'

//安全登录  推荐
function safeLogin() {
  let publicKey = etmjs.crypto.getKeys(secret).publicKey; //根据密码生成公钥
  return JSON.stringify({
    publicKey
  });
}
//危险登录，不推荐使用
function loginNotSafe() {
  return JSON.stringify({
    'secret':secret
  });
}

axios.post(login2Url, loginNotSafe()).then(res => {
  console.log(res);
}).catch(err => {
  console.error(err);
})
