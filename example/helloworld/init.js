module.exports = async function () {
  console.log('enter dapp init')

  //注册合约方法
  app.registerContract(1000, 'helloworld.hello')


  app.events.on('newBlock', (block) => {
    console.log('new block received', block.height)
  })
}
