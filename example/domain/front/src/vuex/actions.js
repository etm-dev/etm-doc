let loginUrl = '/accounts/'
let unsignedTransactionsPost = '/transactions/unsigned'
let signedTransactionsPost = '/transactions/signed'
let transactionsUrl = '/transactions'
let domainUrl = '/domain/'
let postfixUrl = '/domain/suffix/'
let transfersUrl = '/transfers'

const UNDEFINED_ERROR = 'An undefined error occured!'
const REQUEST_ERROR = 'Error during request'

let actions = {
  async getUserInfo ({ commit, state }, { secret, that, etmJS }) {
    let keypair = etmJS.crypto.getKeys(secret)
    let address = etmJS.crypto.getAddress(keypair.publicKey)

    try {
      let result = await that.$axios.get(loginUrl + address)
      if (result.status === 200) {
        console.log(result.data)
        let balances = result.data.account.balances
        let nickname = ''
        if (result.data.account.extra && result.data.account.extra.str1) {
          nickname = result.data.account.extra.str1
        }
        commit('setUserInfo', { secret, address, balances, nickname })
        return { success: true }
      } else {
        return { success: false, error: REQUEST_ERROR }
      }
    } catch (err) {
      console.log(err)
      return { success: false, error: UNDEFINED_ERROR }
    }
  },

  async setNickname ({ commit, state }, { that, nickname }) {
    try {
      let data = {
        secret: state.userInfo.secret,
        fee: '1000000000',
        type: 4,
        args: JSON.stringify([nickname])
      }
      let jsonData = JSON.stringify(data)
      let result = await that.$axios.put(unsignedTransactionsPost, jsonData, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if (result.status === 200) {
        if (result.data.success === true) {
          commit('setNickname', { nickname })
        }
        return result.data
      } else {
        return { success: false, error: REQUEST_ERROR }
      }
    } catch (err) {
      console.log(err)
      return { success: false, error: UNDEFINED_ERROR }
    }
  },

  async registerDomain ({ commit, state }, { that, domain }) {
    try {
      let data = {
        secret: state.userInfo.secret,
        fee: '10000000',
        type: 1000,
        args: JSON.stringify([domain])
      }
      let jsonData = JSON.stringify(data)
      let result = await that.$axios.put(unsignedTransactionsPost, jsonData, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if (result.status === 200) {
        return result.data
      } else {
        return { success: false, error: REQUEST_ERROR }
      }
    } catch (err) {
      console.log(err)
      return { success: false, error: UNDEFINED_ERROR }
    }
  },

  async setIp ({ commit, state }, { that, domain, ip }) {
    try {
      let data = {
        secret: state.userInfo.secret,
        fee: '10000000',
        type: 1001,
        args: JSON.stringify([domain, ip])
      }
      let jsonData = JSON.stringify(data)
      let result = await that.$axios.put(unsignedTransactionsPost, jsonData, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if (result.status === 200) {
        return result.data
      } else {
        return { success: false, error: REQUEST_ERROR }
      }
    } catch (err) {
      console.log(err)
      return { success: false, error: UNDEFINED_ERROR }
    }
  },

  async searchDomain ({ commit, state }, { that, domain }) {
    try {
      let result = await that.$axios.get(domainUrl + domain)
      if (result.status === 200) {
        return result.data
      } else {
        return { success: false, error: REQUEST_ERROR }
      }
    } catch (err) {
      console.error(err)
      return { success: false, error: UNDEFINED_ERROR }
    }
  },
  async searchPostfix ({ commit, state }, { that, postfix }) {
    try {
      let result = await that.$axios.get(postfixUrl + postfix)
      if (result.status === 200) {
        return result.data
      } else {
        return { success: false, error: REQUEST_ERROR }
      }
    } catch (err) {
      console.error(err)
      return { success: false, error: UNDEFINED_ERROR }
    }
  },

  async inTransfer ({ commit, state }, { that, etmJS, recipientAddress, selectedCoin, amount }) {
    try {
      let secret = that.$store.getters.secret
      let data = {
        fee: '10000000',
        type: 3,
        args: JSON.stringify([selectedCoin, String((amount * 1e8)), recipientAddress])
      }
      let transaction = etmJS.dapp.createInnerTransaction(data, secret)
      let result = await that.$axios.put(signedTransactionsPost, { transaction: transaction })
      if (result.status === 200) {
        return result.data
      } else {
        return { success: false, error: REQUEST_ERROR }
      }
    } catch (err) {
      console.log(err)
      return { success: false, error: UNDEFINED_ERROR }
    }
  },
  async getTransferInfo ({ commit, state }, { that, ownAddress }) {
    try {
      let url = transfersUrl
      url += ('?ownerId=' + ownAddress)
      let result = await that.$axios.get(url)
      if (result.status === 200) {
        return result.data
      } else {
        return { success: false, error: REQUEST_ERROR }
      }
    } catch (err) {
      console.log(err)
      return { success: false, error: UNDEFINED_ERROR }
    }
  },
  async getWithdrawals ({ commit }, { that, ownAddress }) {
    try {
      let withdrawals = `${transactionsUrl}?senderId=${ownAddress}&type=2`
      let result = await that.$axios.get(withdrawals)
      if (result.status === 200) {
        return result.data
      } else {
        return { success: false, error: REQUEST_ERROR }
      }
    } catch (err) {
      console.log(err)
      return { success: false, error: UNDEFINED_ERROR }
    }
  },

  async dappWithdrawal ({ commit, state }, { that, etmJS, coin, amount }) {
    try {
      let secret = that.$store.getters.secret
      let data = {
        fee: '10000000',
        type: 2,
        args: JSON.stringify([String(coin), String(amount * 1e8)])
      }
      var transaction = etmJS.dapp.createInnerTransaction(data, secret)
      let result = await that.$axios.put(signedTransactionsPost, { transaction: transaction }, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if (result.status === 200) {
        return result.data
      } else {
        return { success: false, error: REQUEST_ERROR }
      }
    } catch (err) {
      console.log(err)
      return { success: false, error: UNDEFINED_ERROR }
    }
  }
}

export default actions
