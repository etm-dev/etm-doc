let etmjs = require('etm-js');
let axios = require('axios');


axios.defaults.headers = {
  'Content-Type': 'application/json',
  'magic': 'personal',
  'version': ''
}
//所有地址
let url = 'http://etm.red:8096/peer/transactions'
let secret = 'pepper sleep youth blast vivid circle cross impact zebra neck salmon fee';



//9.2.1 设置二级密码
function setSecondPassword() {
  let secondPassword = 'test001';
  let transaction = etmjs.signature.createSignature(secret, secondPassword);
  return JSON.stringify({
    "transaction": transaction
  })
}

//9.2.2 转账 （转ETM）
function transferETM() {
  let targetAddress = "APeskjFa4KRR3oHHP7wqFP8tpQxiTrDD9a";
  let amount = 100 * 100000000;
  let password1 = 'race forget pause shoe trick first abuse insane hope budget river enough';
  let secondPassword = '';
  let message = ''; // 转账备注

  // 其中password是在用户登录的时候记录下来的，secondPassword需要每次让用户输入
  // 可以通过user.secondPublicKey来判断用户是否有二级密码，如果没有，则不必输入，以下几个交易类型类似
  let transaction = etmjs.transaction.createTransaction(targetAddress, amount, message, password1, secondPassword || undefined);

  return JSON.stringify({
    "transaction": transaction
  })
}

//9.2.3 注册受托人
function registerDelegate() {
  let secondPassword = 'test001';
  let userName = 'test001';

  let transaction = etmjs.delegate.createDelegate(userName, secret, secondPassword || undefined);
  return JSON.stringify({
    "transaction": transaction
  })
}

//9.2.4 投票与取消投票
function vote() {
  let secondPassword = 'test001';
  // 投票内容是一个列表，列表中的每一个元素是一个符号加上所选择的受托人的公钥，符号为+表示投票，符号为-表示取消投票
  let voteContent = [
    '-ae28cc3069f4291756168e602a11e5b5d13e546050e3c1d9a09c0311f53a159c',
    '+a08dc0d7b170a0e12caff0a7faaef952741e65f3585905a5847e4d877d650f07'
  ];
  let transaction = etmjs.vote.createVote(voteContent, secret, secondPassword || undefined);
  return JSON.stringify({
    "transaction": transaction
  })
}

//9.2.5 锁仓
function createLock() {
  let height = 344900; // 锁仓高度
  let secondPassword = 'test001';
  // 其中password是在用户登录的时候记录下来的，secondPassword需要每次让用户输入
  // 可以通过user.secondPublicKey来判断用户是否有二级密码，如果没有，则不必输入，以下几个交易类型类似
  let transaction = etmjs.transaction.createLock(height, secret, secondPassword || undefined);
  return JSON.stringify({
    "transaction": transaction
  })
}


axios.post(url, createLock()).then(res => {
  console.log(res);
}).catch(err => {
  console.error(err);
})
