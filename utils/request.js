let etmJS = require('etm-js');
let axios = require('axios');

let secret = "luggage work tourist glove response stairs ozone guide pear bounce journey body"
let url = 'http://etm.red:8096/api/dapps/663ecd52420b98e0a7b5f050bf63d5c15ddc32fe1ddbf8442a0adbecdce6beba/transactions/signed'

let transaction = etmJS.dapp.createInnerTransaction({
  fee: `0`,
  type: 1000,
  args: JSON.stringify([" hello world "])
}, secret)
axios.put(url, {
  transaction
}).then(res => {
  console.log(res)
}).catch(err => {
  console.error(err);
})
