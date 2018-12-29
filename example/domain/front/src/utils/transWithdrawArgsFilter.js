let transWithdrawArgsFilter = function (args, type) {
  // input: ["XAS","22200000000"]
  // type: (currency || amount)
  args = JSON.parse(args)
  if (Array.isArray(args)) {
    if (type === 'currency') {
      return args[0]
    }
    if (type === 'amount') {
      return parseInt(args[1])
    }
  }
  return ''
}

export default transWithdrawArgsFilter
