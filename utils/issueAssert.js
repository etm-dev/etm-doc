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
let dappUrl = 'http://etm.red:8096/api/dapps/663ecd52420b98e0a7b5f050bf63d5c15ddc32fe1ddbf8442a0adbecdce6beba/transactions/signed'
let password = 'luggage work tourist glove response stairs ozone guide pear bounce journey body';
let secondPassword = '';

//必须大写
let issuerName = 'RAY';
let assertName = 'CNY';


//第一步
//注册资产发行人  100 ETM
function registerAssertIssuer() {
  //发行人 RAY
  let transaction = etmjs.uia.createIssuer(issuerName, "issuer", password, secondPassword);
  return JSON.stringify({
    transaction
  });
}

//第二步
//注册资产 500 ETM
function registerAssrt() {
  // 资产名称，发行商名.资产名，唯一标识
  let name = issuerName + '.' + assertName;
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

  // 构造交易数据
  let trs = etmjs.uia.createAsset(name, desc, maximum, precision, strategy, allowWriteoff, allowWhitelist, allowBlacklist, password, secondPassword)
  return JSON.stringify({
    "transaction": trs
  })
}
//第三步 发行代币  0.1 ETM
function issueAssert() {
  let currency = issuerName + '.' + assertName;
  // 本次发行量=真实数量（100）*10**精度（3），所有发行量之和需 <= 上限*精度
  //发行1亿
  let amount = '10000000000000000'
  let trs = etmjs.uia.createIssue(currency, amount, password, secondPassword)
  return JSON.stringify({
    "transaction": trs
  })
}

//第四步 向dapp（侧链充值代币），只有向dapp充值了的代币，才能使用  0.1 ETM
function chargeIntoDapp() {
  /**充值到侧链**/
  let dappid = "663ecd52420b98e0a7b5f050bf63d5c15ddc32fe1ddbf8442a0adbecdce6beba";
  let currency = issuerName + '.' + assertName
  let amount = 10000 * 100000000;
  let trs = etmjs.transfer.createInTransfer(dappid, currency, amount, password, secondPassword || undefined);
  return JSON.stringify({
    "transaction": trs
  })
}

//第五步 dapp内部转币
//curl -H "Content-Type: application/json" -H "magic:20190130" -H "version:''" -k -X PUT -d '{"transaction":`+JSON.stringify(trs7) + `}' 'http://39.98.65.187:4096/api/dapps/2a2969e7a5d9e1a4dbd03887ed335313d1271b1b9ea46436bd754894f521ad6b/transactions/signed' && echo
function dappInnerTransfer() {
  let fee = String(0.1*100000000);
  let type = 3;
  let options = {fee: fee, type: type, args: [issuerName + '.' + assertName, "100000000", "APeskjFa4KRR3oHHP7wqFP8tpQxiTrDD9a"]};
  let trs = etmjs.dapp.createInnerTransaction(options, password);
  return JSON.stringify({
    "transaction": trs
  })
}

//转ETM
function transferETM() {

  let targetAddress = "APeskjFa4KRR3oHHP7wqFP8tpQxiTrDD9a";
  let amount = 100*100000000;
  let password = 'race forget pause shoe trick first abuse insane hope budget river enough';
  let secondPassword  = '';
  let message = ''; // 转账备注

  // 其中password是在用户登录的时候记录下来的，secondPassword需要每次让用户输入
  // 可以通过user.secondPublicKey来判断用户是否有二级密码，如果没有，则不必输入，以下几个交易类型类似
  let transaction = etmjs.transaction.createTransaction(targetAddress, amount, message, password, secondPassword || undefined);

  return JSON.stringify({
    "transaction": transaction
  })
}
//ETM 主网转账
// axios.post(url, transferETM()).then(res => {
//   console.log(res);
// }).catch(err => {
//   console.error(err);
// })



//请分别注释各个步骤，然后依次执行

// 第一步注册发行商
// axios.post(url, registerAssertIssuer()).then(res => {
//   console.log(res)
// }).catch(err => {
//   console.error(err);
// })

//只有在第一步执行完成后并且等待区块确认了，才能执行第二步，要不然会出现找不到发行者
//第二步注册资产
// axios.post(url, registerAssrt()).then(res => {
//   console.log(res)
// }).catch(err => {
//   console.error(err);
// })

//只有在第二步执行完成后并且等待区块确认了，才能执行第三步
//第三步 发行代币
// axios.post(url, issueAssert()).then(res => {
//   console.log(res);
// }).catch(err => {
//   console.error(err);
// })

//只有在第三步执行完成后并且等待区块确认了，才能执行第四步
//第四步 充值到侧链
// axios.post(url, chargeIntoDapp()).then(res => {
//   console.log(res);
// }).catch(err => {
//   console.error(err);
// })

//获取dapp下的账号  充值到侧链之后就可以查询了
//http://xx.x.xx.xx:port/api/dapps/[dappid]/balances/[address]


console.log(dappInnerTransfer());
//第五步 侧链间转账
// 注意url
// 注意是put请求
// axios.put(dappUrl, dappInnerTransfer()).then(res => {
//   console.log(res);
// }).catch(err => {
//   console.error(err);
// })
