let etmjs = require('etm-js');
let axios = require('axios');


axios.defaults.headers = {
  'Content-Type': 'application/json',
  'magic': 'personal',
  'version': ''
}
let url = 'http://etm.red:8096/peer/transactions'
let password = 'race forget pause shoe trick first abuse insane hope budget river enough';
let secondPassword = '';



//第一步
//注册资产发行人
function registerAssertIssuer() {
  //发行人 RAY
  let transaction = etmjs.uia.createIssuer("WL", "ray issue assert", password, secondPassword);
  return JSON.stringify({
    transaction
  });
}

//第二步
//注册资产
function registerAssrt() {
  // 资产名称，发行商名.资产名，唯一标识
  let name = 'WL.CNY';
  let desc = '测试加密马';
  // 上限
  let maximum = '1000000000';
  // 精度，小数点的位数，这里上限是1000000，精度为3，代表资产IssuerName.CNY的最大发行量为1000.000
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
//第三步 发行代币
function issueAssert() {
  let currency = 'WL.CNY'
  // 本次发行量=真实数量（100）*10**精度（3），所有发行量之和需 <= 上限*精度
  let amount = '10000000'
  let trs = etmjs.uia.createIssue(currency, amount, password, secondPassword)
  return JSON.stringify({
    "transaction": trs
  })
}

//请分别注释各个步骤，然后依次执行

//第一步注册发行商
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
axios.post(url, issueAssert()).then(res => {
  console.log(res);
}).catch(err => {
  console.error(err);
})
