const express = require('express')
const app = express()

const config = require('./config/config')
require('./config')(app)
app.get('/ping', async (req, res) => res.send('pong!'))

console.log(config)
app.listen(config.PORT, async () =>
  console.info(`The magic portal is open in the port ${config.PORT}`)
)
