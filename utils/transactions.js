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
let url = 'http://etm.red:8096/api/transactions'
let secret = 'race forget pause shoe trick first abuse insane hope budget river enough';


//创建交易
function createTransaction() {
  return JSON.stringify({
    'secret':secret,
    'amount':55500000000,
    'recipientId':'A66taz8N3f67dzSULHSUunfPx82J25BirZ',
  });
}

axios.put(url, createTransaction()).then(res => {
  console.log(res);
}).catch(err => {
  console.error(err);
})
