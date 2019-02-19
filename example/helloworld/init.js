let config = require("./config")
module.exports = async function () {
  console.log('enter dapp init')


  //注册合约方法
  app.registerContract(1000, 'helloworld.hello')
  
  app.setDefaultFee("0", config.FEE_NAME)


  app.events.on('newBlock', (block) => {
    console.log('new block received', block.height)
  })
}
