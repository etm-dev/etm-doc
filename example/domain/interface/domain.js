app.route.get('/domain/:address',  async function (req) {
  let result = await app.model.Domain.findOne({
      condition: { address: req.params.address }
  })
  return result
})

app.route.get('/domain/suffix/:suffix',  async function (req) {
  let result = await app.model.Domain.findAll({
      condition: { suffix: req.params.suffix }
  })
  return result
})
