const express = require('express')
const app = express()

const config = require('./config/config')
require('./config')(app)

app.listen(config.PORT, async () =>
  console.info(`Express is listening on ${config.PORT}`)
)
