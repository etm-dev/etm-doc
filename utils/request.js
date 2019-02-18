let etmJS = require('etm-js');
let axios = require('axios');

let address = "race forget pause shoe trick first abuse insane hope budget river enough"
let url = 'http://etm.red:8096/api/dapps/fbf58b3a079cd85cc78c4584fd2805a1ac677752134380bd0d95c57c0220e236/transactions/signed'

let transaction = etmJS.dapp.createInnerTransaction({
  fee: `${1e8}`,
  type: 1000,
  args: JSON.stringify(["helloworld"])
}, address)
axios.put(url, {
  transaction
}).then(res => {
  console.log(res)
}).catch(err => {
  console.error(err);
})
