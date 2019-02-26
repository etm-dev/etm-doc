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

//9.3.1 注册资产发行商  100 ETM
function registerAssertIssuer() {
  let password = 'found razor spring fish surprise liar else argue tongue crouch fatal lucky'
  let secondPassword = 'test001'
  let transaction = etmjs.uia.createIssuer('issuerName', "issuer", password, secondPassword);
  return JSON.stringify({
    transaction
  });
}

//9.3.2 注册资产 500 ETM
function registerAssrt() {
  let password = 'found razor spring fish surprise liar else argue tongue crouch fatal lucky'
  // 资产名称，发行商名.资产名，唯一标识
  let name = 'issuerName.CNY';
  let desc = '测试';
  // 上限 10亿
  let maximum = '100000000000000000';
  // 精度，小数点的位数，这里上限是100000000000000000，精度为8，代表资产IssuerName.CNY的最大发行量为1000000000.00000000
  let precision = 8;
  // 策略
  let strategy = '';
  // 是否允许注销，默认不允许。0：不允许，1：允许
  let allowWriteoff = 0;
  // 是否允许白名单，默认不允许。0：不允许，1：允许
  let allowWhitelist = 0;
  // 是否允许黑名单，默认不允许。0：不允许，1：允许
  let allowBlacklist = 0;

  let secondPassword = 'test001'
  // 构造交易数据
  let trs = etmjs.uia.createAsset(name, desc, maximum, precision, strategy, allowWriteoff, allowWhitelist, allowBlacklist, password, secondPassword)
  return JSON.stringify({
    "transaction": trs
  })
}

//9.3.3 资产设置acl模式
function setAcl() {
  let password = 'found razor spring fish surprise liar else argue tongue crouch fatal lucky'
  let secondSecret = 'test001'
  let currency = 'issuerName.CNY'
  // 资产是否注销，1：流通，2：注销
  let flagType = 1
  // 访问控制列表的类型，0：黑名单， 1：白名单，资产创建后默认为黑名单模式
  let flag = 1
  let trs = etmjs.uia.createFlags(currency, flagType, flag, password, secondSecret)

  return JSON.stringify({
    "transaction": trs
  })
}
//9.3.4 更新访问控制列表
function updateAcl() {
  let password = 'found razor spring fish surprise liar else argue tongue crouch fatal lucky'
  let secondSecret = 'test001'
  let currency = 'issuerName.CNY'
  // '+'表示增加列表， ‘-’表示删除列表
  var operator = '+'
  // 将生成的交易数据通过post发送给server，把地址列表['A77LPkv5jEkMXAcsQ5iTzUS9rUeLezWxdB']增加到该白名单中，只修改名单列表，不修改acl模式，手续费0.2ETM
  var list = ['A77LPkv5jEkMXAcsQ5iTzUS9rUeLezWxdB']
  // 访问控制列表的类型，0：黑名单， 1：白名单
  var flag = 1
  var trs = etmjs.uia.createAcl(currency, operator, flag, list, password, secondSecret)
  return JSON.stringify({
    "transaction": trs
  })
}

//9.3.5 资产发行  0.1 ETM
function issueAssert() {
  let password = 'found razor spring fish surprise liar else argue tongue crouch fatal lucky'
  let currency = 'issuerName.CNY';
  let secondSecret = 'test001'
  // 本次发行量=真实数量（100）*10**精度（3），所有发行量之和需 <= 上限*精度
  //发行1亿
  let amount = '10000000000000000'
  let trs = etmjs.uia.createIssue(currency, amount, password, secondSecret)
  return JSON.stringify({
    "transaction": trs
  })
}

//9.3.6 发行的资产转账
function transferIssueAssert() {
  let password = 'found razor spring fish surprise liar else argue tongue crouch fatal lucky'
  let currency = 'issuerName.CNY';
  let secondSecret = 'test001'
  // 本次转账数（10000）=真实数量（10）*10**精度（3），需 <= 当前资产发行总量
  let amount = '10000'
  // 接收地址，需满足前文定义好的acl规则
  let recipientId = 'A9mhydu4PJd3KnSbi1p6vwuoBMGcHc4xjr'
  let trs = etmjs.uia.createTransfer(currency, amount, recipientId, password, secondSecret)
  return JSON.stringify({
    "transaction": trs
  })
}

//9.3.7 注销资产
function destroyAssert() {
  let password = 'found razor spring fish surprise liar else argue tongue crouch fatal lucky'
  let currency = 'issuerName.CNY';
  let secondSecret = 'test001'
  // flagType为资产是否注销，1：流通，2：注销
  var flagType = 2
  // flag为黑、白名单模式
  var flag =1
  var trs = etmjs.uia.createFlags(currency, flagType, flag, password, secondSecret)

  return JSON.stringify({
    "transaction": trs
  })
}

axios.post(url, destroyAssert()).then(res => {
  console.log(res);
}).catch(err => {
  console.error(err);
})
