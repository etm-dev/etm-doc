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

//--------------------内存数据操作---------------------
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

//-------------数据库数据操作-----------
//获取数据库模型
app.route.get("/getDBModel", async req => {
  let entries = await app.model.Words.findAll({})
  return {
    entries
  }
})

//获取数据库模型字段
app.route.get("/getDBMFields", async req => {
  let fields = await app.model.Words.fields()
  return {
    fields
  }
})

//获取数据库模型数据数量
app.route.get("/getDBMCount", async req => {
  let count = await app.model.Words.count({})
  return {
    count
  }
})

//获取数据库中是否存在某些数据
app.route.get("/exist", async req => {
  let exist = await app.model.Words.exists({"words":" hello ray "})
  return {
    exist
  }
})


//查找数据库中的数据
app.route.get("/findOne", async req => {
  let one = await app.model.Words.findOne({"words":" hello ray "})
  return {
    one
  }
})

//----------添加费用池----------
app.route.get("/addFee", async req => {
  await app.feePool.add('HLB', '10000000000')
})

//获取真实时间戳
app.route.get("/getRealTime", async req => {
  let realtime = await app.getRealTime(4353634)
  return {
    realtime
  }
})
