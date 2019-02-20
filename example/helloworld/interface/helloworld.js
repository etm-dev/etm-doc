let config = require("../config")
const FEE_NAME = config.FEE_NAME;
//获取信息，并不改变信息
app.route.get('/helloworld', async function(req) {
  return {
    message: 'helloworld'
  }
})
// 获取所有单词
app.route.get("/words", async req => {
  let words = await app.model.Words.findAll({})
  return {
    words
  }
})

//--------------------余额操作---------------------
// 查询余额
app.route.get("/balance/:address", async req => {
  let address = req.params.address
  let balance = await app.balances.get(address, 'HLB')
  return {
    balance
  }
})

// 增加余额
app.route.get("/increase", async req => {
  await app.balances.increase('AN8qanfYV4HFdtVYoVacYm9CvVeLQ8tKFX', 'HLB', 100000000)
})

// 减少余额
app.route.get("/decrease", async req => {
  await app.balances.decrease('AN8qanfYV4HFdtVYoVacYm9CvVeLQ8tKFX', 'HLB', 50000000)
})


// 转账
app.route.get("/transfer", async req => {
  await app.balances.transfer('HLB', 50000000, 'A9mhydu4PJd3KnSbi1p6vwuoBMGcHc4xjr', 'AN8qanfYV4HFdtVYoVacYm9CvVeLQ8tKFX')
})

//--------------------数据操作---------------------
//获取内存中的模型数据
app.route.get("/getModel", async req => {
  let balance = await app.sdb.get('Balance', {
    address: 'AN8qanfYV4HFdtVYoVacYm9CvVeLQ8tKFX',
    currency: 'HLB'
  })
  return {
    balance
  }
})

//获取索引
app.route.get("/getKeys", async req => {
  let keys = await app.sdb.keys('Balance')
  return {
    keys
  }
})

//获取模型缓存
app.route.get("/getEntry", async req => {
  let entries = await app.sdb.entries('Balance')
  return {
    entries
  }
})
