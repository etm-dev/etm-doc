//获取信息，并不改变信息
app.route.get('/helloworld',  async function (req) {
  return { message: 'helloworld' }
})
// 获取所有单词
app.route.get("/words", async req => {
  let words = await app.model.Words.findAll({})
  return { words }
})
