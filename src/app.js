const express = require('express')
let app = express()

const PORT = process.env.PORT | 8080

app.get('/ping', async (req, res) => res.send('pong!'))

app.listen(PORT, async () => console.info(`The magic portal is open in the port ${PORT}`))