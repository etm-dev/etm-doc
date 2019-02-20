let etmJS = require('etm-js');
let axios = require('axios');

let secret = "luggage work tourist glove response stairs ozone guide pear bounce journey body"
let url = 'http://etm.red:8096/api/dapps/5929ee23ea77968a7ec686c124ed3bad43c096e5b38a54eb7ab72ef7b635900d/transactions/signed'

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
