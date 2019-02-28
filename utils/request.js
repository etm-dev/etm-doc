let etmJS = require('etm-js');
let axios = require('axios');

let secret = "race forget pause shoe trick first abuse insane hope budget river enough"
let url = 'http://etm.red:8096/api/dapps/4149dcbd54c461aebfb2ff1e61be2b4619df9f7c378b78bb9ac520a87778e043/transactions/signed'

let transaction = etmJS.dapp.createInnerTransaction({
  fee: `0`,
  type: 1015,
  args: JSON.stringify(["AGWefmsaAhnqx75xhucqjk8Ah2fqDG3Q4P"])
}, secret)
axios.put(url, {
  transaction
}).then(res => {
  console.log(res)
}).catch(err => {
  console.error(err);
})
