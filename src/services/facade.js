const getByFilter = async (Col, req) => {
  console.log(req.query)
  console.log('as')
  const data = await Col.findOne({
    name: req.query.name
  })

  if (!data) {
    return { error: message[`no${Col.modelName}`], status: 404 }
  }
  console.log(data)

  return data
}

module.exports = {
  getByFilter
}
