let state = {
  isLogin: false,
  userInfo: {
    nickname: '',
    address: '',
    secret: '',
    info: [],
    balances: []
  },
  app: {
    register: {
      domain: '',
      ip: '',
      stepOne: {
        title: 'Register domain',
        icon: 'pencil',
        active: true,
        disabled: false,
        completed: false
      },
      stepTwo: {
        title: 'Set IP-Address',
        icon: 'payment',
        active: false,
        disabled: true,
        completed: false
      }
    }
  }
}

export default state
