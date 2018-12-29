
let mutations = {
  setUserInfo: function (state, { secret, address, balances, nickname }) {
    state.userInfo.secret = secret
    state.userInfo.address = address
    state.userInfo.balances = balances
    state.userInfo.nickname = nickname
    state.isLogin = true
  },
  userLogout: function (state) {
    state.userInfo.secret = ''
    state.userInfo.address = ''
    state.userInfo.balances = []
    state.userInfo.nickname = ''

    state.isLogin = false
  },
  setNickname: function (state, { nickname }) {
    state.userInfo.nickname = nickname
  },

  setRegisterDomain: function (state, { domain }) {
    state.app.register.domain = domain
  },
  setRegisterIp: function (state, { ip }) {
    state.app.register.ip = ip
  },
  setRegisterStepOneFinished: function (state, { domain }) {
    state.app.register.stepOne.active = false
    state.app.register.stepOne.completed = true
    state.app.register.stepOne.disabled = true

    state.app.register.stepTwo.active = true
    state.app.register.stepTwo.disabled = false

    state.app.register.domain = domain
  },
  setRegisterStepTwoFinished: function (state) {
    state.app.register.stepOne.completed = true
    state.app.register.stepOne.active = false
    state.app.register.stepOne.disabled = true

    state.app.register.stepTwo.active = false
    state.app.register.stepTwo.completed = true
    state.app.register.stepTwo.disabled = true
  },
  resetRegisterDomain: function (state) {
    state.app.register.stepOne = {
      title: 'Register domain',
      icon: 'pencil',
      active: true,
      disabled: false,
      completed: false
    }
    state.app.register.stepTwo = {
      title: 'Set IP-Address',
      icon: 'payment',
      active: false,
      disabled: true,
      completed: false
    }

    state.app.register.domain = ''
    state.app.register.ip = ''
  }
}

export default mutations
