let config = require("../config")
const FEE_NAME = config.FEE_NAME;
//获取信息，并不改变信息
app.route.get('/helloworld',  async function (req) {
  return { message: 'helloworld' }
})
// 获取所有单词
app.route.get("/words", async req => {
  let words = await app.model.Words.findAll({})
  return { words }
})

// 获取所有单词
app.route.get("/balance/:address", async req => {
  let address = req.params.address
  let amount = await app.balances.get(address,FEE_NAME)
  return { amount }
})
