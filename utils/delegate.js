
let etmjs = require('etm-js');
let axios = require('axios');


axios.defaults.headers = {
  'Content-Type': 'application/json',
  'magic': 'personal',
  'version': ''
}
//主链
let url = 'http://etm.red:8096/api/delegates'
let url1 = 'http://etm.red:8096/api/delegates/forging/enable'
let secret = 'idle throw excuse huge try mask fuel train exotic first ketchup better';


//注册受托人
function registerDelegate() {
  return JSON.stringify({
    'secret':secret,
    'username':'delegate_001'
  });
}

function enableDelegate() {
  return JSON.stringify({
    'secret':secret
  });
}

// axios.put(url, registerDelegate()).then(res => {
//   console.log(res);
// }).catch(err => {
//   console.error(err);
// })

axios.post(url1, enableDelegate()).then(res => {
  console.log(res);
}).catch(err => {
  console.error(err);
})
