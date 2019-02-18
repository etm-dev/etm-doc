//改变信息
module.exports = {
  hello: async function(words) {
    app.sdb.create('words', {
      words
    })
  }
}
