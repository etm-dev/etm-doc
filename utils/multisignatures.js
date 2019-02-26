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
let url = 'http://etm.red:8096/api/multisignatures'
let url1 = 'http://etm.red:8096/api/multisignatures/sign'




let secret = 'strategy tiger wolf slow october grace hover goose glad owner pumpkin trouble';


//第一步  设置多重签名密码
function setMultisignature() {
  return JSON.stringify({
    'secret':secret,
    'min':2,
    'lifetime':1,
    'keysgroup':['+813a4934192334fdd55f966f25975757b3bc2b866552fa58687e7f8420190961']
  });
}

//第二步  非交易发起人对设置多重签名交易进行签名
function signatureMu() {
  return JSON.stringify({
    'secret':'pepper sleep youth blast vivid circle cross impact zebra neck salmon fee',
    'transactionId':'355ce9527e074e661b4b7cbb01496d5574693c9ead25b904484e0c83564c5646'
  });
}

// axios.put(url, setMultisignature()).then(res => {
//   console.log(res);
// }).catch(err => {
//   console.error(err);
// })


axios.post(url1, signatureMu()).then(res => {
  console.log(res);
}).catch(err => {
  console.error(err);
})
