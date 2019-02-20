//改变信息
module.exports = {
  hello: async function(words) {
    //单步添加单词
    app.sdb.lock("add-word")
    app.sdb.create('Word', {
      'words': words
    })
  }
}
