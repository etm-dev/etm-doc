
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
//此方式不安全，可以查考./issueAssert.js中transferETM()
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
